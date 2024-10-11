import { useState, useEffect } from "react";
import { getTip } from './queries/topHeaders';


const TopHeaders = () => {
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

          <h2 className="text-2xl font-bold text-white mb-4">{"Cardano Stakepool SN₳KE"}</h2>
          <p className="text-gray-400 mb-2">Ticker: <span className="text-white">{"SNAKE"}</span></p>
          <p className="text-gray-400 mb-4">ID: <span className="text-white">{poolStats?.poolIDBech}</span></p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-2">Statistics</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> LIVE STAKE</span>
                <span className="text-blue-600 text-sm">{poolStats?.liveStake}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> ACTIVE STAKE</span>
                <span className="text-blue-600 text-sm">{poolStats?.activeStake}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-hand-holding-usd text-blue-600"></i> PLEDGE</span>
                <span className="text-blue-600 text-sm">{poolStats?.pledge}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-chart-line text-blue-600"></i> SATURATION</span>
                <span className="text-blue-600 text-sm">{poolStats?.liveSaturation}%</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-users text-blue-600"></i> DELEGATORS</span>
                <span className="text-blue-600 text-sm">{poolStats?.liveDelegators}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-coins text-blue-600"></i> EPOCH COST</span>
                <span className="text-blue-600 text-sm">{poolStats?.fixedCost}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-percentage text-blue-600"></i> MARGIN</span>
                <span className="text-blue-600 text-sm">{poolStats?.margin}%</span>
              </li>
              <li className="flex justify-between text-xs">
                <span><i className="fas fa-tasks text-blue-600"></i> LIFETIME BLOCKS</span>
                <span className="text-blue-600 text-sm">{poolStats?.blockCount}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeaders;
