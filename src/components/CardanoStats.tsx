import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTip } from './queries/queryTip';
import { getTokenomicStats } from './queries/tokenomicStats';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [tipData, setTipData] = useState<any>(null);
  const [tokenomicStats, setTokenomicStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCardanoStats = async () => {
    try {
      const stats = await getCardanoStats();
      setCardanoStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchTipData = async () => {
    try {
      const data = await getTip();
      setTipData(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

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
      await Promise.all([
        fetchCardanoStats(),
        fetchTipData(),
        fetchTokenomicStats(),
      ]);
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 20000); // Refresh data every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
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
              {/* Top section from getTip */}
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-calendar-alt text-blue-400"></i> <strong>EPOCH</strong></span>
                <span className="text-blue-400 text-sm">{tipData?.currEpoch}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-clock text-blue-400"></i> <strong>EPOCH SLOT</strong></span>
                <span className="text-blue-400 text-sm">{tipData?.epochSlot}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-cube text-blue-400"></i> <strong>BLOCK NUMBER</strong></span>
                <span className="text-blue-400 text-sm">{tipData?.blockNum}</span>
              </li>
              {/* Existing cardanoStats values */}
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-list text-blue-400"></i> <strong>TRANSACTION COUNT</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.txCount}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-cube text-blue-400"></i> <strong>BLOCK COUNT</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.blkCount}</span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40"><i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong></span>
                <span className="text-blue-400 text-sm">{cardanoStats?.activeStake}</span>
              </li>

              {/* Bottom section from tokenomicStats */}
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

export default CardanoStats;
