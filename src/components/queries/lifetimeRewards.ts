import formatAda from '../variables/formatAda'; 

export const getLifetimeRewards = async (poolID: string): Promise<string> => {
    const response = await fetch(`/api/pool_history?_pool_bech32=${poolID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
        },
    });

    if (response.ok) {
        const data = await response.json();
        
        // Filter out null, 0, and non-numeric values
        const rewards: number[] = data
            .map((item: any) => parseFloat(item.deleg_rewards))
            .filter((reward: number) => !isNaN(reward) && reward > 0); // Exclude null and 0

        // Sum the valid numeric rewards
        const totalRewards = rewards.reduce((acc: number, reward: number) => acc + reward, 0);
        return formatAda(totalRewards); // Use imported formatAda
    } else {
        throw new Error("Error fetching lifetime rewards");
    }
};
