export const getBlocksCount = async (poolID: string, epochNo: number) => {
    const response = await fetch(`/api/pool_blocks?_pool_bech32=${poolID}&_epoch_no=${epochNo}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.length;
    } else {
      throw new Error("Error fetching block count");
    }
  };
  