import poolId from './variables/poolid';
import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getLifetimeRewards } from './queries/lifetimeRewards';
import { getTip } from './queries/queryTip';
import { getBlocksCount } from './queries/blocksCount';
import { fetchEpochSchedules } from './queries/epochSchedules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';
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
        <div className="max-w-4xl w-full bg-base-300 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">SN₳KE</h3>
            <Image 
              src="/snake.svg" 
              alt="Snake Icon" 
              width={50}
              height={50}
              className="ml-6"
            />
          </div>
          <ul className="text-gray-400 space-y-2">
            {[ 
              { label: 'Epoch', value: currentEpoch },
              { label: 'Minted Blocks', value: blockCount !== null && scheduledBlocks !== null ? `${blockCount} / ${scheduledBlocks}` : null },
              { label: 'Live Stake', value: poolStats?.liveStake },
              { label: 'Active Stake', value: poolStats?.activeStake },
              { label: 'Pledge', value: poolStats?.pledge },
              { label: 'Saturation', value: poolStats?.liveSaturation !== undefined ? (
                <span className={getSaturationClass(poolStats.liveSaturation)}>
                  {`${poolStats.liveSaturation}%`}
                </span>
              ) : undefined },
              { label: 'Delegators', value: poolStats?.liveDelegators },
              { label: 'Epoch Cost', value: poolStats?.fixedCost },
              { label: 'Margin', value: poolStats?.margin !== undefined ? `${poolStats.margin}%` : undefined },
              { label: 'Lifetime Blocks', value: poolStats?.blockCount },
              { label: 'Lifetime Rewards', value: lifetimeRewards },
            ].map(({ label, value }, index) => (
              <li key={index} className="flex justify-between items-center text-sm gap-x-4">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faCube} className="text-gray-400 mr-2" />
                  <strong>{label}</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font" style={{ width: '180px', textAlign: 'right' }}>
                  {value !== undefined && value !== null ? value : <span className="loading loading-ring loading-sm"></span>}
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
