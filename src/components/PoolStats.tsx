import poolId from './variables/poolid';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards';
import { getTip } from './queries/queryTip';
import { getBlocksCount } from './queries/blocksCount';
import { fetchEpochSchedules } from './queries/epochSchedules';
import Image from 'next/image';

const PoolStats = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [lifetimeRewards, setLifetimeRewards] = useState<string | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null);
  const [blockCount, setBlockCount] = useState<number | null>(null);
  const [scheduledBlocks, setScheduledBlocks] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const [stats, tip, epochData] = await Promise.all([
        getPoolStats(poolId),
        getTip(),
        fetchEpochSchedules(),
      ]);
  
      setPoolStats(stats);
      setScheduledBlocks(epochData.current.epochSlots);
  
      const count = await getBlocksCount(poolId, tip.currEpoch);
      setBlockCount(count);
  
      setCurrentEpoch(tip.currEpoch);
  
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

  // Specify the type for saturation parameter
  const getSaturationClass = (saturation: number) => {
    if (saturation > 95) {
      return 'text-red-500'; // Red for saturation > 95%
    } else if (saturation > 90) {
      return 'text-orange-500'; // Orange for saturation > 90%
    }
    return 'text-blue-400'; // Default color for saturation <= 90%
  };

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-gray-900 rounded-lg p-6 mb-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
            <Image 
              src="/snake.png" 
              alt="Snake Icon" 
              width={36} // Set the width in pixels
              height={36} // Set the height in pixels
              className="mr-3" // Keep your margin class
            />
            SN₳KE STATISTICS
          </h3>
          <ul className="text-gray-300 space-y-2">
            {[ 
              { label: 'EPOCH', value: currentEpoch },
              { label: 'MINTED BLOCKS', value: blockCount !== null && scheduledBlocks !== null ? `${blockCount} / ${scheduledBlocks}` : null },
              { label: 'LIVE STAKE', value: poolStats?.liveStake },
              { label: 'ACTIVE STAKE', value: poolStats?.activeStake },
              { label: 'PLEDGE', value: poolStats?.pledge },
              { label: 'SATURATION', value: poolStats?.liveSaturation !== undefined ? (
                <span className={getSaturationClass(poolStats.liveSaturation)}>
                  {`${poolStats.liveSaturation}%`}
                </span>
              ) : undefined },
              { label: 'DELEGATORS', value: poolStats?.liveDelegators },
              { label: 'EPOCH COST', value: poolStats?.fixedCost },
              { label: 'MARGIN', value: poolStats?.margin !== undefined ? `${poolStats.margin}%` : undefined },
              { label: 'LIFETIME BLOCKS', value: poolStats?.blockCount },
              { label: 'LIFETIME REWARDS', value: lifetimeRewards },
            ].map(({ label, value }, index) => (
              <li key={index} className="flex justify-between text-xs">
                <span className="w-40">
                  <strong>{label}</strong>
                </span>
                <span className="text-sm custom-font" style={{ width: '180px', textAlign: 'right' }}>
                  {value !== undefined && value !== null ? value : <FontAwesomeIcon icon={faSpinner} spin />}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
