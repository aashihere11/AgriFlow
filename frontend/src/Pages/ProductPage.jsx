import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductInfoCard from '../Components/ProductPage/ProductInfoCard';
import FarmerInfoCard from '../Components/ProductPage/FarmerInfocard';
import DeliveryInfoCard from '../Components/ProductPage/DeliveryInfoCard';
import ReviewSection from '../Components/ProductPage/ReviewSection';
import SimilarProducts from '../Components/ProductPage/SimilarProducts';
ProductInfoCard
function ProductPage() {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    const handleQtyChange = (change) => {
        setQty(prev => Math.max(1, prev + change));
    };

    return (
        <div className="min-h-screen bg-[#f4f7f4] ">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-8  bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center ">
                    <span onClick={() => navigate(-1)}
                        className="text-sm md:text-lg font-medium text-gray-500 cursor-pointer hover:text-[#2e8a48] transition-colors text-nowrap">
                        ← Products
                    </span>
                    <Link to="/" ><img src="media/logo.png" alt="logo" className=" w-60 shrink" /></Link>
                </div>
                <button onClick={() => navigate('/cart')}
                    className="flex items-center !text-4xl  font-medium  ">
                    🛒
                </button>
            </nav>

            <div className=' flex justify-center shrink grid md:grid-cols-3 grid-cols-1 gap-5 box-border  px-3 pt-5'>

                <div className='flex flex-col gap-3 shrink rounded-2xl flex items-center '>
                    <div className='flex shrink justify-center place-items-center border-2 border-[#eaf3de]  rounded-xl   bg-white' >
                        <img className="object-contain p-3" src="/media/wheat.jpg" alt="img" />
                    </div>

                    <div className="flex gap-1 flex-wrap">
                        <span className="text-[10px] md:text-base font-medium px-2 py-1.5 rounded-full bg-[#f0faf2] text-[#2e8a48] border border-[#a8e0b5]">
                            🟢 In Stock · kg left
                        </span>
                        <span className="text-[10px] md:text-base px-2 py-1.5 rounded-full bg-white text-gray-500 border border-gray-200">
                            🌾 Harvested today
                        </span>
                    </div>

                    <div className="hidden md:block bg-white border-2 border-dashed border-gray-400 rounded-xl p-5 ">
                        <p className="text-xl font-semibold tracking-widest text-gray-400 uppercase mb-2 m-0">
                            About this product
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed m-0">Freshly harvested organic tomatoes from Nashik. Grown without pesticides —
                            rich in flavor and nutrients. Perfect for salads, curries,
                            and chutneys. Picked fresh every morning and delivered the same day.</p>
                    </div>
                </div>

                <div className='grid col-span-1 md:col-span-2 grid-rows-[1fr_0.3fr_0.5fr] shrink gap-1'>
                    {/* Product Info Card */}
                    <ProductInfoCard
                        qty={qty}
                        onQtyChange={handleQtyChange}
                    />

                    {/* Farmer Info Card */}
                    <FarmerInfoCard />

                    {/* Farmer Info Card */}
                    <DeliveryInfoCard />

                </div>
            </div>

            {/* Review Section */}
            <div className=' mx-auto  p-3'>
                <ReviewSection />
                <SimilarProducts />
            </div>




        </div>
    );
}

export default ProductPage;