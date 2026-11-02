function DeliveryAddress({ form, handleChange }) {
  return (
    <>

      {/* LEFT */}

      {/* SECTION 1 — ADDRESS */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 gap-4">
        <div className="text-sm font-medium text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-[#f0faf2] border border-[#a8e0b5] flex 
              items-center justify-center text-sm md:text-base text-[#2e8a48] font-medium">1</span>
          <p className="text-sm md:text-base font-medium text-[#2e8a48] m-0"> Delivery address</p>
        </div>


        <div className="flex flex-col gap-1">
          <label className="text-xs md:text-base text-gray-500">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange}
            className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]" />
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label className="text-xs md:text-base text-gray-500">Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]" />
        </div>


        <div className="flex flex-col gap-1 mt-3">
          <label className="text-xs md:text-base text-gray-500">Address (optional)</label>
          <input type="text" name="address" value={form.address} onChange={handleChange}
            placeholder="Area, Landmark"
            className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-base text-gray-500">City</label>
            <input type="text" name="city" value={form.city} onChange={handleChange}
              placeholder="Mumbai"
              className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-base text-gray-500">Pincode</label>
            <input name="pinCode" value={form.pinCode} onChange={handleChange}
              placeholder="400001"
              className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]" />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label className="text-xs md:text-base text-gray-500">State</label>
          <select name="state" value={form.state}
            className="px-2 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78] bg-white">
            <option>Maharashtra</option>
            <option>Madhya Pradesh</option>
            <option>Karnataka</option>
            <option>Gujarat</option>
            <option>Rajasthan</option>
          </select>
        </div>
      </div>





    </>
  );
}

export default DeliveryAddress;