import React from 'react';
import{weekEarnings} from "../../data/farmerDashboardData.js";
function EarningsCard() {
  return (<>
    <div className='card shadow-xl'>
      <div className=' md:text-base card-title'><span>Weekly earnings</span></div>
      {weekEarnings.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderBottom: i < weekEarnings.length - 1 ? "0.5px solid #e5e7eb" : "none" }}>
          <span className='text-[#6b7280]'>{e.day}</span>
          <span className='font-medium text-[#111]' >{e.val}</span>
        </div>
      ))}
      <div className='flex justify-between border-1 border-[#e5e7eb] p-2 mt-2' >
        <span className='text-sm md: text-base font-medium' >Total</span>
        <span className='text-base md:text-lg font-medium text-["#1a5c2e"]'>₹12,290</span>
      </div>
    </div>
  </>);
}

export default EarningsCard;