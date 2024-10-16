import { useState, useEffect } from 'react';
import { getLastRewards } from './queries/lastRewards'; // Import the function

const poolId = "pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx";

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
      <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
        <ul className="text-gray-300 space-y-4">
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-calendar-day text-blue-400"></i>
              <strong>REWARDS</strong>
            </span>
            <span className="text-blue-400 text-sm">Loading...</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-coins text-blue-400"></i>
              <strong>TOTAL</strong>
            </span>
            <span className="text-blue-400 text-sm">Loading...</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-percentage text-blue-400"></i>
              <strong>EPOCH ROS</strong>
            </span>
            <span className="text-blue-400 text-sm">Loading...</span>
          </li>
        </ul>
      </div>
    </div>
  );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
        <ul className="text-gray-300 space-y-4">
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-calendar-day text-blue-400"></i>
              <strong>REWARDS</strong>
            </span>
            <span className="text-blue-400 text-sm">{rewardsData?.epoch}</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
              <i className="fas fa-coins text-blue-400"></i>
              <strong>TOTAL</strong>
            </span>
            <span className="text-blue-400 text-sm">{rewardsData?.rewards}</span>
          </li>
          <li className="flex justify-between text-xs gap-x-4">
            <span style={{ marginRight: '204px' }}>
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
