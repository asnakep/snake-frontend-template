import { useState, useEffect } from 'react';
import { getLastRewards } from './queries/lastRewards';
import poolId from './variables/poolid';
import Image from 'next/image';

const PoolRewards = () => {
  const [rewardsData, setRewardsData] = useState<{ epoch: number; rewards: string; ros: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const rewards = await getLastRewards(poolId);
        setRewardsData(rewards);
      } catch (error) {
        setError('Failed to fetch rewards data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const renderContent = () => (
    <ul className="text-gray-300 space-y-3">
      <li className="flex justify-between items-center text-xs gap-x-4">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-calendar-day text-blue-400"></i>
          <strong>EPOCH</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right">
          {loading ? <span className="loading loading-ring loading-sm"></span> : rewardsData?.epoch}
        </span>
      </li>
      <li className="flex justify-between items-center text-xs gap-x-4">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-coins text-blue-400"></i>
          <strong>TOTAL</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right">
          {loading ? <span className="loading loading-ring loading-sm"></span> : rewardsData?.rewards}
        </span>
      </li>
      <li className="flex justify-between items-center text-xs gap-x-4 whitespace-nowrap">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-percentage text-blue-400"></i>
          <strong>EPOCH ROS</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right whitespace-nowrap">
          {loading ? <span className="loading loading-ring loading-sm"></span> : `${rewardsData?.ros}%`}
        </span>
      </li>
    </ul>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-base-300 rounded-lg p-6 mt-1">
        <h3 className="text-sm font-semibold text-white mb-6 flex items-center">
          <Image 
            src="/austral.png" 
            alt="Rewards Icon" 
            width={36}
            height={36}
            className="mr-3"
          />
          LAST REWARDS
        </h3>
        {renderContent()}
      </div>
    </div>
  );
};

export default PoolRewards;