import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTip } from './queries/queryTip';
import { getTokenomicStats } from './queries/tokenomicStats';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [tipData, setTipData] = useState<any>(null);
  const [tokenomicStats, setTokenomicStats] = useState<any>(null);
  const [previousCardanoStats, setPreviousCardanoStats] = useState<any>(null);
  const [previousTipData, setPreviousTipData] = useState<any>(null);
  const [previousTokenomicStats, setPreviousTokenomicStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCardanoStats = async () => {
    try {
      const stats = await getCardanoStats();
      setPreviousCardanoStats(cardanoStats); // Store previous stats
      setCardanoStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchTipData = async () => {
    try {
      const data = await getTip();
      setPreviousTipData(tipData); // Store previous tip data
      setTipData(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchTokenomicStats = async () => {
    try {
      const stats = await getTokenomicStats();
      setPreviousTokenomicStats(tokenomicStats); // Store previous tokenomic stats
      setTokenomicStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      await Promise.all([
        fetchCardanoStats(),
        fetchTipData(),
        fetchTokenomicStats(),
      ]);
      setLoading(false); // Set loading to false after data is fetched
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
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4"> {/* Updated bg color */}
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-2">CARDANO MAINNET STATS</h3> {/* Reduced margin-bottom */}
            <ul className="text-gray-300 space-y-2"> {/* Changed space-y-4 to space-y-2 */}
              {/* Top section from getTip */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-calendar-alt text-blue-400"></i> <strong>EPOCH</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {tipData?.currEpoch || previousTipData?.currEpoch || 'loading'}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-clock text-blue-400"></i> <strong>SLOT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {tipData?.epochSlot || previousTipData?.epochSlot || 'loading'}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-cube text-blue-400"></i> <strong>BLOCK</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {tipData?.blockNum || previousTipData?.blockNum || 'loading'}
                </span>
              </li>
              {/* Existing cardanoStats values */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-list text-blue-400"></i> <strong>TXS COUNT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {cardanoStats?.txCount || previousCardanoStats?.txCount || 'loading'}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-cube text-blue-400"></i> <strong>BLOCK COUNT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {cardanoStats?.blkCount || previousCardanoStats?.blkCount || 'loading'}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {cardanoStats?.activeStake || previousCardanoStats?.activeStake || 'loading'}
                </span>
              </li>
              {/* Bottom section from tokenomicStats */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-coins text-blue-400"></i> <strong>CIRCULATION</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {tokenomicStats?.circulation || previousTokenomicStats?.circulation || 'loading'}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-coins text-blue-400"></i> <strong>TREASURY</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {tokenomicStats?.treasury || previousTokenomicStats?.treasury || 'loading'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardanoStats;
