import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tab from '../Components/Tab';
import { orders } from '../data/Ordersdata';
import CustomerOrderCard from '../Components/CustomerOrderPage/CustomerOrderCard';
import { useNavigate } from 'react-router-dom';

const tabs = ["All", "Active", "Delivered"];

function CustomerOrderPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All");

    const filterOrders = activeTab === "All"
        ? orders
        : activeTab === "Active" ? orders.filter(o => o.status != "Delivered") :
            orders.filter(o => o.status === "Delivered");

    return (<>
        <div className='min-h-screen bg-[#f4f7f4]  p-4 '>

            {/* TOP BAR */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="border flex items-center justify-center border-gray-400 bg-white"
                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                >
                    <ArrowBackIcon style={{ fontSize: "18px" }} />
                </button>
                <p className="font-serif text-xl text-[#1a5c2e] m-0">My Orders</p>
            </div>

            {/* TABS */}
            <div className="flex gap-5 mb-5 items-center hidden md:block">
                {tabs.map(tab => {
                    const count = tab === "All" ? orders.length :
                        tab === "Active" ? orders.filter(o => o.status != "Delivered").length :
                            orders.filter(O => O.status === "Delivered").length;

                    return (<Tab tab={tab}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        count={count} />)
                })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {filterOrders.map(order => (
                    <CustomerOrderCard
                        order={order}
                    />))}
            </div>
        </div>
    </>);
}

export default CustomerOrderPage;