export const fetchEpochSchedules = async () => {
  const currentUrl = 'http://136.243.208.16:12777/json/current.json';

  const currentResponse = await fetch(currentUrl);

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current epoch data');
  }

  const currentData = await currentResponse.json();

  return { current: currentData };
};
