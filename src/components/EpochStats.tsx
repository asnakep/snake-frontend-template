import { useState, useEffect } from 'react';
import { fetchEpochSchedules } from './queries/epochSchedules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faClockRotateLeft, faChartLine, faCubes } from '@fortawesome/free-solid-svg-icons';

interface EpochData {
  epoch: number;
  epochSlots: number;
  epochSlotsIdeal: number;
  maxPerformance: number;
  activeStake: number;
  totalActiveStake: number;
}

export const EpochStats = () => {
  const [epochData, setEpochData] = useState<EpochData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEpochSchedules();
        if (JSON.stringify(data.current) !== JSON.stringify(epochData)) {
          setEpochData(data.current);
        }
      } catch (error) {
        setError('Failed to fetch epoch data.');
      } finally {
        setLoading(false);
      }
    };

    getData();

    const interval = setInterval(() => {
      getData();
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [epochData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="max-w-4xl w-full bg-gray-900 rounded-lg p-6 mb-4">
          <h3 className="text-sm font-semibold text-white">BLOCKS PRODUCTION</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex justify-between text-xs gap-x-4">
                <span className="text-blue-400 text-sm"><span className="loading loading-ring loading-sm"></span></span>
                <span className="text-blue-400 text-sm"><span className="loading loading-ring loading-sm"></span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center font-light">
      <div className="max-w-4xl w-full bg-base-300 rounded-lg p-6 mb-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">BLOCKS</h3>
            <FontAwesomeIcon icon={faCube} className="text-blue-400 text-3xl ml-6" />
          </div>
          <div>
            <ul className="text-gray-400 space-y-2">
              <li className="flex justify-between text-sm gap-x-4">
                <span className="flex items-center w-full">
                  <FontAwesomeIcon icon={faClockRotateLeft} className="text-gray-400 mr-2 size-4" />
                  <strong className="truncate">Epoch</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.epoch}</span>
              </li>
              <li className="flex justify-between text-sm gap-x-4">
                <span className="flex items-center w-full">
                  <FontAwesomeIcon icon={faCubes} className="text-gray-400 mr-2 size-4" />
                  <strong className="truncate">Assigned</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.epochSlots}</span>
              </li>
              <li className="flex justify-between text-sm gap-x-4">
                <span className="flex items-center w-full">
                  <FontAwesomeIcon icon={faCubes} className="text-gray-400 mr-2 size-4" />
                  <strong className="truncate">Expected</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">
                  {epochData?.epochSlotsIdeal !== undefined ? Math.round(epochData.epochSlotsIdeal) : null}
                </span>
              </li>
              <li className="flex justify-between text-sm gap-x-4">
                <span className="flex items-center w-full">
                  <FontAwesomeIcon icon={faChartLine} className="text-gray-400 mr-2 size-4" />
                  <strong className="truncate">Luck</strong>
                </span>
                <span className="text-blue-400 text-sm custom-font">{epochData?.maxPerformance}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochStats;
