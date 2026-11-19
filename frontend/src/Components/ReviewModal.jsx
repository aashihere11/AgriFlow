import { useState } from 'react';
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose,orderId, order}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
 

  if (!isOpen) return null;

  const handleChange = async(e) =>{
    setComment(e.target.value);
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (!comment.trim()) return;

    setLoading(true);
    
   const reviewData = {
    productId:  order?.product,
    orderId: orderId,
    rating,
    comment: comment.trim(),
  };

  const response = await axios.post("http://localhost:3000/createOrUpdateReview", reviewData, {withCredentials:true})
  if(response.data.success){
    console.log("success");
  }
}catch(e){
  const errorMessage =
    e.response?.data?.message ||
    e.message ||
    "Something went wrong while submitting review.";
  setError(errorMessage);
}finally{
   setLoading(false);
    
}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-[#111] mb-1">Rate & Review</h3>
        <p className="text-sm text-gray-500 mb-4 truncate">
          {order.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Interactive Star Rating */}
          <div className="flex flex-col items-center justify-center py-2 bg-gray-50 rounded-lg">
            <span className="text-xs text-gray-500 mb-1 font-medium">Tap to Rate</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="md:!text-3xl focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <span className={
                    (hoverRating || rating) >= star ? "text-amber-400" : "text-gray-300"
                  }>
                    ★
                  </span>
                </button>
              ))}
            </div>
            <span className="text-sm font-semibold mt-1 text-amber-600">
              {rating === 5 ? "Excellent! 😍" : rating === 4 ? "Good 😊" : rating === 3 ? "Average 😐" : rating === 2 ? "Poor 🙁" : "Very Bad 😡"}
            </span>
          </div>

          {/* Comment Textarea */}
          {error && <p className='text-sm text-red-800 md:text-base font-medium'>{error}</p>}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your Review / Feedback
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={handleChange}
              placeholder="What did you like or dislike about this product?"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReviewModal;