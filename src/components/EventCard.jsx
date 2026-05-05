import { useState } from "react";
import { linkedinColors, BRANCH_COLORS, BRANCH_ICONS } from "../utils/colors.js";
import { font, fontDisplay } from "../utils/fonts.js";

const styles = {
  card: {
    background: linkedinColors.background.card,
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 12,
    padding: "16px 20px",
    fontFamily: font,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s",
    width: "100%",
  },
  cardHover: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
  },
  topRow: {
    display: "flex",
    gap: 14,
    alignItems: "center",
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    margin: "0 0 5px",
    fontSize: 16,
    fontWeight: 600,
    color: linkedinColors.text.primary,
    lineHeight: 1.35,
    fontFamily: fontDisplay,
  },
  metaRow: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 6,
  },
  metaText: {
    fontSize: 13,
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  metaAccent: {
    color: linkedinColors.brand.blue,
    fontWeight: 600,
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${linkedinColors.background.border}`,
    margin: "14px 0 12px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  attendees: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  attendeeCount: {
    fontSize: 13,
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  attendeeNum: {
    color: linkedinColors.brand.blue,
    fontWeight: 600,
  },
  postedBy: {
    fontSize: 12,
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  postedByName: {
    color: linkedinColors.text.primary,
    fontWeight: 500,
  },
  btnJoin: {
    padding: "7px 20px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
    border: `1.5px solid ${linkedinColors.brand.blue}`,
    background: linkedinColors.brand.blue,
    color: linkedinColors.brand.white,
    fontFamily: font,
  },
  btnJoinHover: {
    background: linkedinColors.brand.deepBlue,
    borderColor: linkedinColors.brand.deepBlue,
  },
  btnLeave: {
    padding: "7px 20px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
    border: `1.5px solid ${linkedinColors.accent.notification}`,
    background: "transparent",
    color: linkedinColors.accent.notification,
    fontFamily: font,
  },
  btnLeaveHover: {
    background: "#fff0f0",
  },
};

function BranchPhoto({ branch, photoUrl }) {
  const color = BRANCH_COLORS[branch] || { bg: linkedinColors.brand.blue };
  const icon = BRANCH_ICONS[branch] || "🎖️";

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={`${branch} emblem`}
        style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", border: `2px solid ${linkedinColors.background.border}`, flexShrink: 0 }}
      />
    );
  }

  return (
    <div style={{ width: 56, height: 56, borderRadius: 8, background: color.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: "2px solid rgba(0,0,0,0.08)" }}>
      {icon}
    </div>
  );
}

function BranchBadge({ branch }) {
  const color = BRANCH_COLORS[branch] || { bg: linkedinColors.brand.blue, text: linkedinColors.brand.white };
  return (
    <span style={{ background: color.bg, color: color.text, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", display: "inline-block", whiteSpace: "nowrap", fontFamily: font }}>
      {branch}
    </span>
  );
}

export function EventCard({ eventId, branch, title, eventDate, location, attendeeCount = 1, isJoined, branchPhotoUrl, createdBy, onJoin, onLeave }) {
  const [joined, setJoined] = useState(isJoined);
  const [count, setCount] = useState(attendeeCount);
  const [cardHover, setCardHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleToggle = () => {
    if (joined) {
      setJoined(false);
      setCount((prevCount) => prevCount - 1);
      onLeave?.(eventId);
    } else {
      setJoined(true);
      setCount((prevCount) => prevCount + 1);
      onJoin?.(eventId);
    }
  };

  return (
    <div
      style={{ ...styles.card, ...(cardHover ? styles.cardHover : {}) }}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <div style={styles.topRow}>
        <BranchPhoto branch={branch} photoUrl={branchPhotoUrl} />
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <BranchBadge branch={branch} />
          <div style={styles.metaRow}>
            <span style={styles.metaText}>
              <strong style={styles.metaAccent}>Event Date:</strong> {eventDate}
            </span>
            {location && <span style={styles.metaText}>{location}</span>}
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      <div style={styles.footer}>
        <div style={styles.attendees}>
          <span style={styles.attendeeCount}>
            <span style={styles.attendeeNum}>{count?.toLocaleString()}</span>{" "}
            {count === 1 ? "attendee" : "attendees"}
          </span>
          {createdBy && (
            <span style={styles.postedBy}>
              Posted by <span style={styles.postedByName}>{createdBy}</span>
            </span>
          )}
        </div>

        <button
          onClick={handleToggle}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            ...(joined ? styles.btnLeave : styles.btnJoin),
            ...(btnHover ? (joined ? styles.btnLeaveHover : styles.btnJoinHover) : {}),
          }}
        >
          {joined ? "Leave Event" : "Join Event"}
        </button>
      </div>
    </div>
  );
}
