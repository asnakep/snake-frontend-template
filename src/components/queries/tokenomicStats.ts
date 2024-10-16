import formatAda from '../variables/formatAda';
import koiosToken from '../variables/koiosToken';
import { getTip } from './queryTip';

export const getTokenomicStats = async () => {
  try {
    const tipData = await getTip();

    const response = await fetch(`/api/totals?_epoch_no=${tipData?.currEpoch}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${koiosToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const tokenomicData = data[0];

      return {
        epochNo: tokenomicData.epoch_no,
        circulation: formatAda(tokenomicData.circulation),
        treasury: formatAda(tokenomicData.treasury),
        reward: formatAda(tokenomicData.reward),
        supply: formatAda(tokenomicData.supply),
        reserves: formatAda(tokenomicData.reserves)
      };
    } else {
      console.error('Response status:', response.status);
      throw new Error("Error fetching tokenomic stats");
    }
  } catch (error) {
    console.error("Error in getTokenomicStats:", error);
    throw error;
  }
};
