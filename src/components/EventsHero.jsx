import React from "react";
import { linkedinColors } from "../utils/colors.js";

import { font, fontDisplay } from "../utils/fonts.js";

const styles = {
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    padding: "1.2rem",
    borderRadius: 16,
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    fontFamily: font,
  },
  kicker: {
    margin: "0 0 0.2rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.72rem",
    color: linkedinColors.text.secondary,
    fontFamily: font,
    fontWeight: 500,
  },
  heading: {
    margin: 0,
    fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
    lineHeight: 1.05,
    fontFamily: fontDisplay,
    fontWeight: 700,
    color: linkedinColors.text.primary,
  },
  subtitle: {
    margin: "0.4rem 0 0",
    color: linkedinColors.text.secondary,
    maxWidth: "60ch",
    fontFamily: font,
    lineHeight: 1.5,
    fontSize: "0.9rem",
  },
  stat: {
    minWidth: 120,
    borderRadius: 12,
    padding: "0.8rem 1rem",
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.page,
    textAlign: "center",
    flexShrink: 0,
  },
  statLabel: {
    display: "block",
    marginBottom: "0.25rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "0.72rem",
    color: linkedinColors.text.secondary,
    fontFamily: font,
    fontWeight: 500,
  },
  statValue: {
    fontSize: "1.8rem",
    lineHeight: 1,
    fontFamily: fontDisplay,
    fontWeight: 700,
    color: linkedinColors.brand.blue,
  },
};

export function EventsHero({ fullName, eventCount }) {
  return (
    <header style={styles.hero}>
      <div>
        <p style={styles.kicker}>Community Feed</p>
        <h1 style={styles.heading}>Upcoming Events</h1>
        <p style={styles.subtitle}>
          Browse the latest veteran events pulled directly from the API.
          {fullName ? ` Logged in as ${fullName}.` : ""}
        </p>
      </div>
      <div style={styles.stat}>
        <span style={styles.statLabel}>Visible Events</span>
        <strong style={styles.statValue}>{eventCount}</strong>
      </div>
    </header>
  );
}
