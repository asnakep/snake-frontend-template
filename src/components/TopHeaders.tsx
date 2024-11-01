import React from 'react';
import Image from "next/image";

const TopHeaders: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-black-800 bg-opacity-100 rounded-lg">
      <div className="flex items-center space-x-4">
        <Image
          src="logo.svg"
          alt="SN₳KE Logo"
          className="h-14 w-auto"
          width={56}
          height={56}
          priority
        />
        <div className="custom-title-font">
          SN₳KE Cardano Staking
        </div>
      </div>
    </div>
  );
};

export default TopHeaders;
