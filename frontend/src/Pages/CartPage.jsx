import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Components/CartPage/OrderSummary";
import CartItem from "../Components/CartPage/CartItem";
import { Items } from "../data/cart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(Items);
  const [checkedIds, setCheckedIds] = useState("");
  const allChecked = checkedIds.length === items.length;
  const someChecked = checkedIds.length > 0 && checkedIds.length < items.length;



  const handleCheck = (itemId) => {
    setCheckedIds(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }

  const handleSelectAll = () => {
    setCheckedIds(allChecked ? [] : items.map(item => item.id));
  }

  const handleQtyChange = (id, change) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    )
  }

  // Delete
  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setCheckedIds(prev => prev.filter(i => i !== id));
  };

  // Clear all
  const handleClearAll = () => {
    setItems([]);
    setCheckedIds([]);
  };


  return (
    <>
      <div className="min-h-screen bg-[#f4f7f4] ">
        <div className=" flex justify-between items-center bg-[white] sticky h-24 border border-gray-200  ">
          <div className="flex ">
            <button onClick={() => navigate(-1)}><ArrowBackIcon />Back</button>

            <a href="" className="min-w-50 max-w-100 ">
              <img src="media/logo.png" alt="logo" className="m-2 z-[100] " />
            </a>
          </div>
          <div className=" flex items-center gap-x-8  justify-stretch mr-8">
            <span className="rounded-3xl border-1 border-green-200 bg-green-50 border-solid text-[8px] md:text-base font-medium px-2 py-2 text-nowrap">
              🛒 Cart· {items.length}
            </span>
          </div>
        </div>


        {/* SCROLLABLE ITEMS */}
        {items.length === 0 ? (
          <div className="text-center py-12 col-span-2">
            <div className="text-xl md:text-7xl mb-3">🛒</div>
            <p className="text-sm md:text-lg text-gray-400 m-0">Your cart is empty</p>
            <button onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-[#2e8a48] text-white text-sm rounded-xl hover:bg-[#1a5c2e] transition-colors border-none cursor-pointer">
              Shop now
            </button>
          </div>
        ) : (
          <>

            <div className=" page grid  md:grid-cols-2 gap-4 m-5 justify-center items-stretch ">
              {/* LEFT — CART ITEMS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-3 h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm md:text-xl font-serif font-medium text-gray-800 m-0">Your cart</p>
                  <button
                    className="text-xs  font-serif  text-red-400 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer"
                    onClick={handleClearAll}>
                    Clear all
                  </button>
                </div>


                {/* SELECT ALL */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    ref={el => { if (el) el.indeterminate = someChecked; }}
                    checked={allChecked}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-[#2e8a48] cursor-pointer"
                  />
                  <span className="text-sm md:text-lg font-medium text-gray-700">Select all</span>
                  <span className="text-xs md:text-lg text-gray-400 ml-auto">{items.length} items</span>
                </div>

                <div className="overflow-y-auto max-h-[420px] "
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#a8e0b5 #f9fafb" }}>
                  {items.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      Checked={checkedIds.includes(item.id)}
                      onCheck={handleCheck}
                      onQtyChange={handleQtyChange}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-3 m-0">↕ Scroll to see all items</p>

              </div>
              < OrderSummary
                Items={items}
                checkedIds={checkedIds} />
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default CartPage;
