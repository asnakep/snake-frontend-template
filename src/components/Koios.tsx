import { useState, useEffect } from "react";
import { getPoolStats } from './queries/poolStats';

const Koios = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolStats = async () => {
    try {
      const stats = await getPoolStats('pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx');
      setPoolStats(stats);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchPoolStats(); // Fetch data initially

    // Set up interval to refresh data every minute
    const intervalId = setInterval(fetchPoolStats, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Stakepool: {poolStats?.name || ''}</p>
          <p>Ticker: {poolStats?.ticker || ''}</p>
          <p>Delegators: {poolStats?.liveDelegators}</p>
          <p>Epoch Cost: {poolStats?.fixedCost}</p>
          <p>Margin: {poolStats?.margin}%</p>
          <p>Pledge: {poolStats?.pledge}</p>
          <p>Active Stake: {poolStats?.activeStake}</p>
          <p>Live Stake: {poolStats?.liveStake}</p>
          <p>Lifetime Blocks: {poolStats?.blockCount}</p>
          <p>Saturation: {poolStats?.liveSaturation}</p>
        </div>
      )}
    </div>
  );
};

export default Koios;
