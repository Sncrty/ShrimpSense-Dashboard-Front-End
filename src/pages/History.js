// src/pages/History.js
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "shrimp_history_v1";

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

export default function History() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    seedIfEmpty();
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // order newest first
    all.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    setItems(all);
  }, []);

  const toggleOpen = (id) => {
    setItems((prev) => prev.map(it => it.id === id ? { ...it, _open: !it._open } : it));
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center text-slate-700">
          <p className="mb-4">No history yet. Process an image to create your first result.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">History</h2>

        <div className="space-y-4">
          {items.map(item => {
            const created = new Date(item.timestamp);
            const dateStr = created.toLocaleDateString();
            const timeStr = created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div key={item.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3"
                  aria-expanded={!!item._open}
                >
                  <div className="text-left">
                    <div className="text-sm text-slate-500">{dateStr}</div>
                    <div className="text-base font-medium text-slate-800">{timeStr}</div>
                  </div>
                  <div className="text-slate-600">
                    <Icon icon={item._open ? "mdi:chevron-up" : "mdi:chevron-down"} width="20" />
                  </div>
                </button>

                {item._open && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border rounded p-3 text-center">
                        <div className="text-sm text-slate-500">Total PL Shrimp Count</div>
                        <div className="text-xl font-semibold text-teal-700">{item.totalPL.toLocaleString()}</div>
                      </div>
                      <div className="border rounded p-3 text-center">
                        <div className="text-sm text-slate-500">Total Biomass</div>
                        <div className="text-xl font-semibold text-teal-700">{item.biomass} g</div>
                      </div>
                      <div className="border rounded p-3 text-center">
                        <div className="text-sm text-slate-500">Feed Rec</div>
                        <div className="text-xl font-semibold text-teal-700">{item.feedRecommendation} g/day</div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-4 items-start">
                      <div className="w-28">
                        <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="feed pie">
                          <circle cx="50" cy="50" r="40" fill="#fff" />
                          <circle cx="50" cy="50" r="34" fill="transparent"
                            stroke="#ff8a65" strokeWidth="12"
                            strokeDasharray={`${(Number(item.breakdown.protein)/(Number(item.breakdown.protein)+Number(item.breakdown.filler)))*214} 214`} transform="rotate(-90 50 50)" />
                        </svg>
                      </div>

                      <div className="text-sm text-slate-600">
                        <div><strong>Protein:</strong> {item.breakdown.protein} g</div>
                        <div><strong>Filler:</strong> {item.breakdown.filler} g</div>
                        <div className="mt-2 text-slate-500">Image: <span className="font-medium">{item.fileName}</span></div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button onClick={() => navigate(`/results?id=${item.id}`)} className="px-3 py-1 bg-[#0077b6] text-white rounded">View result</button>
                      <button onClick={() => {
                        const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter(x=>x.id!==item.id);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
                        setItems(all);
                      }} className="px-3 py-1 border rounded">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
