import { useState, useEffect } from 'react';
import OrderProduct from '../Components/dashboard/OrderProduct';
import TabSwitcher from '../Components/dashboard/TabSwitcher';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { thisWeekOrders, getWeeklyItemEarnings, getWeeklyGrowth, getTodayOrderStats, getGreeting } from '../utils/Dashboard';
function DashboardPage() {
  const { user } = useAuth();
  const farmerId = user._id;
  const [orders, setOrders] = useState([]);
  const [farmerProducts, setFarmerProducts] = useState([]);
  const todayDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const allOrderItems = [];

  orders.forEach(order => {
    order.orderItems?.forEach((item, itemIndex) => {
      allOrderItems.push({
        id: item._id || `${order._id}-${itemIndex}`,
        orderId: order._id,
        status: item.status,
        date: order.createdAt,
        productName: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        image: item.image,
        createdAt: order.createdAt
      });
    });
  });

  const { percentage, isPositive, thisWeekTotal } = getWeeklyGrowth(allOrderItems);


  const WeekOrders = thisWeekOrders(allOrderItems);
  const weekEarning = getWeeklyItemEarnings(WeekOrders);
  const todayOrders = getTodayOrderStats(allOrderItems);
  const greeting = getGreeting();

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
      }
    };

    fetchFarmerOrders();
  }, []);


  useEffect(() => {
    const fetchFarmerProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/farmer/${farmerId}`, { withCredentials: true });

        if (response.data.success) {
          setFarmerProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (farmerId) {
      fetchFarmerProducts();
    }
  }, [farmerId]);

  const stats = [
    { icon: "🛒", label: "Today Orders", val: todayOrders.todayCount, sub: isPositive ? `▲ +${percentage}% more than yesterday ` : `▼ -${percentage}% less than yesterday`, trend: isPositive ? "up" : "down" },
    { icon: "💰", label: "Week Earnings", val: weekEarning, sub: isPositive ? `▲ +${percentage}% this week` : `▼ -${percentage}% this week`, trend: isPositive ? "up" : "down" },
    { icon: "🧺", label: "Products listed", val: farmerProducts.length },
    { icon: "⭐", label: "Avg. rating", val: "4.8", sub: "from 124 reviews", trend: "neutral" },
  ];
  return (<>
    <nav className="bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7]  flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10 h-24 p-3">

      <a href="/" className="w-60">
        <img src="/media/logo.png" alt="AgriFlow" />
      </a>

    </nav>
    <div className='bg-[#f4f7f4] min-h-screen p-3'>
      {/* TOP BAR */}

      <div className='flex items-center justify-between p-2  ' >
        <div>
          <p className=' text-sm md:text-3xl
           font-serif font-medium text-[#1a5c2e] m-0' >
            {greeting}, {user?.username || 'Farmer'} 🌿
          </p>
          <p className=" text-xs md:text-base text-[#6b7280]" >
            Here's what's happening on your farm today
          </p>
        </div>
        <div className='text-[10px] md:text-sm text-[#6b7280] bg-[#fff] border-1 border-[#e0e0e0] rounded-3xl text-center
         h-10 px-2 flex items-center'>
          📅 {todayDate}
        </div>
      </div>


      {/* SECTION 1 — STATS */}
      <p className='text-sm md:text-base uppercase text-[#6b7280] font-medium mb-4'>Today's overview</p>
      <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 ' >
        {stats.map((s, i) => (
          <div key={i} className='bg-[#fff] border-1 border-[#e5e7eb] shadow-md rounded-md  md:p-3 p-3 md:w-full md:h-full '>
            <h5 className="md:text-xl text-sm mb-2  m-0" >{s.icon}</h5>
            <p className='md:text-base text-xs  text-[#6b7280] mb-2 uppercase tracking-wide ' >{s.label}</p>
            <p className="md:text-lg text-xs font-medium text-[1a5c2e] ">{s.val}</p>
            <p className={`trend-${s.trend} md:text-base text-xs`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* SECTION 2 — ORDERS + PRODUCTS */}
      <OrderProduct WeekOrders={WeekOrders} farmerProducts={farmerProducts} />
      {/* tabs- Earning + Frehness + Actions */}
      <TabSwitcher WeekOrders={WeekOrders} farmerProducts={farmerProducts} />


    </div>
  </>);
}

export default DashboardPage;
