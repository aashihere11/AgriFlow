import React, { useState } from 'react';
import { orders } from '../data/Ordersdata';
import OrderCard from '../Components/FarmerOrderPage/OrderCard';
import TemporaryDrawer from '../Components/Drawer';


const tabs = ["All", "Pending", "Packed", "Out-For-Delivery", "Delivered"];
function FarmerOrderPage() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const filterOrders = activeTab === "All"
    ? orders
    : orders.filter(o => o.status === activeTab);

  // stats
  const stats = [
    { icon: "📋", label: "Total orders", value: orders.length, color: "#1a5c2e" },
    { icon: "⏳", label: "Pending", value: orders.filter(o => o.status === "Pending").length, color: "#b8860b" },
    { icon: "📦", label: "Packed", value: orders.filter(o => o.status === "Packed").length, color: "#1a6fa8" },
    { icon: "🚚", label: "Out for Delivery", value: orders.filter(o => o.status === "Out-For-Delivery").length, color: "#7b3fa8" },
    { icon: "✅", label: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "#2e8a48" },
  ];

  return (<>
    <div className='min-h-screen bg-[#f4f7f4] p-6 font-sans'>

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <div className='flex gap-2'>  <TemporaryDrawer open={open} onClose={() => setOpen(false)} />
          <h1 className="font-serif text-2xl text-[#1a5c2e]">Orders</h1>
        </div>

        <p className="text-xs text-gray-400">Today, 23 July 2026</p>
      </div>



      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 ">
        {stats.map((stat) => (
          <div key={stat.label} className="  bg-white border border-gray-200 rounded-xl p-4">
            <p className='text-xl m-0'>{stat.icon}</p>
            <p className=" text-3xl font-bold m-0" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1 m-0">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-5 mb-5 flex-wrap items-center">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-medium border transition-all
              ${activeTab === tab
                ? "bg-[#2e8a48] text-white border-[#2e8a48]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#a8e0b5]"}`}
            style={{ borderRadius: "50px" }}>
            {tab} ({tab === "All" ? orders.length : orders.filter(o => o.status === tab).length})
          </button>
        ))}
      </div>


      {/* ORDERS LIST */}
      {filterOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          No {activeTab.toLowerCase()} orders
        </div>
      ) : (filterOrders.map(order => (
        <OrderCard
          key={order.id}
          order={order}

        />

      ))

      )}


    </div>
  </>);
}

export default FarmerOrderPage;