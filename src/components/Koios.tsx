import { useState, useEffect } from "react";

const Koios = () => {
  const [lastBlock, setLastBlock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the latest block number
  const fetchLastBlock = async () => {
    try {
      const response = await fetch('/api/tip', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the case where the array contains one object
        const blockNo = data[0]?.block_no;
        setLastBlock(blockNo);
      } else {
        setError("Error fetching data");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    // Fetch block number initially
    fetchLastBlock();

    // Set up interval to refresh block number every 5 seconds
    const intervalId = setInterval(fetchLastBlock, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Last Block: {lastBlock !== null ? lastBlock : ""}</p>
      )}
    </div>
  );
};

export default Koios;
