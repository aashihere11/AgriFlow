import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Components/CartPage/OrderSummary";
import CartItem from "../Components/CartPage/CartItem";
import { Items } from "../data/cart";
function CartPage() {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(190);
    
    const [checkedItems, setCheckedItems] = useState(Items.filter(item => item.id));
     const allChecked = checkedItems.length === Items.length;

     const handleCheck = (itemId) =>{
      setCheckedItems(prev => {
        if (prev.includes(itemId)) {
          return prev.filter(id => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
     }

     const handleSelectAll = () =>{
      setCheckedItems(allChecked ? [] : Items.map(item => item.id));
     }


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

            <div className=" page grid  md:grid-cols-2 gap-4  m-10 justify-center items-start ">
                 {/* LEFT — CART ITEMS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-xl font-serif font-medium text-gray-800 m-0">Your cart</p>
            <button 
              className="text-xs  font-serif  text-red-400 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer">
              Clear all
            </button>
          </div>
 
          {/* SELECT ALL */}
          <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl mb-3 cursor-pointer">
            <input
              type="checkbox"
            //   ref={el => { if (el) el.indeterminate = someChecked; }}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-[#2e8a48] cursor-pointer"
            />
            <span className="text-sm md:text-lg font-medium text-gray-700">Select all</span>
            <span className="text-xs md:text-lg text-gray-400 ml-auto">{Items.length} items</span>
          </div>
 
          {/* SCROLLABLE ITEMS */}
          {Items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🛒</div>
              <p className="text-sm text-gray-400 m-0">Your cart is empty</p>
              <button onClick={() => navigate('/products')}
                className="mt-4 px-6 py-2 bg-[#2e8a48] text-white text-sm rounded-xl hover:bg-[#1a5c2e] transition-colors border-none cursor-pointer">
                Shop now
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto max-h-[420px] pr-1"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#a8e0b5 #f9fafb" }}>
                {Items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    Checked={checkedItems.includes(item.id)}
                    onCheck={handleCheck}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-3 m-0">↕ Scroll to see all items</p>
            </>
          )}
        </div>
 
                <OrderSummary />

            </div>

        </>
    );
}

export default CartPage;