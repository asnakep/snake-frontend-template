import formatAda from '../variables/formatAda';
import koiosToken from '../variables/koiosToken';
import { getTip } from './queryTip';

export const getTokenomicStats = async () => {
  try {
    const tipData = await getTip(); // Use the current epoch from the tip

    // Fetch tokenomic data using the actual epoch number
    const response = await fetch(`/api/totals?_epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${koiosToken}`
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
