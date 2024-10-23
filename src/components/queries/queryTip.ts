import koiosToken from '../variables/koiosToken';

export const getTip = async () => {
    const response = await fetch('/api/tip', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${koiosToken}`
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return {
        currEpoch: data[0]?.epoch_no,
        absSlot: data[0]?.abs_slot,
        epochSlot: data[0]?.epoch_slot,
        blockNum: data[0]?.block_no,
        blockTime: new Date(data[0]?.block_time * 1000).toLocaleString(),
      };
    } else {
      throw new Error("Error fetching data");
    }
  };
  