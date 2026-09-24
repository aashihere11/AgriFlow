import React from 'react';

export default function RoleSelector({ role, setRole }) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-200/60 p-1 rounded-xl">
      <button
        type="button"
        onClick={() => setRole('consumer')}
        className={`py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
          role === 'consumer'
            ? 'bg-white text-forest-900 shadow-sm font-semibold rounded xl'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className='text-xs md:text-base'>🛒</span>
        <span className='text-xs md:text-base'> Consumer</span>
      </button>

      <button
        type="button"
        onClick={() => setRole('farmer')}
        className={`py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 ${
          role === 'farmer'
            ? 'bg-white text-forest-900 shadow-sm font-semibold rounded xl'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className='text-xs md:text-base'>🌾</span>
        <span className='text-xs md:text-base'>Farmer</span>
      </button>
    </div>
  );
}