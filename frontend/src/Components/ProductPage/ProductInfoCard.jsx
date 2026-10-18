import React from 'react';
import { useAuth } from '../../context/AuthContext';

function ProductInfoCard({ qty, onQtyChange, product }) {
  const formatPrice = (amount) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

  const total = (Number(product.price) || 0) * qty;
  const availableStock = Math.max(0, Number(product.stock) || 0);
  const isOutOfStock = availableStock === 0;

  const user = useAuth();
  const role = user.user.role;


  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">
      <h1 className="font-serif text-base md:text-2xl text-[#1a5c2e] mb-1">{product.name}</h1>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-base md:text-2xl font-semibold text-[#1a5c2e]">
          {formatPrice(product.price)} {product.unit}
        </span>
      </div>


      <div className="h-px bg-gray-100 my-3" />

      <div className="flex items-center justify-between">
        <span className="text-sm md:text-lg text-gray-500">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onQtyChange(-1)}
            disabled={qty <= 1}
            className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-lg text-[#2e8a48] hover:bg-[#f0faf2] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>
          <span className="text-lg font-medium text-gray-800 min-w-[24px] text-center">{qty}</span>
          <button
            type="button"
            onClick={() => onQtyChange(1)}
            disabled={isOutOfStock || qty >= availableStock}
            className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-lg text-[#2e8a48] hover:bg-[#f0faf2] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#f0faf2] rounded-xl px-4 py-3 mt-3">
        <span className="text-xs md:text-lg text-gray-500">Total</span>
        <span className="text-xs md:text-base font-semibold text-[#1a5c2e]">{formatPrice(total)}</span>
      </div>
      {role !== 'farmer' && (
        <button
          type="button"
          disabled={isOutOfStock}
          className="w-full py-3 bg-[#2e8a48] hover:bg-[#1a5c2e] text-white text-sm font-medium rounded-xl transition-colors mt-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart 🛒
        </button>)}
      {role !== 'farmer' && (
        <button className="w-full py-2.5 bg-transparent border border-gray-200 text-gray-500 text-sm rounded-xl mt-2 hover:bg-gray-50 transition-colors">
          Save for Later
        </button>)}

    </div>
  );
}

export default ProductInfoCard;
