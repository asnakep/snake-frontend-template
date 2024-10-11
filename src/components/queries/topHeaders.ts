export const getLatestBlock = async () => {
    const response = await fetch('/api/tip', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return {
        currEpoch: (data[0]?.epoch_no),
        absSlot: (data[0]?.abs_slot),
        epochSlot: (data[0]?.epoch_slot),
        blockNum: (data[0]?.block_no),
        blockTime: (data[0]?.block_time),

    } else {
        throw new Error("Error fetching data");
    }
  };

