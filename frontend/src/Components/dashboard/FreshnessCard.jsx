import React, { useState } from 'react';
import { freshness } from "../../data/farmerDashboardData.js"
function FreshnessCard() {
  const getFreshnessStatus = (updatedAt) => {

    const hours = (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60);
    if (hours < 12) return "Fresh";    // green
    if (hours < 24) return "Update";  // orange
    return "Expired";                   // red
  };

  const getTimeAgo = (updatedAt) => {
    const hours = (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60);
    if (hours < 1) return `${Math.floor(hours * 60)} mins ago`;
    if (hours < 24) return `${Math.floor(hours)} hrs ago`;
    return `${Math.floor(hours / 24)} days ago`;
  }
  return (<>
    <div className='card shadow-xl '>
      <div className='cardtitle '><span>Freshness status</span></div>
      {freshness.map((f, i) => (
        <div key={i} className=' text-sm  md:text-base gap-2 flex items-center justify-center md:gap-4 px-2 border-b border-b-[#e5e7eb] mb-2' >
          <div className={`dot-${getFreshnessStatus(f.updatedAt)}`}  style={{width:"10px", height:"10px", borderRadius: "10px" }}></div>
          <span className='flex-1 text-[#111]' >{f.name}</span>
          <span className='text-sm md:text-base font-medium text-[#6b7280"]'>{getTimeAgo(f.updatedAt)}</span>
          <span className={`text-${getFreshnessStatus(f.updatedAt)}`}>{getFreshnessStatus(f.updatedAt)}</span>
        </div>
      ))}
      <div className='bg-[#f0faf2] border-1 border-[#a8e0b5] rounded-md md:px-5 md:py-2 mt-4 text-sm
       md:text-base text-[#1a5c2e] flex gap-4' >
        💡 Update freshness daily to build buyer trust.
      </div>
    </div>

  </>);
}

export default FreshnessCard;