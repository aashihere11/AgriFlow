import React from 'react';
function DeliveryInfoCard() {
     const items = [
        { icon: "🚚", title: "Today by 7 PM", sub: "Order before 10 AM" },
        { icon: "📦", title: "Free Delivery", sub: "On orders ₹499+" },
        { icon: "🔄", title: "Easy Return", sub: "Not fresh? Refund" },
    ];
    return (

        <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-[10px] md:text-lg font-semibold tracking-widest text-gray-400 uppercase text-center mb-3 m-0">
                Delivery info
            </p>
            <div className="grid grid-cols-3 gap-1">
                {items.map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl text-center">
                        <div className="text-xl md:text-4xl mb-1">{item.icon}</div>
                        <p className="text-[8px] md:text-base font-medium text-gray-800 m-0">{item.title}</p>
                        <p className="text-[8px] md:text-base text-gray-400 mt-1 m-0">{item.sub}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-3 bg-[#f0faf2] rounded-lg py-2 text-xs md:text-lg text-[#2e8a48]">
                📍 delivery.location
            </div>
        </div>
    );
}

export default DeliveryInfoCard;