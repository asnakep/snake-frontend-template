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
const formatDate = (posixTime: number | string) => {
  const timestamp = Number(posixTime); // Convert the value to a number
  return isNaN(timestamp) ? "Invalid Date" : new Date(timestamp * 1000).toUTCString();
};

export const getCardanoStats = async () => {
  try {
    // Get the current epoch from the tip query
    const { currEpoch } = await getTip();

    // Ensure the epoch value is valid before proceeding
    if (!currEpoch) {
      throw new Error("Epoch data is unavailable.");
    }

    // Fetch epoch data using the actual epoch number
    const response = await fetch(`/api/epoch_info?_epoch_no=${currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
      }
    })

    if (response.ok) {
      const dataArray = await response.json(); // Expecting an array
      const data = dataArray[0]; // Access the first element of the array
      
      return {
        epochNo: data.epoch_no,
        txCount: formatNumber(data.tx_count), // Add thousands separator
        blkCount: formatNumber(data.blk_count), // Add thousands separator
        activeStake: formatAda(data.active_stake), // Convert to ADA format with separators
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
