import React from "react";
import poolId from './variables/poolid';

const PoolDescription: React.FC = () => {
  return (
    <div className="max-w-4xl w-full bg-black-800 rounded-lg p-6 mt-4">
      <p className="text-white mb-4">
        SN₳KE is your 24/7/365 Reliable Pioneer Stake Pool - Enjoy a 0% pool margin and a fixed cost of 170₳ forever.
      </p>
      <p className="text-gray-400 mb-4">
        <strong>Ticker:</strong> <span className="text-white">{"SNAKE"}</span> &nbsp; 
        <strong>ID:</strong> <span className="text-white">{poolId}</span>
      </p>
    </div>
  );
};

export default PoolDescription;
