export const getLatestBlock = async () => {
  const response = await fetch('/api/tip', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data[0]?.block_no;
  } else {
    throw new Error("Error fetching latest block");
  }
};
