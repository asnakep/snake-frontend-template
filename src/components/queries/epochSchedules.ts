export const fetchEpochSchedules = async () => {
  // Append a timestamp query parameter to the URL to prevent caching
  const currentUrl = `http://136.243.208.16:12777/json/current.json?timestamp=${Date.now()}`;

  const currentResponse = await fetch(currentUrl, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache', // Disable caching
      'Pragma': 'no-cache',        // Additional header for backward compatibility
      'Expires': '0',              // Ensure the response is not cached
    },
  });

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current epoch data');
  }

  const currentData = await currentResponse.json();

  return { current: currentData };
};
