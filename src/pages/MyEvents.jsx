import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MyEventsList } from "../components/MyEventsList";
import { getAuthHeaders } from "../utils/api.js";

const styles = {
  page: {
    position: "relative",
    padding: "1.5rem 1.2rem 3rem",
  },
  shell: {
    position: "relative",
    width: "min(720px, 100%)",
    margin: "0 auto",
    display: "grid",
    gap: "1.1rem",
  },
};

export function MyEvents() {
  const { token, BASE_URL, myEvents, myEventsLoading, myEventsError, refreshMyEvents } = useOutletContext();

  const [pendingEventId, setPendingEventId] = useState(null);

  const leaveEvent = async (eventId) => {
    setPendingEventId(eventId);
    try {
      const res = await fetch(`${BASE_URL}/events/${eventId}/leave`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error("Could not leave event");
      await refreshMyEvents();
    } finally {
      setPendingEventId(null);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.shell}>
        <MyEventsList
          loading={myEventsLoading}
          error={myEventsError}
          myEvents={myEvents}
          pendingEventId={pendingEventId}
          leaveEvent={leaveEvent}
        />
      </div>
    </section>
  );
}
