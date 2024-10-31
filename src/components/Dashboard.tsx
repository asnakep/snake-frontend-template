import React from 'react';
import PoolStats from './PoolStats';
import CardanoStats from './CardanoStats';
import EpochStats from './EpochStats';
import PoolRewards from './PoolRewards';
import AdaPricePanel from './AdaPrice';

const Dashboard: React.FC = () => {
  return (
    <div
      className="w-full h-auto min-h-[calc(100vh-200px)] bg-base-100 p-6 rounded-lg overflow-hidden lg:mx-[-4rem] md:mx-[-3rem] sm:mx-[-2rem]"
      style={{
        marginLeft: '-1rem', // Expand the width to compensate for the negative margin
        zIndex: 0, // Ensure dashboard content stays below the navbar
        position: 'relative', // Make sure the Dashboard is positioned correctly to allow layering
      }}
    >
      {/* Unified Dashboard with Pool Stats, Cardano Stats, Blocks Production, Last Rewards, and ADA Price Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pool Stats Panel */}
        <div className="bg-base-100 p-4 rounded-lg h-full">
          <PoolStats />
        </div>
        {/* Cardano Stats Panel */}
        <div className="bg-base-100 p-4 rounded-lg h-full">
          <CardanoStats setLoading={() => {}} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Blocks Production Panel */}
        <div className="bg-base-100 p-6 rounded-lg h-full w-full">
          <EpochStats />
        </div>
        {/* Last Rewards Panel */}
        <div className="bg-base-100 p-6 rounded-lg h-full w-full">
          <PoolRewards />
        </div>
        {/* ADA Price Panel */}
        <div className="bg-base-100 p-6 rounded-lg h-full w-full">
          <AdaPricePanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
