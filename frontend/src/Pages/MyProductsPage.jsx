import React, { useState } from 'react';
import ProductCard from '../Components/MyPage/ProductCard';
import { products } from '../data/myproducts.js';
import Modal from '../Components/MyPage/Modal.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
function MyProductsPage() {
  const initialForm = {
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "vegetables",
  };
  const [form, setForm] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  return (<>
    <div className='min-h-screen bg-[#f4f7f4] '>

      {/* TOP BAR */}
      <div className="flex items-center justify-between bg-white  ">
        <div className='flex items-center gap-3 min-w-0 max-w-50 px-3 '>
          <button onClick={() => navigate(-1)} className='!text-sm md:!text-base text-nowrap'><ArrowBackIcon />Back</button>
          <img src="media/logo.png" alt="img" />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-2 py-2 bg-[#2e8a48] text-white !text-sm md:!text-lg font-medium !rounded-lg hover:bg-[#1a5c2e] transition-colors">
          ➕ Add product
        </button>
      </div>

      <p className="font-serif text-base md:text-4xl text-[#1a5c2e] px-5 pt-3 m-0">My Products</p>

      {/* PRODUCT GRID */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3'>
        {products.map((product) =>
        (<ProductCard
          key={product.id}
          product={product}
          setMode={setMode}
          setSelectedProduct={setSelectedProduct}
          setIsModalOpen={setIsModalOpen}
          setForm={setForm}
        />

        ))}

        {/* ADD CARD */}
        <div className="bg-white border-2 border-dashed border-gray-300 
        rounded-xl min-h-[200px] flex flex-col items-center justify-center
         gap-2 cursor-pointer hover:border-[#5cba78]  transition-all">
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
        form={form}
        onClose={() => setIsModalOpen(false)} />

    </div>
  </>)
};


export default MyProductsPage;