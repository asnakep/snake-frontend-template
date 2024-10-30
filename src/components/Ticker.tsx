import React, { useState, useRef } from "react";
import poolId from './variables/poolid';

const Ticker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="overflow-hidden whitespace-nowrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={tickerRef}
        className="inline-block px-6 text-white font-semibold animate-scroll"
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        SN₳KE is your 24/7/365 Reliable Pioneer Stake Pool - Enjoy a 0% pool margin and a fixed cost of 170₳ forever. &nbsp;
        <strong>Pool ID: </strong> 
        <a
          href={`https://adastat.net/pools/${poolId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {poolId}
        </a> &nbsp; | &nbsp;
        <strong>Ticker: </strong> 
        <a
          href={`https://adastat.net/ticker/SNAKE`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          SNAKE
        </a>
      </div>
    </div>
  );
};

export default Ticker;
