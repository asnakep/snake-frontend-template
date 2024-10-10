import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10">
      <div className="absolute bottom-4 right-0 flex justify-end items-center w-full mr-10">
        <p className="mr-2">
         
        </p>
        <div className="flex space-x-8">
          <Link href="https://gov.tools/connected/drep_directory/drep1axjcgsgh9pc38sg4gnjgv2scpdzu5fjfkmg6pa5g9e5h7dkqusm" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-govtool.svg"
              alt="Govtool Logo"
              width={auto}
              height={auto}
              priority
            />
          </Link>
          <Link href="https://t.me/channel_adasnakepool" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-telegram.svg"
              alt="Telegram Logo"
              width={18}
              height={18}
              priority
            />
          </Link>
          <Link href="https://twitter.com/adasnakepool" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-x.svg"
              alt="Twitter Logo"
              width={12}
              height={12}
              priority
            />
          </Link>
          <Link href="https://www.linkedin.com/in/cardano-stakepool-sn%E2%82%B3ke-93a75938" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-linkedin.svg"
              alt="LinkedIn Logo"
              width={16}
              height={16}
              priority
            />
          </Link>
          <Link href="https://github.com/asnakep" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-github.svg"
              alt="Github Logo"
              width={16}
              height={16}
              priority
            />
          </Link>
          <Link href="https://adastat.net/pools/342350284fd76ba9dbd7fd4ed579b2a2058d5ee558f8872b37817b28" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-adastat.svg"
              alt="Adastat Logo"
              width={18}
              height={18}
              priority
            />
          </Link>
          <Link href="https://pooltool.io/pool/342350284fd76ba9dbd7fd4ed579b2a2058d5ee558f8872b37817b28" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-pooltool.svg"
              alt="Pooltool Logo"
              width={18}
              height={18}
              priority
            />
          </Link>
          <Link href="https://pool.pm/342350284fd76ba9dbd7fd4ed579b2a2058d5ee558f8872b37817b28" target="_blank" rel="noopener noreferrer">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="logo-poolpm.svg"
              alt="Poolpm Logo"
              width={18}
              height={18}
              priority
            />
          </Link>
          {/* Add more links and icons here */}
        </div>
      </div>
    </footer>
  );
}
