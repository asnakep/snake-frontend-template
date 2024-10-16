import { getTip } from './queryTip';

const formatAda = (value: string | number) => {
  return `₳${Math.floor(Number(value) / 1e6).toLocaleString()}`;
};

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
        circulation: formatAda(tokenomicData.circulation), // Convert to ADA format
        treasury: formatAda(tokenomicData.treasury), // Convert to ADA format
        reward: formatAda(tokenomicData.reward), // Convert to ADA format
        supply: formatAda(tokenomicData.supply), // Convert to ADA format
        reserves: formatAda(tokenomicData.reserves) // Convert to ADA format
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
