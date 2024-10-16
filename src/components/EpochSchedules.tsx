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
        // Fetch epoch schedules
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

  if (loading) return <div className="text-white"></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
        {/* Vertical layout with both sections in one column */}
        <div className="grid grid-cols-1 gap-4">
          {/* Current Epoch Section */}
          <h3 className="text-sm font-semibold text-white">BLOCKS PRODUCTION</h3>
          <div>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs gap-x-4">
                <span className="mr-20">
                  <i className="fas fa-calendar-day text-blue-400"></i><strong>EPOCH</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.current.epoch}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span className="mr-20">
                  <i className="fas fa-cubes text-blue-400"></i><strong>SCHEDULED BLOCKS</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.current.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span className="mr-20">
                  <i className="fas fa-chart-bar text-blue-400"></i><strong>BLOCKS IDEAL</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.current.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span className="mr-20">
                  <i className="fas fa-trophy text-blue-400"></i><strong>LUCK</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.current.maxPerformance}%</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span className="mr-20">
                  <i className="fas fa-hand-holding-usd text-blue-400"></i><strong>POOL STAKE</strong>
                </span>
                <span className="text-blue-400 text-sm">{formatAda(epochData?.current.activeStake ?? 0)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
