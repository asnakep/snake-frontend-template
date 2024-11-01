"use client";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Importing a close icon

const Delegate: React.FC = () => {
  const network = NetworkType.MAINNET;
  const { isConnected, usedAddresses, stakeAddress, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  const [clicked, setClicked] = useState<boolean>(false);
  const [txMessage, setTxMessage] = useState<string | null>(null);

  const handleAPI = async () => {
    if (isConnected && enabledWallet) {
      try {
        setClicked(true);
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

        // Debugging: Log the stakeAddress and transaction ID
        console.log("Stake Address:", stakeAddress);
        console.log("Transaction ID:", txh);

        // Set the transaction message in one line
        setTxMessage(txh); // Only the tx ID will be shown as the link
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setClicked(false), 150);
      }
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <button
            className={`btn btn-outline px-4 py-2 text-[14px] font-bold transition-transform duration-150 ease-in-out ${
              clicked ? "scale-110" : "scale-100"
            }`}
            onClick={handleAPI}
          >
            DELEGATE
          </button>
        </div>
      ) : null}

      {/* Bottom-left notification message */}
      {txMessage && (
        <div className="fixed bottom-4 left-12 bg-base-300 text-white px-4 py-2 rounded shadow-lg z-50 flex items-center text-xs">
          <span className="uppercase font-bold mr-1">
            Wallet delegated to SNAKE. TXID: 
          </span>
          <a
            href={`https://adastat.net/transactions/${txMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase font-bold link-primary"
          >
            {txMessage}
          </a>
          {/* Close button with an icon */}
          <AiOutlineCloseCircle
            onClick={() => setTxMessage(null)}
            className="ml-4 text-red-400 hover:text-red-500 cursor-pointer text-xl"
          />
        </div>
      )}
    </>
  );
};

export default Delegate;
