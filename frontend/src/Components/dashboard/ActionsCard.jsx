import React from 'react';
import{ quickActions} from "../../data/farmerDashboardData.js"
function ActionsCard() {
    return (<>

        {/* QUICK ACTIONS */}
        <div className='card shadow-xl'>
            <div className='cardTitle'><span>Quick actions</span></div>
            <div className='flex flex-col gap-1 gap-2 md:gap-4' >
                {quickActions.map((a, i) => (
                    <button key={i} className='flex items-center justify-center text-sm  py-3 font-medium text-[#2e8a48] bg-[f0faf2]
          border-1 border-[#a8e0b5] shadow-md pointer font-serif w-full bg-[#f0faf2]' style={{borderRadius:"10px"}}>
                        {a.icon} {a.label}
                    </button>
                ))}
            </div>
        </div>
    
  
        </> )
            }

export default ActionsCard;