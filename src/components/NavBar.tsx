'use client';
import dynamic from "next/dynamic";
import Image from "next/image";
const WalletConnect = dynamic(() => import("./WalletConnect"), { ssr: false });

export default function NavBar() {
  return (
    <div className="flex flex-wrap w-full max-w-5xl items-center justify-between font-mono text-sm mt-[-50px] mr-[-180px]">
      <div className="">
      </div>
      <WalletConnect />
    </div>
  );
}
