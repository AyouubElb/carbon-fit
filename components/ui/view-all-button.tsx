"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ViewAllButton = () => {
  const router = useRouter();
  return (
    <div className="text-center">
      <button
        className="bg-[#ecc174] text-white/80 px-6 py-3 text-base font-medium rounded-none uppercase cursor-pointer hover:text-white hover:opacity-90 transition-opacity uppercase"
        onClick={() => router.push("/collections")}
      >
        View All
      </button>
    </div>
  );
};

export default ViewAllButton;
