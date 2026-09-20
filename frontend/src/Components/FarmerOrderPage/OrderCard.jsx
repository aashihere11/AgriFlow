import React from 'react';
import { nextStatus } from '../../data/Ordersdata';
function OrderCard({ order }) {
  const action = nextStatus[order.status];
  console.log(action);
  return (<>
    <div className='p-2'>
      <div className="bg-white border border-gray-200 rounded-xl p-3">

        {/* TOP — ORDER ID + STATUS */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm md:text-base font-medium text-gray-800 m-0">{order.orderId}</p>
            <p className="text-xs md:text-base text-gray-400 m-0">{order.time}</p>
          </div>
          <span className={`text-[10px]  md:text-base  font-medium px-2 py-1 rounded-full text-center ${order.status} `}>
            {order.status}
          </span>
        </div>

        {/* ITEMS */}
        <div className="flex flex-wrap gap-2 mb-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-1 bg-gray-50 rounded-lg px-3 py-1 text-xs  md:text-base  text-gray-700">
              {item.emoji} {item.name} × {item.qty}
            </div>
          ))}
        </div>


        {/* CONSUMER INFO + TOTAL */}
        <div className="flex items-end hidden sm:flex justify-between mb-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base font-medium text-gray-800 m-0">{order.consumer.name}</p>
            <p className="text-xs md:text-base text-gray-400 m-0">
              📍 {order.consumer.address}, {order.consumer.city}, {order.consumer.pincode}
            </p>
            <p className="text-xs md:text-base  text-gray-400 m-0">
              📞 {order.consumer.phone}
            </p>
            <p className="text-xs md:text-base  text-gray-400 m-0">
              {order.consumer.slot === "morning" ? "🌅 Morning 7–10 AM" : "🌇 Evening 5–8 PM"}
            </p>
          </div>
          <p className="text-sm md:text-base font-medium text-[#1a5c2e] m-0">₹{order.total}</p>
        </div>

        {action && (
          <div className="flex items-center justify-center border-t border-gray-100 pt-3 place-items-baseline">
            <button
              className="w-50 py-2 !text-xs md:!text-base  font-medium text-white bg-[#2e8a48] hover:bg-[#1a5c2e] !rounded-lg transition-colors"
            >
              {action.label}
            </button>
          </div>

        )}

        {/* DELIVERED — no button */}
        {!action && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs md:text-base font-medium text-[#2e8a48] text-center m-0">✅ Order completed</p>
          </div>
        )}

      </div>
    </div>
  </>);
}

export default OrderCard;