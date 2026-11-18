import { getCategoryFreshnessStats } from '../../utils/Freshness';
function FreshnessCard({ farmerProducts }) {
  console.log(farmerProducts);
  const products = getCategoryFreshnessStats(farmerProducts);

  const getTimeAgo = (updatedAt) => {
    const hours = (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60);
    if (hours < 1) return `${Math.floor(hours * 60)} mins ago`;
    if (hours < 24) return `${Math.floor(hours)} hrs ago`;
    return `${Math.floor(hours / 24)} days ago`;
  }

  return (
    <div className="card shadow-xl  overflow-y-auto scrollbar-thin max-h-[350px]">
      <div className="cardtitle">
        <span className='text-base md:text-lg font-medium p-3'>Freshness status</span>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">No products available</p>
      ) : (
        products.map((f, i) => {
          return (
            <div
              key={f._id || i}
              className="text-sm md:text-base gap-2 md:gap-4 flex items-center justify-between px-2 pb-2 border-b border-b-[#e5e7eb] mb-2 p-2"
            >
              {/* Product Name */}
              <span className="flex-1 text-[#111] truncate">{f.name}</span>

              {/* Time Ago (quote typo fixed) */}
              <span className="text-sm md:text-base font-medium text-[#6b7280] shrink-0">
                {getTimeAgo(f.updatedAt || f.createdAt)}
              </span>

              {/* Status Label: Fresh / Best / Expired */}
              <span className={`text-sm md:text-base shrink-0 ${f.freshnessStatus}`}>
                {f.freshnessStatus}
              </span>
            </div>
          );
        })
      )}

      {/* Tip Banner */}
      <div className="bg-[#f0faf2] border border-[#a8e0b5] rounded-md px-3 py-2 md:px-5 mt-4 text-sm md:text-base text-[#1a5c2e] flex items-center gap-3">
        <span>💡</span>
        <span>Update freshness daily to build buyer trust.</span>
      </div>
    </div>
  );
}




export default FreshnessCard;