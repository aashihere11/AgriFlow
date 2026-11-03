import React, { useState, useEffect } from 'react';
import OrderCard from '../Components/FarmerOrderPage/OrderCard';
import axios from 'axios';
import Tab from '../Components/Tab';
import CircularProgress from '@mui/material/CircularProgress';


const tabs = ["All", "Pending", "Packed", "Out-For-Delivery", "Delivered"];

function FarmerOrderPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/farmer/orders', { 
          withCredentials: true // Agar cookies/sessions use ho rahe hain
        });
        
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerOrders();
  }, []);


  const filterOrders = activeTab === "All"
    ? orders
    : orders.filter(o => o.orderStatus === activeTab);

  // stats
  const stats = [
    { icon: "📋", label: "Total orders", value: orders.length, color: "#1a5c2e" },
    { icon: "⏳", label: "Pending", value: orders.filter(o => o.orderStatus === "Placed").length, color: "#b8860b" },
    { icon: "📦", label: "Packed", value: orders.filter(o => o.orderStatus === "Packed").length, color: "#1a6fa8" },
    { icon: "🚚", label: "Out for Delivery", value: orders.filter(o => o.orderStatus === "Out-For-Delivery").length, color: "#7b3fa8" },
    { icon: "✅", label: "Delivered", value: orders.filter(o => o.orderStatus === "Delivered").length, color: "#2e8a48" },
  ];

    if (loading) {
          return (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
              </div>
          );
      }

  return (<>

    <div className='min-h-screen bg-[#f4f7f4] font-sans'>

      <nav className="flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10 h-24 p-3">

        <a href="" className="w-60">
          <img src="media/logo.png" alt="logo" />
        </a>

      </nav>

      {/* STATS */}
      <div className="hidden sm:flex  items-center gap-5 mb-6 p-3  ">
        {stats.map((stat) => (
          <div key={stat.label} className="  bg-white border border-gray-200 rounded-xl p-3 w-40 h-50">
            <p className='text-base md:text-xl m-0'>{stat.icon}</p>
            <p className="text-lg md:text-3xl font-bold m-0" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs md:text-base text-gray-400 mt-1 m-0">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-5  items-center p-3">
        {tabs.map(tab => {
          const count = tab === "All" ? orders.length : orders.filter(o => o.status === tab).length;

          return (<Tab tab={tab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            count={count} />)
        })}
      </div>


      {/* ORDERS LIST */}
      {filterOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm p-3">
          No {activeTab.toLowerCase()} orders
        </div>
      ) : (filterOrders.map(order => (
        <OrderCard
          key={order._id}
          order={order}

        />

      ))

      )}


    </div>
  </>);
}

export default FarmerOrderPage;