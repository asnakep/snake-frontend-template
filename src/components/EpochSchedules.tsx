import { useState, useEffect } from 'react';
import { fetchEpochSchedules } from './queries/epochSchedules';
import formatAda from './variables/formatAda'

interface EpochData {
  epoch: number;
  epochSlots: number;
  epochSlotsIdeal: number;
  maxPerformance: number;
  activeStake: number;
  totalActiveStake: number;
}

export const EpochStats = () => {
  const [epochData, setEpochData] = useState<EpochData | null>(null); // Updated state to only handle current epoch data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEpochSchedules();
        setEpochData(data.current); // Set only the current epoch data
      } catch (error) {
        setError('Failed to fetch epoch data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-sm font-semibold text-white">BLOCKS PRODUCTION</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between text-xs gap-x-4">
                <span className="text-blue-400 text-sm">Loading...</span>
                <span className="text-blue-400 text-sm">Loading...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
        {/* Vertical layout with both sections in one column */}
        <div className="grid grid-cols-1 gap-4">
          {/* Current Epoch Section */}
          <h3 className="text-sm font-semibold text-white">BLOCKS PRODUCTION</h3>
          <div>
            <ul className="text-gray-300 space-y-4">
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '160px' }}>
                  <i className="fas fa-calendar-day text-blue-400"></i><strong>EPOCH</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.epoch}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '160px' }}>
                  <i className="fas fa-cubes text-blue-400"></i><strong>SCHEDULED BLOCKS</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '160px' }}>
                  <i className="fas fa-chart-bar text-blue-400"></i><strong>BLOCKS IDEAL</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.epochSlotsIdeal}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '160px' }}>
                  <i className="fas fa-trophy text-blue-400"></i><strong>LUCK</strong>
                </span>
                <span className="text-blue-400 text-sm">{epochData?.maxPerformance}%</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '160px' }}>
                  <i className="fas fa-hand-holding-usd text-blue-400"></i><strong>POOL STAKE</strong>
                </span>
                <span className="text-blue-400 text-sm">{formatAda(epochData?.activeStake ?? 0)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
