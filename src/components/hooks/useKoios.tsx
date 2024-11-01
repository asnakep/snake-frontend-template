import { useState, useEffect } from "react";

export const useKoios = (fetchQuery: () => Promise<any>, interval: number = 5000) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchQuery();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData(); // Fetch data initially

    // Set up interval to refresh data
    const intervalId = setInterval(fetchData, interval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchQuery, interval]); 
  
  return { data, error };
};
