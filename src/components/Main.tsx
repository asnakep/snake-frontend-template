"use client";
import dynamic from "next/dynamic";

const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const Koios = dynamic(() => import("./Koios"), { ssr: false });

const componentsConfig = [
  {
    id: "stake",
    component: Stake,
    position: { top: "83px", right: "80px", position: "fixed" },
  },
  {
    id: "koios",
    component: Koios,
    position: { bottom: "80px", left: "90px", position: "relative" },
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
