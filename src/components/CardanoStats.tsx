import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTip } from './queries/queryTip';
import { getTokenomicStats } from './queries/tokenomicStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [tipData, setTipData] = useState<any>(null);
  const [tokenomicStats, setTokenomicStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // State to retain previous values
  const [previousEpoch, setPreviousEpoch] = useState<number | null>(null);
  const [previousEpochSlot, setPreviousEpochSlot] = useState<number | null>(null);

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
      setLoading(true);
      await Promise.all([fetchCardanoStats(), fetchTipData(), fetchTokenomicStats()]);
      setLoading(false);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000); // Refresh every 20 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Calculate epoch progress as a percentage (hardcoded 432000 slots per epoch)
  const totalSlots = 432000;
  const epochSlot = loading ? previousEpochSlot : tipData?.epochSlot;
  const epoch = loading ? previousEpoch : tipData?.currEpoch;
  const epochProgressPercent = typeof epochSlot === 'number' ? ((epochSlot / totalSlots) * 100).toFixed(1) : "N/A";

  // Update previous values when new data is fetched
  useEffect(() => {
    if (tipData) {
      setPreviousEpoch(tipData.currEpoch);
      setPreviousEpochSlot(tipData.epochSlot);
    }
  }, [tipData]);

  // Function to format numbers with thousand separators
  const formatNumber = (num: number | undefined | null): string => {
    return num != null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          {/* Epoch Progress Bar at the top */}
          <div className="flex items-center justify-between mb-6">
            <img src="logo-cardano.svg" alt="Cardano Logo" className="h-12 w-12" />
            <div className="relative w-64 bg-black-800 h-8 overflow-hidden rounded-sm ml-2">
              <div
                className="absolute top-0 left-0 bg-blue-800 h-full rounded-sm"
                style={{ width: typeof epochProgressPercent === 'string' && epochProgressPercent !== "N/A" ? `${epochProgressPercent}%` : "0%" }}
              ></div>
              <div className="absolute inset-0 flex justify-center items-center text-white font-semibold text-lg">
                <span>
                  Epoch {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : formatNumber(epoch || "N/A")}
                </span>
              </div>
              <div className="absolute inset-0 flex justify-end items-center pr-2 text-white font-semibold text-lg">
                <span className="m-2">
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : `${epochProgressPercent}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-sm font-semibold text-white mb-4">CARDANO</h3>
            <ul className="text-gray-300 space-y-2">
              {/* Top section from getTip */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-calendar-alt text-blue-400"></i> <strong>EPOCH</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : formatNumber(epoch) || "N/A"}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-clock text-blue-400"></i> <strong>SLOT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(epochSlot) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-cube text-blue-400"></i> <strong>BLOCK</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(tipData?.blockNum) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              {/* Existing cardanoStats values */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-list text-blue-400"></i> <strong>TXS COUNT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(cardanoStats?.txCount) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-cube text-blue-400"></i> <strong>BLOCK COUNT</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(cardanoStats?.blkCount) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-hand-holding-usd text-blue-400"></i> <strong>ACTIVE STAKE</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(cardanoStats?.activeStake) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              {/* Bottom section from tokenomicStats */}
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-coins text-blue-400"></i> <strong>CIRCULATION</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(tokenomicStats?.circulation) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-piggy-bank text-blue-400"></i> <strong>TREASURY</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(tokenomicStats?.treasury) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-coins text-blue-400"></i> <strong>SUPPLY</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(tokenomicStats?.supply) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
                </span>
              </li>
              <li className="flex justify-between text-xs">
                <span className="mr-40">
                  <i className="fas fa-balance-scale text-blue-400"></i> <strong>RESERVES</strong>
                </span>
                <span className="text-blue-400 text-sm">
                  {formatNumber(tokenomicStats?.reserves) || (loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "N/A")}
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
