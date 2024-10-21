export const fetchEpochSchedules = async () => {
  const currentUrl = 'https://136.243.208.16:443/json/current.json';

  const currentResponse = await fetch(currentUrl);

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current epoch data');
  }

  const currentData = await currentResponse.json();

  return { current: currentData };
};
