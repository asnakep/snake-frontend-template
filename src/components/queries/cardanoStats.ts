import { getTip } from './queryTip';

export const getCardanoStats = async () => {
  try {
    const tipData = await getTip(); // Use the current epoch from the tip

    // Fetch epoch data using the actual epoch number
    const response = await fetch(`/api/epoch_info?_epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        epochNo: data.epoch_no,
        outSum: parseFloat(data.out_sum) / 1e6, // Convert to ADA format
        fees: parseFloat(data.fees) / 1e6, // Convert to ADA format
        txCount: data.tx_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), // Add thousands separator
        blkCount: data.blk_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), // Add thousands separator
        startTime: new Date(data.start_time * 1000).toUTCString(), // Convert POSIX to UTC format
        endTime: new Date(data.end_time * 1000).toUTCString(), // Convert POSIX to UTC format
        activeStake: parseFloat(data.active_stake) / 1e6, // Convert to ADA format
        avgBlkReward: parseFloat(data.avg_blk_reward) / 1e6 // Convert to ADA format
      };
    } else {
      console.error('Response status:', response.status); // Log the response status for debugging
      throw new Error("Error fetching Cardano stats");
    }
  } catch (error) {
    console.error("Error in getCardanoStats:", error);
    throw error;
  }
};
