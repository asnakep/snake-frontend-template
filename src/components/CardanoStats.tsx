import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';

const CardanoStats = () => {
  const [cardanoStats, setCardanoStats] = useState<{
    epochNo: string;
    outSum: string;
    fees: string;
    txCount: string;
    blkCount: string;
    startTime: string;
    endTime: string;
    activeStake: string;
    avgBlkReward: string;
  }>({
    epochNo: '',
    outSum: '',
    fees: '',
    txCount: '',
    blkCount: '',
    startTime: '',
    endTime: '',
    activeStake: '',
    avgBlkReward: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cardanoData = await getCardanoStats();

        if (cardanoData) {
          setCardanoStats({
            epochNo: cardanoData.epochNo || 'N/A',
            outSum: cardanoData.outSum.toString() || 'N/A',
            fees: cardanoData.fees.toString() || 'N/A',
            txCount: cardanoData.txCount || 'N/A',
            blkCount: cardanoData.blkCount || 'N/A',
            startTime: cardanoData.startTime || 'N/A',
            endTime: cardanoData.endTime || 'N/A',
            activeStake: cardanoData.activeStake.toString() || 'N/A',
            avgBlkReward: cardanoData.avgBlkReward.toString() || 'N/A',
          });
        } else {
          throw new Error('Invalid data structure');
        }

        setLoading(false);
      } catch (err) {
        setError('Error fetching stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cardano-stats panel">
      <h2 className="text-xl font-bold mb-4">Cardano Mainnet Stats</h2>
      <div className="stats-grid">
        <div className="stat">
          <span className="label">Epoch Number</span>
          <span className="value">{cardanoStats.epochNo || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Total Output</span>
          <span className="value">{cardanoStats.outSum || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Total Fees</span>
          <span className="value">{cardanoStats.fees || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Transaction Count</span>
          <span className="value">{cardanoStats.txCount || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Block Count</span>
          <span className="value">{cardanoStats.blkCount || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Start Time</span>
          <span className="value">{cardanoStats.startTime || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">End Time</span>
          <span className="value">{cardanoStats.endTime || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Active Stake</span>
          <span className="value">{cardanoStats.activeStake || 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="label">Average Block Reward</span>
          <span className="value">{cardanoStats.avgBlkReward || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default CardanoStats;
