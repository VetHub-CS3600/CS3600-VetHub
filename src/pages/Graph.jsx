import React, { useState, useEffect, useCallback, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useWindowWidth } from "../hooks/useWindowWidth";

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    position: "relative",
    padding: "1.5rem 1.2rem 3rem",
  },
  shell: {
    position: "relative",
    width: "min(1200px, 100%)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  // Toolbar
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    padding: "0.6rem 0.9rem",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
  },
  toolbarTitle: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#111827",
    marginRight: "0.25rem",
  },
  select: {
    fontSize: "0.78rem",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    color: "#374151",
    cursor: "pointer",
  },
  btnOutline: {
    fontSize: "0.78rem",
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
  },
  btnPrimary: {
    fontSize: "0.78rem",
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid #15803d",
    background: "#15803d",
    color: "#fff",
    cursor: "pointer",
    marginLeft: "auto",
  },

  // Stats bar
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.75rem",
  },
  statCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statLabel: {
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  statValue: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.2,
  },

  // Main area
  main: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
  },

  // Graph container
  graphWrap: {
    flex: 1,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    minHeight: "520px",
    position: "relative",
  },
  cyContainer: {
    width: "100%",
    height: "520px",
  },

  // Overlay
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    gap: "0.75rem",
    zIndex: 5,
  },
  overlayText: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  overlayError: {
    fontSize: "0.8rem",
    color: "#dc2626",
  },

  // Sidebar
  sidebar: {
    width: "220px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    position: "sticky",
    top: "72px",
  },
  sideCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0.9rem",
  },
  sideCardTitle: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "0.6rem",
  },

  // Detail panel
  detailEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    color: "#9ca3af",
    fontSize: "0.78rem",
    textAlign: "center",
    gap: "0.4rem",
  },
  detailBadge: (color) => ({
    display: "inline-block",
    fontSize: "0.65rem",
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.4rem",
    background: color + "20",
    color: color,
    border: `1px solid ${color}50`,
  }),
  detailName: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "0.6rem",
    lineHeight: 1.3,
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    borderTop: "1px solid #f3f4f6",
    fontSize: "0.78rem",
  },
  detailRowLabel: { color: "#6b7280" },
  detailRowVal: { fontWeight: 600, color: "#111827" },

  // Legend
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.78rem",
    color: "#374151",
    marginBottom: "5px",
  },
  legendDot: (color) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),
  legendLine: (color) => ({
    width: 18,
    height: 2,
    background: color,
    flexShrink: 0,
    borderRadius: 1,
  }),
};

// ── Constants ─────────────────────────────────────────────────────────────────

const BRANCH_COLORS = {
  ARMY: "#4d7c0f",
  NAVY: "#1d4ed8",
  USMC: "#dc2626",
  AIRFORCE: "#0369a1",
  COASTGUARD: "#d97706",
  ALL: "#7c3aed",
};

const BRANCH_LABELS = {
  ARMY: "Army",
  NAVY: "Navy",
  USMC: "Marine Corps",
  AIRFORCE: "Air Force",
  COASTGUARD: "Coast Guard",
  ALL: "All Branches",
};

// ── Custom hook ───────────────────────────────────────────────────────────────


// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, color }) {
  return (
    <div style={styles.statCard}>
      <span style={styles.statLabel}>{label}</span>
      <span style={{ ...styles.statValue, color: color || "#111827" }}>
        {value ?? "—"}
      </span>
    </div>
  );
}

function DetailPanel({ nodeId, cy }) {
  const node = nodeId ? cy?.getElementById(nodeId) : null;

  if (!node || !node.length) {
    return (
      <div style={styles.detailEmpty}>
        <span style={{ fontSize: "1.5rem" }}>◎</span>
        <p>Click any node to inspect</p>
      </div>
    );
  }

  const nodeData = node.data();
  const isUser = nodeData.type === "user";
  const color = isUser ? "#1d4ed8" : BRANCH_COLORS[nodeData.branch] || "#15803d";
  const hosted = cy?.edges(`[source="${nodeData.id}"][label="hosts"]`).length ?? 0;
  const attended = cy?.edges(`[source="${nodeData.id}"][label="attends"]`).length ?? 0;
  const organizer =
    cy
      ?.edges(`[target="${nodeData.id}"][label="hosts"]`)
      .connectedNodes('[type="user"]')
      .first()
      .data("label") || "—";

  return (
    <div style={{ padding: "0.5rem" }}>
      <div style={styles.detailBadge(color)}>
        {isUser ? "Veteran" : "Event"}
      </div>
      <div style={styles.detailName}>{nodeData.label}</div>

      {isUser ? (
        <>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Username</span>
            <span style={styles.detailRowVal}>@{nodeData.username}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Branch</span>
            <span style={styles.detailRowVal}>
              {BRANCH_LABELS[nodeData.branch] || nodeData.branch || "—"}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Hosted</span>
            <span style={styles.detailRowVal}>{hosted}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Attending</span>
            <span style={styles.detailRowVal}>{attended}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Total connections</span>
            <span style={styles.detailRowVal}>{hosted + attended}</span>
          </div>
        </>
      ) : (
        <>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Branch</span>
            <span style={{ ...styles.detailRowVal, color }}>
              {BRANCH_LABELS[nodeData.branch] || nodeData.branch || "—"}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Date</span>
            <span style={styles.detailRowVal}>{nodeData.date || "—"}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Organizer</span>
            <span style={styles.detailRowVal}>{organizer}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailRowLabel}>Attendees</span>
            <span style={styles.detailRowVal}>{nodeData.attendees ?? "—"}</span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const GRAPH_MODES = [
  { value: "full", label: "Full Network" },
  { value: "covet", label: "Co-Veteran Network" },
  { value: "hindex", label: "H-Index Leaders" },
  { value: "q1", label: "Q1 Influence" },
];

export function Graph() {
  const {
    veteran,
    graphNodes, graphEdges, graphLoading, graphError,
    hindexNodes, hindexEdges, hindexLoading, hindexError,
    q1Nodes, q1Edges, q1Loading, q1Error,
    covetNodes, covetEdges, covetLoading, covetError,
    loadCoVetNetwork,
  } = useOutletContext();

  const [mode, setMode] = useState("full");

  const cyRef = useRef(null); // cytoscape instance
  const cyElRef = useRef(null); // DOM element ref
  const [cyInstance, setCyInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    edges: 0,
    hosts: 0,
  });
  const [layout, setLayout] = useState("cose");
  const [filter, setFilter] = useState("all");
  const [branch, setBranch] = useState("all");

  const width = useWindowWidth();
  const isMobile = width < 760;

  // ── Load Cytoscape from CDN once ─────────────────────────────────────────
  useEffect(() => {
    if (window.cytoscape) return;
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.29.2/cytoscape.min.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // ── Resolve active dataset from mode ─────────────────────────────────────
  const activeNodes =
    mode === "hindex" ? hindexNodes :
    mode === "q1"     ? q1Nodes :
    mode === "covet"  ? covetNodes :
    graphNodes;

  const activeEdges =
    mode === "hindex" ? hindexEdges :
    mode === "q1"     ? q1Edges :
    mode === "covet"  ? covetEdges :
    graphEdges;

  const activeLoading =
    mode === "hindex" ? hindexLoading :
    mode === "q1"     ? q1Loading :
    mode === "covet"  ? covetLoading :
    graphLoading;

  const activeError =
    mode === "hindex" ? hindexError :
    mode === "q1"     ? q1Error :
    mode === "covet"  ? covetError :
    graphError;

  // ── Build graph when active dataset is ready ──────────────────────────────
  useEffect(() => {
    if (activeError) {
      setError(activeError);
      setLoading(false);
      return;
    }

    if (activeLoading || !activeNodes.length) {
      setLoading(true);
      return;
    }

    let timeoutId;
    let cancelled = false;

    const waitForCy = () => {
      if (cancelled) return;
      if (window.cytoscape) {
        buildGraph(activeNodes, activeEdges);
        setLoading(false);
      } else {
        timeoutId = setTimeout(waitForCy, 100);
      }
    };
    waitForCy();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [activeNodes, activeEdges, activeLoading, activeError]);

  // ── Build Cytoscape instance ──────────────────────────────────────────────
  function buildGraph(nodes, edges) {
    if (cyRef.current) cyRef.current.destroy();

    const cy = window.cytoscape({
      container: cyElRef.current,
      elements: { nodes, edges },
      style: [
        {
          selector: 'node[type="user"]',
          style: {
            "background-color": "#eff6ff",
            "border-width": 2,
            "border-color": "#1d4ed8",
            label: "data(label)",
            color: "#1e40af",
            "font-size": 10,
            "font-weight": 500,
            "text-valign": "bottom",
            "text-halign": "center",
            "text-margin-y": 4,
            width: 36,
            height: 36,
            "text-max-width": 80,
            "text-wrap": "ellipsis",
          },
        },
        {
          selector: 'node[type="event"]',
          style: {
            shape: "round-rectangle",
            "background-color": (ele) =>
              (BRANCH_COLORS[ele.data("branch")] || "#15803d") + "15",
            "border-width": 1.5,
            "border-color": (ele) =>
              BRANCH_COLORS[ele.data("branch")] || "#15803d",
            label: "data(label)",
            color: "#111827",
            "font-size": 9,
            "font-weight": 600,
            "text-valign": "center",
            "text-halign": "center",
            width: 110,
            height: 40,
            "text-max-width": 100,
            "text-wrap": "wrap",
          },
        },
        {
          selector: "node:selected",
          style: { "border-width": 3, "border-color": "#111827" },
        },
        {
          selector: 'edge[label="hosts"]',
          style: {
            width: 2,
            "line-color": "#15803d",
            "target-arrow-color": "#15803d",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            opacity: 0.9,
          },
        },
        {
          selector: 'edge[label="attends"]',
          style: {
            width: 1,
            "line-color": "#d1d5db",
            "target-arrow-color": "#d1d5db",
            "target-arrow-shape": "vee",
            "curve-style": "bezier",
            "line-style": "dashed",
            "line-dash-pattern": [4, 3],
            opacity: 0.7,
          },
        },
        {
          selector: ".faded",
          style: { opacity: 0.08 },
        },
      ],
      layout: {
        name: "cose",
        padding: 40,
        nodeRepulsion: 6000,
        idealEdgeLength: 100,
        animate: false,
      },
      wheelSensitivity: 0.3,
      minZoom: 0.2,
      maxZoom: 3,
    });

    // Events
    cy.on("tap", "node", (tapEvent) => setSelectedNodeId(tapEvent.target.id()));
    cy.on("tap", (tapEvent) => {
      if (tapEvent.target === cy) setSelectedNodeId(null);
    });
    cy.on("mouseover", "node", (hoverEvent) => {
      const hoveredNode = hoverEvent.target;
      cy.elements().addClass("faded");
      hoveredNode.removeClass("faded");
      hoveredNode.connectedEdges().removeClass("faded");
      hoveredNode.connectedEdges().connectedNodes().removeClass("faded");
    });
    cy.on("mouseout", "node", () => cy.elements().removeClass("faded"));

    cyRef.current = cy;
    setCyInstance(cy);

    setStats({
      users: cy.nodes('[type="user"]').length,
      events: cy.nodes('[type="event"]').length,
      edges: cy.edges().length,
      hosts: cy.edges('[label="hosts"]').length,
    });
  }

  // ── Mode change ───────────────────────────────────────────────────────────
  const handleMode = useCallback((changeEvent) => {
    const val = changeEvent.target.value;
    setMode(val);
    setSelectedNodeId(null);
    setFilter("all");
    setBranch("all");
    if (val === "covet" && veteran?.id) {
      loadCoVetNetwork(veteran.id);
    }
  }, [veteran, loadCoVetNetwork]);

  // ── Layout change ─────────────────────────────────────────────────────────
  const handleLayout = useCallback((changeEvent) => {
    const val = changeEvent.target.value;
    setLayout(val);
    if (!cyRef.current) return;
    cyRef.current
      .layout({ name: val, padding: 40, animate: true, animationDuration: 500 })
      .run();
  }, []);

  // ── Filter by type ────────────────────────────────────────────────────────
  const handleFilter = useCallback((changeEvent) => {
    const val = changeEvent.target.value;
    setFilter(val);
    if (!cyRef.current) return;
    cyRef.current.nodes().forEach((node) => {
      node.style(
        "display",
        val === "all" || node.data("type") === val ? "element" : "none"
      );
    });
    cyRef.current.edges().forEach((ed) => {
      const hidden =
        ed.source().style("display") === "none" ||
        ed.target().style("display") === "none";
      ed.style("display", hidden ? "none" : "element");
    });
  }, []);

  // ── Filter by branch ──────────────────────────────────────────────────────
  const handleBranch = useCallback((changeEvent) => {
    const val = changeEvent.target.value;
    setBranch(val);
    if (!cyRef.current) return;
    cyRef.current.nodes().forEach((node) => {
      const show =
        val === "all" || node.data("branch") === val || node.data("type") === "user";
      node.style("display", show ? "element" : "none");
    });
    cyRef.current.edges().forEach((ed) => {
      const hidden =
        ed.source().style("display") === "none" ||
        ed.target().style("display") === "none";
      ed.style("display", hidden ? "none" : "element");
    });
  }, []);

  const handleFit = useCallback(() => cyRef.current?.fit(undefined, 40), []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section style={styles.page}>
      <div style={styles.shell}>
        {/* Toolbar */}
        <div style={styles.toolbar}>
          <span style={styles.toolbarTitle}>Network Graph</span>

          <select style={styles.select} value={mode} onChange={handleMode}>
            {GRAPH_MODES.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select style={styles.select} value={layout} onChange={handleLayout}>
            <option value="cose">Force layout</option>
            <option value="breadthfirst">Tree</option>
            <option value="circle">Circle</option>
            <option value="concentric">Concentric</option>
            <option value="grid">Grid</option>
          </select>

          <select style={styles.select} value={filter} onChange={handleFilter}>
            <option value="all">All nodes</option>
            <option value="user">Veterans only</option>
            <option value="event">Events only</option>
          </select>

          <select style={styles.select} value={branch} onChange={handleBranch}>
            <option value="all">All branches</option>
            <option value="ARMY">Army</option>
            <option value="NAVY">Navy</option>
            <option value="USMC">Marine Corps</option>
            <option value="AIRFORCE">Air Force</option>
            <option value="COASTGUARD">Coast Guard</option>
            <option value="ALL">All Vets</option>
          </select>

          <button style={styles.btnOutline} onClick={handleFit}>
            Fit view
          </button>
          {/* <button style={styles.btnPrimary} onClick={loadGraph}>↺ Refresh</button> */}
        </div>

        {/* Stats */}
        {!isMobile && (
          <div style={styles.statsBar}>
            <StatCard label="Veterans" value={stats.users} color="#1d4ed8" />
            <StatCard label="Events" value={stats.events} color="#15803d" />
            <StatCard label="Connections" value={stats.edges} color="#374151" />
            <StatCard label="Hosts" value={stats.hosts} color="#d97706" />
          </div>
        )}

        {/* Graph + sidebar */}
        <div style={styles.main}>
          <div style={styles.graphWrap}>
            <div ref={cyElRef} style={styles.cyContainer} />

            {(loading || error) && (
              <div style={styles.overlay}>
                {loading && !error && (
                  <>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        border: "2px solid #e5e7eb",
                        borderTopColor: "#15803d",
                        borderRadius: "50%",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <span style={styles.overlayText}>Loading graph...</span>
                  </>
                )}
                {error && (
                  <span style={styles.overlayError}>Error: {error}</span>
                )}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          {!isMobile && (
            <aside style={styles.sidebar}>
              {/* Node detail */}
              <div style={styles.sideCard}>
                <div style={styles.sideCardTitle}>Node detail</div>
                <DetailPanel nodeId={selectedNodeId} cy={cyInstance} />
              </div>

              {/* Legend */}
              <div style={styles.sideCard}>
                <div style={styles.sideCardTitle}>Legend</div>
                <div style={styles.legendItem}>
                  <div style={styles.legendDot("#1d4ed8")} /> Veteran
                </div>
                <div style={styles.legendItem}>
                  <div style={styles.legendDot("#15803d")} /> Event
                </div>
                <div style={{ ...styles.legendItem, marginTop: 8 }}>
                  <div style={styles.legendLine("#15803d")} /> Hosts
                </div>
                <div style={styles.legendItem}>
                  <div style={styles.legendLine("#d1d5db")} /> Attends
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
