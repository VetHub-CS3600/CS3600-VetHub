import { useState, useEffect, useCallback, Fragment } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Events } from "./pages/Events";
import { Navbar } from "./components/Navbar";
import { MyEvents } from "./pages/MyEvents";
import { Graph } from "./pages/Graph";
import { useFeedEvents } from "./hooks/useFeedEvents";
import { useMyEvents } from "./hooks/useMyEvents";
import { useGraph } from "./hooks/useGraph";
import { useServices } from "./hooks/useServices";
import { getAuthHeaders } from "./utils/api.js";

// const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "http://localhost:8000";

function ProtectedLayout({ loading, token, veteran, logout }) {
  const eventFeed = useFeedEvents(BASE_URL, token);
  const graphFeed = useGraph(BASE_URL, token);
  const userEvents = useMyEvents(BASE_URL, token);
  const servicesFeed = useServices(BASE_URL, token);

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;

  // Have a app wrapper so that we can take up the whole screen
  

  return (
    <>
      <Fragment style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
        <Navbar veteran={veteran} logout={logout} />
        <div style={{ paddingTop: "56px", flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet
          context={{
            token,
            veteran,
            BASE_URL,
            feedEvents: eventFeed.feedEvents,
            feedLoading: eventFeed.loading,
            feedError: eventFeed.error,
            refreshFeed: eventFeed.refresh,
            myEvents: userEvents.myEvents,
            myEventIds: userEvents.myEventIds,
            myEventsLoading: userEvents.loading,
            myEventsError: userEvents.error,
            graphNodes: graphFeed.nodes,
            graphEdges: graphFeed.edges,
            graphLoading: graphFeed.loading,
            graphError: graphFeed.error,
            refreshGraph: graphFeed.refresh,
            hindexNodes: graphFeed.hindexNodes,
            hindexEdges: graphFeed.hindexEdges,
            hindexLoading: graphFeed.hindexLoading,
            hindexError: graphFeed.hindexError,
            q1Nodes: graphFeed.q1Nodes,
            q1Edges: graphFeed.q1Edges,
            q1Loading: graphFeed.q1Loading,
            q1Error: graphFeed.q1Error,
            covetNodes: graphFeed.covetNodes,
            covetEdges: graphFeed.covetEdges,
            covetLoading: graphFeed.covetLoading,
            covetError: graphFeed.covetError,
            loadCoVetNetwork: graphFeed.loadCoVetNetwork,
            services: servicesFeed.services,
            servicesLoading: servicesFeed.loading,
            refreshServices: servicesFeed.refresh,
            refreshMyEvents: userEvents.refresh,
          }}
        />
        </div>
      </Fragment>
    </>
  );
}

function App() {
  // const [token, setToken] = useState(null)
  const initialToken = localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialToken);
  const [veteran, setVeteran] = useState(null);
  const [loading, setLoading] = useState(Boolean(initialToken));

  const getVeteranName = (data) => {
    if (!data) return null;
    return [data.first_name, data.last_name].filter(Boolean).join(" ");
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setVeteran(null);
  }, []);

  const fetchProfile = useCallback(async (authToken) => {
    const res = await fetch(`${BASE_URL}/veteran`, {
      headers: getAuthHeaders(authToken),
    });

    if (!res.ok) {
      throw new Error("Failed to load veteran profile");
    }

    const data = await res.json();
    setVeteran({
      ...data,
      name: getVeteranName(data),
    });
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      return;
    }

    fetchProfile(savedToken)
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchProfile, logout]);

  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setLoading(true);
    try {
      await fetchProfile(newToken);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: token ? (
        <Navigate to="/myevents" />
      ) : (
        <Login login={login} BASE_URL={BASE_URL} />
      ),
    },
    {
      element: (
        <ProtectedLayout
          loading={loading}
          token={token}
          veteran={veteran}
          logout={logout}
        />
      ),
      children: [
        // { path: "/myevents", element: <MyEvents /> },
        { path: "/events", element: <Events /> },
        { path: "/profile", element: <Profile /> },
        { path: "/graph", element: <Graph /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to={token ? "/events" : "/login"} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
