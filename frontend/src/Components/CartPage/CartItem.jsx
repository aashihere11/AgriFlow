import React from 'react';
function CartItem({ key, item, Checked, onCheck }) {

  return (
    <div className={`flex items-center gap-3 py-3 border-b border-gray-100 last:border-none transition-opacity  ${!Checked ? "opacity-40" : ""}`}>

      {/* CHECKBOX */}
      <input
        type="checkbox"
        checked={Checked}
        onChange={() => onCheck(item.id)}
        className="w-4 h-4 accent-[#2e8a48] cursor-pointer flex-shrink-0"
      />

      {/* IMAGE */}
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: item.bg }}>
        {item.emoji}
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-base font-medium text-gray-800 m-0">{item.name}</p>
        <p className="text-xs md:text-base text-gray-400 mt-0.5 m-0">₹{item.price} / {item.unit}</p>
        <p className="text-[10px] md:text-sm text-[#2e8a48] mt-0.5 m-0">🟢 Fresh — {item.freshLabel}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <button
            // onClick={() => onQtyChange(item.id, -1)}
            className="w-5 h-5 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            −
          </button>
          <span className="text-xs font-medium text-gray-800 min-w-[16px] text-center">{item.qty}</span>
          <button
            //  onClick={() => onQtyChange(item.id, 1)}
            className="w-5 h-5 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-[#2e8a48] hover:bg-[#f0faf2] transition-colors">
            +
          </button>
          <button
            //  onClick={() => onDelete(item.id)}
            className="w-5 h-5 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-[10px] hover:bg-red-100 transition-colors ml-1">
            🗑
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right flex-shrink-0 mr-3">
        <p className="text-sm md:text-base font-semibold text-[#1a5c2e] m-0">₹{item.price * item.qty}</p>
        <p className="text-[10px] md:text-sm text-gray-400 m-0">{item.qty} {item.unit}</p>
      </div>

    </div>
  );
}

export default CartItem;