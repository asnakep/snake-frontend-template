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

    // Utility function to convert lovelaces to ADA and format with thousands separators
    const formatAda = (value: string | number) => {
      return `₳${(Number(value) / 1e6).toLocaleString()}`;
    };

    // Extracting and formatting the needed fields
    return {
      margin: `${poolData.margin * 100}%`,  // Convert margin to percentage
      fixedCost: formatAda(poolData.fixed_cost),
      pledge: formatAda(poolData.pledge),
      activeStake: formatAda(poolData.active_stake),
      sigma: poolData.sigma.toFixed(5),  // Limit sigma to 5 decimal places
      blockCount: poolData.block_count.toLocaleString(),  // Add thousands separator
      livePledge: formatAda(poolData.live_pledge),
      liveStake: formatAda(poolData.live_stake),
      liveDelegators: poolData.live_delegators.toLocaleString(),  // Add thousands separator
      liveSaturation: `${poolData.live_saturation}%`,  // Convert live saturation to percentage
    };
  } else {
    throw new Error("Error fetching pool stats");
  }
};
