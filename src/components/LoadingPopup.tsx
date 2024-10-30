import Image from "next/image";
import React from 'react';

const LoadingPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
      <div className="flex items-center">
        {/* Use next/image for optimization */}
        <Image src="/loading-spinner.svg" alt="Loading..." width={60} height={60} /> {/* Adjust size as needed */}
      </div>
    </div>
  );
};

export default LoadingPopup;
