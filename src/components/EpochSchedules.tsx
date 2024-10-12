import { useState, useEffect } from 'react';
import { fetchEpochSchedules } from './queries/epochSchedules'; // Correct import

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
        const data = await fetchEpochSchedules(); // Correct usage of fetchEpochSchedules
        setEpochData(data);
      } catch (error) {
        setError('Failed to fetch epoch data.'); // Set a proper error message
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
          <p>Assigned Blocks: {epochData?.current.epochSlots}</p>
          <p>Blocks Ideal: {epochData?.current.epochSlotsIdeal}</p>
          <p>Assigned Luck: {epochData?.current.maxPerformance}%</p>
          <p>Pool Active Stake: {epochData?.current.activeStake.toLocaleString()} ADA</p>
          <p>Total Active Stake: {epochData?.current.totalActiveStake.toLocaleString()} ADA</p>
          <p>Next Epoch: {epochData?.next.epoch}</p>
          <p>Next Assigned Blocks: {epochData?.next.epochSlots}</p>
          <p>Next Blocks Ideal: {epochData?.next.epochSlotsIdeal}</p>
          <p>Assigned Luck: {epochData?.next.maxPerformance}%</p>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;