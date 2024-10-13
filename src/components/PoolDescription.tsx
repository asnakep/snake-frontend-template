import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getBlocksCount } from './queries/blocksCount'; 
import { getTip } from './queries/queryTip';

const poolId = "pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx";

const PoolDescription = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [blockCount, setBlockCount] = useState<number | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPoolStats(stats);

      const tip = await getTip(); 
      setCurrentEpoch(tip.currEpoch);

      const count = await getBlocksCount(poolId, tip.currEpoch);
      setBlockCount(count);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPoolStats(); 

    const intervalId = setInterval(fetchPoolStats, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl w-full bg-black-800 bg-opacity-80 rounded-lg shadow-md p-6 mb-4">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>          
          {/* Pool Description in white, single line, reduced margin */}
          <p className="text-white mb-4">
            SN₳KE is your 24/7/365 Reliable Pioneer Stake Pool - Enjoy a 0% pool margin and a fixed cost of 170₳ forever.
          </p>
          <p className="text-gray-400 mb-4">
            Ticker: <span className="text-white">{"SNAKE"}</span> &nbsp; ID: <span className="text-white">{poolStats?.poolIDBech}</span>
          </p>
          <p className="text-gray-400 mb-4">
            Epoch: <span className="text-white">{currentEpoch}</span> &nbsp; Minted Blocks: <span className="text-white">{blockCount ?? 'Loading...'}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default PoolDescription;
