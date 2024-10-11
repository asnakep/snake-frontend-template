import React, { useEffect, useState } from 'react';
import { getTip } from './queries/topHeaders';

interface TipData {
  currEpoch: number;
  absSlot: number;
  epochSlot: number;
  blockNum: number;
  blockTime: string;
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
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="text-xl font-semibold">Blockchain Info</div>
      <div className="mt-2">
        <div>Current Epoch: {tipData.currEpoch}</div>
        <div>Absolute Slot: {tipData.absSlot}</div>
        <div>Epoch Slot: {tipData.epochSlot}</div>
        <div>Block Number: {tipData.blockNum}</div>
        <div>Block Time: {new Date(tipData.blockTime).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TopHeaders;
