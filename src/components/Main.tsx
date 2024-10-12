"use client";
import { loadManifestWithRetries } from "next/dist/server/load-components";
import dynamic from "next/dynamic";

const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const PoolStats = dynamic(() => import("./PoolStats"), { ssr: false });
const TopHeaders = dynamic(() => import("./TopHeaders"), { ssr: false });
const EpochSchedules = dynamic(() => import("./EpochSchedules"), { ssr: false });

const componentsConfig = [
  {
    id: "stake",
    component: Stake,
    position: { top: "83px", right: "80px", position: "fixed" },
  },
  {
    id: "poolstats",
    component: PoolStats,
    position: { top: "120px", left: "60px", position: "fixed" },
  },
  {
    id: "topheader",
    component: TopHeaders,
    position: { top: "20px", left: "30px", position: "fixed" },
  },
  {
    id: "epochschedules",
    component: EpochSchedules,
    position: { top: "120px", center: "80px", position: "fixed" },
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
