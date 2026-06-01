import React, { useState } from 'react';
function ProductPage() {
    const [qty, setQty] = useState(1);
    return (
        <>
            <div className=' flex justify-center shrink grid md:grid-cols-2 sm:grid-cols-1 gap-10 box-border
             my-8 mx-8 py-8 '>
                <div className='border-2 border-[#eaf3de] shrink grid md:grid-rows-2 sm:grid-rows-1 grid-rows-1 mt-5 shrink rounded-xl
                shadow-xl/30 flex items-center max-w-md mx-auto'>
                    <div className='flex shrink justify-center place-items-center mx-5 my-5  box-border shadow-xl/30
                   rounded-xl' >
                        <img className="" src="/media/wheat.jpg" alt="img" />
                    </div>
                </div>

                <div className='grid grid-rows-[1fr_0.3fr_0.5fr] shrink mt-5 max-w-md '>
                    <div className=' shadow-xl/30 rounded-xl mb-4 border-3 border-[#eaf3de] bg-transparent'>
                        <div className="flex gap-8 flex-wrap mt-2 ml-4">
                            <span className='text-xs rounded-2xl px-2 py-2 bg-[#eaf3de] text-[#3b6d11]' >
                                🟢 In Stock
                            </span>
                        </div>
                        <p className='text-xl font-medium ml-4'>Fresh Tomatoes</p>
                        <p className='text-sm font-medium !ml-4'>per kilogram • Harvested today</p>

                        <div className='flex shrink items-baseline-last gap-2 ml-4'>
                            <span className='text-3xl font-medium'>28</span>
                            <span className='text-base font-medium line-through'>oldprice</span>
                            <span className='font-sm text-xs rounded-2xl px-2 py-2 bg-[#eaf3de] text-[#3b6d11]'
                            >discount</span>
                        </div>
                        <hr />
                        <div className="flex items-center justify-center gap-3 mb-4  ml-4 ">
                            <span className="text-medium ">Quantity</span>
                            <div className='flex items-center rounded-md border-2 border-gray-200  truncate bg-[#1f1f1f]' >
                                <button
                                    onClick={() => setQty(q => Math.max(0.5, q - 0.5))}
                                    className='w-9  h-9 bg-[#f7f9f4] text-lg text-[#2d5a1b]'
                                >
                                    −
                                </button >
                                <span className="font-medium text-xl w-20 text-center text-[white] ">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(q => q + 0.5)}
                                    className='w-9 h-9 bg-[#f7f9f4] text-lg text-[#2d5a1b] '>
                                    +
                                </button>
                            </div>
                            <span className='text-medium font-medium text-[#999]'>
                                = price
                            </span>
                        </div>
                        <button className=" w-sm min-w-24 mx-4 px-4 py-2 text-[#E0E0E0]
                         border border-gray-200 text-base font-medium mb-2 !rounded-lg hover:bg-[#1f1f1f]"  >
                            🛒 Add to Bag
                        </button>
                        <button className=" w-sm min-w-24 mx-4 px-4 py-2 text-[#E0E0E0]
                         border border-gray-200 text-base font-medium mb-2 !rounded-lg  hover:bg-[#1f1f1f]">
                            ♡ Save for Later
                        </button>

                    </div>


                    <div className='shadow-xl/30 mb-4 rounded-xl border-3 border-[#eaf3de]'>
                        <p className='text-sm font-medium text-[#999] px-3 '>SOLD BY FARMER</p>
                        <div className='flex items-center gap-3 px-3 shrink'>
                            <div className=' flex items-center justify-center rounded-circle border-1 w-11 h-11
                              bg-[#c0dd97]'>A</div>
                            <div>
                                <p className='text-sm font-medium m-0 text-[#1a3d0a]'>Aashi Meena</p>
                                <p className='text-sm font-medium m-0 text-[#999]'>📍hoshangabad, madhya pradesh</p>
                            </div>
                            <span className='text-sm rounded-2xl px-2 py-2 bg-[#eaf3de] text-[#3b6d11]'>✓ Verified</span>
                        </div>
                        <hr />
                        <div className='flex gap-4 mx-2 mb-2'>
                            {[
                                { val: 4.9, label: "Rating" },
                                { val: 240, label: "Orders" },
                                { val: 2023, label: "Selling" },
                                { val: "organic method", label: "Method" },
                            ].map(s => (
                                <div >
                                    <p className='text-sm font-medium text-[#1a3d0a] m-0'>{s.label}</p>
                                    <p className='text-sm text-[#999] m-0'>{s.val}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* Product Details Table */}
                    <div className=' shadow-xl/30 rounded-xl border-3 border-[#eaf3de]'>
                        <p className='text-sm font-medium text-[#1a3d0a] mt-2 text-center'>DELIVERY INFO</p>

                        <div className='flex items-center  gap-8'>
                            {[
                                { icon: "🚚", title: "Today by 7 PM", sub: "Order before 10 AM" },
                                { icon: "📦", title: "Free Delivery", sub: "On orders ₹499+" },
                                { icon: "🔄", title: "Easy Return", sub: "Not fresh? Refund" },
                            ].map(d => (
                                <div className='flex-1 rounded-md  text-center bg-[#f7f9f4] mx-3 mb-4'>
                                    <div className='text-xl'>{d.icon}</div>
                                    <p className='text-sm font-medium text-[#1a3d0a] m-0'>{d.title}</p>
                                    <p className='text-sm font-medium text-[#999] m-0'>{d.sub}</p>
                                </div>
                            ))}
                        </div>
                        <div className=' w-xs bg-[#eaf3de] rounded-md mx-5 text-center px-2 py-2 mb-2'>
                            <p className='text-sm text-[#3b6d11] m-0'> 📍 Delivering to indore at 7-9</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-xl font-medium bg-[#1a3d0a m-0] text-center'>
                Customer Reviews
                </p>

                <div className='rounded-md border-1 border-[#e0ead8] min-w-2xs mx-auto max-w-3xl  ms-8'>
                    <div className='flex items-center gap-4 px-3 py-3 '>
                        <div className='flex items-center justify-center w-10 h-10 rounded-circle
                         bg-[#eaf3de] text-center'>A
                         </div>
                         <div>
                            <p className='text-sm font-medium text-[#1a3d0a] m-0'>namdsfdgfhgvjhje</p>
                            <p className='text-sm text-[#bbb] m-0'>days</p>
                         </div>
                        <div className='text-base'>⭐⭐⭐⭐⭐</div>
                    </div>
                    
            
                      <p className='text-sm text-[#555] m-0 px-4 mb-2'>text</p>
                </div>
        </>
    );
}

export default ProductPage;