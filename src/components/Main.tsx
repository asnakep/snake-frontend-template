"use client";
import dynamic from "next/dynamic";

const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const PoolStats = dynamic(() => import("./PoolStats"), { ssr: false });

const componentsConfig = [
  {
    id: "stake",
    component: Stake,
    position: { top: "83px", right: "80px", position: "fixed" },
  },
  {
    id: "poolstats",
    component: PoolStats,
    position: { top: "100px", left: "60px", position: "fixed" },
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
