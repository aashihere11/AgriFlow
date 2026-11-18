import { useNavigate } from 'react-router-dom';
function OrderProduct({ WeekOrders, farmerProducts }) {
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
                    </div>
                    {WeekOrders.length === 0 ? (
                        <div className="border-gray-100 rounded-2xl p-3 text-center space-y-3 ">
                            <div className="text-4xl">🌾</div>
                            <p className="text-sm md:text-lg font-semibold text-gray-800">No orders this week yet</p>
                        </div>
                    ) : (
                        WeekOrders.map((o) => {
                            const itemStatusClass = o.status.toLowerCase().replace(/\s+/g, '-')

                            return (
                                <div key={o.id} className='flex items-center gap-1 md:gap-5 mb-2 rounded-md border-b border-gray-200 shrink'>
                                    <div className='rounded-sm flex items-center justify-center text-base  overflow-hidden shrink'>
                                        <img src={o.image} alt="img" className="w-15 h-15 md:w-24 md:h-24 object-cover rounded " /></div>
                                    <div className="pl-4" >
                                        <p className='text-xs md:text-xl font-medium text-[#111] m-0'>{o.productName}</p>
                                        <p className="text-xs md:text-xl font-medium text-[#1a5c2e]" > {o.quantity}{o.unit}</p>
                                    </div>
                                    <div className='ml-auto text-center '>
                                        <p className="text-xs md:text-xl font-medium text-[#1a5c2e]" >₹ {o.price}</p>
                                        <p className={`text-[10px] md:text-base  rounded-xl bg-gray-200 px-2 mt-2 ${itemStatusClass}`}  >
                                            {o.status}
                                        </p>
                                    </div>
                                </div>
                            );
                        }))}
                </div>

                {/* MY PRODUCTS */}
                <div className='bg-[#fff] rounded-md p-4 border-2 border-[#e5e7eb] shadow-md
                 overflow-y-auto scrollbar-thin scrollbar-thumb-[#a8e0b5] max-h-[500px]'>
                    <div className='text-sm md:text-xl font-medium text-[#111] mb-4 flex items-center justify-between'>
                        <span>My products</span>
                        <span className='text-xs md:text-base text-[2e8a48] border-1 border-[#a8e0b5] shadow-sm rounded-3xl px-2' onClick={() => navigate("/myproducts")} >Manage</span>
                    </div>
                    {farmerProducts.map((p) => (
                        <div key={p.id} className='flex items-center mb-2  rounded-md border-b border-gray-200' >
                            <div className='rounded-sm flex items-center justify-center text-base shrink-0'>
                                <img src={p.image.url} alt="img" className="w-15 h-15 md:w-24 md:h-24 object-cover rounded" />
                            </div>
                            <div className="pl-3">
                                <div className='text-xs md:text-xl font-medium text-[#111]'>{p.name}</div>
                                <div className='text-xs md:text-xl text-[#6b7280]  mt-1'>₹ {p.price} </div>
                            </div>
                            <div className='ml-auto text-center'>
                                <p className={`text-xs md:text-base font-medium m-0 ${getStockColor(p.stock)}`}>{p.stock == 0 ? "Out of stock" : `${p.stock} ${p.unit} left`}</p>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

        </>
    );
}

export default OrderProduct;
