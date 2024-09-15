import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10">
      <div className="absolute bottom-8 right-8 flex justify-end items-center w-full mr-20">
        <p className="font-bold mr-1">
          SN₳KE Cardano Staking
        </p>
        <Link href="https://twitter.com/adasnakepool">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="logo-x.svg"
            alt="X Logo"
            width={12}
            height={12}
            priority
          />
        </Link>
      </div>
    </footer>
  );
}
