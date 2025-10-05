import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      className="flex items-center gap-2 p-4 mt-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M4.93 4.93a10.003 10.003 0 0114.14 0 10.003 10.003 0 010 14.14 10.003 10.003 0 01-14.14 0 10.003 10.003 0 010-14.14z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
