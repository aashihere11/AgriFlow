import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/MyPage/ProductCard';
import Modal from '../Components/MyPage/Modal.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function MyProductsPage() {
  const initialForm = {
    name: "",
    description: "",
    stock: "",
    price: "",
    unit: "kg",
    category: "vegetables",
    image: ""
  };
  const [form, setForm] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const isFormValid =
    form.name &&
    form.description &&
    form.stock &&
    form.price &&
    form.image;
    
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const farmerId = user.user._id;

  useEffect(() => {
    const fetchFarmerProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/farmer/${farmerId}`, { withCredentials: true });

        if (response.data.success) {
          setFarmerProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchFarmerProducts();
    }
  }, [farmerId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
      </div>
    );
  }


  return (<>
    <div className='min-h-screen bg-[#f4f7f4] '>

      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7] flex items-center justify-between
       px-2 bg-white border-b border-gray-100 sticky top-0 z-10 h-30 ">
        <div>
          <img src="media/logo.png" alt="img" className='w-70 h-auto' />
        </div>
        
      </div>


      {/* PRODUCT GRID */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3'>
        {farmerProducts.map((product) =>
        (<ProductCard
          onClick={() => navigate(`/product/${product._id}`)}
          key={product._id}
          product={product}
          setMode={setMode}
          setSelectedProduct={setSelectedProduct}
          setIsModalOpen={setIsModalOpen}
          setForm={setForm}
          setFarmerProducts={setFarmerProducts}
          farmerProducts={farmerProducts}
        />

        ))}

        {/* ADD CARD */}
        <div className="flex items-center justify-center bg-[#fcf8f2] border border-[#e5dec9] rounded-2xl p-3  transition-all duration-300 flex flex-col w-full max-w-[350px]
  shadow-sm hover:shadow-md border border-gray-200/60">
          <div className="w-10 h-10 rounded-full bg-[#f0faf2] border 
          border-[#a8e0b5] flex items-center justify-center text-xl"
            onClick={() => {
              setIsModalOpen(true);
              setForm(initialForm);
            }}>
            ➕
          </div>
          <p className="text-xs text-gray-400 m-0">Add new product</p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        mode={mode}
        product={selectedProduct}
        isOpen={isModalOpen}
        setForm={setForm}
        isFormValid={isFormValid}
        form={form}
        onClose={() => setIsModalOpen(false)}
         setFarmerProducts={setFarmerProducts}
          farmerProducts={farmerProducts}
          loading={loading}
          setLoading={setLoading} />

    </div>
  </>)
};


export default MyProductsPage;