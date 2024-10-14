import { getTip } from './queryTip'; // Adjust the path if needed

export const getRecentRewards = async (poolID: string): Promise<{ epoch: number; rewards: string; ros: string }> => {
    const formatAda = (value: string | number) => {
        return `₳${(Number(value) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    // Get the current epoch from the tip query
    const { currEpoch } = await getTip();

    // Calculate the target epoch (current - 2)
    const targetEpoch = currEpoch - 2;

    const response = await fetch(`/api/pool_history?_pool_bech32=${poolID}&_epoch_no=${targetEpoch}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdXlwdHFycHkyaG1semNrczJxOWhwdTgybTBsOWE5Z3N6OHB4cGV5ZGhqZnJwM2d2Zms1OG0iLCJleHAiOjE3MzIwMTkxNDcsInRpZXIiOjEsInByb2pJRCI6InNuYWtlcG9vbF9xdWVyaWVzIn0.080u6cvXuMxucyltftojjLNOEiPiul8_z2X3lmdYrzE`
        },
    });

    if (response.ok) {
        const data = await response.json();
        const rewards = formatAda(data[0]?.deleg_rewards ?? 0);
        const ros = data[0]?.epoch_ros?.toFixed(2) ?? '0.00';
        return {
            epoch: targetEpoch,
            rewards,
            ros,
        };
    } else {
        throw new Error("Error fetching recent rewards and ROS");
    }
};
