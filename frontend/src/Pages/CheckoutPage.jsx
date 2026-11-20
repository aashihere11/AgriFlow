import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from '../Components/CheckoutPage/CheckoutSteps';
import DeliveryAddress from '../Components/CheckoutPage/DeliveryAddress';
import DeliverySlot from '../Components/CheckoutPage/DeliverySlot';
import OrderSummary from '../Components/CheckoutPage/OrderSummary';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../Components/Navbar';



function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = location.state;
  const user = useAuth();
  if (!cartData || (!cartData?.fromCart && !cartData?.isDirectBuy)) {
    return navigate('/cart');
  }

  const checkoutItems = location.state?.checkoutItems || [];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
    state: "Maharashtra",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.fullName?.trim() &&
    form.phone?.trim() &&
    form.address?.trim() &&
    form.city?.trim() &&
    form.pinCode?.trim() &&
    form.state?.trim();

  const handlePayment = async () => {

    try {
      const { data } = await axios.post('http://localhost:3000/create-order', { checkoutItems }, { withCredentials: true });

      if (!data.success) {
        alert('Server error. Failed to create order.');
        return;
      }

      const order = data.order;
      console.log(order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Test Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

          };

          const verifyRes = await axios.post('http://localhost:3000/payment/verify', { verifyData, checkoutItems, form, slot }, { withCredentials: true });

          if (verifyRes.data.success) {
            navigate(`/order-success?orderId=${response.razorpay_order_id}`);
          } else {
            alert("Verification Failed!");
          }
        },
        prefill: {
          name: user.username,
          email: user.email,
          contact: user.phone
        }
      };

      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();

    } catch (error) {
      console.error("Payment error:", error);
      console.log("error");
      alert("Something went wrong!");
    }
  };


  const [slot, setSlot] = useState("morning");

  return (
    <>
      <div className='min-h-screen bg-[#f4f7f4] '>
        <Navbar rightContent={<span className="text-xs md:text-lg text-gray-400 flex items-center text-nowrap">🔒 Secure checkout</span>} />

        {/* STEPS */}
        <CheckoutSteps />

        {/* LAYOUT */}
        <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 p-3'>
          {/* LEFT */}
          <div>
            <DeliveryAddress form={form} handleChange={handleChange} />
            <DeliverySlot slot={slot} setSlot={setSlot} />
          </div>

          {/* RIGHT */}
          <OrderSummary checkoutItems={checkoutItems}
            handlePayment={handlePayment}
            isValid={isValid}
          />
        </div>


      </div>
    </>
  );
}

export default CheckoutPage;
