export const getPoolStats = async (poolId: string) => {
  const response = await fetch('/api/pool_info', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
    },
    body: JSON.stringify({
      _pool_bech32_ids: [poolId],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const poolData = data[0] || {};

    const formatAda = (value: string | number) => {
      return `₳${Math.floor(Number(value) / 1e6).toLocaleString()}`;
    };

    return {
      poolIDBech: poolData.pool_id_bech32,
      //description: poolData.meta_json.description,
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
  } else {
    throw new Error("Error fetching pool stats");
  }
};
