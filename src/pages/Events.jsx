import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAuthHeaders } from "../utils/api.js";
import { CreateEventForm } from "../components/CreateEventForm";
import { EventsFeed } from "../components/EventsFeed";
import { ProfileSidebar } from "../components/ProfileSideCard";
import { BranchFilter, UpcomingEvents } from "../components/RightSideCard";
import { getEventId, formatDate } from "../utils/eventUtils";
import { useWindowWidth } from "../hooks/useWindowWidth";

const styles = {
  page: {
    position: "relative",
    padding: "1.5rem 1.2rem 3rem",
  },
  shell: (cols) => ({
    position: "relative",
    width: "min(1200px, 100%)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: cols,
    gap: "1.1rem",
    alignItems: "start",
  }),
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    position: "sticky",
    top: "72px",
  },
  sidebarStatic: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  mainCol: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minWidth: 0,
  },
};


export function Events() {
  const {
    token,
    veteran,
    BASE_URL,
    feedEvents,
    feedLoading,
    feedError,
    refreshFeed,
    myEventIds,
    myEvents,
    refreshMyEvents,
    services,
  } = useOutletContext();

  const [pendingEventId, setPendingEventId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const width = useWindowWidth();
  const isMobile = width < 760;
  const isTablet = width < 1024;

  const primaryService = services[0] ?? null;

  const joinEvent = async (eventId) => {
    setPendingEventId(eventId);
    setActionError("");
    try {
      const res = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "POST",
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error("Could not join event");
      await refreshMyEvents();
    } catch (err) {
      setActionError(err.message || "Could not join event");
    } finally {
      setPendingEventId(null);
    }
  };

  const leaveEvent = async (eventId) => {
    setPendingEventId(eventId);
    setActionError("");
    try {
      const res = await fetch(`${BASE_URL}/events/${eventId}/leave`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error("Could not leave event");
      await refreshMyEvents();
    } catch (err) {
      setActionError(err.message || "Could not leave event");
    } finally {
      setPendingEventId(null);
    }
  };

  const filteredEvents =
    selectedBranches.length === 0
      ? feedEvents
      : feedEvents.filter((event) =>
          selectedBranches.includes(event.Branch || event.branch)
        );

  const upcomingEventsList = (myEvents ?? [])
    .map((event) => ({
      eventId: getEventId(event),
      title: event.Title || event.title,
      eventDate: formatDate(event.EventDate || event.event_date),
      branch: event.Branch || event.branch,
    }))
    .slice(0, 5);

  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "200px 1fr"
    : "240px 1fr 240px";
  const sidebarStyle = isMobile ? styles.sidebarStatic : styles.sidebar;
  const myEventsHostedCount = myEvents.filter((event) => event.CreatedBy === veteran?.first_name + " " + veteran?.last_name).length;

  return (
    <section style={styles.page}>
      <div style={styles.shell(gridCols)}>
        {/* Left sidebar */}
        <aside style={sidebarStyle}>
          <ProfileSidebar
            firstName={veteran?.first_name}
            lastName={veteran?.last_name}
            branch={primaryService?.Branch || primaryService?.branch}
            servicePeriodStart={
              primaryService?.YearStart || primaryService?.year_start
            }
            servicePeriodEnd={
              primaryService?.YearEnd || primaryService?.year_end
            }
            eventsJoined={myEventIds?.size ?? 0}
            eventsHosted={myEventsHostedCount}
          />
        </aside>

        {/* Main content */}
        <div style={styles.mainCol}>
          <CreateEventForm
            BASE_URL={BASE_URL}
            token={token}
            onCreated={() => {
              refreshFeed();
              refreshMyEvents();
            }}
          />
          <EventsFeed
            loading={feedLoading}
            error={feedError || actionError}
            feedEvents={filteredEvents}
            myEventIds={myEventIds}
            pendingEventId={pendingEventId}
            joinEvent={joinEvent}
            leaveEvent={leaveEvent}
          />
        </div>

        {/* Right sidebar — hidden on tablet (2-col layout) */}
        {!isTablet && (
          <aside style={sidebarStyle}>
            <BranchFilter
              selectedBranches={selectedBranches}
              onChange={setSelectedBranches}
            />
            <UpcomingEvents events={upcomingEventsList} />
          </aside>
        )}
      </div>
    </section>
  );
}
