import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div
      role="status"
      className={`flex items-center justify-center ${className}`}
    >
      <span className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default Loading;
