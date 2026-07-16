import { orderItems } from "../../data/checkoutpage";
import { useNavigate } from "react-router-dom";
function OrderSummary() {
  const navigate = useNavigate();
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const savings = Math.round(subtotal * 0.33);
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
        <h2 className="text-sm font-medium text-gray-800 mb-4">Order summary</h2>

        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-none">
            <div className="w-15 h-15 rounded-lg flex items-center justify-center mb-2">
              {item.emoji}
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-gray-800 m-0">{item.name}</p>
              <p className="text-base text-gray-400 m-0">{item.detail}</p>

            </div>
            <p className="text-base font-medium text-[#1a5c2e] m-0">₹{item.price}</p>
          </div>
        ))}

        <div className="mt-3">
          <div className="flex justify-between text-base text-gray-500 mb-2">
            <span>Subtotal</span><span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-base text-gray-500 mb-2">
            <span>Delivery</span><span className="text-[#2e8a48]">Free</span>
          </div>
          <div className="flex justify-between text-base text-gray-500 mb-2">
            <span>Platform fee</span><span>₹0</span>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-800 border-t border-gray-100 pt-3 mt-2">
            <span>Total</span><span className="text-[#1a5c2e]">₹{subtotal}</span>
          </div>
        </div>

        <div className="bg-[#f0faf2] border border-[#a8e0b5] rounded-lg p-2 text-base text-[#1a5c2e] text-center my-3">
          🌿 Saving ₹{savings} vs supermarket prices
        </div>

        <button

          className="w-full py-3 bg-[#2e8a48] hover:bg-[#1a5c2e] text-white text-base font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => navigate("/confirmationpage")}>
          🔒 Pay₹{subtotal} securely
        </button>

        <p className="text-center text-base text-gray-400 mt-2 m-0" >
          🛡️ Powered by <span className="font-medium text-gray-500">Razorpay</span>
        </p>
      </div>
    </>
  );
}

export default OrderSummary;