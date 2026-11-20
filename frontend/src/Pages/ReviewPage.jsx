import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Components/Navbar';
import { getRatingBreakdown } from '../utils/review';

function ReviewPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const [productResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/products/${id}`, { withCredentials: true }),
          axios.get(`http://localhost:3000/reviews/${id}`, { withCredentials: true }),
        ]);
        if (productResponse.data.success) setProduct(productResponse.data.product);
        if (reviewsResponse.data.success) setReviews(reviewsResponse.data.reviews || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load reviews.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchReviewData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><CircularProgress sx={{ color: '#165b07' }} /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">{error || 'Product not found.'}</div>;

  const ratingBreakdown = getRatingBreakdown(reviews);
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <Navbar />
      <main className="max-w-5xl mx-auto p-3 md:p-6">
        <Link to={`/product/${id}`} className="inline-block text-sm md:text-base text-[#1a5c2e] font-medium mb-4">← Back to product</Link>
        <section className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <h1 className="font-serif text-2xl md:text-4xl text-gray-800 mb-1">Customer Reviews</h1>
          <p className="text-sm md:text-base text-gray-500 mb-6">{product.name}</p>
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center border-b border-gray-100 pb-6 mb-6">
            <div className="text-center sm:min-w-32"><p className="font-serif text-5xl text-[#1a5c2e] m-0">{product.averageRating || '0.0'}</p><p className="text-sm text-gray-400 m-0">{reviews.length} reviews</p></div>
            <div className="w-full max-w-xl">
              {ratingBreakdown.map((row) => <div key={row.star} className="flex items-center gap-2 mb-2"><span className="text-sm text-gray-500 w-8">{row.star} ★</span><div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} /></div><span className="text-sm text-gray-500 w-6">{row.count}</span></div>)}
            </div>
          </div>
          {reviews.length === 0 ? <p className="text-center text-gray-500 py-10">No reviews yet for this product.</p> : <div className="space-y-3">
            {reviews.map((review) => {
              const username = review.user?.username || 'Customer';
              const date = new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
              return <article key={review._id} className="bg-gray-50 rounded-xl p-4"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#f0faf2] flex items-center justify-center font-semibold text-[#2e8a48]">{username.charAt(0).toUpperCase()}</div><div><p className="font-medium text-gray-800 m-0">{username}</p><p className="text-sm text-gray-400 m-0">{date}</p></div></div><span className="text-sm text-amber-500">{'★'.repeat(review.rating)}</span></div><p className="text-gray-600 leading-relaxed mt-3 mb-0">{review.comment}</p>{review.verified && <p className="text-sm text-[#2e8a48] mt-3 mb-0">✓ Verified purchase</p>}</article>;
            })}
          </div>}
        </section>
      </main>
    </div>
  );
}

export default ReviewPage;
