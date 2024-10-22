"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import Image from "next/image";

declare global {
  interface Window {
    my_modal: any;
  }
}

const WalletModal = () => {
  const network = NetworkType.MAINNET;
  const { isConnected, connect, installedExtensions } = useCardano({
    limitNetwork: network,
  });

  return (
    <div>
      <button
        className="btn btn-outline"
        onClick={() => window.my_modal.showModal()}
        disabled={isConnected} // Disable the button if already connected
      >
        {isConnected ? "CONNECTED" : "CONNECT"}
      </button>
      <dialog id="my_modal" className="modal">
        <form method="dialog" className="modal-box">
          <div className="flex flex-col gap-3 sm:gap-6 lg:gap-8">
            {installedExtensions.map((provider: string) => (
              <div key={provider} className="flex justify-around">
                <button
                  className="btn btn-outline"
                  onClick={() => connect(provider)}
                  disabled={isConnected} // Disable the connection buttons if already connected
                >
                  {provider.toUpperCase()}
                </button>
                <span className="h-auto w-20">
                  <Image
                    src={window.cardano[provider].icon}
                    alt={provider}
                    width={36}
                    height={10}
                  />
                </span>
              </div>
            ))}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default WalletModal;
