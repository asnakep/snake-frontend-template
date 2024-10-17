import poolId from './variables/poolid';
import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards';
import { getTip } from './queries/queryTip';
import { getBlocksCount } from './queries/blocksCount'; 
import { fetchEpochSchedules } from './queries/epochSchedules';

const PoolStats = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [lifetimeRewards, setLifetimeRewards] = useState<string | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null);
  const [blockCount, setBlockCount] = useState<number | null>(null);
  const [scheduledBlocks, setScheduledBlocks] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPoolStats(stats);

      const tip = await getTip(); 
      setCurrentEpoch(tip.currEpoch); // Fetch current epoch

      const count = await getBlocksCount(poolId, tip.currEpoch); // Fetch minted blocks
      setBlockCount(count);

      const epochData = await fetchEpochSchedules(); // Fetch current epoch scheduled blocks
      setScheduledBlocks(epochData.current.epochSlots); // Set the scheduled blocks
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchLifetimeRewards = async () => {
    try {
      const rewards = await getLifetimeRewards(poolId);
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
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-sm font-semibold text-white mb-4">SN₳KE STATISTICS</h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>EPOCH</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {currentEpoch || '0'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>MINTED BLOCKS</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {`${blockCount || '0'} / ${scheduledBlocks || '0'}`}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIVE STAKE</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.liveStake || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>ACTIVE STAKE</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.activeStake || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>PLEDGE</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.pledge || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>SATURATION</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.liveSaturation !== undefined ? `${poolStats.liveSaturation}%` : 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>DELEGATORS</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.liveDelegators || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>EPOCH COST</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.fixedCost || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>MARGIN</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.margin !== undefined ? `${poolStats.margin}%` : 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIFETIME BLOCKS</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {poolStats?.blockCount || 'Loading...'}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIFETIME REWARDS</strong>
              </span>
              <span className="text-blue-400 text-sm">
                {lifetimeRewards !== null ? lifetimeRewards : 'Loading...'}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
