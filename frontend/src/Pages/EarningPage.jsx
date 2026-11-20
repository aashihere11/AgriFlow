import React, { useState, useEffect } from 'react';
import { getMonthStart, getRecentTransactions, getProductEarning } from '../utils/Earning';
import { getTotalEarnings } from '../utils/Earning';
import { getThisWeekEarnings } from '../utils/Earning';
import { getThisMonthEarnings } from '../utils/Earning';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import WithdrawModal from '../Components/EarningPage/WithdrawalModal';
import SuccessToast from '../Components/SuccessToast';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';



function EarningPage() {
  const [orders, setOrders] = useState([]);
  const user = useAuth();
  const [withdrawalsList, setWithdrawalsList] = useState([]);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawnTotal, setWithdrawnTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const handleWithdrawSuccess = async (payoutData) => {
    try {
      const res = await axios.post('http://localhost:3000/withdrawals', payoutData, { withCredentials: true });

      setWithdrawnTotal((prev) => prev + payoutData.amount);
      setToastMessage(`₹${payoutData.netReceivable} transferred to ${payoutData.destination}!`);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get('http://localhost:3000/my-withdrawals', { withCredentials: true });
      setWithdrawnTotal(res.data.totalWithdrawn);
      setWithdrawalsList(res.data.withdrawals);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);


  useEffect(() => {
    const fetchFarmerOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/farmer/orders', {
          withCredentials: true
        });

        if (response.data.success) {
          setOrders(response.data.orders);
          console.log(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerOrders();
  }, []);


  const totalEarnings = getTotalEarnings(orders, user._id);
  const monthEarnings = getThisMonthEarnings(orders, user._id);
  const weekEarnings = getThisWeekEarnings(orders, user._id);
  const transactions = getRecentTransactions(orders, user._id);
  const products = getProductEarning(orders, user._id);
  const availableBalance = Math.max(0, totalEarnings - withdrawnTotal);

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
      value: "month",
      sub: `${orders.length.toLocaleString()}`
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
      </div>
    );
  }

  return (<>
    <div className='min-h-screen  bg-[#f4f7f4]  '>

      <Navbar />


      {/* TOTAL CARD */}
      <div className='grid grid-cols-2 justify-content gap-5 p-3'>
        <div className=''>
          <div className="rounded-2xl p-3  text-white shadow-2xl "
            style={{ background: "linear-gradient(135deg, #2e8a48, #1a5c2e)" }}>
            <p className="text-xs md:text-lg opacity-80 m-0 mb-1">Total earnings</p>
            <p className="font-serif text-2xl md:text-4xl m-0 mb-1">Rs.{totalEarnings}</p>
            <p className="text-xs md:text-base opacity-70 m-0">Since you joined AgriFlow</p>
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-2xl border border-green-200 shadow-xs flex flex-col justify-between  ">
          <div>
            <p className="text-sm md:text-lg  text-green-800 font-medium m-0">Available Balance</p>
            <span className="text-xs  md:text-base font-medium text-green-700 mt-1">₹{availableBalance.toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white !text-xs md:!text-base font-semibold py-2 !rounded-xl transition shadow-sm"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="flex gap-3 mb-4 p-3">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white border-2 border-gray-200 rounded-xl p-3 w-40 shadow-xl
          hover:border-[#1a5c2e]  transition-colors" >
            <p className="text-[10px] md:text-base text-gray-400 m-0 mb-1 text-nowrap">{stat.label}</p>
            <p className="text-xs md:text-xl font-medium text-[#1a5c2e] m-0">{stat.value}</p>
            <p className="text-[7px] md:text-base text-gray-400 m-0 mt-1 text-nowrap">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* PRODUCT EARNINGS */}
      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 p-3'>
        <SuccessToast message={toastMessage} onClose={() => setShowToast(false)} isOpen={showToast} showToast={showToast} />
        <div className="bg-white border border-gray-200 rounded-xl p-4 ">
          <p className="text-sm md:text-xl font-medium text-gray-800 m-0 mb-3">Earnings by product</p>
          <div className='max-h-[300px] overflow-y-auto'>
            {products.map(product => (

              <div className="flex items-center  gap-1 md:gap-5 py-2.5 border-b border-gray-100 last:border-none ">
                <div className=" w-8 h-8 md:w-15 md:h-15 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  <img src={product.image} alt="img" />
                </div>
                <div className="pl-3">
                  <p className="text-xs md:text-lg font-medium text-gray-800 m-0">{product.name}</p>
                  <p className="text-xs md:text-base text-gray-400 m-0">{product.qtySold}{product.unit} Sold</p>
                </div>

                <p className="text-xs md:text-lg text-end font-medium text-[#1a5c2e] m-0 flex-1">
                  Rs.{product.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm md:text-xl font-medium text-gray-800 m-0 mb-3">Recent transactions</p>
          <div className='max-h-[300px] overflow-y-auto'>
            {transactions.map(txn => (
              <div key={txn.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-none ">
                <div>
                  <p className="text-xs md:text-lg font-medium text-gray-800 m-0">
                    {txn.orderId} · {txn.consumer}
                  </p>
                  <p className="text-xs md:text-lg text-gray-400 m-0 mt-0.5"></p>
                </div>
                <p className="text-xs md:text-lg font-medium text-[#2e8a48] m-0">+Rs.{txn.total}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-900 text-sm md:text-lg">Payout History</span>
          </div>
          {withdrawalsList.length === 0 ? (
            <p className="p-6 text-center text-gray-500 text-sm">No withdrawals made yet.</p>
          ) : (
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-sm ">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Method</th>
                    <th className="p-4 font-semibold">Destination</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {withdrawalsList.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50">
                      <td className="p-4 text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-4 font-medium text-gray-900">{item.method}</td>
                      <td className="p-4 text-gray-600">{item.destination}</td>
                      <td className="p-4 font-bold text-gray-900">₹{item.amount.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                          {item.status || 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={availableBalance}
        onWithdrawSuccess={handleWithdrawSuccess}
      />
    </div>
  </>);
}

export default EarningPage;
