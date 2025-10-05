import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const STORAGE_KEY = "shrimp_history_v1";

function saveResultToStorage(result) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  all.unshift(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function generateMockResult(file) {
  const id = Date.now().toString();
  const totalPL = Math.floor(200 + Math.random() * 4800);
  const biomass = (0.01 * totalPL).toFixed(2);
  const feedRecommendation = (totalPL * 0.0025).toFixed(2);
  const protein = (feedRecommendation * 0.55).toFixed(2);
  const filler = (feedRecommendation * 0.45).toFixed(2);

  return {
    id,
    fileName: file.name,
    timestamp: new Date().toISOString(),
    totalPL,
    biomass,
    feedRecommendation,
    breakdown: { protein, filler },
  };
}

export default function Home() {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const onPick = () => fileRef.current?.click();

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (jpg, png, webp).");
      e.target.value = "";
      return;
    }

    const result = generateMockResult(file);
    saveResultToStorage(result);
    navigate(`/results?id=${result.id}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-gray-900 overflow-hidden">
      <main
        className="max-w-3xl w-full px-6 py-20 text-center"
        aria-labelledby="home-heading"
      >
        {/* Logo */}
        <img
          src={require("../assets/shrimpsenselogo.svg").default}
          alt="ShrimpSense logo"
          className="mx-auto w-[25%] sm:w-[20%] md:w-[30%] lg:w-[30%] h-auto mb-6"
        />

        {/* Title */}
        <h1
          id="home-heading"
          className="text-4xl md:text-5xl font-[Orbitron] font-bold mb-4 tracking-wide text-gray-900"
        >
          Welcome to ShrimpSense
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg">
          To Start please insert an  image of shrimp fry
        </p>

        {/* Button */}
        <button
          onClick={onPick}
          className="inline-flex items-center gap-2 bg-[#0077b6] hover:bg-[#00669a] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
          aria-label="Let's get started — upload image"
        >
          <Icon icon="mdi:camera" width="20" height="20" />
          Let's get started
        </button>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFile}
        />
      </main>
    </div>
  );
}
