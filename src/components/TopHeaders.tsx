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

  return (
    <div className="flex flex-col p-4 bg-black-800 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img src="logo.svg" alt="SN₳KE Logo" className="h-14 w-auto" />
        <div className="text-white font-semibold text-2xl">
          Cardano Stakepool SN₳KE
        </div>
      </div>
    </div>
  );
};

export default TopHeaders;
