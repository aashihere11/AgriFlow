import React from 'react';
import axios from 'axios';

const getStockLevel = (stock) => {
  if (stock > 10) return "dot-Fresh";
  if (stock <= 10) return "dot-Update";

};

const getStockPct = (stock) => Math.min((stock / 500) * 100, 100);


function ProductCard({ setFarmerProducts, farmerProducts, onClick, product, setMode,
  setSelectedProduct, setIsModalOpen, setForm }) {

  const pct = getStockPct(product.stock);


  const handleEdit = (product) => {
    setMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
    setForm({
      _id:product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
      category: product.category,
      image: product.image.url
    });
  }

  const handleDelete = async (id) => {
    if (!window.confirm("DO YOU REALLY WANT TO DELETE THE PRODUCT")) return;

    try {
      const response = await axios.delete(`http://localhost:3000/product/delete/${id}`, { withCredentials: true });
      if (response.data.success) {
        setFarmerProducts(farmerProducts.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("deletion error", error);
    }

  }
  return (<>
    <div className='bg-[#fcf8f2] border border-[#e5dec9] rounded-2xl p-3  transition-all duration-300 flex flex-col w-full max-w-[350px]
  shadow-sm hover:shadow-md border border-gray-200/60 '>
      <div className='w-full aspect-square rounded-xl overflow-hidden bg-white border border-[#e5dec9] shadow-inner mb-3 relative' onClick={onClick} >
        <img src={product.image.url} alt="img" className="w-full h-full object-cover" />
      </div>

      {/* BODY */}
      <div className='mt-1 ml-3'>
        <p className="text-sm md:text-lg font-medium text-gray-800 m-0 ">{product.name}</p>
        <p className="text-xs md:text-base text-gray-400 mt-1 mb-2 m-0">₹{product.price}/{product.unit}</p>

        <p className="text-xs md:text-base font-medium mb-1 m-0 ">{product.stock == 0 ? "Out Of Stock" : `${product.stock} ${product.unit} left`}</p>

        <div className=" w-30 md:w-60 h-1 bg-gray-400 rounded-full overflow-hidden ">
          <div className={`h-full rounded-full ${getStockLevel(product.stock)}`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 p-3">
        <button className=" px-2 py-1.5 !text-[10px] md:!text-base font-medium text-[#2e8a48]
             bg-[#f0faf2] border border-[#a8e0b5] !rounded-lg hover:bg-[#d4f0da] transition-colors text-center text-nowrap"
          onClick={() => handleEdit(product)}>
          ✏️ Edit
        </button>
        <button className="py-1.5 px-2 !text-[10px] md:!text-xl text-[#e74c3c] bg-[#fff0ee] border border-[#f5c6c0] !rounded-lg hover:bg-[#ffe0db] transition-colors"
          onClick={() => handleDelete(product._id)}>
          🗑
        </button>
      </div>
    </div>

  </>);
}

export default ProductCard;