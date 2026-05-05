import { useCallback, useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/api.js";

export function useFeedEvents(BASE_URL, token) {
  const [feedEvents, setFeedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/feed`, {
        headers: getAuthHeaders(token),
      });
      if (res.status === 404) {
        setFeedEvents([]);
      } else if (!res.ok) {
        throw new Error("Failed to load events");
      } else {
        const data = await res.json();
        setFeedEvents(Array.isArray(data?.data) ? data.data : []);
      }
    } catch (err) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    if (token) load();
  }, [load, token]);

  return { feedEvents, loading, error, refresh: load };
}
