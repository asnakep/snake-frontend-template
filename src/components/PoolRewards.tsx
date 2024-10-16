import { useState, useEffect } from 'react';
import { getTokenomicStats } from './queries/tokenomicStats';

const PoolRewards = () => {
  const [tokenomicStats, setTokenomicStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenomicStats = async () => {
    try {
      const stats = await getTokenomicStats();
      setTokenomicStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTokenomicStats();
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 20000); // Refresh data every 20 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-4">POOL REWARDS</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>CIRCULATION</strong></span>
                <span className="text-blue-400 text-sm">{tokenomicStats?.circulation}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>TREASURY</strong></span>
                <span className="text-blue-400 text-sm">{tokenomicStats?.treasury}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>REWARD</strong></span>
                <span className="text-blue-400 text-sm">{tokenomicStats?.reward}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>SUPPLY</strong></span>
                <span className="text-blue-400 text-sm">{tokenomicStats?.supply}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>RESERVES</strong></span>
                <span className="text-blue-400 text-sm">{tokenomicStats?.reserves}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolRewards;
