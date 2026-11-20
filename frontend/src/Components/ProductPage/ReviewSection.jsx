import { getRatingBreakdown } from "../../utils/review";
import { Link } from "react-router-dom";

function ReviewSection({ reviews, product }) {
  const displayedReviews = reviews.slice(0, 3);

  const ratingBreakdown = getRatingBreakdown(reviews);
  return (
    <div className="bg-white border border-gray-200 rounded-xl ">

      {/* HEADER */}
      <p className="font-serif text-sm md:text-4xl font-medium text-gray-800 p-3">Customer Reviews</p>


      <div className='flex items-center gap-3 justify-center'>
        <div className="text-center ">
          <p className="font-serif tex-3xl md:text-6xl  text-[#1a5c2e] m-0 leading-none">{product.averageRating}</p>
          <p className="text-xs md:text-lg text-gray-400 mt-1 m-0"> rating</p>
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
        {displayedReviews.map(review => {
          const date = new Date(review.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: "short",
            year: "numeric"
          });
          const username = review.user?.username || "Customer";
          const initial = username.charAt(0).toUpperCase();
          return (
            <div key={review._id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f0faf2] flex items-center justify-center text-xs md:text-sm font-semibold text-[#2e8a48] flex-shrink-0">
                    {initial}
                  </div>
                  <div>
                    <p className="text-[7px] md:text-sm font-medium text-gray-800 m-0">{username}</p>
                    <p className="text-[7px] md:text-sm text-gray-400 m-0">{date}</p>
                  </div>
                </div>
                <span className="text-xs">{"⭐".repeat(review.rating)}</span>
              </div>
              <p className="text-[10px]  md:text-base  text-gray-500 leading-relaxed m-0">{review.comment}</p>
              {review.verified && (
                <p className="text-[10px] md:text-base text-[#2e8a48] mt-2 m-0">✅ Verified purchase</p>
              )}
            </div>)
        })}

      </div>
      <Link
        to={`/product/${product._id}/reviews`}
        className='inline-block md:!text-base !font-medium text-end p-3'
      >
        View all ({product.numReviews}) reviews →
      </Link>
    </div>
  );
}

export default ReviewSection;
