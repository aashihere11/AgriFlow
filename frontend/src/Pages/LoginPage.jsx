import React from 'react';
import LeftHeroSection from '../Components/LoginPage/LeftHeroSection';
import AuthLoginSection from '../Components/LoginPage/AuthLoginSection';

function LoginPage() {

    return (
        <>

            <div className='bg-[#f7f9f4] flex flex-col items-center font-serif min-h-full' >
                {/* Logo */}
                <div className='bg-[#f7f9f4] text-center '>
                    <div className='flex items-center justify-center'>
                           <img  src="/media/logo.png" alt="img" style={{ width: "20%" }} />
                    </div>
                 
                    <h3 style={{ color: "rgba(127, 127, 127, 0.84)" }}>Better price for farmers, better quality for you</h3>
                </div>

                {/* Main grid */}
                <div className='grid grid-cols-2 gap-4 max-w-3xl'>
                    {/* ─── LEFT SIDE ─── */}
                    <LeftHeroSection />

                    {/* ─── Right SIDE ─── */}
                    <AuthLoginSection />

                </div>
            </div>
        </>
    );
}

export default LoginPage;