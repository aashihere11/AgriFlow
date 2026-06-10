import React, { useState, useEffect } from 'react';
import banners from '../data/banner';


export default function HeroBanner() {
    const [cur, setCur] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setCur(p => (p + 1) % banners.length), 3500)
        return () => clearInterval(t)
    }, [])

    const b = banners[cur]

    return (
        <div style={{
            background: b.bg, padding: "48px", borderRadius: "16px",
            transition: "background 0.5s", display: "flex", justifyContent: "space-between",
            alignItems: "center", minHeight: "320px"
        }}>
            <div>
                <span style={{
                    background: b.accent + "33", color: b.accent,
                    padding: "4px 12px", borderRadius: "20px", fontSize: "13px"
                }}>
                    {b.tag}
                </span>
                <h1 style={{ fontSize: "32px", margin: "12px 0 8px", whiteSpace: "pre-line" }}>
                    {b.heading}
                </h1>
                <p style={{ color: b.accent, marginBottom: "20px" }}>{b.sub}</p>
                <button className='font-size' style={{
                    background: b.accent, color: "white",
                    borderRadius: "8px", border: "none",
                    cursor: "pointer"
                }}>
                    {b.btn}
                </button>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                    {b.chips.map(c => (
                        <span className="font-size" key={c} style={{
                            background: b.accent + "22", color: b.accent,
                            borderRadius: "20px"
                        }}>
                            {c}
                        </span>
                    ))}
                </div>
            </div>
            <img src={b.img} alt="img" style={{ width: "20%" }} />
        </div>
    )
}