// src/pages/Settings.js
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [tosOpen, setTosOpen] = useState(false);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  // trap focus inside modal when open (simple)
  useEffect(() => {
    if (!tosOpen) return;
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") setTosOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [tosOpen]);

  const openTos = () => setTosOpen(true);
  const closeTos = () => setTosOpen(false);

  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <Icon icon="mdi:arrow-left" width="22" />
          </button>
          <h1 className="text-xl font-semibold text-slate-800">Settings</h1>
          <div style={{ width: 40 }} /> {/* spacer */}
        </header>

        {/* List */}
        <div className="space-y-4">
          {/* Terms and Conditions */}
          <button
            onClick={openTos}
            className="w-full flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-haspopup="dialog"
            aria-expanded={tosOpen}
          >
            <div className="flex-none w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600">
              <Icon icon="mdi:file-document-outline" width="20" />
            </div>
            <div className="text-left">
              <div className="text-base font-medium text-slate-900">Terms and Conditions</div>
              <div className="text-sm text-slate-500">Last updated: Sep 30, 2025</div>
            </div>
            <div className="ml-auto text-slate-400">
              <Icon icon="mdi:chevron-right" width="22" />
            </div>
          </button>

          {/* Contact */}
          <div
            className="w-full flex items-start gap-4 p-4 border rounded-lg shadow-sm"
            role="group"
            aria-label="Contact information"
          >
            <div className="flex-none w-10 h-10 rounded-md bg-sky-50 flex items-center justify-center text-sky-600">
              <Icon icon="mdi:email-outline" width="20" />
            </div>
            <div className="text-left">
              <div className="text-base font-medium text-slate-900">Contact</div>
              <div className="mt-2 text-sm text-slate-700 space-y-1">
                <div>📧 Email: <a className="text-sky-600 underline" href="mailto:support@shrimpsense.com">support@shrimpsense.com</a></div>
                <div>🌐 Website: <a className="text-sky-600 underline" href="https://www.shrimpsense.com" target="_blank" rel="noreferrer">www.shrimpsense.com</a></div>
                <div>📍 Office: TIP - QC</div>
              </div>
            </div>
          </div>

          {/* (No logout here as requested) */}
        </div>
      </div>

      {/* Terms modal */}
      {tosOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tos-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeTos}
          />

          {/* modal panel */}
          <div
            ref={modalRef}
            className="relative bg-white w-full sm:max-w-2xl mx-4 sm:mx-0 rounded-t-lg sm:rounded-lg overflow-auto max-h-[85vh] shadow-xl"
          >
            <div className="flex items-start justify-between p-4 border-b">
              <div>
                <h2 id="tos-title" className="text-lg font-semibold text-slate-800">
                  Terms of Service
                </h2>
                <p className="text-sm text-slate-500">Last updated: Sep 30, 2025</p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeTos}
                aria-label="Close terms"
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <Icon icon="mdi:close" width="20" />
              </button>
            </div>

            <div className="p-4 space-y-4 text-slate-700 leading-relaxed">
              <p><strong>Welcome to ShrimpSense.</strong> These Terms and Conditions govern your use of this application. By accessing or using the app, you agree to comply with these Terms. If you do not agree, please stop using the app immediately.</p>

              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Purpose of the App</strong>
                  <div>This application is designed to assist in shrimp quantification, biomass calculation, and feed optimization.</div>
                </li>

                <li>
                  <strong>Use of the App</strong>
                  <div>You may only use the app for its intended purpose. Any misuse, tampering, or unauthorized modification is strictly prohibited.</div>
                </li>

                <li>
                  <strong>Data Handling</strong>
                  <div>All data remains your property, and you retain full control over it. We will not sell, rent, or disclose your data to third parties without your permission, except when required by law. We may use aggregated or anonymized data for research and system improvement.</div>
                </li>

                <li>
                  <strong>Disclaimer</strong>
                  <div>The calculations and recommendations provided are for guidance purposes only. While we strive for accuracy, the development team is not responsible for any losses or damages resulting from reliance on the app’s output.</div>
                </li>

                <li>
                  <strong>Intellectual Property</strong>
                  <div>All content, designs, software, and features of ShrimpSense are the intellectual property of the development team. You may not copy, distribute, or create derivative works without permission.</div>
                </li>

                <li>
                  <strong>Termination of Use</strong>
                  <div>We reserve the right to suspend or terminate your access if you violate these Terms. You may stop using the app at any time by uninstalling or logging out.</div>
                </li>

                <li>
                  <strong>Changes to Terms</strong>
                  <div>We may update the app, add features, or make improvements at any time. These Terms and Conditions may be updated from time to time. Continued use of the app means you accept the latest version.</div>
                </li>
              </ol>

              <div className="text-sm text-slate-500">
                <em>If you have questions about these terms, contact support@shrimpsense.com</em>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={closeTos}
                className="px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
