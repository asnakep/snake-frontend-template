// Dashboard.tsx

import React from 'react';
import PoolStats from './PoolStats';
import CardanoStats from './CardanoStats';

const Dashboard: React.FC = () => {
  return (
    <div
      className="w-[calc(100%+4rem)] h-[calc(100vh-200px)] bg-gray-800 p-6 rounded-lg shadow-md overflow-hidden lg:w-[calc(100%+8rem)] lg:mx-[-4rem] md:w-[calc(100%+6rem)] md:mx-[-3rem] sm:w-[calc(100%+4rem)] sm:mx-[-2rem]"
      style={{
        marginLeft: '-2rem', // Expand the width to compensate for the negative margin
        zIndex: 1, // Ensure content stays below the navbar
      }}
    >
      {/* Unified Dashboard with Pool Stats and Cardano Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Pool Stats Panel */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <PoolStats />
        </div>
        {/* Cardano Stats Panel */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <CardanoStats setLoading={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
