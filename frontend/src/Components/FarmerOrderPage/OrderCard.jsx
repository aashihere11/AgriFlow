import React from 'react';

const nextStatus = {
  Pending: { label: "📦 Mark as Packed", next: "Packed" },
  Packed: { label: "🚚 On The Way", next: "On The Way" },
  "On The Way": { label: "✅ Mark as Delivered", next: "Delivered" },
  Delivered: null,
};

function OrderCard({ order, handleStatusUpdate }) {
  const dateObj = new Date(order.createdAt);
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const consumer = order.shippingAddress;

  return (
    <div className='p-2'>
      <div className="bg-white border border-gray-200 rounded-xl p-3">

        {/* TOP — ORDER ID + OVERALL STATUS */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm md:text-base font-medium text-gray-800 m-0">{order._id}</p>
            <p className="text-xs md:text-base text-gray-400 m-0">{time}</p>
          </div>
        </div>

        {/* ITEMS WITH INDIVIDUAL STATUS & BUTTONS */}
        <div className="flex flex-col gap-3 mb-3">
          {order?.orderItems?.map((item, i) => {
            const itemAction = nextStatus[item.status || 'Pending'];
            const itemStatusClass = item.status.toLowerCase().replace(/\s+/g, '-');

            return (
              <div key={item._id || i} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-xs md:text-base text-gray-700">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt="" className='w-12 h-12 object-cover rounded' />
                  <div>
                    <p className="m-0 text-sm md:text-base font-medium">{item.name} × {item.quantity} {item.unit}</p>
                    <span className={`text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-semibold ${itemStatusClass}`}>
                      {item.status || 'Pending'}
                    </span>
                  </div>
                </div>

                {itemAction ? (
                  <button
                    className="px-1 py-1.5 !text-xs md:!text-base font-medium bg-[#2e8a48] text-white !rounded-lg hover:bg-[#256f3a]"
                    onClick={() => handleStatusUpdate(order._id, item._id, itemAction.next)}>
                    {itemAction.label}
                  </button>
                ) : (
                  <span className="text-xs text-green-600 font-medium">✅ Delivered</span>
                )}
              </div>
            );
          })}
        </div>

        {/* CONSUMER INFO + TOTAL */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-800 m-0">{consumer?.fullName}</p>
            <p className="text-xs text-gray-400 m-0">📍 {consumer?.address}, {consumer?.city}</p>
            <p className="text-xs text-gray-400 m-0">📞 {consumer?.phone}</p>
          </div>
          <p className="text-sm md:text-base font-medium text-[#1a5c2e] m-0">₹{order.totalAmount}</p>
        </div>

      </div>
    </div>
  );
}

export default OrderCard;