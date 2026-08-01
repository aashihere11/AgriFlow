import React from 'react';
import { orders } from "../data/Ordersdata";
import { getMonthStart , getRecentTransactions } from '../utils/Earning';
import { getTotalEarnings } from '../utils/Earning';
import { getThisWeekEarnings } from '../utils/Earning';
import {getThisMonthEarnings} from '../utils/Earning';


function EarningPage() {
  const totalEarnings = getTotalEarnings(orders);
  const monthEarnings = getThisMonthEarnings(orders);
  const weekEarnings = getThisWeekEarnings(orders);
  const transactions = getRecentTransactions(orders);

  const stats = [
  {
    label: "This week",
    value: `Rs.${weekEarnings.toLocaleString()}`,
    sub: "Mon-Sun"
  },
  {
    label: "This month",
    value: `Rs.${monthEarnings.toLocaleString()}`,
    sub: ``
  },
  {
    label: "Orders",
    // value: monthOrders,
    sub: `${orders.length.toLocaleString()}`
  }
];

  return (<>
    <div className='min-h-screen  bg-[#f4f7f4] p-5 '>
      <div className='flex items-center justify-between mb-3'>
        <h1 className="font-serif text-2xl text-[#1a5c2e]">Earnings</h1>
        <p className='text-xs md:text-lg text-gray-400 m-0'>july 2026</p>
      </div>

      {/* TOTAL CARD */}
      <div className="rounded-2xl p-5 mb-4 text-white "
        style={{ background: "linear-gradient(135deg, #2e8a48, #1a5c2e)" }}>
        <p className="text-xs md:text-lg opacity-80 m-0 mb-1">Total earnings</p>
        <p className="font-serif text-4xl m-0 mb-1">Rs.{totalEarnings}</p>
        <p className="text-xs md:text-base opacity-70 m-0">Since you joined AgriFlow</p>
      </div>


      {/* STATS */}
      <div className="flex gap-3 mb-4 ">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-3 w-40 shadow-xl">
            <p className="text-[10px] md:text-base text-gray-400 m-0 mb-1 text-nowrap">{stat.label}</p>
            <p className="text-xs md:text-xl font-medium text-[#1a5c2e] m-0">{stat.value}</p>
            <p className="text-[7px] md:text-base text-gray-400 m-0 mt-1 text-nowrap">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* PRODUCT EARNINGS */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-sm md:text-xl font-medium text-gray-800 m-0 mb-3">Earnings by product</p>


          <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-none">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
            </div>
            <div className="">
              <p className="text-sm md:text-base font-medium text-gray-800 m-0">name</p>
              <p className="text-xs md:text-base text-gray-400 m-0">qty</p>
            </div>
            <div className="w-30 h-1 bg-gray-100 rounded-full overflow-hidden ">
              <div className="h-full bg-[#5cba78] rounded-full" />
            </div>
            <p className="text-sm md:text-lg text-end font-medium text-[#1a5c2e] m-0 flex-shrink-0 flex-1">
              Rs.
            </p>
          </div>

        </div>

              {/* RECENT TRANSACTIONS */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-sm md:text-xl font-medium text-gray-800 m-0 mb-3">Recent transactions</p>
        {transactions.map(txn =>(
          <div key={txn.id}  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-none">
            <div>
              <p className="text-xs md:text-lg font-medium text-gray-800 m-0">
                {txn.orderId} · {txn.consumer.name}
              </p>
              <p className="text-xs md:text-lg text-gray-400 m-0 mt-0.5"></p>
            </div>
            <p className="text-sm md:text-lg font-medium text-[#2e8a48] m-0">+Rs.{txn.total}</p>
          </div>
))}
      </div>
 
      </div>
    </div>
  </>);
}

export default EarningPage;