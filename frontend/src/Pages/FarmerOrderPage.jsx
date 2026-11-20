import React, { useState, useEffect } from 'react';
import OrderCard from '../Components/FarmerOrderPage/OrderCard';
import axios from 'axios';
import Tab from '../Components/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import SuccessToast from '../Components/SuccessToast';
import Navbar from '../Components/Navbar';



const tabs = ["All", "Pending", "Packed", "On The Way", "Delivered"];

function FarmerOrderPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleStatusUpdate = async (orderId, itemId, newStatus) => {

    try {

      const response = await axios.put(
        `http://localhost:3000/update-item-status/${orderId}/${itemId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order => {
            if (order._id !== orderId) return order;

            const updatedItems = order.orderItems.map(item =>
              item._id === itemId ? { ...item, status: newStatus } : item
            );

            return {
              ...order,
              orderItems: updatedItems
            };
          }))


        setToastMessage(response.data.message || "Order Status Successfully Updated");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 1000);

      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  useEffect(() => {
    const fetchFarmerOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/farmer/orders', {
          withCredentials: true
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
    : orders.filter(o =>
      o.orderItems?.some(item => (item.status || "").toLowerCase() === activeTab.toLowerCase())
    );

  const allItems = orders.flatMap(o => o.orderItems || []);

  const stats = [
    { icon: "📋", label: "Total orders", value: orders.length, color: "#1a5c2e" },
    { icon: "⏳", label: "Pending", value: allItems?.filter(i => i.status === "Pending" || i.status === "Placed").length, color: "#b8860b" },
    { icon: "📦", label: "Packed", value: allItems?.filter(i => i.status === "Packed").length, color: "#1a6fa8" },
    { icon: "🚚", label: "On The Way", value: allItems?.filter(i => i.status === "On The Way").length, color: "#7b3fa8" },
    { icon: "✅", label: "Delivered", value: allItems.filter(i => i.status === "Delivered").length, color: "#2e8a48" },
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
      <SuccessToast message={toastMessage} onClose={() => setShowToast(false)} isOpen={showToast} showToast={showToast} />

      <Navbar />

      {/* STATS */}
      <div className="hidden sm:flex items-center gap-5 mb-6 p-3  ">
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

          const count = tab === "All"
            ? orders.length
            : orders.filter(o =>
              o.orderItems?.some(item =>
                (item.status || "Pending").toLowerCase() === tab.toLowerCase()
              )
            ).length;

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
          handleStatusUpdate={handleStatusUpdate}

        />

      ))

      )}


    </div>
  </>);
}

export default FarmerOrderPage;
