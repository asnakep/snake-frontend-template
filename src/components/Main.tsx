"use client";
import dynamic from "next/dynamic";
import { CSSProperties } from "react"; // Importing CSSProperties from React

// Define the interface for component configuration
interface ComponentConfig {
  id: string;
  component: React.ComponentType;
  position: {
    top: string;
    left?: string;
    right?: string;
    center?: string;
    position: "fixed" | "absolute" | "relative"; // Specify allowed position values
  };
  style?: CSSProperties; // Optional additional styles
}

const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const PoolStats = dynamic(() => import("./PoolStats"), { ssr: false });
const TopHeaders = dynamic(() => import("./TopHeaders"), { ssr: false });
const EpochSchedules = dynamic(() => import("./EpochSchedules"), { ssr: false });

const componentsConfig: ComponentConfig[] = [
  {
    id: "stake",
    component: Stake,
    position: { top: "83px", right: "80px", position: "fixed" },
    style: {}, // Add styles here if needed
  },
  {
    id: "poolstats",
    component: PoolStats,
    position: { top: "180px", left: "30px", position: "fixed" },
    style: {}, // Add styles here if needed
  },
  {
    id: "topheader",
    component: TopHeaders,
    position: { top: "10px", left: "30px", position: "fixed" },
    style: {}, // Add styles here if needed
  },
  {
    id: "epochschedules",
    component: EpochSchedules,
    position: { top: "200px", center: "80px", position: "fixed" },
    style: {}, // Add styles here if needed
  },
];

export default function Main() {
  return (
    <>
      {componentsConfig.map((config) => (
        <div
          key={config.id}
          className="absolute"
          style={{ ...config.position, ...config.style }} // This will work now
        >
          <config.component />
        </div>
      ))}
    </>
  );
}
