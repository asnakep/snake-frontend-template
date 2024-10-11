export const fetchEpochData = async () => {
    const currentUrl = 'http://136.243.xxx.16:12777/json/current.json';
    const nextUrl = 'http://136.243.xxx.16:12777/json/next.json';
  
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
  