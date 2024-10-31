import React from 'react';

const LoadingPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-50">
      <div className="flex items-center">
        {/* DaisyUI Spinner */}
        <span className="loading loading-ring text-info loading-lg"></span>
      </div>
    </div>
  );
};

export default LoadingPopup;
