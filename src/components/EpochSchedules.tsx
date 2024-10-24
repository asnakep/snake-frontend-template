import { useState, useEffect } from 'react';
import { fetchEpochSchedules } from './queries/epochSchedules';

interface EpochData {
  epoch: number;
  epochSlots: number;
  epochSlotsIdeal: number;
  maxPerformance: number;
  activeStake: number;
  totalActiveStake: number;
}

export const EpochStats = () => {
  const [epochData, setEpochData] = useState<EpochData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEpochSchedules();

        // Only update the state if the data is new
        if (JSON.stringify(data.current) !== JSON.stringify(epochData)) {
          setEpochData(data.current);
        }
      } catch (error) {
        setError('Failed to fetch epoch data.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch data on page load
    getData();

    // Poll for new data every hour (3600000 ms)
    const interval = setInterval(() => {
      getData();
    }, 3600000); // 1 hour

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [epochData]); // Add epochData to the dependency array to compare on each interval

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-sm font-semibold text-white">BLOCKS PRODUCTION</h3>
          <div className="space-y-2">
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
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-semibold text-white flex items-center">
            <img src="/block.png" alt="Blocks Icon" className="w-9 h-9 mr-3" />
            BLOCKS PRODUCTION
          </h3>
          <div>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '218px' }}>
                  <i className="fas fa-calendar-day text-blue-400"></i>
                  <strong>EPOCH</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.epoch}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '218px' }}>
                  <i className="fas fa-cubes text-blue-400"></i>
                  <strong>ASSIGNED</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.epochSlots}</span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '218px' }}>
                  <i className="fas fa-chart-bar text-blue-400"></i>
                  <strong>EXPECTED</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">
                  {epochData?.epochSlotsIdeal !== undefined ? Math.round(epochData.epochSlotsIdeal) : null}
                </span>
              </li>
              <li className="flex justify-between text-xs gap-x-4">
                <span style={{ marginRight: '218px' }}>
                  <i className="fas fa-trophy text-blue-400"></i>
                  <strong>LUCK</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.maxPerformance}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
