import poolId from './variables/poolid';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards';
import { getTip } from './queries/queryTip';
import { getBlocksCount } from './queries/blocksCount';
import { fetchEpochSchedules } from './queries/epochSchedules'; // Importing fetchEpochSchedules

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
      setCurrentEpoch(tip.currEpoch);

      const count = await getBlocksCount(poolId, tip.currEpoch);
      setBlockCount(count);

      const epochData = await fetchEpochSchedules(); // Preloading the epoch schedule
      setScheduledBlocks(epochData.current.epochSlots);
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
    }, 1800000); // Refreshes the data every 30 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
            <img src="/snake.png" alt="Snake Icon" className="w-9 h-9 mr-3" />
            SN₳KE STATISTICS
          </h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>EPOCH</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {currentEpoch !== null ? currentEpoch : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>MINTED BLOCKS</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {blockCount !== null && scheduledBlocks !== null ? `${blockCount} / ${scheduledBlocks}` : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIVE STAKE</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.liveStake !== undefined ? poolStats.liveStake : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>ACTIVE STAKE</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.activeStake !== undefined ? poolStats.activeStake : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>PLEDGE</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.pledge !== undefined ? poolStats.pledge : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>SATURATION</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.liveSaturation !== undefined ? `${poolStats.liveSaturation}%` : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>DELEGATORS</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.liveDelegators !== undefined ? poolStats.liveDelegators : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>EPOCH COST</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.fixedCost !== undefined ? poolStats.fixedCost : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>MARGIN</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.margin !== undefined ? `${poolStats.margin}%` : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIFETIME BLOCKS</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {poolStats?.blockCount !== undefined ? poolStats.blockCount : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40">
                <strong>LIFETIME REWARDS</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {lifetimeRewards !== null ? lifetimeRewards : <FontAwesomeIcon icon={faSpinner} spin />}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
