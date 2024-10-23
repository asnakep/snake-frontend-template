import formatAda from '../variables/formatAda';
import koiosToken from '../variables/koiosToken';
import { retryFetch } from '../utils/retryFetch'; 

export const getPoolStats = async (poolId: string) => {
  const response = await retryFetch('/api/pool_info', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${koiosToken}`
    },
    body: JSON.stringify({
      _pool_bech32_ids: [poolId],
    }),
  });

  // Response is guaranteed to be defined here
  const data = await response.json();
  const poolData = data[0] || {};

  return {
    poolIDBech: poolData.pool_id_bech32,
    margin: `${(poolData.margin * 100).toFixed(0)}`,
    fixedCost: formatAda(poolData.fixed_cost),
    pledge: formatAda(poolData.pledge),
    activeStake: formatAda(poolData.active_stake),
    blockCount: poolData.block_count.toLocaleString(),
    livePledge: formatAda(poolData.live_pledge),
    liveStake: formatAda(poolData.live_stake),
    liveDelegators: poolData.live_delegators.toLocaleString(),
    liveSaturation: `${poolData.live_saturation.toFixed(2)}`,
  };
};
