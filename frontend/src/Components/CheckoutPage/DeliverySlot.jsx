function DeliverySlot({ slot, setSlot }) {
  return (<>
    {/* SECTION 2 — DELIVERY SLOT */}
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-sm font-medium text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#f0faf2] border border-[#a8e0b5] flex items-center justify-center text-sm md:text-base text-[#2e8a48] font-medium">2</span>
        <p className="text-sm md:text-base font-medium m-0 text-[#2e8a48]"> Delivery time slot</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div
          onClick={() => setSlot("morning")}
          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm md:text-base transition-all
                  ${slot === "morning" ? "border-[#5cba78] bg-[#f0faf2] text-[#1a5c2e]" : "border-gray-200 text-gray-600"}`}
        >
          🌅 Morning 7–10 AM
        </div>
        <div
          onClick={() => setSlot("evening")}
          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm md:text-base transition-all
                  ${slot === "evening" ? "border-[#5cba78] bg-[#f0faf2] text-[#1a5c2e]" : "border-gray-200 text-gray-600"}`}
        >
          🌇 Evening 5–8 PM
        </div>
      </div>

      <div className="bg-[#f0faf2] border border-[#a8e0b5] rounded-lg p-3 text-xs md:text-base text-[#1a5c2e]
             flex items-center justify-center gap-2">
        🚚 Estimated delivery: Tomorrow, {slot === "morning" ? "7–10 AM" : "5–8 PM"} — direct from farm to your door
      </div>
    </div>

  </>);
}

export default DeliverySlot;