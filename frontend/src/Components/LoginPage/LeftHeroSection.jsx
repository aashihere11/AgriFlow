import React from 'react';
import info from '../../data/info';
function LeftHeroSection() {
    return (<>
        {/* ─── LEFT SIDE ─── */}
        <div className='bg-white rounded-md border-1 border-[#e0ead8] p-4 mb-5  '
          >

            <p className='text-sm md:text-xl font-medium'>Fresh vegetables, fruits & grains — at your door</p>
            <p className='text-sm md:text-base text-gray-400' >Join 50,000+ happy customers across MP</p>

            {/* Features */}
            {info.map((i) => (
                <div className='flex gap-2 items-start mb-2' >
                    <div className='w-10 h-10 rounded-sm bg-[#EAF3DE] flex items-center justify-center text-base shrink-0' >
                        {i.icon}
                    </div>

                    <div>
                        <p className='text-sm md:text-base font-medium m-0 ' >
                            {i.title}
                        </p>
                        <p className='text-sm text-[#666] m-0'>
                            {i.desc}
                        </p>
                    </div>
                </div>))}

            {/* Divider */}
            <div  className='h-1 bg-[#e8f0e0] mb-4'  />

            {/* Pills */}
            <div className='flex gap-2 flex-wrap' >
                {["📍 Indore", "📍 Bhopal", "📍 Ujjain", "💳 UPI • Card • COD"].map(p => (
                    <span key={p} className='text-sm px-3  rounded-xl bg-[#eaf3de] text-[#3b6d11] font-medium'>
                        {p}
                    </span>
                ))}
            </div>
        </div>
    </>);
}

export default LeftHeroSection;