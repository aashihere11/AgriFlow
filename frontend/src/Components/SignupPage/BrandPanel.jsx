import React from 'react';
 export default function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#1b4332] text-white p-12 relative overflow-hidden rounded-xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#40916c]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#52b788]/20 blur-3xl pointer-events-none"></div>

      {/* Brand Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-center">
          <span className=" w-60"><img src="/media/logo.png" alt="" /></span>
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-4 text-forest-100">
          Fresh, Farm-Direct <br />
          Natural Goodness to Your Door.
        </h1>
        <p className="text-[#d8f3dc]/80 text-base max-w-md font-light">
          Connect directly with local farmers. Get pure, chemical-free organic produce delivered straight from the soil to your table.
        </p>
      </div>

      {/* Value Badges */}
      <div className="relative z-10 space-y-4 my-8">
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
          <span className="text-xl">🚜</span>
          <div>
            <h4 className="font-semibold text-sm">100% Direct Sourcing</h4>
            <p className="text-xs text-[#d8f3dc]/70">Fair prices for farmers, fresher food for you.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
          <span className="text-xl">🌱</span>
          <div>
            <h4 className="font-semibold text-sm">Certified Organic</h4>
            <p className="text-xs text-[#d8f3dc]/70">Zero pesticides, 100% natural and safe.</p>
          </div>
        </div>
      </div>

      {/* Customer Review Card */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm  rounded-2xl p-3 border border-white/10">
        <p className="text-sm italic text-[#d8f3dc]/90 mb-3">
          "AgriFlow changed how our family eats. The vegetables taste real, fresh, and last so much longer!"
        </p>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#52b788] flex items-center justify-center font-bold text-xs">
            SK
          </div>
          <div>
            <p className="text-base font-semibold m-0">Sunita K.</p>
            <p className="text-sm text-[#d8f3dc]/60 m-0">Verified AgriFlow Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}