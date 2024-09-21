"use client";

import Image from "next/image";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { useState } from "react";

const Delegate = () => {
  const network = NetworkType.MAINNET;
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  const [hovered, setHovered] = useState(false);

  const handleAPI = async () => {
    if (isConnected && enabledWallet) {
      try {
        const lucid = await Lucid(new Emulator([]), "Mainnet");
        const api = await window.cardano[enabledWallet].enable();
        lucid.selectWallet.fromAPI(api);
        const response = await fetch("/api/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: usedAddresses[0] }),
        });
        const { tx } = await response.json();
        const signedTx = await lucid.fromTx(tx).sign.withWallet().complete();
        const txh = await signedTx.submit();
        console.log(txh);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="relative flex flex-col items-center gap-3 sm:gap-6 lg:gap-8 mt-[-54px] mr-[-30px]">
          <button
            onClick={handleAPI}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ background: 'none', border: 'none', padding: 0, position: 'relative' }}
            className={`transition-transform duration-300 ease-in-out ${hovered ? 'scale-110 shadow-lg' : 'scale-100'}`}
          >
            <Image
              src="logo.svg"
              alt="Delegate"
              width={60}
              height={60}
              priority
            />
          </button>
          <div className={`absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded transition-opacity duration-300 whitespace-nowrap ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            Delegate Stake
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Delegate;
