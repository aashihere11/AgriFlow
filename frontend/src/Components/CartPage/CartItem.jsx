import React from 'react';
function CartItem({ item, Checked, onCheck, onQtyChange, onDelete, navigate }) {
  console.log(item);

  return (
    <div className={`flex items-center gap-3 py-3 border-b border-gray-100 last:border-none transition-opacity  ${!Checked ? "opacity-40" : ""}`}>

      {/* CHECKBOX */}
      <input
        type="checkbox"
        checked={Checked}
        onChange={() => onCheck(item.product._id)}
        className="w-4 h-4 accent-[#2e8a48] cursor-pointer flex-shrink-0"
      />

      {/* IMAGE */}
      <div className="w-20 h-20 md:w-40 md:h-40 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        onClick={() => navigate(`/product/${item.product._id}`)}>
        <img className="object-contain p-3" src={item.product.image.url} alt="img" />
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] md:text-lg font-medium text-gray-800 m-0 mb-2">{item.product.name}</p>
        <p className="text-[10px] md:text-base text-gray-400 mt-0.5 m-0">₹{item.price} / {item.product.unit}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <button
            onClick={() => onQtyChange(item.product._id, -1, item.quantity)}
            disabled={!Checked}
            className="w-5 h-5 md:w-7 md:h-7 !rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            −
          </button>
          <span className="text-xs md:text-base font-medium text-gray-800 min-w-[16px] text-center">{item.quantity}</span>
          <button
            onClick={() => onQtyChange(item.product._id, 1, item.quantity)}
            disabled={!Checked}
            className="w-5 h-5  md:w-7 md:h-7 !rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            +
          </button>
          <button
            onClick={() => onDelete(item.product?._id || item.product)}
            className="w-5 h-5  md:w-7 md:h-7 rounded-full border border-red-800 bg-red-50 flex items-center justify-center text-[10px] hover:bg-red-100 transition-colors ml-1">
            🗑
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right mr-3">
        <p className="text-sm md:text-base font-semibold text-[#1a5c2e] m-0">₹{item.price * item.quantity}</p>
        <p className="text-[10px] md:text-sm text-gray-400 m-0">{item.quantity} {item.product.unit}</p>
      </div>

    </div>
  );
}

export default CartItem;