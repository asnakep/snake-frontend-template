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
          
          {/* Cornice style element */}
          <div className="bg-white w-full h-2 rounded-t-lg mb-4"></div>

          <h2 className="text-2xl font-bold text-white mb-4">{"SN₳KE"}</h2>
          <p className="text-gray-400 mb-2">Ticker: <span className="text-white">{"SNAKE"}</span></p>
          <p className="text-gray-400 mb-4">ID: <span className="text-white">{poolStats?.poolIDBech}</span></p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-2">Statistics</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between"><span><i className="fas fa-users text-blue-600"></i> Delegators</span> <span className="text-blue-600">{poolStats?.liveDelegators}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-coins text-blue-600"></i> Epoch Cost</span> <span className="text-blue-600">{poolStats?.fixedCost}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-percentage text-blue-600"></i> Margin</span> <span className="text-blue-600">{poolStats?.margin}%</span></li>
              <li className="flex justify-between"><span><i className="fas fa-hand-holding-usd text-blue-600"></i> Pledge</span> <span className="text-blue-600">{poolStats?.pledge}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-hand-holding-usd text-blue-600"></i> Active Stake</span> <span className="text-blue-600">{poolStats?.activeStake}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-hand-holding-usd text-blue-600"></i> Live Stake</span> <span className="text-blue-600">{poolStats?.liveStake}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-tasks text-blue-600"></i> Lifetime Blocks</span> <span className="text-blue-600">{poolStats?.blockCount}</span></li>
              <li className="flex justify-between"><span><i className="fas fa-chart-line text-blue-600"></i> Saturation</span> <span className="text-blue-600">{poolStats?.liveSaturation}%</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Koios;
