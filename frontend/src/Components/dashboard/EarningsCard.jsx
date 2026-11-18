import { dailyEarnings, getWeeklyItemEarnings } from '../../utils/Dashboard.js';
function EarningsCard({WeekOrders}) {
  const dayEarnings = dailyEarnings(WeekOrders);
  const total = getWeeklyItemEarnings(WeekOrders);
  return (<>
    <div className='card shadow-xl'>
       <div className=' md:text-base card-title'><span>Weekly earnings</span></div>
      {Object.keys(dayEarnings).length === 0 ? (
      <p>No earnings this week</p>) :
      Object.entries(dayEarnings).map(([date, amount]) => (
        <div key={date} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderBottom: "0.5px solid #e5e7eb" }}>
          <span className='text-[#6b7280]'>{date}</span>
          <span className='font-medium text-[#111]' >₹{amount.toLocaleString('en-IN')}</span>
        </div>
      ))}
      <div className='flex justify-between border-1 border-[#e5e7eb] p-2 mt-2' >
        <span className='text-sm md:text-base font-medium' >Total</span>
        <span className='text-base md:text-lg font-medium text-[#1a5c2e]'>₹{total.toLocaleString('en-IN')}</span>
      </div>
    </div>
  </>);
}

export default EarningsCard;
