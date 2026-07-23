import React, { useState } from 'react';
function Modal({ mode, product, isOpen, onClose, setForm, form }) {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] });
    };

    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/50 z-50'
            onClick={onClose}>
            <div className=' fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl p-6 shadow-xl'
                style={{ transform: "translate(-50%, -50%)", animation: "modalIn 0.5s ease forwards" }}
                onClick={(e) => e.stopPropagation()}>

                {/* MODAL */}
                <h2 className="font-serif text-lg text-[#1a5c2e] mb-4" > {mode === "add" ? "Add Product" : "Edit Product"}</h2>

                <div className="flex flex-col gap-1 mb-3">
                    <label className="text-xs text-gray-500">Product name</label>
                    <input name="name"
                        placeholder="e.g. Farm Tomatoes"
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                        value={form.name} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Price (₹)</label>
                        <input name="price"
                            type="number" placeholder="80"
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                            value={form.price} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Unit</label>
                        <select name="unit"
                            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78] bg-white"
                            value={form.unit} onChange={handleChange}>
                            <option>Kg</option>
                            <option>Qunital</option>
                            <option>Ton</option>
                            <option>Gram</option>
                            <option>Dozen</option>
                            <option>Liter</option>
                            <option>Box</option>
                            <option>Bag</option>
                            <option>Packet</option>

                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label className="text-xs text-gray-500">Stock quantity</label>
                    <input name="stock"
                        type="number" placeholder="20"
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                        value={form.stock} onChange={handleChange} />

                </div>

                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs text-gray-500">Category</label>
                    <select name="category"
                        className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78] bg-white"
                        value={form.category} onChange={handleChange}>
                        <option>Vegetables</option>
                        <option>Fruits</option>
                        <option>Grains & Pulses</option>
                        <option>Dairy</option>
                        <option>Honey & Natural</option>
                        <option>Herbs & Spices</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="flex-1 py-2.5 text-sm font-medium text-white bg-[#2e8a48] rounded-lg hover:bg-[#1a5c2e] transition-colors">
                        Save product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;