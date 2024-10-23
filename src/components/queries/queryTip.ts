import koiosToken from '../variables/koiosToken';

export const getTip = async () => {
    const response = await fetch('/api/tip', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${koiosToken}`
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return {
        currEpoch: data[0]?.epoch_no,
        epochSlot: data[0]?.epoch_slot,
        blockNum: data[0]?.block_no,
      };
    } else {
      throw new Error("Error fetching data");
    }
  };
  