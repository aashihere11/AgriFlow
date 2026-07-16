import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";

function ConfirmationPage() {
    const navigate = useNavigate();
    
    return (<>
        <div className='min-h-screen flex flex-col items-center justify-center bg-[#f4f7f4]'>
            <div className="check-circle w-30 h-30 rounded-full bg-[#2e8a48] flex items-center justify-center  mb-6 ">
                <DoneIcon className='text-white ' />
            </div>

            <span className="success-title font-serif text-4xl text-[#1a5c2e] mb-2 ">
                Order placed!
            </span>
            <p className="success-sub text-base text-[#2e8a48] mb-4">
                Your fresh product is on its way
            </p>
            <p className="success-order-id text-base text-gray-400 mb-8">
                Order ID: #FD2026060612
            </p>

            <div className='success-sub border bg-[#f0faf2] border-[#a8e0b5] rounded-lg px-3 py-3  '>
                <span className=' text-base '>
                    Thank you for choosing FarmDirect!</span>
            </div>
            <div className="success-btns flex gap-3 justify-center mt-3">
                <button className="px-6 py-2.5 bg-[#2e8a48] text-white text-sm font-medium rounded-lg hover:bg-[#1a5c2e]">Track order</button>
                <button className='px-6 py-2.5 border border-[#a8e0b5] 
  text-[#2e8a48] text-sm font-medium rounded-lg hover:bg-[#f0faf2]'
                    onClick={() => navigate("/homepage")}>
                    Continue shopping</button>
            </div>
        </div>

    </>);
}

export default ConfirmationPage;