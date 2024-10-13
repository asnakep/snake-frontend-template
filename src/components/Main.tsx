"use client";
import dynamic from "next/dynamic";
import { CSSProperties } from "react";

// Define the interface for component configuration
interface ComponentConfig {
  id: string;
  component: React.ComponentType<any>; // Adjusted to accept any props
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    center?: string;
    position: "fixed" | "absolute" | "relative";
  };
  style?: CSSProperties; // Optional additional styles
}

const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const PoolStats = dynamic(() => import("./PoolStats"), { ssr: false });
const PoolDescription = dynamic(() => import("./PoolDescription"), { ssr: false });
const TopHeaders = dynamic(() => import("./TopHeaders"), { ssr: false });
const EpochSchedules = dynamic(() => import("./EpochSchedules"), { ssr: false });

const componentsConfig: ComponentConfig[] = [
  {
    id: "topheader",
    component: TopHeaders,
    position: { top: "10px", left: "30px", position: "fixed" },
    style: {},
  },  
  {
    id: "stake",
    component: Stake,
    position: { top: "83px", right: "80px", position: "fixed" },
    style: {},
  },
  {
    id: "pooldescription",
    component: PoolDescription,
    position: { top: "100px", left: "30px", position: "fixed" },
    style: {},
  },  
  {
    id: "poolstats",
    component: PoolStats,
    position: { top: "240px", left: "30px", position: "fixed" },
    style: {},
  },
  {
    id: "epochschedules",
    component: EpochSchedules,
    position: { bottom: "60px", right: "80px", position: "fixed" },
    style: {},
  },
];

export default function Main() {
  return (
    <>
      {componentsConfig.map((config) => (
        <div
          key={config.id}
          className="absolute"
          style={{ ...config.position, ...config.style }}
        >
          <config.component />
        </div>
      ))}
    </>
  );
}
