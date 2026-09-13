import React from 'react';

const getFreshnessStatus = (updatedAt) => {
  const hours = (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60);
  if (hours < 12) return { label: "fresh", class: "text-fresh" };
  else if (hours < 24) return { label: "warning", class: "text-Update" };
  return { label: "expired", class: "text-Expired" };

};

const getStockLevel = (stock) => {
  if (stock > 5) return "dot-Fresh";
  if (stock <= 5) return "dot-Update";

};

const getStockPct = (stock) => Math.min((stock / 20) * 100, 100);

function ProductCard({ key, product, setMode, setSelectedProduct, setIsModalOpen, setForm }) {

  const pct = getStockPct(product.stock);
  const freshness = getFreshnessStatus(product.updatedAt);

  const handleEdit = (product) => {
    setMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
    setForm({
      name: product.name,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
      category: product.category,
    });
  }

  return (<>
    <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden '>
      <div className='flex items-center text-5xl justify-center relative overflow-hidden ' >
        <div className='p-2'>
          <img src="media/wheat.jpg" alt="img" className='min-w-[70px] max-w-full ' />
          <span className={`absolute top-3 left-3 text-[10px] font-medium px-2 py-1 rounded-full bg-white ${freshness.class} `}>
            {freshness.label == "fresh" ? "🟢" : freshness.label == "warning" ? "🟠" : "🔴"} {freshness.label}</span>
        </div>
      </div>

      {/* BODY */}
      <div className='mt-1 ml-3'>
        <p className="text-sm md:text-base font-medium text-gray-800 m-0 ">{product.name}</p>
        <p className="text-xs md:text-base text-gray-400 mt-1 mb-2 m-0">₹{product.price}/{product.unit}</p>

        <p className="text-xs font-medium mb-1 m-0 ">{product.stock == 0 ? "Out Of Stock" : `${product.stock} ${product.unit} left`}</p>

        <div className="w-50 h-1 bg-gray-100 rounded-full overflow-hidden ">
          <div className={`h-full rounded-full ${getStockLevel(product.stock)}`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 p-3">
        <button className=" px-2 py-1.5 !text-[10px] md:!text-base font-medium text-[#2e8a48]
             bg-[#f0faf2] border border-[#a8e0b5] !rounded-lg hover:bg-[#d4f0da] transition-colors text-center text-nowrap"
          onClick={() => handleEdit(product)}>
          ✏️ Edit
        </button>
        <button className="py-1.5 px-2 !text-[10px] md:!text-xl text-[#e74c3c] bg-[#fff0ee] border border-[#f5c6c0] !rounded-lg hover:bg-[#ffe0db] transition-colors">
          🗑
        </button>
      </div>
    </div>

  </>);
}

export default ProductCard;