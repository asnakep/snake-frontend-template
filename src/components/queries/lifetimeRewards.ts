export const getLifetimeRewards = async (poolId: string): Promise<number> => {
    const response = await fetch(`https://api.koios.rest/api/v1/pool_history?_pool_bech32=${poolId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pool rewards');
    }
    
    const data = await response.json();
    const rewards = data.map((item: any) => item.deleg_rewards);
    
    // Sum all the rewards
    const totalRewards = rewards.reduce((acc: number, reward: number) => acc + reward, 0);
  
    return totalRewards;
  };
  