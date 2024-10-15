import { getTip } from './queryTip';

// Utility function to convert lovelaces to ADA, format to 0 decimals, and add thousands separators
const formatAda = (value: string | number) => {
  return `₳${(Number(value) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Utility function to add thousands separators to a number
const formatNumber = (value: string | number) => {
  return Number(value).toLocaleString();
};

// Utility function to format POSIX time into a readable UTC string
const formatDate = (posixTime: number) => {
  return new Date(posixTime * 1000).toUTCString();
};

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
        outSum: formatAda(data.out_sum), // Convert to ADA format with separators
        fees: formatAda(data.fees), // Convert to ADA format with separators
        txCount: formatNumber(data.tx_count), // Add thousands separator
        blkCount: formatNumber(data.blk_count), // Add thousands separator
        startTime: formatDate(data.start_time), // Convert POSIX to UTC format
        endTime: formatDate(data.end_time), // Convert POSIX to UTC format
        activeStake: formatAda(data.active_stake), // Convert to ADA format with separators
        avgBlkReward: formatAda(data.avg_blk_reward) // Convert to ADA format with separators
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
