import React from 'react';
import Image from "next/image"; // If you want to use Next.js Image component

const TopHeaders: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-black-800 bg-opacity-100 rounded-lg shadow-2xl">
      <div className="flex items-center space-x-4">
        <Image
          src="logo.svg" // Update the logo path as needed
          alt="SN₳KE Logo"
          className="h-14 w-auto"
          width={56} // Adjust width as needed
          height={56} // Adjust height as needed
          priority
        />
        <div className="text-white font-semibold text-2xl">
          Cardano Stakepool SN₳KE
        </div>
      </div>
    </div>
  );
};

export default TopHeaders;

