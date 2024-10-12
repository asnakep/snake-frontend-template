import React, { useEffect, useState } from 'react';
import { getTip } from './queries/queryTip';

interface TipData {
  currEpoch: number;
  epochSlot: number;
  blockNum: number;
}

const TopHeaders: React.FC = () => {
  const [tipData, setTipData] = useState<TipData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTip();
        setTipData(data);
      } catch (err) {
        setError("Failed to fetch top header data");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000); // Refresh every 20 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!tipData) {
    return <div>Loading...</div>;
  }

  // Calculate epoch progress as a percentage (hardcoded 432000 slots per epoch)
  const totalSlots = 432000;
  const epochProgressPercent = ((tipData.epochSlot / totalSlots) * 100).toFixed(1); // Current slot for percentage

  // Function to format numbers with thousand separators
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col p-4 bg-black-800 rounded-lg shadow-md">
      {/* Epoch and Block Information */}
      <div className="flex items-center justify-between mb-2"> {/* Added margin-bottom for spacing */}
        <div className="text-white font-semibold text-xl">
          Cardano Stakepool SN₳KE
        </div>
      </div>

      {/* Progress Bar for Epoch Slot */}
      <div className="relative w-64 bg-black-800 h-8 overflow-hidden rounded-sm"> 
        <div
          className="absolute top-0 left-0 bg-blue-600 h-full rounded-sm"
          style={{ width: `${epochProgressPercent}%` }}
        ></div>
        <div
          className="absolute inset-0 flex justify-center items-center text-white-900 font-semibold text-lg"
          style={{ zIndex: 1 }}
        >
          <span>Mainnet Epoch {formatNumber(tipData.currEpoch)} ({epochProgressPercent}%)</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeaders;
