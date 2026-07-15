import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckoutSteps from '../Components/CheckoutPage/CheckoutSteps';
import DeliveryAddress from '../Components/CheckoutPage/DeliveryAddress';
import DeliverySlot from '../Components/CheckoutPage/DeliverySlot';
import OrderSummary from '../Components/CheckoutPage/OrderSummary';
function CheckoutPage() {
    const navigate = useNavigate();
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
            <div className='min-h-screen bg-[#f4f7f4] p-5'>
                <div className='flex gap-2 mb-6 items-center'>
                    <button className='border flex items-center justify-center 
                         border-gray-400 bg-white'
                        style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                        onClick={() => navigate("/cart")}>
                        <ArrowBackIcon style={{ fontSize: "18px" }} />
                    </button>
                    <p className='font-medium text-xs md:text-2xl text-[#1a5c2e] m-0'>Checkout</p>
                </div>

                {/* STEPS */}
                <CheckoutSteps />

                {/* LAYOUT */}
                <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4'>
                    {/* LEFT */}
                    <div>
                        <DeliveryAddress form={form} handleChange={handleChange} />
                        <DeliverySlot slot={slot} setSlot={setSlot} />
                    </div>

                    {/* RIGHT */}
                    <OrderSummary />
                </div>


            </div>
        </>
    );
}

export default CheckoutPage;