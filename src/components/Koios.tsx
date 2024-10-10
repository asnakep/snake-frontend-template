import { useKoios } from './hooks/useKoios';
import { getPoolStats } from './queries/poolStats';

const PoolStats = () => {
  const poolId = "pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx";
  const { data: poolStats, error } = useKoios(() => getPoolStats(poolId));

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        poolStats && (
          <div>
            <p>Name: {poolStats.name}</p>
            <p>Ticker: {poolStats.ticker}</p>
            <p>Description: {poolStats.description}</p>
            <p>Margin: {poolStats.margin}%</p>
            <p>Fixed Cost: {poolStats.fixedCost} ₳</p>
            <p>Pledge: {poolStats.pledge} ₳</p>
            <p>Active Stake: {poolStats.activeStake} ₳</p>
            <p>Sigma: {poolStats.sigma}</p>
            <p>Block Count: {poolStats.blockCount}</p>
            <p>Live Pledge: {poolStats.livePledge} ₳</p>
            <p>Live Stake: {poolStats.liveStake} ₳</p>
            <p>Live Delegators: {poolStats.liveDelegators}</p>
            <p>Live Saturation: {poolStats.liveSaturation}%</p>
          </div>
        )
      )}
    </div>
  );
};

export default PoolStats;
