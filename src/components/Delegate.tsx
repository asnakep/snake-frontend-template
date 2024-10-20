"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { useState } from "react";

const Delegate: React.FC = () => {
  const network = NetworkType.MAINNET;
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  const [clicked, setClicked] = useState<boolean>(false); // Declare the 'clicked' state as a boolean

  const handleAPI = async () => {
    if (isConnected && enabledWallet) {
      try {
        setClicked(true); // Trigger animation on click
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
      } finally {
        setTimeout(() => setClicked(false), 150); // Reset the animation after a short delay
      }
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 mt-[-53px] mr-[-30px]">
          <button
            className={`btn btn-outline px-4 py-2 text-[12px] font-bold transition-transform duration-150 ease-in-out ${
              clicked ? "scale-110" : "scale-100"
            }`} // Animation class toggling
            onClick={handleAPI}
          >
            DELEGATE
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Delegate;
