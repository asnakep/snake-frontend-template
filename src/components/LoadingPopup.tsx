
import React from 'react';

// Import the SVG file
import loadingSpinner from './public/loading-spinner.svg'; // Adjust the path to where your file is located

const LoadingPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
      <div className="flex items-center">
        {/* Embed the SVG spinner */}
        <img src={loadingSpinner} alt="Loading..." className="w-20 h-20" /> {/* Adjust size as needed */}
      </div>
    </div>
  );
};

export default LoadingPopup;
