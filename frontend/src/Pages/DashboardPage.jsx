import React, { useState } from 'react';
import { stats } from "../data/farmerDashboardData";
import OrderProduct from '../Components/dashboard/OrderProduct';
import TemporaryDrawer from '../Components/Drawer';
import TabSwitcher from '../Components/dashboard/TabSwitcher';
function DashboardPage() {

  return (<>
 <nav className="flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10 h-24 p-3">

        <a href="" className="w-60">
          <img src="media/logo.png" alt="logo" />
        </a>
        
      </nav>
    <div className='bg-[#f4f7f4] min-h-screen p-3'>
      {/* TOP BAR */}
      
      <div className='flex itms-center justify-between p-2  ' >
        <div>
          <p className=' text-sm md:text-3xl
           font-serif font-medium text-[#1a5c2e] m-0' >
            Good morning, Ramesh 🌿
          </p>
          <p className=" text-xs md:text-base text-[#6b7280]" >
            Here's what's happening on your farm today
          </p>
        </div>
        <div className='text-[10px] md:text-sm text-[#6b7280] bg-[#fff] border-1 border-[#e0e0e0] rounded-3xl text-center
         h-10 px-2 flex items-center'>
          📅 Saturday, 6 June 2026
        </div>
      </div>


      {/* SECTION 1 — STATS */}
      <p className='text-sm md:text-base uppercase text-[#6b7280] font-medium mb-4'>Today's overview</p>
      <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 ' >
        {stats.map((s, i) => (
          <div key={i} className='bg-[#fff] border-1 border-[#e5e7eb] shadow-md rounded-md  md:p-3 p-3 md:w-full md:h-full '
           style={{ background: "linear-gradient(135deg, #e8f4fd, #fff)" }}>
            <h5 className="md:text-xl text-sm mb-2  m-0" >{s.icon}</h5>
            <p className='md:text-base text-xs  text-[#6b7280] mb-2 uppercase tracking-wide ' >{s.label}</p>
            <p className="md:text-lg text-xs font-medium text-[1a5c2e] ">{s.val}</p>
            <p className={`trend-${s.trend} md:text-base text-xs`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* SECTION 2 — ORDERS + PRODUCTS */}
      <OrderProduct />
      {/* tabs- Earning + Frehness + Actions */}
      <TabSwitcher />


    </div>
  </>);
}

export default DashboardPage;