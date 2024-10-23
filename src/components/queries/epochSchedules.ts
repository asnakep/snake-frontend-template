import { retryFetch } from '../utils/retryFetch'; // Import retry function

export const fetchEpochSchedules = async () => {
  const currentUrl = 'https://data.snakepool.link/json/current.json';

  const currentResponse = await retryFetch(currentUrl, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!currentResponse?.ok) {
    throw new Error('Failed to fetch current epoch data');
  }

  const currentData = await currentResponse.json();

  return { current: currentData };
};
