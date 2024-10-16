import { getTip } from './queryTip';

export const getLastRewards = async (poolID: string): Promise<{ epoch: number; rewards: string; ros: string }> => {
    const formatAda = (value: string | number) => {
        return `₳${Math.floor(Number(value) / 1e6).toLocaleString()}`;
    };
    
    const { currEpoch } = await getTip();

    const targetEpoch = currEpoch - 2;

    const response = await fetch(`/api/pool_history?_pool_bech32=${poolID}&_epoch_no=${targetEpoch}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
        },
    });

    if (!response.ok) {
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
