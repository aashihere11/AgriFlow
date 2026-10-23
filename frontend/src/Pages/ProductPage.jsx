import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductInfoCard from '../Components/ProductPage/ProductInfoCard';
import FarmerInfoCard from '../Components/ProductPage/FarmerInfocard';
import DeliveryInfoCard from '../Components/ProductPage/DeliveryInfoCard';
import ReviewSection from '../Components/ProductPage/ReviewSection';
import SimilarProducts from '../Components/ProductPage/SimilarProducts';
import axios from "axios";
import { getStockStatus } from '../utils/getStockStatus';
import CircularProgress from '@mui/material/CircularProgress';
import { getFreshnessBadge } from '../utils/getFreshnessBadge';


function ProductPage() {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const handleQtyChange = (change) => {
        const availableStock = Math.max(0, Number(product?.stock) || 0);

        setQty((previousQty) => {
            if (availableStock === 0) return 0;

            return Math.min(availableStock, Math.max(1, previousQty + change));
        });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(
                    `http://localhost:3000/products/${id}`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    const fetchedProduct = response.data.product;
                    setProduct(fetchedProduct);
                    setQty(Number(fetchedProduct.stock) > 0 ? 1 : 0);
                } else {
                    setError(response.data.message || "Product not found.");
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
                setError(error.response?.data?.message || "Unable to load this product.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            setLoading(false);
            setError("Product id is missing.");
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
            </div>
        );
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">{error || "Product not found."}</div>;
    }

    const stockInfo = getStockStatus(product.stock, product.unit);
     const badge = getFreshnessBadge(product.category, product.createdAt);

    return (
        <div className="min-h-screen bg-[#f4f7f4] ">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-8  bg-white border-b border-gray-100 sticky top-0 z-10 h-24">
                <div className="flex items-center ">
                    <Link to="/" ><img src="/media/logo.png" alt="logo" className=" w-70 shrink" /></Link>
                </div>

            </nav>

            <div className=' flex justify-center shrink grid md:grid-cols-3 grid-cols-1 gap-5 box-border  px-3 pt-5'>

                <div className='flex flex-col gap-3 shrink rounded-2xl flex items-center '>
                    <div className='flex shrink justify-center place-items-center border-2 border-[#eaf3de]  rounded-xl   bg-white' >
                        <img className="object-contain p-3" src={product.image.url} alt="img" />
                    </div>

                    <div className="flex gap-1 flex-wrap items-center">
                        <span className={`text-[10px] md:text-sm font-medium px-2 py-1 rounded-full bg-[#f0faf2] text-[#2e8a48] border border-[#a8e0b5] ${stockInfo.badgeClass}`}>
                            {stockInfo.label}
                        </span>
                        <span className={`inline-flex text-xs md:text-sm px-2 py-1 rounded-full border  ${badge.badgeClass}`}>
                            {badge.label}
                        </span>
                    </div>

                    <div className="hidden md:block bg-white border-2 border-dashed border-gray-400 rounded-xl p-5 ">
                        <p className="text-xl font-semibold tracking-widest text-gray-400 uppercase mb-2 m-0">
                            About this product
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed m-0">{product.description}</p>
                    </div>
                </div>

                <div className='grid col-span-1 md:col-span-2 grid-rows-[1fr_0.3fr_0.5fr] shrink gap-1'>
                    {/* Product Info Card */}
                    <ProductInfoCard
                        qty={qty}
                        onQtyChange={handleQtyChange}
                        product={product}
                    />

                    {/* Farmer Info Card */}
                    <FarmerInfoCard
                        product={product} />

                    {/* Farmer Info Card */}
                    <DeliveryInfoCard />

                </div>
            </div>

            {/* Review Section */}
            <div className=' mx-auto  p-3'>
                <ReviewSection />
                <SimilarProducts productId={product._id} />
            </div>




        </div>
    );
}

export default ProductPage;
