import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Define the type for the ADA price data
interface AdaPrice {
  rank: number;
  price: string;
  marketCap: string;
}

// Define a function to fetch the ADA price from the API
const fetchAdaPrice = async (): Promise<AdaPrice> => {
  const response = await fetch('/api/adaPrice'); // Fetch from the API route
  if (!response.ok) {
    throw new Error('Failed to fetch ADA price');
  }
  return await response.json(); // Return the JSON response
};

// Loading Popup Component
const LoadingPopup: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
        <div className="animate-spin mr-2">
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="blue" d="M4 12a8 8 0 0014.488 3.36l1.428-1.428A10 10 0 10 4 12z" />
          </svg>
        </div>
        <p className="text-lg text-gray-800">{message}</p>
      </div>
    </div>
  );
};

const AdaPricePanel = () => {
  const [adaPrice, setAdaPrice] = useState<AdaPrice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getAdaPrice = async () => {
    try {
      setLoading(true); // Set loading state before fetching
      const priceData = await fetchAdaPrice(); // Fetch the ADA price
      setAdaPrice(priceData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false); // Set loading state to false in either case
    }
  };

  useEffect(() => {
    getAdaPrice(); // Fetch the price when the component mounts
    const intervalId = setInterval(getAdaPrice, 1800000); // Refresh every 30 minutes
    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num: number | undefined | null): string => {
    return num != null
      ? num.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : '';
  };

  return (
    <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-md p-4 mb-1 relative">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <img src="/austral.png" alt="ADA Icon" className="w-11 h-11 mr-1" />
            <h2 className="text-lg text-gray-300 font-bold ml-3">ADA</h2>
          </div>

          <ul className="text-gray-300 space-y-1">
            {[ 
              { label: 'RANK', value: adaPrice?.rank },
              { label: 'PRICE', value: `$${adaPrice?.price}` },
              { label: 'MARKET CAP', value: `$${formatNumber(Number(adaPrice?.marketCap))}` },
            ].map(({ label, value }, index) => (
              <li key={index} className="flex justify-between text-xs">
                <span className="mt-1">
                  <strong>{label}</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font" style={{ width: '338px', textAlign: 'right' }}>
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : value || "N/A"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && <LoadingPopup />} {/* Show LoadingPopup when loading */}
    </div>
  );
};

export default AdaPricePanel;
