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
        <div className='flex items-center p-2' style={{
            background: b.bg,
            transition: "background 0.5s",
        }}>
            <div>
                <span className='fadeUp text-[7px] md:text-base rounded-2xl px-3 py-2' style={{
                    background: b.accent + "33", color: b.accent
                }}>
                    {b.tag}
                </span>
                <p className='fadeUp text-xs md:text-4xl font-medium text-nowrap mt-3' >
                    {b.heading}
                </p>
                <p className={`fadeUp text-[10px] md:text-base font-medium bg-[b.accent] mb-2`}>{b.sub}</p>


            </div>
            <img src={b.img} alt="img" className='w-20 md:w-70 shrink' style={{ animation: "float 3s ease-in-out infinite" }} />
        </div>
    )
}