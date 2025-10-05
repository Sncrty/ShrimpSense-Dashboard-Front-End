// src/pages/Results.jsx (excerpt)
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Results({ updateNotification }) {
  const { state } = useLocation();
  const notificationId = state?.notificationId;

  useEffect(() => {
    // simulate processing
    let mounted = true;
    (async () => {
      // simulate work
      await new Promise((r) => setTimeout(r, 2000));
      if (!mounted) return;
      if (notificationId) {
        updateNotification(notificationId, { status: "done", message: "Analysis complete" });
      }
    })();
    return () => { mounted = false; };
  }, [notificationId, updateNotification]);

  // render results...
  return <div>Results page — processing...</div>;
}
