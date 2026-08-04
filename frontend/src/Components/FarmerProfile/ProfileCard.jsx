import React from 'react';
function ProfileCard({ title, rows, onEdit }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-xl"
            style={{ background: "linear-gradient(135deg, #e8f4fd, #fff)" }}>

            <div className="flex items-center justify-between mb-3">
                <p className="text-xs md:text-xl font-medium text-gray-800 m-0">{title}</p>
                <button
                    className="text-xs md:!text-base font-medium text-[#2e8a48] 
                   bg-[#f0faf2] border border-[#a8e0b5] rounded-lg px-3 py-1"
                    onClick={onEdit}>
                    ✏️ Edit
                </button>
            </div>

            {rows.map((row, index) => (
                <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-none">
                    <span className="text-sm md:text-lg w-6 flex-shrink-0">{row.icon}</span>
                    <div>
                        <p className="text-xs md:text-lg text-gray-400 m-0">{row.label}</p>
                        <p className="text-xs md:text-lg font-medium text-gray-800 m-0 mt-0.5">{row.value}</p>
                    </div>
                </div>
            ))}

        </div>);
}

export default ProfileCard;