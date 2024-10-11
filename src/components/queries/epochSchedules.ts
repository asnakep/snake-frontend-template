export const fetchEpochSchedules = async () => {
    const currentUrl = '/api/current';
    const nextUrl = '/api/next';
  
    const [currentResponse, nextResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(nextUrl)
    ]);
  
    if (!currentResponse.ok || !nextResponse.ok) {
      throw new Error('Failed to fetch epoch data');
    }
  
    const currentData = await currentResponse.json();
    const nextData = await nextResponse.json();
  
    return { current: currentData, next: nextData };
  };
  