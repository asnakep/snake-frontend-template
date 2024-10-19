// LoadingPopup.tsx
import React from 'react';

const LoadingPopup: React.FC<{ message?: string }> = ({ message = "Loading.." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-4 rounded-sm shadow-lg flex items-center">
        <div className="animate-spin mr-2">
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="blue" d="M4 12a8 8 0 0014.488 3.36l1.428-1.428A10 10 0 10 4 12z" />
          </svg>
        </div>
        <p className="text-lg text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPopup;
