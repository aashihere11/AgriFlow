import React from 'react';
function SimilarProducts() {
  const similarProducts = [
    { id: 2, emoji: "🥕", name: "Organic Carrots", price: 60, unit: "kg", farmer: "Sunita Devi" },
    { id: 3, emoji: "🥬", name: "Fresh Spinach", price: 40, unit: "bunch", farmer: "Gupta Farm" },
    { id: 4, emoji: "🧅", name: "Red Onions", price: 45, unit: "kg", farmer: "Ramesh Farm" },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">
      <p className="text-sm md:text-2xl font-medium text-gray-800 mb-4 m-0">Similar products</p>

      <div className="flex justify-center gap-3 ">
        {similarProducts.map(product => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          >
            {/* IMAGE */}
            <div className=" flex items-center justify-center border-2  md:w-50 md:h-50 ">
              <img src="media/wheat.png" alt="img" />
            </div>

            {/* INFO */}
            <div className="p-2.5">
              <p className="text-[7px] md:text-lg font-medium text-gray-800 m-0 ">{product.name}</p>
              <p className="text-[5px] md:text-base text-gray-400 mt-0.5 m-0">{product.farmer}</p>
              <p className="text-[5px] md:text-base font-semibold text-[#1a5c2e] mt-1 m-0">
                ₹{product.price} / {product.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;