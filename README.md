# VetHub — Frontend

A React + Vite web application that connects veterans through shared events, service history, and a community network graph.

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — build tool and dev server
- **React Router v6** — client-side routing
- **Cytoscape.js** — network graph visualization (loaded via CDN)

---

## Getting Started

### Install dependencies
```bash
npm install
```

### Start the dev server
```bash
npm run dev
```

The app runs at `http://localhost:5173` and expects the API at `http://localhost:8000`.

---

## Project Structure

```
src/
├── pages/
│   ├── Login.jsx         # Login and registration
│   ├── Events.jsx        # Community event feed + create event
│   ├── Profile.jsx       # Veteran profile and service history
│   ├── Graph.jsx         # Network graph of veterans and events
│   └── MyEvents.jsx      # Events the veteran has joined or hosted
│
├── components/
│   ├── Navbar.jsx            # Top navigation bar
│   ├── EventCard.jsx         # Individual event card
│   ├── EventsFeed.jsx        # Scrollable list of event cards
│   ├── CreateEventForm.jsx   # Form to create a new event
│   ├── ProfileSideCard.jsx   # Left sidebar profile summary
│   ├── RightSideCard.jsx     # Branch filter + upcoming events
│   ├── MyEventsList.jsx      # List of user's joined/hosted events
│   └── EventsHero.jsx        # Hero banner for events page
│
├── hooks/
│   ├── useFeedEvents.js   # Fetch community event feed
│   ├── useMyEvents.js     # Fetch veteran's own events
│   ├── useGraph.js        # Fetch graph nodes and edges
│   ├── useServices.js     # Fetch veteran's service records
│   └── useWindowWidth.js  # Responsive breakpoint helper
│
└── utils/
    ├── colors.js       # Brand colors, branch colors, branch icons
    ├── fonts.js        # Shared font family constants
    ├── constants.js    # Branch names and options lists
    ├── api.js          # Auth header helpers (getAuthHeaders, getJsonHeaders)
    └── eventUtils.js   # Event ID normalization and date formatting
```

---

## Features

- **Authentication** — register and log in with JWT tokens (60-minute expiry)
- **Community Feed** — browse all upcoming events, filter by branch
- **Create Events** — host a new event associated with a military branch
- **Join / Leave Events** — RSVP to community events
- **Profile & Service History** — view and manage your military service records
- **Network Graph** — interactive Cytoscape.js visualization of veteran-event connections
- **Responsive Layout** — 3-column desktop, 2-column tablet, single-column mobile

---

## API

The frontend connects to the **VetHubApi** Python/FastAPI backend. See [`VetHubApi/README.md`](../VetHubApi/README.md) for the full API reference.

**Base URL:** `http://localhost:8000`  
All protected routes require:
```
Authorization: Bearer <token>
```
# CS3600-VetHub
