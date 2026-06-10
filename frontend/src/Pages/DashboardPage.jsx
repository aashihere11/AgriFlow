import React, { useState } from 'react';
import { stats } from "../data/farmerDashboardData";
import OrderProduct from '../Components/dashboard/OrderProduct';
import TemporaryDrawer from '../Components/Drawer';
import TabSwitcher from '../Components/dashboard/TabSwitcher';
function DashboardPage() {

  return (<>

    <div className='bg-[#f4f7f4] min-h-screen p-6'>
      {/* TOP BAR */}
      <div>
        <TemporaryDrawer open={open} onClose={() => setOpen(false)} />
      </div>
      <div className='flex itms-center justify-between  ' >
        <div>
          <h1 className='md:text-base text-sm
           font-serif font-medium text-[#1a5c2e] m-0' >
            Good morning, Ramesh 🌿
          </h1>
          <p className=" text-sm md:text-base text-[#6b7280]" >
            Here's what's happening on your farm today
          </p>
        </div>
        <div className='text-sm text-[#6b7280] bg-[#fff] border-1 border-[#e0e0e0] rounded-3xl text-center w-40 h-10 px-2 mr-3 mt-2'>
          📅 Saturday, 6 June 2026
        </div>
      </div>


      {/* SECTION 1 — STATS */}
      <p className='text-sm md:text-base uppercase text-[#6b7280] font-medium mb-4'>Today's overview</p>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-4 ' >
        {stats.map((s, i) => (
          <div key={i} className='bg-[#fff] border-1 border-[#e5e7eb] shadow-md rounded-md  md:p-3 p-2 h-40 md:h-auto '>
            <h5 className="md:text-xl text-base mb-2  m-0" >{s.icon}</h5>
            <p className='md:text-base text-sm  text-[#6b7280] mb-2 uppercase tracking-wide ' >{s.label}</p>
            <p className="md:text-lg text-sm font-medium text-[1a5c2e] ">{s.val}</p>
            <p className={`trend-${s.trend}`}>{s.sub}</p>
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