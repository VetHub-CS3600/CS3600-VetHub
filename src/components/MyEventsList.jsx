import React from "react";
import { EventCard } from "./EventCard";
import { getEventId, formatDate } from "../utils/eventUtils";
import { linkedinColors } from "../utils/colors.js";

import { font, fontDisplay } from "../utils/fonts.js";

const styles = {
  card: {
    background: linkedinColors.background.card,
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 12,
    padding: "1.25rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    fontFamily: font,
  },
  cardHeader: {
    marginBottom: "0.75rem",
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
    fontFamily: fontDisplay,
    fontSize: "1.2rem",
    fontWeight: 600,
    color: linkedinColors.text.primary,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.9rem",
  },
  listItem: {
    width: "100%",
    maxWidth: 540,
  },
  empty: {
    margin: 0,
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    fontFamily: font,
  },
  error: {
    margin: 0,
    color: linkedinColors.accent.notification,
    fontWeight: 500,
    fontFamily: font,
  },
};

export function MyEventsList({ loading, error, myEvents, pendingEventId, leaveEvent }) {
  return (
    <section style={styles.card}>
      <div style={styles.cardHeader}>
        <p style={styles.kicker}>My Events</p>
        <h2 style={styles.heading}>Your Joined Events</h2>
      </div>

      {loading ? (
        <p style={styles.empty}>Loading your events...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : myEvents.length ? (
        <div style={styles.list}>
          {myEvents.map((event) => {
            const eventId = getEventId(event);
            return (
              <div key={eventId} style={styles.listItem}>
                <EventCard
                  eventId={eventId}
                  branch={event.Branch || event.branch || "Event"}
                  title={event.Title || event.title}
                  eventDate={formatDate(event.EventDate || event.event_date)}
                  createdBy={event.CreatedBy || event.created_by}
                  attendeeCount={event.AttendeeCount || event.attendeeCount}
                  isJoined={true}
                  isPending={pendingEventId === eventId}
                  onLeave={leaveEvent}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p style={styles.empty}>You have not joined any events yet.</p>
      )}
    </section>
  );
}
