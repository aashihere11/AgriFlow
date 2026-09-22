import React from 'react';
import LeftHeroSection from '../Components/LoginPage/LeftHeroSection';
import AuthLoginSection from '../Components/LoginPage/AuthLoginSection';

function LoginPage() {

    return (
        <>

            <div className='min-h-screen bg-[#f7f9f4] flex flex-col items-center font-serif ' >
                {/* Logo */}
                <div className='bg-[#f7f9f4] text-center '>
                    <div className='flex items-center justify-center w-60'>
                        <img src="/media/logo.png" alt="img" />
                    </div>
  
                </div>
                <p className='text-sm md:text-4xl text-[#7f7f7fd6] text-center m-0 px-3 mb-3'>Better price for farmers, better quality for you</p>

                {/* Main grid */}
                <div className='grid md:grid-cols-2 gap-4 max-w-4xl px-3 '>
                    {/* ─── LEFT SIDE ─── */}
                    <LeftHeroSection />

                    {/* ─── Right SIDE ─── */}
                    <AuthLoginSection />

                </div>
                {/* STATS — mobile only */}
                <div className="flex justify-center gap-4  md:hidden ">
                    {[
                        { value: "200+", label: "Farmers" },
                        { value: "1200+", label: "Customers" },
                        { value: "Same day", label: "Delivery" },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-base font-semibold text-[#1a5c2e] m-0">{stat.value}</p>
                            <p className="text-sm text-gray-400 m-0">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default LoginPage;