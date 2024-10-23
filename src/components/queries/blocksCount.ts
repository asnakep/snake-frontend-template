import koiosToken from '../variables/koiosToken';
import { retryFetch } from '../utils/retryFetch'; // Import retryFetch

export const getBlocksCount = async (poolID: string, epochNo: number) => {
  const response = await retryFetch(`/api/pool_blocks?_pool_bech32=${poolID}&_epoch_no=${epochNo}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${koiosToken}`
    },
  });

  if (response?.ok) {
    const data = await response.json();
    return data.length;
  } else {
    throw new Error("Error fetching block count");
  }
};
