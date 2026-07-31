import React from 'react';
import OrderProgressBar from './OrderProgressBar';
function CustomerOrderCard({ order }) {


  return (<>
    <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">

      {/* TOP */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-800 m-0">{order.orderId}</p>
          <p className="text-xs text-gray-400 mt-1 m-0">{order.time}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap  ${order.status}`}>
          {order.status}
        </span>
      </div>

      <OrderProgressBar status={order.status} />

      {/* ITEMS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-1 bg-gray-50 rounded-lg px-3 py-1 text-xs text-gray-700">
            {item.emoji} {item.name} × {item.qty}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 m-0">
          {order.slot === "morning" ? "🌅 Morning 7–10 AM" : "🌇 Evening 5–8 PM"}
        </p>
        <p className="text-sm font-medium text-[#1a5c2e] m-0">₹{order.total}</p>
      </div>

    </div>
  </>);
}

export default CustomerOrderCard;