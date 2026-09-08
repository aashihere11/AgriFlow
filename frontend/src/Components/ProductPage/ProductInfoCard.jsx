import React from 'react';
function ProductInfoCard({ qty, onQtyChange}) {
    return (
        
           <div className="bg-white border border-gray-200 rounded-xl p-3">
      <h1 className="font-serif text-base md:text-2xl text-[#1a5c2e] mb-1">tomato</h1>
      <p className="text-xs md:text-sm text-gray-400 mb-3 m-0">per product.unit · Harvested today</p>
 
      <div className="flex items-center gap-3 mb-3">
        <span className=" text-base md:text-2xl font-semibold text-[#1a5c2e]">₹price</span>
        <span className="text-xs md:text-sm text-gray-400 line-through">₹oldPrice</span>
        <span className="text-xs md:text-sm font-medium bg-[#f0faf2] text-[#2e8a48] border border-[#a8e0b5] rounded-full px-3 py-1">
          20% off
        </span>
      </div>
 
      <div className="h-px bg-gray-100 my-3"/>
 
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-lg text-gray-500">Quantity</span>
        <div className="flex items-center gap-3">
          <button onClick={() => onQtyChange(-1)}
            className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-lg text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            −
          </button>
          <span className="text-lg font-medium text-gray-800 min-w-[24px] text-center">{qty}</span>
          <button onClick={() => onQtyChange(1)}
            className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-lg text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            +
          </button>
        </div>
      </div>
 
      <div className="flex justify-between items-center bg-[#f0faf2] rounded-xl px-4 py-3 mt-3">
        <span className="text-xs md:text-lg text-gray-500">Total</span>
        <span className="text-xs md:text-base font-semibold text-[#1a5c2e]">₹total</span>
      </div>
 
      <button className="w-full py-3 bg-[#2e8a48] hover:bg-[#1a5c2e] text-white text-sm font-medium rounded-xl transition-colors mt-3">
        🛒 Add to Cart
      </button>
      <button className="w-full py-2.5 bg-transparent border border-gray-200 text-gray-500 text-sm rounded-xl mt-2 hover:bg-gray-50 transition-colors">
        🤍 Save for Later
      </button>
    </div>
  );
}

export default ProductInfoCard;