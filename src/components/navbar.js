// src/components/navbar.js
import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "home", label: "Home", route: "/", icon: "mdi:home-outline" },
    { key: "results", label: "Results", route: "/results", icon: "mdi:chart-line" },
    { key: "history", label: "History", route: "/history", icon: "mdi:history" },
  ];

  const isActive = (route) => location.pathname === route;

  const styles = {
    nav: {
      background: "linear-gradient(90deg, #013a63, #01497c, #0466c8)",
      padding: "12px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 100,
    },
    leftGroup: {
      display: "flex",
      alignItems: "center",
      gap: "20px", // reduced from 40px to make everything tighter
    },
    logoText: {
      fontSize: "1.8rem",
      fontWeight: 400,
      fontFamily: "'Orbitron', sans-serif",
      textTransform: "uppercase",
      color: "white",
      letterSpacing: "2px",
      cursor: "pointer",
      border: "none",
      background: "transparent",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "22px", // reduced from 35px
      fontSize: "1.05rem",
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
    },
    linkBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px", // closer icon and text
      color: "white",
      textDecoration: "none",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "4px 6px",
    },
    rightGroup: {
      display: "flex",
      alignItems: "center",
      gap: "20px", // reduced spacing between right icons
      marginRight: "8px",
      color: "white",
    },
    iconStyle: { color: "white" },
    logoutBtn: {
      background: "white",
      color: "#013a63",
      border: "none",
      borderRadius: "8px",
      padding: "6px 12px",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400&display=swap"
        rel="stylesheet"
      />
      <nav style={styles.nav} aria-label="Main navigation">
        <div style={styles.leftGroup}>
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.logoText}
            aria-label="Go to home"
          >
            SHRIMPSENSE
          </button>

          {/* Nav Links */}
          <div style={styles.navLinks}>
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.route)}
                aria-current={isActive(item.route) ? "page" : undefined}
                style={{
                  ...styles.linkBtn,
                  opacity: isActive(item.route) ? 1 : 0.9,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = isActive(item.route) ? "1" : "0.9")
                }
              >
                <Icon icon={item.icon} width="20" style={styles.iconStyle} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div style={styles.rightGroup}>
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
            aria-label="Notifications"
          >
            <Icon icon="mdi:bell-outline" width="22" style={styles.iconStyle} />
          </button>

          <button
            type="button"
            onClick={() => navigate("/settings")}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
            aria-label="Settings"
          >
            <Icon icon="mdi:cog-outline" width="22" style={styles.iconStyle} />
          </button>

          <button
            type="button"
            onClick={() => navigate("/logout")}
            style={styles.logoutBtn}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
