import React from 'react';
function FarmerInfoCard() {
    return (


        <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-[10px] md:text-lg font-semibold tracking-widest text-gray-400 uppercase mb-3 m-0">
                Sold by farmer
            </p>

            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#f0faf2] border-2 border-[#a8e0b5] flex items-center justify-center text-base font-semibold text-[#2e8a48] flex-shrink-0">
                    A
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm md:text-lg font-medium text-gray-800 m-0">farmer.name</p>

                        <span className="text-[10px] md:text-base text-[#2e8a48] bg-[#f0faf2] border border-[#a8e0b5] rounded-full px-2 py-0.5">
                            ✓ Verified
                        </span>

                    </div>
                    <p className="text-xs md:text-base text-gray-400 mt-0.5 m-0">📍 farmer.location</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
                {[
                    { label: "Rating", value: 4.9 },
                    { label: "Orders", value: 240 },
                    { label: "Selling", value: 2023 },
                    { label: "Method", value: "organic method" },
                ].map(stat => (
                    <div key={stat.label}>
                        <p className="text-[10px] md:text-lg text-gray-400 m-0">{stat.label}</p>
                        <p className="text-xs md:text-base font-medium text-gray-800 mt-0.5 m-0">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default FarmerInfoCard;