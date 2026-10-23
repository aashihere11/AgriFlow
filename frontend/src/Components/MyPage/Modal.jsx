import React, { useState } from 'react'
import axios from "axios";

function Modal({ mode, isOpen, onClose, setForm, form, isFormValid, setFarmerProducts, setLoading }) {

    const handleChange = (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            if (file) {
                setForm((prev) => ({ ...prev, [e.target.name]: file }));
            }
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };



    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (mode === "add") {
            handleSubmit(e);
        } else {
            handleUpdate(e);
        }
    }
    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("unit", form.unit);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("image", form.image);
        try {
            const response = await axios.post("http://localhost:3000/products/createproduct", formData, { withCredentials: true });

            if (response.data && response.data.success) {
                setFarmerProducts((previousProducts) => [
                    ...previousProducts,
                    response.data.product,
                ]);
                onClose();
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const handleUpdate = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("stock", form.stock);
        formData.append("unit", form.unit);
        formData.append("price", form.price);
        formData.append("category", form.category);

        if (form.image && typeof form.image !== "string") {
            formData.append("image", form.image);
        }
       
        try {
            const response = await axios.patch(`http://localhost:3000/product/edit/${form._id}`, formData, { withCredentials: true });


            if (response.data.success) {
                alert(response.data.message);
                setFarmerProducts((previousProducts) =>
                    previousProducts.map((p) => (p._id === form._id ? response.data.updatedProduct : p))
                );
                setLoading(false);
                onClose();

            }
        } catch (error) {
            console.error("eroor in updation:", error);
            onClose();
        }
    };

    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/50 z-50'
            onClick={onClose}>
            <div className=' fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl p-3 shadow-xl'
                style={{ transform: "translate(-50%, -50%)", animation: "modalIn 0.5s ease forwards" }}
                onClick={(e) => e.stopPropagation()}>

                {/* MODAL */}
                <h2 className="font-serif !text-base md:!text-2xl text-[#1a5c2e] mb-4" > {mode === "add" ? "Add Product" : "Edit Product"}</h2>

                <div className="flex flex-col gap-1 mb-3">
                    <label className="text-xs md:text-base text-gray-500">Product name</label>
                    <input name="name"
                        placeholder="e.g. Farm Tomatoes"
                        className="px-2 py-2 text-xs md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                        value={form.name} onChange={handleChange} />
                </div>
                <div className='flex flex-col gap-1 mb-3'>
                    <label className="text-xs md:text-base text-gray-500">Desciption</label>
                    <textarea
                        name="description"
                        placeholder="Product description"
                        value={form.description}
                        onChange={handleChange}
                        className="px-2 py-2 text-xs md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                    />
                </div>


                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col gap-1 mb-3">
                        <label className="text-xs md:text-base text-gray-500">Stock quantity</label>
                        <input name="stock"
                            type="number" placeholder="20"
                            className="px-3 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                            value={form.stock} onChange={handleChange} />

                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs md:text-base text-gray-500">Unit</label>
                        <select name="unit"
                            className="px-3 py-2 text-sm md:text-base border border-gray-200 rounded-lg outline-none focus:border-[#5cba78] bg-white"
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


                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs md:text-base text-gray-500">Price (₹)</label>
                        <input name="price"
                            type="number" placeholder="80"
                            className="px-3 py-2 text-xs md:text-sm border border-gray-200 rounded-lg outline-none focus:border-[#5cba78]"
                            value={form.price} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-xs md:text-sm text-gray-500">Category</label>
                        <select name="category"
                            className="px-3 py-2 text-xs md:text-sm  border border-gray-200 rounded-lg outline-none focus:border-[#5cba78] bg-white"
                            value={form.category} onChange={handleChange}>
                            <option>Vegetables</option>
                            <option>Fruits</option>
                            <option>Grains & Pulses</option>
                            <option>Dairy</option>
                            <option>Honey & Natural</option>
                            <option>Herbs & Spices</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex flex-col gap-1">
                        <label className="cursor-pointer bg-blue-500 text-xs text-white px-2 py-2 rounded-lg">
                            {form.image ? "Change Photo" : "Upload Photo"}
                            <input name="image"
                                accept="image/*"
                                type="file"
                                className="hidden"
                                onChange={handleChange} />
                        </label>
                    </div>
                    {(form.image) && (
                        <img
                            src={
                                typeof form.image === "string"
                                    ? form.image // Agar Cloudinary se aayi hui image URL hai (Edit mode)
                                    : URL.createObjectURL(form.image) // Agar raw input file upload ki hai
                            }
                            className="max-w-50 object-cover rounded-lg"
                            alt="preview"
                        />)}
                </div>

                <div className="flex gap-3">
                    <button
                        className="flex-1 py-2.5 !text-sm md:!text-base text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        disabled={!isFormValid}
                        onClick={handleFormSubmit}
                        className="flex-1 py-2.5 !text-sm md:!text-base font-medium text-white bg-[#2e8a48] rounded-lg 
                        hover:bg-[#1a5c2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;