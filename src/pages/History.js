import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

/**
 * History shows a list of saved results from localStorage.
 * Each entry shows date/time and a small chevron to expand the result brief (cards like Results).
 */

const STORAGE_KEY = "shrimp_history_v1";

export default function History() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setItems(all);
  }, []);

  const toggleOpen = (id) => {
    setItems((prev) => prev.map(it => it.id === id ? { ...it, _open: !it._open } : it));
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 mb-4">No history yet. Process an image to create your first result.</p>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-[#0077b6] text-white rounded">Get started</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">History</h2>

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
                    <Icon icon={item._open ? "mdi:chevron-up" : "mdi:chevron-down"} width="28" height="28" />
                  </div>
                </button>

                {item._open && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        {/* simple pie small */}
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
                        // delete
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
