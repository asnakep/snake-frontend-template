import { useState, useEffect } from 'react';
import { getLastRewards } from './queries/lastRewards'; // Import the function
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
        const rewards = await getLastRewards(poolId); // Fetch the rewards data
        setRewardsData(rewards);
      } catch (error) {
        setError('Failed to fetch rewards data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-2"> 
        <h3 className="text-sm font-semibold text-white mb-4">LAST REWARDS</h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-calendar-day text-blue-400"></i>
              <strong>REWARDS</strong>
            </span>
            <span className="text-blue-400 text-sm">
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-coins text-blue-400"></i>
              <strong>TOTAL</strong>
            </span>
            <span className="text-blue-400 text-sm">
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-percentage text-blue-400"></i>
              <strong>EPOCH ROS</strong>
            </span>
            <span className="text-blue-400 text-sm">
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-2"> 
        <h3 className="text-sm font-semibold text-white mb-4">LAST REWARDS</h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '194px' }}>
              <i className="fas fa-calendar-day text-blue-400"></i>
              <strong>EPOCH</strong>
            </span>
            <span className="text-blue-400 text-sm">{rewardsData?.epoch}</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '194px' }}>
              <i className="fas fa-coins text-blue-400"></i>
              <strong>TOTAL</strong>
            </span>
            <span className="text-blue-400 text-sm">{rewardsData?.rewards}</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '194px' }}>
              <i className="fas fa-percentage text-blue-400"></i>
              <strong>EPOCH ROS</strong>
            </span>
            <span className="text-blue-400 text-sm">{rewardsData?.ros}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PoolRewards;
