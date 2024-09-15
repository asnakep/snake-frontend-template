"use client";
import dynamic from "next/dynamic";
const Stake = dynamic(() => import("./Delegate"), { ssr: false });

export default function Main() {
  return (
    <div className="absolute top-18 right-20">
      <Stake />
    </div>
  );
}
