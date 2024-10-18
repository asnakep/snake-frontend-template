import { useState, useEffect } from 'react';
import { getTokenomicStats } from './queries/tokenomicStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TokenomicsPanel = () => {
  const [tokenomicStats, setTokenomicStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTokenomicStats = async () => {
    try {
      const stats = await getTokenomicStats();
      setTokenomicStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchTokenomicStats();
    const intervalId = setInterval(fetchTokenomicStats, 20000); // Refresh every 20 seconds
    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num: number | undefined | null): string => {
    return num != null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };

  return (
    <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <ul className="text-gray-300 space-y-2">
            <li className="flex justify-between text-xs">
              <span className="mr-40 mt-2">
                <i className="fas fa-coins text-blue-400"></i> <strong>CIRCULATION</strong>
              </span>
              <span className="text-blue-400 text-sm mt-2 custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : formatNumber(tokenomicStats?.circulation) || "N/A"}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40 mt-2">
                <i className="fas fa-boxes text-blue-400"></i> <strong>SUPPLY</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : formatNumber(tokenomicStats?.supply) || "N/A"}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span className="mr-40 mt-2">
                <i className="fas fa-piggy-bank text-blue-400"></i> <strong>TREASURY</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : formatNumber(tokenomicStats?.treasury) || "N/A"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TokenomicsPanel;
