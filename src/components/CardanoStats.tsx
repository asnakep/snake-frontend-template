import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTip } from './queries/queryTip';
import Image from 'next/image';

interface CardanoStatsProps {
  setLoading: (loading: boolean) => void; // Callback to set loading state
}

const CardanoStats = ({ setLoading }: CardanoStatsProps) => {
  const [cardanoStats, setCardanoStats] = useState<any>(null);
  const [tipData, setTipData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
  const [progressLoading, setProgressLoading] = useState<boolean>(false); // Loading state for progress bar

  const fetchCardanoStats = async () => {
    try {
      setProgressLoading(true);
      const stats = await getCardanoStats();
      setCardanoStats(stats);
      setProgressLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setProgressLoading(false);
    }
  };

  const fetchTipData = async () => {
    try {
      setProgressLoading(true);
      const data = await getTip();
      setTipData(data);
      setProgressLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setProgressLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setIsLoading(true); // Indicate loading
      await Promise.all([fetchTipData(), fetchCardanoStats()]);
      setLoading(false); // End loading
      setIsLoading(false); // Data fetching complete
    };

    fetchData();
    const intervalId = setInterval(fetchTipData, 60000);
    return () => clearInterval(intervalId);
  }, [setLoading]);

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
        <div className="max-w-4xl w-full bg-base-300 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image 
                src="logo-cardano.svg" 
                alt="Cardano Logo" 
                width={48} 
                height={48} 
                className="h-12 w-12"
              />
              <h3 className="text-white text-lg font-bold ml-4">CARDANO</h3>
            </div>
            <div className="relative w-60 bg-base-100 h-7 overflow-hidden rounded-sm ml-2">
              {/* Loading bar while fetching data */}
              {progressLoading ? (
                <div className="absolute top-0 left-0 h-full bg-blue-800 transition-all duration-300" style={{ width: `${epochProgressPercent}%` }}></div>
              ) : (
                <>
                  <div
                    className="absolute top-0 left-0 bg-blue-800 h-full rounded-sm"
                    style={{ width: `${epochProgressPercent}%` }}
                  ></div>
                  <div className="absolute inset-0 flex justify-center items-center text-white font-semibold text-sm">
                    <span>Epoch {formatNumber(epoch) || "N/A"} - {`${epochProgressPercent}%`}</span>
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
                    {value !== undefined && value !== null ? formatNumber(value) : <span className="loading loading-ring loading-sm"></span>}
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