import { useCallback, useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/api.js";

export function useGraph(BASE_URL, token) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // hindex graph
  const [hindexNodes, setHindexNodes] = useState([]);
  const [hindexEdges, setHindexEdges] = useState([]);
  const [hindexLoading, setHindexLoading] = useState(true);
  const [hindexError, setHindexError] = useState("");

  // q1 influence graph
  const [q1Nodes, setQ1Nodes] = useState([]);
  const [q1Edges, setQ1Edges] = useState([]);
  const [q1Loading, setQ1Loading] = useState(true);
  const [q1Error, setQ1Error] = useState("");

  // co-veteran network (lazy, loaded on demand)
  const [covetNodes, setCovetNodes] = useState([]);
  const [covetEdges, setCovetEdges] = useState([]);
  const [covetLoading, setCovetLoading] = useState(false);
  const [covetError, setCovetError] = useState("");

  const fetchJson = useCallback(
    async (path) => {
      const res = await fetch(`${BASE_URL}${path}`, {
        headers: getAuthHeaders(token),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    },
    [BASE_URL, token]
  );

  const loadGraph = useCallback(async () => {
    setLoading(true);
    setError("");
    setNodes([]);
    setEdges([]);
    try {
      const data = await fetchJson("/graph");
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (err) {
      setError(err.message || "Failed to load graph");
    } finally {
      setLoading(false);
    }
  }, [fetchJson]);

  const loadHindex = useCallback(async () => {
    setHindexLoading(true);
    setHindexError("");
    try {
      const data = await fetchJson("/graph/hindex");
      setHindexNodes(data.nodes);
      setHindexEdges(data.edges);
    } catch (err) {
      setHindexError(err.message || "Failed to load h-index graph");
    } finally {
      setHindexLoading(false);
    }
  }, [fetchJson]);

  const loadQ1 = useCallback(async () => {
    setQ1Loading(true);
    setQ1Error("");
    try {
      const data = await fetchJson("/graph/q1-network");
      setQ1Nodes(data.nodes);
      setQ1Edges(data.edges);
    } catch (err) {
      setQ1Error(err.message || "Failed to load Q1 influence graph");
    } finally {
      setQ1Loading(false);
    }
  }, [fetchJson]);

  const loadCoVetNetwork = useCallback(
    async (veteranId) => {
      setCovetLoading(true);
      setCovetError("");
      setCovetNodes([]);
      setCovetEdges([]);
      try {
        const data = await fetchJson(`/graph/network/${veteranId}`);
        setCovetNodes(data.nodes);
        setCovetEdges(data.edges);
      } catch (err) {
        setCovetError(err.message || "Failed to load co-veteran network");
      } finally {
        setCovetLoading(false);
      }
    },
    [fetchJson]
  );

  useEffect(() => {
    loadGraph();
    loadHindex();
    loadQ1();
  }, [loadGraph, loadHindex, loadQ1]);

  return {
    nodes,
    edges,
    loading,
    error,
    refresh: loadGraph,

    hindexNodes,
    hindexEdges,
    hindexLoading,
    hindexError,

    q1Nodes,
    q1Edges,
    q1Loading,
    q1Error,

    covetNodes,
    covetEdges,
    covetLoading,
    covetError,
    loadCoVetNetwork,
  };
}
