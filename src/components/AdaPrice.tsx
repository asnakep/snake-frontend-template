import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <div className="max-w-4xl w-full bg-base-300 rounded-lg p-4 mt-1">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-lg text-gray-300 font-bold mb-4">ADA</h2>
            <Image 
              src="/austral.png" 
              alt="ADA Icon" 
              width={32} // Adjust as needed 
              height={32} // Adjust as needed 
              className="ml-1 mb-4"
            />
          </div>

          <ul className="text-gray-300 space-y-2">
            {[
              { label: 'RANK', value: adaPrice?.rank },
              { label: 'PRICE', value: `$${adaPrice?.price}` },
              { label: 'MARKET CAP', value: `$${formatNumber(Number(adaPrice?.marketCap))}` },
            ].map(({ label, value }, index) => (
              <li key={index} className="flex justify-between items-center text-xs">
                <span className="mt-2 whitespace-nowrap">
                  <strong>{label}</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font" style={{ width: '338px', textAlign: 'right' }}>
                  {loading ? <span className="loading loading-ring loading-sm"></span> : value || "N/A"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdaPricePanel;