import { useState, useEffect } from 'react';
import { getCardanoStats } from './queries/cardanoStats';
import { getTokenomicStats } from './queries/tokenomicStats';

// Define the CardanoStats interface
interface CardanoStats {
  epochNo: string;
  outSum: string;
  fees: string;
  txCount: string;
  blkCount: string;
  startTime: string;
  endTime: string;
  activeStake: string;
  avgBlkReward: string;
}

// Define the TokenomicStats interface
interface TokenomicStats {
  epochNo: string;
  circulation: string;
  treasury: string;
  reward: string;
  supply: string;
  reserves: string;
}

const CardanoStats = () => {
  // Initialize states using the interfaces
  const [cardanoStats, setCardanoStats] = useState<CardanoStats>({
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

  const [tokenomicStats, setTokenomicStats] = useState<TokenomicStats>({
    epochNo: '',
    circulation: '',
    treasury: '',
    reward: '',
    supply: '',
    reserves: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cardanoData, tokenomicData] = await Promise.all([
          getCardanoStats(),
          getTokenomicStats(),
        ]);
        setCardanoStats(cardanoData);
        setTokenomicStats(tokenomicData);
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
      <h2 className="text-xl font-bold mb-4">Cardano Mainnet & Tokenomics Stats</h2>
      <div className="stats-grid">
        {/* Cardano Stats */}
        <div className="stat">
          <span className="label">Epoch Number</span>
          <span className="value">{cardanoStats.epochNo}</span>
        </div>
        <div className="stat">
          <span className="label">Total Output</span>
          <span className="value">{cardanoStats.outSum}</span>
        </div>
        <div className="stat">
          <span className="label">Total Fees</span>
          <span className="value">{cardanoStats.fees}</span>
        </div>
        <div className="stat">
          <span className="label">Transaction Count</span>
          <span className="value">{cardanoStats.txCount}</span>
        </div>
        <div className="stat">
          <span className="label">Block Count</span>
          <span className="value">{cardanoStats.blkCount}</span>
        </div>
        <div className="stat">
          <span className="label">Start Time</span>
          <span className="value">{cardanoStats.startTime}</span>
        </div>
        <div className="stat">
          <span className="label">End Time</span>
          <span className="value">{cardanoStats.endTime}</span>
        </div>
        <div className="stat">
          <span className="label">Active Stake</span>
          <span className="value">{cardanoStats.activeStake}</span>
        </div>
        <div className="stat">
          <span className="label">Average Block Reward</span>
          <span className="value">{cardanoStats.avgBlkReward}</span>
        </div>

        {/* Tokenomic Stats */}
        <h3 className="text-lg font-bold mt-6">Tokenomic Stats</h3>
        <div className="stat">
          <span className="label">Epoch Number</span>
          <span className="value">{tokenomicStats.epochNo}</span>
        </div>
        <div className="stat">
          <span className="label">Circulating Supply</span>
          <span className="value">{tokenomicStats.circulation}</span>
        </div>
        <div className="stat">
          <span className="label">Treasury</span>
          <span className="value">{tokenomicStats.treasury}</span>
        </div>
        <div className="stat">
          <span className="label">Rewards</span>
          <span className="value">{tokenomicStats.reward}</span>
        </div>
        <div className="stat">
          <span className="label">Total Supply</span>
          <span className="value">{tokenomicStats.supply}</span>
        </div>
        <div className="stat">
          <span className="label">Reserves</span>
          <span className="value">{tokenomicStats.reserves}</span>
        </div>
      </div>
    </div>
  );
};

export default CardanoStats;
