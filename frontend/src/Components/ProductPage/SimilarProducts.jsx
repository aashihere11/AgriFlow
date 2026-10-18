import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SimilarProducts({ productId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchSimilarProducts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/products/${productId}/similar`,
          { withCredentials: true }
        );

        if (!cancelled && response.data.success) {
          setSimilarProducts(response.data.products);
        }
      } catch (error) {
        console.error('Failed to fetch similar products', error);
        if (!cancelled) setSimilarProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (productId) {
      fetchSimilarProducts();
    } else {
      setSimilarProducts([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">
      <p className="text-sm md:text-2xl font-medium text-gray-800 mb-4 m-0">
        Similar products
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {loading && <p className="text-sm text-gray-400">Loading similar products...</p>}

        {!loading && similarProducts.length === 0 && (
          <p className="text-sm text-gray-400">No similar products available.</p>
        )}

        {similarProducts.map((product) => (
          <button
            key={product._id}
            type="button"
            onClick={() => navigate(`/product/${product._id}`)}
            className="border-2 border-gray-200 rounded-xl overflow-hidden text-left cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-[#fcf8f2]"
          >
            <div className="flex items-center justify-center p-1 md:w-50 md:h-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-2.5">
              <p className="text-[7px] md:text-lg font-medium text-gray-800 m-0">
                {product.name}
              </p>
              <p className="text-[5px] md:text-base text-gray-400 mt-0.5 m-0">
                {product.farmer?.username || 'Unknown farmer'}
              </p>
              <p className="text-[5px] md:text-base font-semibold text-[#1a5c2e] mt-1 m-0">
                &#8377;{product.price} / {product.unit}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
