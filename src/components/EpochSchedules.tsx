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
        <h2 className="text-2xl font-bold text-white mb-4">Epoch Stats</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Current Epoch</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-calendar-day text-blue-600"></i> Epoch</span>
                <span className="text-blue-600">{epochData?.current.epoch}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-cubes text-blue-600"></i> Assigned Blocks</span>
                <span className="text-blue-600">{epochData?.current.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-chart-bar text-blue-600"></i> Blocks Ideal</span>
                <span className="text-blue-600">{epochData?.current.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-trophy text-blue-600"></i> Assigned Luck</span>
                <span className="text-blue-600">{epochData?.current.maxPerformance}%</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> Pool Active Stake</span>
                <span className="text-blue-600">{epochData?.current.activeStake.toLocaleString()} ADA</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-wallet text-blue-600"></i> Total Active Stake</span>
                <span className="text-blue-600">{epochData?.current.totalActiveStake.toLocaleString()} ADA</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Next Epoch</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-calendar-day text-blue-600"></i> Next Epoch</span>
                <span className="text-blue-600">{epochData?.next.epoch}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-cubes text-blue-600"></i> Next Assigned Blocks</span>
                <span className="text-blue-600">{epochData?.next.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-chart-bar text-blue-600"></i> Next Blocks Ideal</span>
                <span className="text-blue-600">{epochData?.next.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-trophy text-blue-600"></i> Next Assigned Luck</span>
                <span className="text-blue-600">{epochData?.next.maxPerformance}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
