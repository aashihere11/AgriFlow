import React, { useState } from 'react';
import OrderProgressBar from './OrderProgressBar';
import ReviewModal from '../ReviewModal';
function CustomerOrderCard({ order }) {
  const [reviewTarget, setReviewTarget] = useState(null);

  const getProgressWidth = (status) => {
    switch (status) {
      case 'Placed': return 'w-[25%]';
      case 'Packed': return 'w-[50%]';
      case 'On The Way': return 'w-[75%]';
      case 'Delivered': return 'w-[100%]';
      default: return 'w-[10%]';
    }
  };
  const statusClass = order.overallStatus ? order.overallStatus.toLowerCase().replace(/\s+/g, '-') : '';

  return (<div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between space-y-1 mb-4">
    <div>
      {/* Top Progress Bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
        <div className={`bg-emerald-600 h-full transition-all duration-500 ${getProgressWidth(order.overallStatus)} ${statusClass}`}></div>
      </div>

      {/* Header: Order ID & Badges */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="font-bold text-gray-800 text-xs md:text-sm tracking-wide">
            order id : {order._id}
          </span>
          <p className="text-xs text-gray-400 mt-0.5">
            {order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:56 PM'}
          </p>
        </div>

        <div className="flex gap-1.5">
          {order.isPartialDelivery && (
            <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-100">
              Partial Delivery
            </span>)}
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClass}`}>
            {order.overallStatus || 'Placed'}
          </span>
        </div>
      </div>

      <OrderProgressBar status={order.overallStatus} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {order.orderItems && order.orderItems.map((item, idx) => {
          const itemStatusClass = item.status.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={idx} className="border border-gray-100 bg-gray-50/50 rounded-xl p-2.5 flex items-center gap-3 relative">
              <img
                src={item.image || 'https://via.placeholder.com/100'}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate m-0">
                  {item.name} × {item.quantity} {item.unit || ''}
                </p>
                <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                  {item.farmer.username || 'Farmer'} 👤
                </p>
              </div>
              <div>
                <p className={`border text-[10px] text-center -semibold px-1 m-0 py-0.5 rounded-md ${itemStatusClass}`}>
                  {item.status || 'Pending'}
                </p>
                <button className='!text-[10px] font-bold text-yellow-400'
                  onClick={() => setReviewTarget({ orderId: order._id, item })}>leave a review</button>
              </div>
            </div>
          )
        })}
      </div>
      <ReviewModal
        isOpen={Boolean(reviewTarget)}
        onClose={() => setReviewTarget(null)}
        orderId={reviewTarget?.orderId}
        order={reviewTarget?.item}
      />
    </div>

    {/* Footer: Delivery Slot & Total Price */}
    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
        {order.slot || '🌅 Morning 7–10 AM'}
      </span>
      <span className="text-sm font-bold text-gray-800">
        Paid <span className="text-emerald-700 font-extrabold">₹{order.totalAmount}</span>
      </span>
    </div>
  </div>
  );
}

export default CustomerOrderCard;