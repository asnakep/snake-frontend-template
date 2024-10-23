import formatAda from '../variables/formatAda'; 
import koiosToken from '../variables/koiosToken';
import { retryFetch } from '../utils/retryFetch'; // Import retry function

export const getLifetimeRewards = async (poolID: string): Promise<string> => {
    const response = await retryFetch(`/api/pool_history?_pool_bech32=${poolID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${koiosToken}`
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
