import formatAda from '../variables/formatAda';
import koiosToken from '../variables/koiosToken';
import { getTip } from './queryTip';

const formatNumber = (value: string | number) => {
  return Number(value).toLocaleString();
};

export const getCardanoStats = async () => {
  try {
    const { currEpoch } = await getTip();

    if (!currEpoch) {
      throw new Error("Epoch data is unavailable.");
    }

    const response = await fetch(`/api/epoch_info?_epoch_no=${currEpoch}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${koiosToken}`
      }
    })

    if (response.ok) {
      const dataArray = await response.json();
      const data = dataArray[0];

      return {
        epochNo: data.epoch_no,
        txCount: formatNumber(data.tx_count),
        blkCount: formatNumber(data.blk_count),
        activeStake: formatAda(data.active_stake),
      };
    } else {
      console.error('Response status:', response.status);
      throw new Error("Error fetching Cardano stats");
    }
  } catch (error) {
    console.error("Error in getCardanoStats:", error);
    throw error;
  }
};
