import React from 'react';


export default function MediaCard({ product }) {

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl overflow-hidden 
        cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}>
      {/* IMAGE */}
      <div className="p-3 pb-0 ">
        <div className=" rounded-xl flex items-center justify-center overflow-hidden ">
          <img src="media/wheat.jpg" alt="img" />
        </div>

      </div>

      {/* BODY */}
      <div className="p-3 pt-1 ">
        <p className="text-[7px] md:text-xl font-medium text-gray-800 m-0">{product.name}</p>
        <p className="text-[7px] md:text-lg text-gray-400 mt-0.5 mb-2 m-0">{product.farmer}</p>
        <div className="flex items-center justify-between">
          <p className="text-[7px] md:text-base font-semibold text-[#1a5c2e] m-0">₹{product.price} / {product.unit}</p>
          <button className="w-3 h-3 md:w-7 md:h-7 rounded-full text-gray-400 hover:bg-black 
          hover:text-white flex items-center justify-center text-lg transition-colors">
            +
          </button>
        </div>
      </div>
    </div>
  )
}


