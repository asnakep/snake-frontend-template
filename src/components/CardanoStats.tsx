import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTip } from './queries/queryTip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [tipData, setTipData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTipData(), fetchCardanoStats()]);
      setLoading(false);
    };

    fetchData();
    const intervalId = setInterval(fetchTipData, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const totalSlots = 432000;
  const epochSlot = tipData?.epochSlot;
  const epoch = tipData?.currEpoch;
  const epochProgressPercent = typeof epochSlot === 'number' ? ((epochSlot / totalSlots) * 100).toFixed(1) : "N/A";

  const formatNumber = (num: number | undefined | null): string => {
    return num != null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src="logo-cardano.svg" alt="Cardano Logo" className="h-12 w-12" />
              <h3 className="text-white text-lg font-bold ml-4">CARDANO</h3>
            </div>
            <div className="relative w-60 bg-black-800 h-7 overflow-hidden rounded-sm ml-2">
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center text-white">
                  <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
                </div>
              ) : (
                <>
                  <div
                    className="absolute top-0 left-10 bg-blue-800 h-full rounded-sm"
                    style={{ width: `${epochProgressPercent}%` }}
                  ></div>
                  <div className="absolute inset-0 flex justify-center items-center text-white font-semibold text-sm">
                    <span className="px-6">Epoch {formatNumber(epoch) || "N/A"}</span>
                  </div>
                  <div className="absolute inset-0 flex justify-end items-center pr-2 text-white font-semibold text-sm">
                    <span className="px-6">{`${epochProgressPercent}%`}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-2">
            <ul className="text-gray-300 space-y-2">
              {[
                { label: 'EPOCH', value: epoch },
                { label: 'SLOT', value: epochSlot },
                { label: 'BLOCK', value: tipData?.blockNum },
                { label: 'TXS COUNT', value: cardanoStats?.txCount },
                { label: 'BLOCK COUNT', value: cardanoStats?.blkCount }
              ].map(({ label, value }, index) => (
                <li key={index} className="flex justify-between text-xs">
                  <span className="mr-60">
                    <i className={`fas fa-${label === 'EPOCH' ? 'calendar-alt' : label === 'SLOT' ? 'clock' : 'cube'} text-blue-400`}></i> <strong>{label}</strong>
                  </span>
                  <span className="text-blue-400 text-sm custom-font">
                    {value !== undefined && value !== null ? formatNumber(value) : <FontAwesomeIcon icon={faSpinner} spin />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardanoStats;
