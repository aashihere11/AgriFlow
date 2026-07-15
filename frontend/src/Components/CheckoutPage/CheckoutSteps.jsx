function CheckoutStep() {
  return (<>
    <div className="flex items-center gap-2 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#f0faf2] border border-[#a8e0b5] text-xs
           flex items-center justify-center md:text-lg text-[#2e8a48]">
          ✓
        </div>
        <span className="text-lg text-gray-500">Cart</span>
      </div>
      <div className="flex-1 h-px bg-gray-200" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#2e8a48] flex items-center justify-center text-xs md:text-lg text-white font-medium">
          2
        </div>
        <span className="text-xs md:text-lg text-[#1a5c2e] font-medium">Checkout</span>
      </div>
      <div className="flex-1 h-px bg-gray-200" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs md:text-lg text-gray-400">
          3
        </div>
        <span className="text-xs md:text-lg text-gray-400">Confirmation</span>
      </div>
    </div>

  </>);
}

export default CheckoutStep;