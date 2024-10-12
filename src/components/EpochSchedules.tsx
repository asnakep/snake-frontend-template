import { useState, useEffect } from 'react';
import { fetchEpochSchedules } from './queries/epochSchedules'; // Correct import

interface EpochData {
  epoch: number;
  epochSlots: number;
  epochSlotsIdeal: number;
  maxPerformance: number;
  activeStake: number;
  totalActiveStake: number;
}

export const EpochStats = () => {
  const [epochData, setEpochData] = useState<{ current: EpochData; next: EpochData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Utility function to convert Lovelaces to ADA and format the value with thousands separators
  const formatAda = (value: number) => {
    return `₳${(value / 1e6).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEpochSchedules();
        setEpochData(data);
      } catch (error) {
        setError('Failed to fetch epoch data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl">
        
        {/* Vertical layout with both sections in one column */}
        <div className="grid grid-cols-1 gap-8">
          {/* Current Epoch Section */}
          <div>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-lg gap-x-4"> {/* Adjusted gap-x */}
                <span><i className="fas fa-calendar-day text-blue-600"></i>Current Epoch</span>
                <span className="text-blue-600">{epochData?.current.epoch}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-cubes text-blue-600"></i> Assigned Blocks</span>
                <span className="text-blue-600">{epochData?.current.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-chart-bar text-blue-600"></i> Blocks Ideal</span>
                <span className="text-blue-600">{epochData?.current.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-trophy text-blue-600"></i> Luck</span>
                <span className="text-blue-600">{epochData?.current.maxPerformance}%</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> Pool Active Stake</span>
                <span className="text-blue-600">{formatAda(epochData?.current.activeStake ?? 0)}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-wallet text-blue-600"></i> Total Active Stake</span>
                <span className="text-blue-600">{formatAda(epochData?.current.totalActiveStake ?? 0)}</span>
              </li>
            </ul>
          </div>
          
          {/* Next Epoch Section */}
          <div>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-lg gap-x-4">
                <span><i className="fas fa-calendar-day text-blue-600"></i>Next Epoch</span>
                <span className="text-blue-600">{epochData?.next.epoch}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-cubes text-blue-600"></i> Assigned Blocks</span>
                <span className="text-blue-600">{epochData?.next.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-chart-bar text-blue-600"></i> Blocks Ideal</span>
                <span className="text-blue-600">{epochData?.next.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-trophy text-blue-600"></i> Luck</span>
                <span className="text-blue-600">{epochData?.next.maxPerformance}%</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> Pool Active Stake</span>
                <span className="text-blue-600">{formatAda(epochData?.next.activeStake ?? 0)}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span><i className="fas fa-wallet text-blue-600"></i> Total Active Stake</span>
                <span className="text-blue-600">{formatAda(epochData?.next.totalActiveStake ?? 0)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
