import React from 'react';
import { reviews } from '../../data/review';
function ReviewSection() {
  const ratingBreakdown = [
    { star: 5, count: 28, pct: 80, color: "#5cba78" },
    { star: 4, count: 7, pct: 18, color: "#a8e0b5" },
    { star: 3, count: 2, pct: 6, color: "#d4f0da" },
    { star: 2, count: 1, pct: 3, color: "#e5e7eb" },
    { star: 1, count: 0, pct: 0, color: "#e5e7eb" },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl ">

      {/* HEADER */}
      <p className="font-serif text-sm md:text-4xl font-medium text-gray-800 ">Customer Reviews</p>


      <div className='flex items-center gap-3 justify-center'>
        <div className="text-center ">
          <p className="font-serif tex-3xl md:text-6xl  text-[#1a5c2e] m-0 leading-none">4.8</p>
          <p className="text-xs md:text-lg text-gray-400 mt-1 m-0"> reviews</p>
        </div>

        <div className="w-full min-w-[180px] max-w-xl">
          {ratingBreakdown.map(row => (
            <div key={row.star} className="flex items-center gap-2 mb-1.5">
              <span className="text-xs md:text-base text-gray-400 w-3 text-right flex-shrink-0">{row.star}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
              <span className="text-xs md:text-base text-gray-400 w-5 flex-shrink-0">{row.count}</span>
            </div>
          ))}
        </div>
        <div>
        </div>
      </div>
      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f0faf2] flex items-center justify-center text-xs md:text-sm font-semibold text-[#2e8a48] flex-shrink-0">
                  {review.initial}
                </div>
                <div>
                  <p className="text-[7px] md:text-sm font-medium text-gray-800 m-0">{review.name}</p>
                  <p className="text-[7px] md:text-sm text-gray-400 m-0">{review.date}</p>
                </div>
              </div>
              <span className="text-xs">{"⭐".repeat(review.rating)}</span>
            </div>
            <p className="text-[10px]  md:text-base  text-gray-500 leading-relaxed m-0">{review.text}</p>
            {review.verified && (
              <p className="text-[10px] md:text-base text-[#2e8a48] mt-2 m-0">✅ Verified purchase</p>
            )}
          </div>
        ))}

      </div>
      <p className='md:text-base font-medium text-end'>view all →</p>
    </div>
  );
}

export default ReviewSection;