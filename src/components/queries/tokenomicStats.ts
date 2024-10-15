import { getTip } from './queryTip';

export const getTokenomicStats = async () => {
  try {
    const tipData = await getTip(); // Use the current epoch from the tip

    const response = await fetch(`/api/totals?epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE` // Added bearer token
      }
    });

    if (response.ok) {
      const data = await response.json();

      // Format values for better readability
      return {
        epochNo: data[0]?.epoch_no,
        circulation: `${(Number(data[0]?.circulation) / 1000000).toFixed(2)} ADA`,
        treasury: `${(Number(data[0]?.treasury) / 1000000).toFixed(2)} ADA`,
        reward: `${(Number(data[0]?.reward) / 1000000).toFixed(2)} ADA`,
        supply: `${(Number(data[0]?.supply) / 1000000).toFixed(2)} ADA`,
        reserves: `${(Number(data[0]?.reserves) / 1000000).toFixed(2)} ADA`,
      };
    } else {
      throw new Error("Error fetching tokenomic stats");
    }
  } catch (error) {
    console.error("Error in getTokenomicStats:", error);
    throw error;
  }
};
