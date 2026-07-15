import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function CartPage() {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(190)
    return (
        <>


            <div className=" flex justify-between items-center sticky h-24 border border-gray-200  ">
                <a href="" className="w-xl ">
                    <img src="media/logo.png" alt="logo" className="ml-4 z-[100]" style={{ width: "40%" }} />
                </a>
                <div className=" flex items-center gap-x-8  justify-stretch mr-8">
                    <a href="#" className="text-gray-400">Shop</a>
                    <a href="#" className="">Farmers</a>
                    <a href="#" className="">About</a>
                    <span className="rounded-3xl border-1 border-green-200 bg-green-50 border-solid text-sm font-medium px-4 py-2">🛒 Cart· 4</span>
                </div>
            </div>

            <div className="page max-w-4xl px-5 py-5">
                <h1 className="text-2xl font-serif font-medium text-green-800 ">Your Basket</h1>
                <div className="flex items-center justify-between border-1 bg-green-50 border-green-200 rounded-xl">
                    {/* <div className="rounded text-center flex items-center justify-center bg-green-50 border-green-200">  <i class="fa-regular fa-truck"></i> </div> */}
                    <p className="px-4 mt-2"> 🚚Free delivery on orders above ₹499 — you're almost there!</p>

                </div>

            </div>

            <div className=" page grid grid-cols-2 gap-4  m-10 justify-center items-start ">
                <div className="col-span-1 px-5">
                    <p className="text-gray-600">Items in your cart</p>
                    <div className="cart-card flex items-center border-1 rounded-xl border-gray-200 hover:border-green-400 overflow-y-auto">
                        <div className="h-24 w-24 rounded-xl flex items-center justify-center m-4 overflow-hidden flex-shrink-0">
                            <img className="w-full h-full object-cover" src="media/grain.jpg" alt="logo" />
                        </div>

                        <div>
                            <div className="text-sm font-medium mb-2"> grains</div>
                            <div className="rounded-3xl bg-green-50 border-green-200 border-1 text-sm text-green-800 px-2">🌾 Ramesh Farm, Nashik</div>
                            <div className="text-sm mt-2">₹80 / kg</div>
                        </div>

                        <div className="item-right flex flex-col items-end gap-2  ml-auto mr-4">
                            <div className="font-medium text-lg">₹{total}</div>
                            <div className="flex items-center justify-center">

                                <div className='flex items-center rounded-4xl border-1 border-gray-200  truncate ' >
                                    <button
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className='w-9  h-8 text-lg  hover:bg-[#f0faf2] text-lg text-green-800 font-medium'
                                    >
                                        −
                                    </button >
                                    <span className="font-medium text-lg  px-2 text-center text-[black] ">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => setQty(q => q + 1)}
                                        className='w-9 h-8 text-lg  hover:bg-[#f0faf2] text-lg text-green-800 font-medium '>
                                        +
                                    </button>
                                </div>
                            </div>
                            <button className="text-sm text-gray-400 hover:text-red-800 ">Remove</button>
                        </div>
                    </div>
                </div>

                {/* right order summary */}
                <div className="col-span-1 ml-5 border-1 border-gray-200 rounded-xl gap-2 px-5 " >
                    <div className="text-3xl  text-green-800  font-serif mb-2 mt-2">Order Summary</div>
                    <div className="bg-[#f0faf2] py-2 px-2 mb-2">
                        <span className="text-md font-medium  text-green-800 ">SUPPORTING LOCAL FARMERS</span>
                        <p className="text-sm font-sm text-green-800 ">Your order supports 4 small farmers directly. No middlemen involved.</p>
                    </div>

                    <div className="flex gap-2">
                        <input className="text-sm rounded-md border-1  text-[#1a1a1a] font-medium md:font-sm px-2 py-2 bg-[#ffffff] " type="text" id="promo-input" placeholder="Promo code (try FARM10)" />
                        <button className="text-sm rounded-md font-medium text-green-800 px-2 hover:bg-[#f0faf2]  border-1" >Apply</button>
                    </div>
                    <div>
                        <div class="flex justify-between text-md  text-[#6b7280] "><span>Subtotal</span><span className="">₹<span id="subtotal">540</span></span></div>
                        <div className="flex justify-between text-md text-[#6b7280]    "><span>Delivery</span><span className="text-green-800">Free</span></div>
                        <div className="flex justify-between text-md  text-[#6b7280]  "><span>Platform fee</span><span>₹0</span></div>
                        <hr />
                        <div className="flex justify-between text-md  text-[#6b7280] gap-5">
                            <span>Total</span><span>₹<span id="total">540</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                        <div className="text-md rounded-md text-center bg-[#f5ecd7] border-1 border-[#d4b55a] py-3 px-1 font-medium">
                            🌿 You're saving ₹<span id="savings">180</span> vs supermarket prices
                        </div>

                        <button className="checkout-btn text-sm font-serif text-center font-medium 
                        bg-[#2e8a48] rounded-md text-[#fff] mt-4 px-2 py-3 border-1 hover:bg-[#1a5c2e]"
                            onClick={() => navigate("/checkoutpage")} >
                            Proceed to Checkout →
                        </button>
                        <a href="#" className="continue-btn no-underline text-sm font-serif text-center font-medium rounded-md 
                     mt-4 px-2 py-3 border-1 border-[#5cba78] text-[#2e8a48]"
                            onClick={() => navigate("/homepage")}>Continue Shopping</a>
                    </div>

                </div>
            </div>

        </>
    );
}

export default CartPage;