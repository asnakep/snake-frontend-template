export const getPoolStats = async () => {
  const response = await fetch('/api/pool_info', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _pool_bech32_ids: ["pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx"],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const poolInfo = data[0];

    return {
      margin: poolInfo?.margin ? `${poolInfo.margin * 100}%` : "N/A",  // Convert to percentage
      fixed_cost: poolInfo?.fixed_cost ? `₳${(Number(poolInfo.fixed_cost) / 1e6).toLocaleString()}` : "N/A",  // Convert lovelaces to ADA
      pledge: poolInfo?.pledge ? `₳${(Number(poolInfo.pledge) / 1e6).toLocaleString()}` : "N/A",  // Convert lovelaces to ADA
      meta_name: poolInfo?.meta_json?.name || "Unknown",
      meta_ticker: poolInfo?.meta_json?.ticker || "Unknown",
      meta_description: poolInfo?.meta_json?.description || "No description",
      active_stake: poolInfo?.active_stake ? `₳${(Number(poolInfo.active_stake) / 1e6).toLocaleString()}` : "N/A",  // Convert lovelaces to ADA
      sigma: poolInfo?.sigma ? poolInfo.sigma.toFixed(5) : "N/A",  // Limit to 5 decimal places
      block_count: poolInfo?.block_count || "N/A",
      live_pledge: poolInfo?.live_pledge ? `₳${(Number(poolInfo.live_pledge) / 1e6).toLocaleString()}` : "N/A",  // Convert lovelaces to ADA
      live_stake: poolInfo?.live_stake ? `₳${(Number(poolInfo.live_stake) / 1e6).toLocaleString()}` : "N/A",  // Convert lovelaces to ADA
      live_delegators: poolInfo?.live_delegators || "N/A",
      live_saturation: poolInfo?.live_saturation ? `${poolInfo.live_saturation}%` : "N/A",  // Convert to percentage
    };
  } else {
    throw new Error("Error fetching pool stats");
  }
};
