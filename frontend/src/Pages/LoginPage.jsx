import React from 'react';
import TextField from '@mui/material/TextField';
import info from '../data/info';
import { useNavigate } from "react-router-dom";
function LoginPage() {
 const navigate = useNavigate();
const handleButtonClick = ()=>{ navigate("/HomePage")}
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
                    maxWidth: "860px"
                }}>
                    {/* ─── LEFT SIDE ─── */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "16px",
                            border: "0.5px solid #e0ead8",
                            padding: "32px"
                        }}>

                        <h4>Fresh vegetables, fruits & grains — at your door</h4>
                        <p style={{ color: "grey" }}>Join 50,000+ happy customers across MP</p>

                        {/* Features */}
                        {info.map((i) => (
                            <div style={{ display: "flex", gap: "16px", alignItems: 'flex-start', marginBottom: "16px" }}>
                                <div style={{
                                    width: "44px", height: "44px", borderRadius: "10px",
                                    background: "#EAF3DE", display: "flex",
                                    alignItems: "center", justifyContent: "center",
                                    fontSize: "20px", flexShrink: 0
                                }}>
                                    {i.icon}
                                </div>

                                <div>
                                    <p style={{ fontWeight: "500", fontSize: "15px", margin: "0 0 4px" }}>
                                        {i.title}
                                    </p>
                                    <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                                        {i.desc}
                                    </p>
                                </div>
                            </div>))}

                        {/* Divider */}
                        <div style={{ height: "0.5px", background: "#e8f0e0", margin: "20px 0" }} />

                        {/* Pills */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {["📍 Indore", "📍 Bhopal", "📍 Ujjain", "💳 UPI • Card • COD"].map(p => (
                                <span key={p} style={{
                                    fontSize: "12px", padding: "4px 12px",
                                    borderRadius: "20px", background: "#eaf3de",
                                    color: "#3b6d11", fontWeight: "500"
                                }}>
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div >
                        <div style={{
                            width: "100%", padding: "11px 14px",
                            borderRadius: "10px", border: "1px solid #dde8d4",
                            fontSize: "14px", background: "#ffffff",
                            outline: "none", color: "#333"
                        }}>
                            <h1 style={{ fontSize: "22px", fontWeight: "500", color: "#1a3d0a", marginBottom: "4px" }}>
                                Welcome back!
                            </h1>
                            <p style={{ fontSize: "13px", color: "#999", marginBottom: "28px" }}>
                                Login to continue shopping fresh
                            </p>
                            <div>

                                <form >
                                    <div style={{ marginBottom: "16px" }}>
                                        <label style={{ display: "block", color: "#666", fontWeight: "500" }}>
                                            Email address</label>
                                        <input type="email" placeholder="you@example.com"
                                            style={{
                                                width: "70%", padding: "11px 14px",
                                                borderRadius: "10px", border: "1px solid #dde8d4",
                                                fontSize: "14px", background: "#323331",
                                                outline: "none", color: "#514e4e"
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: "16px" }}>
                                        <label style={{ display: "block", color: "#666", fontWeight: "500" }}>Password</label>
                                        <input type="password"
                                            placeholder="••••••••"
                                            style={{
                                                width: "70%", padding: "11px 14px",
                                                borderRadius: "10px", border: "1px solid #dde8d4",
                                                fontSize: "14px", background: "#323331",
                                                outline: "none", color: "#333"
                                            }} />
                                    </div >
                                    <button
                                        type="submit"
                                        style={{
                                            width: "30%", padding: "12px",
                                            background: "#2d5a1b", color: "white",
                                            border: "none", borderRadius: "10px",
                                            fontSize: "15px", fontWeight: "500",
                                            cursor: "pointer", marginBottom: "16px"
                                        }}
                                     onClick={handleButtonClick}>
                                        Login
                                    </button>

                                </form>
                                <p style={{ textAlign: "center", fontSize: "13px", color: "#999", marginTop: "10px" }}>
                                    New here?{" "}
                                    <span style={{ color: "#2d5a1b", fontWeight: "500", cursor: "pointer" }}>
                                        Create a free account →
                                    </span>
                                </p>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <img src="/media/grains.png" alt="crop" style={{ position: 'relative', width: "70%" }} />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

export default LoginPage;