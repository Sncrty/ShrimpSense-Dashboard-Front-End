import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import History from "./pages/History";
import Settings from "./pages/Settings";

export default function App() {
  const [notifications, setNotifications] = useState([]); // newest first

  // add notification and return its id
  const addNotification = useCallback((payload) => {
    const id = Date.now().toString();
    const item = { id, status: payload.status || "processing", message: payload.message || "Image uploaded", time: Date.now() };
    setNotifications((prev) => [item, ...prev]);
    return id;
  }, []);

  const updateNotification = useCallback((id, patch) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  const markRead = useCallback((id) => {
    // here we simply remove it from the list to indicate read (or you can set read flag)
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleLogout = () => {
    // example: clear local storage, tokens, etc.
    console.log("logout clicked");
    // implement your logout flow here
  };

  return (
    <Router>
      <Navbar
        notifications={notifications}
        onClearNotifications={clearNotifications}
        onMarkRead={markRead}
        onLogout={handleLogout}
      />

      <main className="pt-20"> {/* push content below fixed navbar */}
        <Routes>
          <Route path="/" element={<Home addNotification={addNotification} updateNotification={updateNotification} />} />
          <Route path="/results" element={<Results addNotification={addNotification} updateNotification={updateNotification} />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </Router>
  );
}
