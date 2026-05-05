import { useCallback, useEffect, useMemo, useState } from "react";
import { getEventId } from "../utils/eventUtils";
import { getAuthHeaders } from "../utils/api.js";

export function useMyEvents(BASE_URL, token) {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        headers: getAuthHeaders(token),
      });
      if (res.status === 404) {
        setMyEvents([]);
      } else if (!res.ok) {
        throw new Error("Failed to load your events");
      } else {
        const data = await res.json();
        setMyEvents(Array.isArray(data?.data) ? data.data : []);
      }
    } catch (err) {
      setError(err.message || "Failed to load your events");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    if (token) load();
  }, [load, token]);

  const myEventIds = useMemo(
    () => new Set(myEvents.map(getEventId)),
    [myEvents]
  );

  return { myEvents, myEventIds, loading, error, refresh: load };
}
