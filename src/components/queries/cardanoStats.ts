import { getTip } from './queryTip';

const formatAda = (value: string | number) => {
  return `₳${Math.floor(Number(value) / 1e6).toLocaleString()}`;
};

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
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
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
