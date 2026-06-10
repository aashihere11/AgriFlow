import React from 'react';
import LeftHeroSection from '../Components/LoginPage/LeftHeroSection';
import AuthLoginSection from '../Components/LoginPage/AuthRightSection';
function LoginPage() {

    return (
        <>

            <div style={{
                minHeight: "100vh",
                background: "#f7f9f4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 20px",
                fontFamily: "sans-serif"
            }}>

                {/* Logo */}
                <div style={{ backgroundColor: "#f7f9f4", textAlign: "center", marginBottom: "10px" }}>
                    <img src="/media/logo.png" alt="img" style={{ width: "20%" }} />
                    <h1 className='font-size' style={{ color: "rgba(127, 127, 127, 0.84)" }}>Better price for farmers, better quality for you</h1>
                </div>

                {/* Main grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    width: "100%",
                    maxWidth: "860px",
                    
                }}>
                    {/* ─── LEFT SIDE ─── */}
                    <LeftHeroSection />

                    {/* ─── RIGHT SIDE ─── */}
                    <AuthLoginSection />


                </div>
            </div>
        </>
    );
}

export default LoginPage;