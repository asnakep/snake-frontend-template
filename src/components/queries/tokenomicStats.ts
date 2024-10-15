import { getTip } from './queryTip';

export const getTokenomicStats = async () => {
  try {
    const tipData = await getTip(); // Use the current epoch from the tip

    // Fetch tokenomic data using the actual epoch number
    const response = await fetch(`/api/totals?_epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const tokenomicData = data[0]; // Assuming the data returned is an array with a single object

      return {
        epochNo: tokenomicData.epoch_no,
        circulation: parseFloat(tokenomicData.circulation) / 1e6, // Convert to ADA format
        treasury: parseFloat(tokenomicData.treasury) / 1e6, // Convert to ADA format
        reward: parseFloat(tokenomicData.reward) / 1e6, // Convert to ADA format
        supply: parseFloat(tokenomicData.supply) / 1e6, // Convert to ADA format
        reserves: parseFloat(tokenomicData.reserves) / 1e6 // Convert to ADA format
      };
    } else {
      console.error('Response status:', response.status); // Log the response status for debugging
      throw new Error("Error fetching tokenomic stats");
    }
  } catch (error) {
    console.error("Error in getTokenomicStats:", error);
    throw error;
  }
};
