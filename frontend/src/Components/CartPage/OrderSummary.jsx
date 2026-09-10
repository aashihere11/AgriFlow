import React,{useState} from 'react';
 function OrderSummary() {
      const [promo, setPromo] = useState("");
    return ( 
         <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20">
      <p className="text-sm md:text-4xl font-serif font-medium text-gray-800 mb-4 m-0">Order summary</p>
 
      {/* PROMO */}
      <div className="flex gap-2 mb-4">
        <input
          value={promo}
          onChange={e => setPromo(e.target.value)}
          placeholder="Promo code"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#5cba78]"
        />
        <button className="px-4 py-2 bg-[#f0faf2] border border-[#a8e0b5] rounded-xl text-sm text-[#2e8a48] font-medium hover:bg-[#d4f0da] transition-colors">
          Apply
        </button>
      </div>
 
      <div className="flex justify-between text-sm md:text-base text-gray-500 mb-2">
        <span>Subtotal </span>
        <span>₹</span>
      </div>
      <div className="flex justify-between text-sm md:text-base  text-gray-500 mb-2">
        <span>Delivery</span>
        <span className="text-[#2e8a48]">Free</span>
      </div>
      <div className="flex justify-between text-sm md:text-base  text-gray-500 mb-2">
        <span>Platform fee</span>
        <span>₹0</span>
      </div>
      <div className="flex justify-between text-base font-semibold text-gray-800 border-t border-gray-100 pt-3 mt-2">
        <span>Total</span>
        <span className="text-[#1a5c2e]">₹</span>
      </div>
 
      <div className="bg-[#f0faf2] border border-[#a8e0b5] rounded-xl py-2.5 text-xs md:text-base  text-[#2e8a48] text-center my-4">
        🌿 Saving ₹savings vs supermarket prices
      </div>
 
      <button
        // onClick={onCheckout}
        // disabled={selectedItems.length === 0}
        className="w-full py-3 bg-[#2e8a48] hover:bg-[#1a5c2e] text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Proceed to checkout →
      </button>
      <button className="w-full py-2.5 bg-transparent border border-gray-200 text-gray-500 text-sm rounded-xl mt-2 hover:bg-gray-50 transition-colors">
        ← Continue shopping
      </button>
 
      {/* TRUST BADGES */}
      <div className="flex justify-center gap-5 mt-4">
        {[
          { icon: "🔒", label: "Secure" },
          { icon: "🚚", label: "Fast delivery" },
          { icon: "🌿", label: "100% fresh" },
        ].map(badge => (
          <div key={badge.label} className="text-center">
            <div className="md:text-xl">{badge.icon}</div>
            <p className="text-[10px] md:text-base text-gray-400 mt-1 m-0">{badge.label}</p>
          </div>
        ))}
      </div>
    </div>
     );
 }
 
 export default OrderSummary;