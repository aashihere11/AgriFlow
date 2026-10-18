import React from 'react';


export default function MediaCard({ product, onClick }) {

  return (
  <div className="bg-[#fcf8f2] border border-[#e5dec9] rounded-2xl p-3  transition-all duration-300 flex flex-col w-full max-w-[300px]
  shadow-sm hover:shadow-md border border-gray-200/60"
  onClick={onClick} style={{ cursor: "pointer" }}>
      
      {/* IMAGE CONTAINER - aspect-square se image bilkul crop nahi hogi aur poori dikhegi */}
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-[#e5dec9] shadow-inner mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* BODY */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name (Uppercase & Bold like reference) */}
          <span className="text-sm md:text-lg font-bold text-gray-900 tracking-wide uppercase line-clamp-1 m-0 mb-1">
            {product.name}
          </span>

          {/* Farmer Name & Location with icons */}
          <p className="text-[11px] md:text-base text-gray-600 flex items-center gap-1.5 m-0 mb-3 truncate">
            <span>👤 {product.farmer?.name || "Rahul"}</span>
            {product.farmer?.location && (
              <>
                <span>•</span>
                <span>📍 {product.farmer.location}</span>
              </>
            )}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[8px] md:text-sm font-bold bg-[#607c49] text-white px-2.5 py-1 rounded-lg shadow-sm">
            ₹{product.price} / {product.unit || 'kg'}
          </span>
          
          <button className="w-7 h-7 rounded-lg bg-[#e8e2d0] text-gray-800 hover:bg-[#607c49] hover:text-white flex 
          items-center justify-center font-bold text-sm transition-colors shadow-sm">
            +
          </button>
        </div>
      </div>

    </div>
  )
}


