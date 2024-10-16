import poolId from './variables/poolid';

import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards';

const PoolStats = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [lifetimeRewards, setLifetimeRewards] = useState<string | null>(null);
  const [previousPoolStats, setPreviousPoolStats] = useState<any>(null);
  const [previousLifetimeRewards, setPreviousLifetimeRewards] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPreviousPoolStats(poolStats); // Keep the previous stats until new ones are available
      setPoolStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchLifetimeRewards = async () => {
    try {
      const rewards = await getLifetimeRewards(poolId);
      setPreviousLifetimeRewards(lifetimeRewards); // Keep the previous rewards until new ones are available
      setLifetimeRewards(rewards);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPoolStats();
    fetchLifetimeRewards();

    const intervalId = setInterval(() => {
      fetchPoolStats();
      fetchLifetimeRewards();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-4">STAKEPOOL STATS</h3>
            <ul className="text-gray-300 space-y-4">
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>LIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveStake || previousPoolStats?.liveStake || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.activeStake || previousPoolStats?.activeStake || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>PLEDGE</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.pledge || previousPoolStats?.pledge || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-chart-line text-blue-400"></i> <strong>SATURATION</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveSaturation !== undefined ? `${poolStats.liveSaturation}%` : previousPoolStats?.liveSaturation !== undefined ? `${previousPoolStats.liveSaturation}%` : 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-users text-blue-400"></i> <strong>DELEGATORS</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.liveDelegators || previousPoolStats?.liveDelegators || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>EPOCH COST</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.fixedCost || previousPoolStats?.fixedCost || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-percentage text-blue-400"></i> <strong>MARGIN</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.margin !== undefined ? `${poolStats.margin}%` : previousPoolStats?.margin !== undefined ? `${previousPoolStats.margin}%` : 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-tasks text-blue-400"></i> <strong>LIFETIME BLOCKS</strong></span>
                <span className="text-blue-400 text-sm">{poolStats?.blockCount || previousPoolStats?.blockCount || 'Loading...'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-gift text-blue-400"></i> <strong>LIFETIME REWARDS</strong></span>
                <span className="text-blue-400 text-sm">{lifetimeRewards !== null ? lifetimeRewards : previousLifetimeRewards !== null ? previousLifetimeRewards : 'Loading...'}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
