import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';

const Koios = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats('pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx');
      setPoolStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPoolStats(); // Fetch data initially

    // Set up interval to refresh data every minute
    const intervalId = setInterval(fetchPoolStats, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">{"SN₳KE"}</h2>
          <p className="text-gray-400 mb-2">Ticker: <span className="text-white">{"SNAKE"}</span></p>
          <p className="text-gray-400 mb-4">ID: <span className="text-white">{poolStats?.poolIDBech}</span></p>
          
          {/* White square button */}
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded-md shadow-lg cursor-pointer hover:bg-gray-200">
              <span className="text-center text-black">Connect</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">Statistics</h3>
            <ul className="text-gray-300">
              <li><i className="fas fa-users text-blue-600"></i> Delegators <span className="text-blue-600">{poolStats?.liveDelegators}</span></li>
              <li><i className="fas fa-coins text-blue-600"></i> Epoch Cost <span className="text-blue-600">{poolStats?.fixedCost}</span></li>
              <li><i className="fas fa-percentage text-blue-600"></i> Margin <span className="text-blue-600">{poolStats?.margin}%</span></li>
              <li><i className="fas fa-hand-holding-usd text-blue-600"></i> Pledge <span className="text-blue-600">{poolStats?.pledge}</span></li>
              <li><i className="fas fa-hand-holding-usd text-blue-600"></i> Active Stake <span className="text-blue-600">{poolStats?.activeStake}</span></li>
              <li><i className="fas fa-hand-holding-usd text-blue-600"></i> Live Stake <span className="text-blue-600">{poolStats?.liveStake}</span></li>
              <li><i className="fas fa-tasks text-blue-600"></i> Lifetime Blocks <span className="text-blue-600">{poolStats?.blockCount}</span></li>
              <li><i className="fas fa-chart-line text-blue-600"></i> Saturation <span className="text-blue-600">{poolStats?.liveSaturation}%</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Koios;
