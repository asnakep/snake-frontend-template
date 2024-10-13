import React, { useEffect, useState } from 'react';
import Image from "next/image"; // If you want to use Next.js Image component instead
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
      <div className="flex items-center space-x-4"> {/* Add space between logo, text, and progress bar */}
        <img src="logo.svg" alt="SN₳KE Logo" className="h-14 w-auto" /> {/* Logo on the left */}
        <div className="text-white font-semibold text-2xl"> {/* Pool name next to the logo */}
          Cardano Stakepool SN₳KE
        </div>

        {/* Progress Bar Section */}
        <div className="flex items-center"> {/* Wrapper to contain the Cardano logo and the progress bar */}
          <img src="logo-cardano.svg" alt="Cardano Logo" className="h-12 w-12 ml-10" /> {/* Cardano logo next to the progress bar */}
          
          {/* Progress Bar for Epoch Slot */}
          <div className="relative w-64 bg-black-800 h-8 overflow-hidden rounded-sm ml-4"> 
            <div
              className="absolute top-0 left-0 bg-blue-900 h-full rounded-sm"
              style={{ width: `${epochProgressPercent}%` }}
            ></div>
            <div
              className="absolute inset-0 flex justify-center items-center text-white font-semibold text-lg"
              style={{ zIndex: 1 }}
            >
              <span>Mainnet Epoch {formatNumber(tipData.currEpoch)} - {epochProgressPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeaders;
