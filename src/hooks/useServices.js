import { useCallback, useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/api.js";

export function useServices(BASE_URL, token) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/services`, {
        headers: getAuthHeaders(token),
      });
      if (res.ok) {
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } else {
        setServices([]);
      }
    } catch {
      // silently ignore — sidebar is supplementary
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return { services, loading, refresh: loadServices };
}
