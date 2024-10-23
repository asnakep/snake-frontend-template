export const fetchEpochSchedules = async () => {
  const currentUrl = 'https://data.snakepool.link/json/current.json';

  const currentResponse = await fetch(currentUrl);

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current epoch data');
  }

  const currentData = await currentResponse.json();

  return { current: currentData };
};
