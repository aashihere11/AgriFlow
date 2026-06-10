import React from 'react';
import info from '../../data/info';
function LeftHeroSection() {
    return (
        <>
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
        </>
    );
}

export default LeftHeroSection;