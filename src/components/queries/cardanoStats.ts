import { getTip } from './queryTip';

export const getCardanoStats = async () => {
  try {
    const tipData = await getTip(); // Use the current epoch from the tip

    // Fetch epoch data using the actual epoch number
    const response = await fetch(`/api/epoch_info?epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE` // Add your token
      }
    })

    if (response.ok) {
      const data = await response.json();

      // Format values for better readability
      return {
        epochNo: data[0]?.epoch_no,
        outSum: `${(Number(data[0]?.out_sum) / 1000000).toFixed(2)} ADA`,
        fees: `${(Number(data[0]?.fees) / 1000000).toFixed(2)} ADA`,
        txCount: Number(data[0]?.tx_count).toLocaleString(),
        blkCount: Number(data[0]?.blk_count).toLocaleString(),
        startTime: new Date(data[0]?.start_time * 1000).toISOString().replace('T', ' ').slice(0, 19),
        endTime: new Date(data[0]?.end_time * 1000).toISOString().replace('T', ' ').slice(0, 19),
        activeStake: `${(Number(data[0]?.active_stake) / 1000000).toFixed(2)} ADA`,
        avgBlkReward: `${(Number(data[0]?.avg_blk_reward) / 1000000).toFixed(2)} ADA`,
      };
    } else {
      throw new Error("Error fetching Cardano stats");
    }
  } catch (error) {
    console.error("Error in getCardanoStats:", error);
    throw error;
  }
};
