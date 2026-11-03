import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tab from '../Components/Tab';
import CustomerOrderCard from '../Components/CustomerOrderPage/CustomerOrderCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const tabs = ["All", "Active", "Delivered"];

function CustomerOrderPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/my-orders', { withCredentials: true });
                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filterOrders = activeTab === "All"
        ? orders
        : activeTab === "Active" ? orders.filter(o => o.orderStatus != "Delivered") :
            orders.filter(o => o.orderStatus === "Delivered");

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
            </div>
        );
    }

    return (<>
        <div className='min-h-screen bg-[#f4f7f4]  '>

            <div className=" bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7] flex items-center justify-between px-3 bg-white
             border-b border-gray-100 sticky top-0 z-10 h-30">

                <a href="/" className="w-60 ">
                    <img src="media/logo.png" alt="logo" className="m-2 z-[100] " />
                </a>

            </div>


            {/* TABS */}
            <div className="mb-3 items-center hidden md:flex gap-5 p-5">
                {tabs.map(tab => {
                    const count = tab === "All" ? orders.length :
                        tab === "Active" ? orders.filter(o => o.status != "Delivered").length :
                            orders.filter(O => O.orderStatus === "Delivered").length;

                    return (
                        <Tab tab={tab}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            count={count} />)
                })}
            </div>{
                filterOrders.length == 0 ? <div className='flex items-center justify-center '>
                    <span className='text-5xl font-mdeium text-gray-400'>No Orders </span>
                </div>
                    : (
                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 p-4'>
                            {filterOrders.map(order => (
                                <CustomerOrderCard
                                    order={order}
                                />))}
                        </div>)}
        </div>
    </>);
}

export default CustomerOrderPage;