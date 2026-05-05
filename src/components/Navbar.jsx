import React from "react";
import { NavLink } from "react-router-dom";
import { linkedinColors } from "../utils/colors.js";

const styles = {
  navbarWrap: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
  navbar: {
    backgroundColor: linkedinColors.brand.white,
    borderBottom: `1px solid ${linkedinColors.border}`,
    padding: "0.85rem 1.1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarInner: {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
  },
  welcome: {
    color: linkedinColors.text.primary,
    fontFamily: '"Outfit", "Trebuchet MS", sans-serif',
    fontWeight: 500,
  },
  tab: {
    color: linkedinColors.text.primary,
    fontFamily: '"Outfit", "Trebuchet MS", sans-serif',
    fontWeight: 500,
    textDecoration: "none",
    position: "relative",
  },
  tabActive: {
    color: linkedinColors.text.primary,
    fontFamily: '"Outfit", "Trebuchet MS", sans-serif',
    fontWeight: 500,
    textDecoration: "none",
    position: "relative",
  },
  dot: {
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: linkedinColors.text.link,
  },
  logout: {
    color: linkedinColors.text.secondary,
    fontFamily: '"Outfit", "Trebuchet MS", sans-serif',
    fontWeight: 500,
  },
  brandText: {
    color: linkedinColors.brand.blue,
    fontFamily: '"Outfit", "Trebuchet MS", sans-serif',
    fontWeight: 700,
    fontSize: "1.25rem",
    marginRight: "1rem",
  },
};

export function Navbar({ veteran, logout }) {
  const welcomeName =
    veteran?.name ||
    [veteran?.first_name, veteran?.last_name].filter(Boolean).join(" ");

  return (
    <header style={styles.navbarWrap}>
      <nav style={styles.navbar} aria-label="Primary">
        <div style={styles.navbarInner}>
          <strong style={styles.brandText}>VetHub</strong>

          {[
            // { to: "/myevents", label: "My Events" },
            { to: "/events", label: "Events" },
            { to: "/graph", label: "Graph" },
            { to: "/profile", label: "Profile" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {({ isActive }) => (
                <span style={isActive ? styles.tabActive : styles.tab}>
                  {label}
                  {isActive && <span style={styles.dot} />}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div style={styles.navbarInner}>
          {welcomeName ? (
            <span style={styles.welcome}>Welcome, {welcomeName}</span>
          ) : null}
          <button type="button" onClick={logout} style={styles.logout}>
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
}
