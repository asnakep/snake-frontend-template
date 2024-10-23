import formatAda from '../variables/formatAda';
import koiosToken from '../variables/koiosToken';
import { getTip } from './queryTip';
import { retryFetch } from '../utils/retryFetch'; // Import retry function

export const getLastRewards = async (poolID: string): Promise<{ epoch: number; rewards: string; ros: string }> => {
    const { currEpoch } = await getTip();

    const targetEpoch = currEpoch - 2;

    const response = await retryFetch(`/api/pool_history?_pool_bech32=${poolID}&_epoch_no=${targetEpoch}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${koiosToken}`
        },
    });

    if (!response?.ok) {
        throw new Error("Error fetching recent rewards and ROS");
    }

    const data = await response.json();
    const rewards = formatAda(data[0]?.deleg_rewards ?? 0);
    const ros = data[0]?.epoch_ros?.toFixed(2) ?? '0.00';
    
    return {
        epoch: targetEpoch,
        rewards,
        ros,
    };
};
