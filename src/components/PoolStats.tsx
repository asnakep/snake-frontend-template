import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards'; // Import the function

const poolId = "pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx";

const PoolStats = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [lifetimeRewards, setLifetimeRewards] = useState<string | null>(null); // Change to string | null
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPoolStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchLifetimeRewards = async () => {
    try {
      const rewards = await getLifetimeRewards(poolId);
      setLifetimeRewards(rewards); // rewards is now a string
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      await Promise.all([fetchPoolStats(), fetchLifetimeRewards()]);
      setLoading(false); // Set loading to false after fetching
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : loading ? ( // Show loading skeleton while loading
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-4">STAKEPOOL STATS</h3>
            <ul className="text-gray-300 space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <li key={index} className="flex justify-between text-xs animate-pulse">
                  <span className="mr-40 bg-gray-700 rounded w-1/3 h-4"></span>
                  <span className="bg-gray-700 rounded w-1/4 h-4"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : ( // Show actual data once loading is complete
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
          <div className="mt-2"> {/* Reduced top margin for the statistics section */}
            <h3 className="text-sm font-semibold text-white mb-4">STAKEPOOL STATS</h3>
            <ul className="text-gray-300 space-y-4">
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>LIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveStake}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.activeStake}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>PLEDGE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.pledge}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-chart-line text-blue-400"></i> <strong>SATURATION</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveSaturation}%</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-users text-blue-400"></i> <strong>DELEGATORS</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveDelegators}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>EPOCH COST</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.fixedCost}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-percentage text-blue-400"></i> <strong>MARGIN</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.margin}%</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-tasks text-blue-400"></i> <strong>LIFETIME BLOCKS</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.blockCount}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-gift text-blue-400"></i> <strong>LIFETIME REWARDS</strong></span>
                <span className="text-blue-400 text-sm">{lifetimeRewards !== null ? lifetimeRewards : 'Loading...'}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
