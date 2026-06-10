import React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

function AuthLoginSection() {
    const navigate = useNavigate();
    const handleButtonClick = () => { navigate("/HomePage") }

    return (<>
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
    </>);
}

export default AuthLoginSection;