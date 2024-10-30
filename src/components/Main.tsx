'use client';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoadingPopup from "./LoadingPopup";

const Dashboard = dynamic(() => import("./Dashboard"), { ssr: false });

export default function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 6000));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      {loading && <LoadingPopup />}
      <div className="w-full max-w-full mx-auto px-4 md:px-6 lg:px-8 mt-10 mb-16">
        {/* Use the unified Dashboard component */}
        <Dashboard />
      </div>
    </>
  );
}
