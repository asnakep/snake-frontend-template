import { useState, useEffect } from 'react';
import { fetchEpochData } from './queries/epochSchedules';

interface EpochData {
  epoch: number;
  epochSlots: number;
  epochSlotsIdeal: number;
  maxPerformance: number;
  activeStake: number;
  totalActiveStake: number;
}

export const EpochStats = () => {
  const [epochData, setEpochData] = useState<{ current: EpochData; next: EpochData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEpochData(); // Correct usage
        setEpochData(data);
      } catch (error) {
        setError('Failed to fetch epoch data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Epoch Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Current Epoch</h3>
          <p>Epoch: {epochData?.current.epoch}</p>
          <p>Epoch Slots: {epochData?.current.epochSlots}</p>
          <p>Epoch Slots Ideal: {epochData?.current.epochSlotsIdeal}</p>
          <p>Max Performance: {epochData?.current.maxPerformance}%</p>
          <p>Active Stake: {epochData?.current.activeStake.toLocaleString()} ADA</p>
          <p>Total Active Stake: {epochData?.current.totalActiveStake.toLocaleString()} ADA</p>
        </div>
        <div>
          <h3 className="font-semibold">Next Epoch</h3>
          <p>Epoch: {epochData?.next.epoch}</p>
          <p>Epoch Slots: {epochData?.next.epochSlots}</p>
          <p>Epoch Slots Ideal: {epochData?.next.epochSlotsIdeal}</p>
          <p>Max Performance: {epochData?.next.maxPerformance}%</p>
          <p>Active Stake: {epochData?.next.activeStake.toLocaleString()} ADA</p>
          <p>Total Active Stake: {epochData?.next.totalActiveStake.toLocaleString()} ADA</p>
        </div>
      </div>
    </div>
  );
};
