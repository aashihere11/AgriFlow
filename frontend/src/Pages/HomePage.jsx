import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import MediaCard from '../Components/MediaCard';
import HeroBanner from '../Components/Banner';
import { stats, categories, featuredProducts, whyCards } from '../data/Homedata';


function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <>

      <Navbar />
      <HeroBanner />

      {/* STATS */}
      <div className="fadeUp flex justify-center gap-5  py-5 border-b border-gray-100 flex-wrap reveal  overflow-x-auto  snap-mandatory snap-x">
        {stats.map(stat => (
          <div key={stat.label} className="text-center snap-center">
            <p className=" text:xs md:text-4xl font-semibold text-[#1a5c2e] m-0">{stat.value}</p>
            <p className="text-[7px] md:text-base text-gray-400 mt-1 m-0">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div className="fadeUp px-5 py-5">
        <div className=" mb-5 reveal">
          <span className="font-serif text-base  md:text-4xl font-medium text-[#1a5c2e]">Shop by category</span>
        </div>
        <div className="flex gap-3 overflow-x-auto p-2 reveal">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border-1 cursor-pointer transition-all
                transition duration-150 hover:scale-110
                ${activeCategory == cat.id ?
                  "bg-[#f0faf2] border-[#2e8a48] "
                  : "bg-gray-50 border-gray-200 hover:bg-[#f0faf2] hover:border-[#a8e0b5]"}`}
            >
              <span className=" text-base md:text-4xl">{cat.emoji}</span>
              <span className="text-xs md:text-lg text-gray-600 font-medium">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-5 gap-3 p-3'>
        {featuredProducts.map((product, i) => (
          <MediaCard
            key={product.id}
            product={product} />
        ))}
      </div>

      {/* WHY FARMDIRECT */}
      <div className="px-8 py-10 bg-[#f0faf2] hidden sm:block">
        <p className="font-serif text-lg md:text-4xl text-[#1a5c2e] mb-5 reveal">Why FarmDirect?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {whyCards.map((card, i) => (
            <div
              key={card.title}
              className="reveal bg-white border border-[#a8e0b5] rounded-xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className=" text-lg md:text-5xl mb-2">{card.icon}</div>
              <p className="text-sm md:text-xl font-medium text-[#1a5c2e] mb-1 m-0">{card.title}</p>
              <p className="text-xs md:text-base text-gray-500 leading-relaxed m-0">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className=" bg-[#1a5c2e] text-white flex flex-col items-center justify-center ">
        <div className='w-40 '><img src="/media/logo.png" alt="img" /></div>
        <p className="text-xs md:text-lg opacity-70 m-0  ">Fresh from farm, straight to you · © 2026</p>
      </div>

    </>
  );
}

export default HomePage;