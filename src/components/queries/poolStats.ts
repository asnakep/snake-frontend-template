export const getPoolStats = async (poolId: string) => {
  const response = await fetch('/api/pool_info', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _pool_bech32_ids: [poolId],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const poolData = data[0]; // Assuming the pool data is in the first element of the array.

    // Extracting the needed fields
    return {
      //name: poolData.meta_json.name,
      //ticker: poolData.meta_json.ticker,
      description: poolData.meta_json.description,
      margin: poolData.margin,
      fixedCost: poolData.fixed_cost,
      pledge: poolData.pledge,
      activeStake: poolData.active_stake,
      sigma: poolData.sigma,
      blockCount: poolData.block_count,
      livePledge: poolData.live_pledge,
      liveStake: poolData.live_stake,
      liveDelegators: poolData.live_delegators,
      liveSaturation: poolData.live_saturation,
    };
  } else {
    throw new Error("Error fetching pool stats");
  }
};
