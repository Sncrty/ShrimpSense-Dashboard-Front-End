import React from "react";

export default function LoadingSpinner({ label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-4 border-slate-300 border-t-sky-500 rounded-full animate-spin"></div>
      {label && <span className="text-slate-600 text-sm">{label}</span>}
    </div>
  );
}
