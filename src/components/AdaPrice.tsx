import { useState, useEffect } from 'react';
import { getAdaPrice } from './queries/adaPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdaPricePanel = () => {
  const [adaPrice, setAdaPrice] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdaPrice = async () => {
    try {
      const priceData = await getAdaPrice();
      setAdaPrice(priceData);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdaPrice();
    const intervalId = setInterval(fetchAdaPrice, 1800000); // Refresh every 30 minutes
    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num: number | undefined | null): string => {
    return num != null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };

  return (
    <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-4 mb-1">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          {/* Header with ADA icon and title */}
          <div className="flex items-center mb-4">
            <img src="/austral.png" alt="ADA Icon" className="w-11 h-11 mr-1" />
            <h2 className="text-lg text-gray-300 font-bold ml-3">ADA</h2>
          </div>

          <ul className="text-gray-300 space-y-1">
            <li className="flex justify-between text-xs">
              <span style={{ marginRight: '194px' }} className="mt-1">
                <i className="fas fa-chart-line text-blue-400"></i> <strong>RANK</strong>
              </span>
              <span className="text-blue-400 text-sm mt-2 custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : adaPrice?.rank || "N/A"}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span style={{ marginRight: '194px' }} className="mt-1">
                <i className="fas fa-dollar-sign text-blue-400"></i> <strong>PRICE (USD)</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : `$${adaPrice?.price || "N/A"}`}
              </span>
            </li>
            <li className="flex justify-between text-xs">
              <span style={{ marginRight: '194px' }} className="mt-2">
                <i className="fas fa-landmark text-blue-400"></i> <strong>MARKET CAP</strong>
              </span>
              <span className="text-blue-400 text-sm custom-font">
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : `$${formatNumber(adaPrice?.marketCap) || "N/A"}`}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdaPricePanel;
