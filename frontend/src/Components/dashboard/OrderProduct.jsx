import React from 'react';
import { products } from "../../data/farmerDashboardData";
import { orders } from "../../data/farmerDashboardData";
import { useNavigate } from 'react-router-dom';
function OrderProduct() {
    const navigate = useNavigate();
    const getStockColor = (stock) => {
        if (stock == 0) return "stock-out";
        if (stock <= 5) return "stock-low";
        return "stock-good";

    }
    return (
        <>
            {/* SECTION 2 — ORDERS + PRODUCTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5" >

                {/* RECENT ORDERS */}
                <div className='bg-[#fff] rounded-md p-4 border-2 border-[#e5e7eb] shadow-md overflow-y-auto scrollbar-thin scrollbar-thumb-[#a8e0b5] max-h-[500px] '>
                    <div className='text-sm md:text-xl font-medium text-[#111] mb-4 flex items-center justify-between'>
                        <span>Recent orders</span>
                        <span className='text-sm md:text-base text-[2e8a48] border-1 border-[#a8e0b5] shadow-sm rounded-3xl px-2'>View all</span>
                    </div>
                    {orders.map((o) => {

                        return (
                            <div key={o.id} className='flex items-center gap-1 md:gap-5  rounded-md border-b border-gray-200 shrink'>
                                <div className='w-15 h-15 md:w-30 md:h-30 rounded-sm flex items-center justify-center text-base  overflow-hidden shrink'>{o.emoji}</div>
                                <div >
                                    <p className='text-xs md:text-xl font-medium text-[#111] m-0'>{o.name} · {o.qty}</p>
                                    <p className='text-xs md:text-base text-[#6b7280] mt-2 m-0' >{o.buyer} · {o.time}</p>
                                </div>
                                <div className='ml-auto text-center '>
                                    <p className="text-xs md:text-xl font-medium text-[#1a5c2e]" >{o.price}</p>
                                    <p className='text-[10px] md:text-base  rounded-xl bg-gray-200 px-2 mt-2 ' >
                                        {o.status}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* MY PRODUCTS */}
                <div className='bg-[#fff] rounded-md p-4 border-2 border-[#e5e7eb] shadow-md
                 overflow-y-auto scrollbar-thin scrollbar-thumb-[#a8e0b5] max-h-[500px]'
                  style={{ background: "linear-gradient(135deg, #e8f4fd, #fff)" }}>
                    <div className='text-sm md:text-xl font-medium text-[#111] mb-4 flex items-center justify-between'>
                        <span>My products</span>
                        <span className='text-xs md:text-base text-[2e8a48] border-1 border-[#a8e0b5] shadow-sm rounded-3xl px-2' >Manage</span>
                    </div>
                    {products.map((p) => (
                        <div key={p.id} className='flex items-center gap-1 md:gap-5  rounded-md border-b border-gray-200' >
                            <div className='w-15 h-15 md:w-30 md:h-30 rounded-sm flex items-center justify-center text-base shrink-0'>{p.emoji}</div>
                            <div >
                                <div className='text-xs md:text-xl font-medium text-[#111]'>{p.name}</div>
                                <div className='text-xs md:text-xl text-[#6b7280]  mt-1'>{p.price} </div>
                            </div>
                            <div className='ml-auto text-center'>
                                <p className={`text-xs md:text-base font-medium m-0 ${getStockColor(p.stock)}`}>{p.stock}</p>
                                <p className='text-xs md:text-base font-medium m-0'>{p.stock == 0 ? "Out of stock" : `${p.stock} ${p.unit} left`}</p>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

        </>
    );
}

export default OrderProduct;