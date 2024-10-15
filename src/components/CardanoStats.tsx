import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCardanoStats = async () => {
    try {
      const stats = await getCardanoStats();
      setCardanoStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCardanoStats();

    const intervalId = setInterval(() => {
      fetchCardanoStats(); // Refresh stats every minute
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
            <h3 className="text-sm font-semibold text-white mb-4">CARDANO MAINNET STATS</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-clock text-blue-400"></i> <strong>EPOCH NUMBER</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.epochNo || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-exchange-alt text-blue-400"></i> <strong>TOTAL OUTPUT</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.outSum || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-coins text-blue-400"></i> <strong>TOTAL FEES</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.fees || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-list text-blue-400"></i> <strong>TRANSACTION COUNT</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.txCount || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-cube text-blue-400"></i> <strong>BLOCK COUNT</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.blkCount || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-clock text-blue-400"></i> <strong>START TIME</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.startTime || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-clock text-blue-400"></i> <strong>END TIME</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.endTime || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.activeStake || 'N/A'}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-gift text-blue-400"></i> <strong>AVERAGE BLOCK REWARD</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.avgBlkReward || 'N/A'}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardanoStats;
