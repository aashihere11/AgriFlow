import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckoutSteps from '../Components/CheckoutPage/CheckoutSteps';
import DeliveryAddress from '../Components/CheckoutPage/DeliveryAddress';
import DeliverySlot from '../Components/CheckoutPage/DeliverySlot';
import OrderSummary from '../Components/CheckoutPage/OrderSummary';

function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartData = location.state;
    if (!cartData || (!cartData?.fromCart && !cartData?.isDirectBuy)) {
        return navigate('/cart');
    }


    const checkoutItems = location.state?.checkoutItems || [];

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "Maharashtra",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [slot, setSlot] = useState("morning");

    return (
        <>
            <div className='min-h-screen bg-[#f4f7f4] '>
                <nav className="bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7]  flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10 h-24 p-3">

                    <a href="/" className="w-70">
                        <img src="media/logo.png" alt="logo" />
                    </a>


                    {/* Secure badge */}
                    <span className="text-xs md:text-lg text-gray-400 flex items-center text-nowrap">
                        🔒 Secure checkout
                    </span>
                </nav>

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
                    <OrderSummary checkoutItems={checkoutItems} />
                </div>


            </div>
        </>
    );
}

export default CheckoutPage;