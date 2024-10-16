import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';
import { getBlocksCount } from './queries/blocksCount'; 
import { getTip } from './queries/queryTip';
import { poolId } from './variables/pool_id';
import { fetchEpochSchedules } from './queries/epochSchedules';

const PoolDescription = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [blockCount, setBlockCount] = useState<number | null>(null); // Minted blocks
  const [scheduledBlocks, setScheduledBlocks] = useState<number | null>(null); // Scheduled blocks
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats(poolId);
      setPoolStats(stats);

      const tip = await getTip(); 
      setCurrentEpoch(tip.currEpoch);

      const count = await getBlocksCount(poolId, tip.currEpoch); // Minted blocks
      setBlockCount(count);

      const epochData = await fetchEpochSchedules(); // Fetch current epoch scheduled blocks
      setScheduledBlocks(epochData.current.epochSlots); // Set the scheduled blocks
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
            Ticker: <span className="text-white">{"SNAKE"}</span> &nbsp; ID: <span className="text-white">{poolStats?.poolIDBech}</span>
          </p>
          <p className="text-gray-400 mb-4">
            Epoch: <span className="text-white">{currentEpoch}</span> &nbsp; 
            Minted Blocks: <span className="text-white">{blockCount ?? ''}</span>/<span className="text-white">{scheduledBlocks ?? ''}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default PoolDescription;
