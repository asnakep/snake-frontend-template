import { useState, useEffect } from 'react';
import { getLastRewards } from './queries/lastRewards';
import poolId from './variables/poolid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
    <ul className="text-gray-300 space-y-2">
      <li className="flex justify-between text-xs gap-x-4">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-calendar-day text-blue-400"></i>
          <strong>EPOCH</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right">
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : rewardsData?.epoch}
        </span>
      </li>
      <li className="flex justify-between text-xs gap-x-4">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-coins text-blue-400"></i>
          <strong>TOTAL</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right">
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : rewardsData?.rewards}
        </span>
      </li>
      <li className="flex justify-between text-xs gap-x-4">
        <span className="flex-grow-0 min-w-[60px]" style={{ marginRight: '180px' }}>
          <i className="fas fa-percentage text-blue-400"></i>
          <strong>EPOCH ROS</strong>
        </span>
        <span className="text-blue-400 text-sm custom-font min-w-[60px] text-right">
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : `${rewardsData?.ros}%`}
        </span>
      </li>
    </ul>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-2">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
          <img src="/austral.png" alt="Rewards Icon" className="w-9 h-9 mr-3" />
          LAST REWARDS
        </h3>
        {renderContent()}
      </div>
    </div>
  );
};

export default PoolRewards;
