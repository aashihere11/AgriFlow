import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Components/CartPage/OrderSummary";
import CartItem from "../Components/CartPage/CartItem";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const allChecked = checkedIds.length === items.length;
  const someChecked = checkedIds.length > 0 && checkedIds.length < items.length;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${user._id}`, { withCredentials: true });
        if (response.data.success) {
          setItems(response.data.cartItems);
          setLoading(false);
        }

      } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
      }
    }
    fetchCart();
  }, [])

  
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
    setCheckedIds(allChecked ? [] : items.map(item => item.product._id));
  }

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:3000/cart/remove', {
        data: {
          userId: user._id,
          productId: productId
        },
        withCredentials: true
      });

      if (response.data.success) {
        // Backend se delete hone ke baad frontend state se bhi hata do
        setItems(prev => prev.filter(item => item.product._id !== productId));
        setCheckedIds(prev => prev.filter(id => id !== productId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleQtyChange = async (itemId, change, currentQty) => {
    const newQty = Math.max(1, currentQty + change);

    try {
      const response = await axios.put('http://localhost:3000/cart/update-quantity', {
        userId: user._id,
        productId: itemId,
        quantity: newQty
      }, { withCredentials: true });

      if (response.data.success) {
        setItems(prev =>
          prev.map(item =>
            item.product._id === itemId ? { ...item, quantity: newQty } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleClearAll = () => {
    setItems([]);
    setCheckedIds([]);
  };
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen ">
        {loading &&
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
          </div>
        }
        <div className=" bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7] flex items-center justify-between px-3 bg-white
         border-b border-gray-100 sticky top-0 z-10 h-30  ">

          <a href="/" className="w-70 ">
            <img src="media/logo.png" alt="logo" className="m-2 z-[100] " />
          </a>

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
              <div className="bg-white border border-gray-200 rounded-2xl p-3 h-full ">
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
                      key={item.product._id}
                      item={item}
                      Checked={checkedIds.includes(item.product._id)}
                      onCheck={handleCheck}
                      onQtyChange={handleQtyChange}
                      onDelete={handleDelete}
                      navigate={navigate}
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
