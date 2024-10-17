import poolId from './variables/poolid';
import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';

const PoolDescription = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPoolStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPoolStats(); 

    const intervalId = setInterval(fetchPoolStats, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>          
          {/* Pool Description */}
          <p className="text-white mb-4">
            SN₳KE is your 24/7/365 Reliable Pioneer Stake Pool - Enjoy a 0% pool margin and a fixed cost of 170₳ forever.
          </p>
          <p className="text-gray-400 mb-4">
            <strong>Ticker:</strong> <span className="text-white">{"SNAKE"}</span> &nbsp; 
            <strong>ID:</strong> <span className="text-white">{poolStats?.poolIDBech}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default PoolDescription;
