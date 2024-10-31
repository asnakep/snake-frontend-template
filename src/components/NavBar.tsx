'use client';
import dynamic from "next/dynamic";
import TopHeaders from "./TopHeaders";
import Ticker from "./Ticker";

const Delegate = dynamic(() => import('./Delegate'), { ssr: false });
const WalletConnect = dynamic(() => import("./WalletConnect"), { ssr: false });

export default function NavBar() {
  return (
    <div className="flex items-center w-full px-4 py-2 font-mono text-sm fixed top-0 left-0 right-0 max-w-full bg-base-100 z-[100]">
      {/* Left section with logo and title */}
      <div className="flex-shrink-0 mr-4">
        <TopHeaders />
      </div>

      {/* Ticker Section */}
      <div className="flex-grow mx-4 overflow-hidden">
        <Ticker />
      </div>

      {/* Right section with WalletConnect and Delegate */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <WalletConnect />
        <Delegate />
      </div>
    </div>
  );
}
