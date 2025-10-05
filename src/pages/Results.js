// src/pages/Results.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "shrimp_history_v1";

/** Seed sample data if localStorage empty */
function seedIfEmpty() {
  const exists = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (exists.length) return;

  const samples = [
    {
      id: "r-" + (Date.now() - 1000 * 60 * 60 * 24 * 2),
      fileName: "pond_2025-09-30.jpg",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      totalPL: 5000,
      biomass: "7.5",
      feedRecommendation: "11.25",
      breakdown: { protein: "6.19", filler: "5.06" },
    },
    {
      id: "r-" + (Date.now() - 1000 * 60 * 60 * 24 * 10),
      fileName: "pond_2025-06-03.jpg",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      totalPL: 3200,
      biomass: "4.8",
      feedRecommendation: "8.00",
      breakdown: { protein: "4.40", filler: "3.60" },
    },
    {
      id: "r-" + (Date.now() - 1000 * 60 * 60 * 24 * 60),
      fileName: "pond_2025-01-28.jpg",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
      totalPL: 1500,
      biomass: "1.9",
      feedRecommendation: "3.75",
      breakdown: { protein: "2.06", filler: "1.69" },
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
}

function readFromStorage(id) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!id) return all[0] || null;
  return all.find((r) => r.id === id) || null;
}

function Pie({ a, b, size = 120 }) {
  const total = Number(a) + Number(b) || 1;
  const aDeg = (Number(a) / total) * 360;
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const aLen = (aDeg / 360) * circumference;
  const bLen = circumference - aLen;
  const r = size / 2;
  const cx = r;
  const cy = r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="pie chart">
      <circle cx={cx} cy={cy} r={r - 8} fill="#fff" />
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        <circle cx={cx} cy={cy} r={r - 8} fill="transparent"
          stroke="#ff8a65" strokeWidth={16}
          strokeDasharray={`${aLen} ${bLen}`} strokeLinecap="butt" />
        <circle cx={cx} cy={cy} r={r - 8} fill="transparent"
          stroke="#0c6b63" strokeWidth={16}
          strokeDasharray={`${bLen} ${aLen}`} strokeDashoffset={-aLen} strokeLinecap="butt" />
      </g>
    </svg>
  );
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    seedIfEmpty();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const r = readFromStorage(id);
    setResult(r);
  }, [location.search]);

  if (!result) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center text-slate-700">
          <p className="mb-4">No results available.</p>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-sky-600 text-white rounded">Go home</button>
        </div>
      </div>
    );
  }

  const created = new Date(result.timestamp);
  const dateStr = created.toLocaleDateString();
  const timeStr = created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800">Results</h2>
        <p className="text-sm text-slate-500 mb-6">{dateStr} • {timeStr}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border rounded-md p-4 shadow-sm">
            <div className="text-xs text-slate-500 mb-2">Total PL Shrimp Count</div>
            <div className="text-2xl font-bold text-teal-700">{result.totalPL.toLocaleString()} pcs</div>
          </div>

          <div className="bg-white border rounded-md p-4 shadow-sm">
            <div className="text-xs text-slate-500 mb-2">Total Biomass</div>
            <div className="text-2xl font-bold text-teal-700">{result.biomass} g</div>
          </div>
        </div>

        <div className="bg-white border rounded-md p-5 shadow-sm">
          <h3 className="text-lg font-medium text-slate-800 mb-3">Feed Recommendation</h3>
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <div className="flex-1">
              <div className="text-3xl font-bold text-teal-700 mb-2">{result.feedRecommendation} g/day</div>
              <div className="text-sm text-slate-500 mb-4">Recommended feed per day based on current count</div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-orange-400" />
                  <div className="text-sm">Protein: <span className="font-medium">{result.breakdown.protein} g</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-teal-700" />
                  <div className="text-sm">Filler: <span className="font-medium">{result.breakdown.filler} g</span></div>
                </div>
              </div>
            </div>

            <div className="w-36 mt-6 md:mt-0">
              <Pie a={Number(result.breakdown.protein)} b={Number(result.breakdown.filler)} size={120} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
