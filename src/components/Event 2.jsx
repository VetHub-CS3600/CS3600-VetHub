import React from "react";
import { linkedinColors } from "../utils/colors.js";

const font = '"Outfit", "Trebuchet MS", sans-serif';
const fontDisplay = '"Space Grotesk", "Verdana", sans-serif';

const styles = {
  item: {
    display: "grid",
    gridTemplateColumns: "9rem 1fr",
    gap: "1rem",
    alignItems: "start",
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 12,
    padding: "1rem",
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    fontFamily: font,
  },
  badge: {
    alignSelf: "start",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: 999,
    padding: "0.42rem 0.75rem",
    background: linkedinColors.brand.blue,
    color: linkedinColors.brand.white,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: font,
  },
  heading: {
    margin: 0,
    fontSize: "1.05rem",
    fontFamily: fontDisplay,
    fontWeight: 600,
    color: linkedinColors.text.primary,
  },
  meta: {
    margin: "0.35rem 0 0",
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    fontSize: "0.875rem",
    fontFamily: font,
  },
  metaAccent: {
    fontWeight: 700,
    color: linkedinColors.brand.blue,
  },
  actions: {
    marginTop: "0.7rem",
  },
  btnJoin: {
    border: `1px solid rgba(10, 102, 194, 0.45)`,
    color: linkedinColors.brand.blue,
    background: linkedinColors.background.card,
    borderRadius: 10,
    padding: "0.52rem 0.9rem",
    fontFamily: font,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
  },
  btnLeave: {
    border: `1px solid rgba(204, 16, 22, 0.25)`,
    color: linkedinColors.accent.notification,
    background: linkedinColors.background.card,
    borderRadius: 10,
    padding: "0.52rem 0.9rem",
    fontFamily: font,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
  },
  btnDisabled: {
    opacity: 0.75,
    cursor: "not-allowed",
  },
};

export function Event({ eventId, branch, title, createdDate, eventDate, isJoined, isPending, leaveEvent, joinEvent }) {
  return (
    <article style={styles.item}>
      <div style={styles.badge}>{branch}</div>
      <div>
        <h2 style={styles.heading}>{title}</h2>
        {createdDate && (
          <p style={styles.meta}>
            <span style={styles.metaAccent}>Created:</span> {createdDate}
          </p>
        )}
        <p style={styles.meta}>
          <span style={styles.metaAccent}>Event Date:</span> {eventDate}
        </p>
        <div style={styles.actions}>
          {isJoined ? (
            <button
              type="button"
              style={{ ...styles.btnLeave, ...(isPending ? styles.btnDisabled : {}) }}
              onClick={() => leaveEvent(eventId)}
              disabled={isPending}
            >
              {isPending ? "Leaving..." : "Leave"}
            </button>
          ) : (
            <button
              type="button"
              style={{ ...styles.btnJoin, ...(isPending ? styles.btnDisabled : {}) }}
              onClick={() => joinEvent(eventId)}
              disabled={isPending}
            >
              {isPending ? "Joining..." : "Join"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
