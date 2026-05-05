import { BRANCH_COLORS } from "../utils/colors.js";

const ALL_BRANCHES = Object.keys(BRANCH_COLORS);

export function BranchFilter({ selectedBranches = [], onChange }) {
  const toggle = (branch) => {
    if (selectedBranches.includes(branch)) {
      onChange(selectedBranches.filter((selectedBranch) => selectedBranch !== branch));
    } else {
      onChange([...selectedBranches, branch]);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e0dfdb",
        borderRadius: 12,
        padding: "14px 16px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#191919",
          marginBottom: 10,
        }}
      >
        Filter by Branch
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {ALL_BRANCHES.map((branch) => {
          const color = BRANCH_COLORS[branch];
          const active = selectedBranches.includes(branch);
          return (
            <div
              key={branch}
              onClick={() => toggle(branch)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                cursor: "pointer",
                padding: "4px 6px",
                borderRadius: 6,
                background: active ? "#f3f2ee" : "transparent",
                transition: "background 0.15s",
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 3,
                  background: color.bg,
                  flexShrink: 0,
                  opacity: active ? 1 : 0.5,
                  transition: "opacity 0.15s",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: active ? "#191919" : "#666",
                  fontWeight: active ? 600 : 400,
                  transition: "color 0.15s",
                }}
              >
                {branch}
              </span>
            </div>
          );
        })}
      </div>

      {selectedBranches.length > 0 && (
        <button
          onClick={() => onChange([])}
          style={{
            marginTop: 12,
            width: "100%",
            background: "transparent",
            border: "1px solid #e0dfdb",
            borderRadius: 20,
            padding: "5px 0",
            fontSize: 12,
            color: "#666",
            cursor: "pointer",
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export function UpcomingEvents({ events = [] }) {
  if (events.length === 0) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e0dfdb",
        borderRadius: 12,
        padding: "14px 16px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#191919",
          marginBottom: 10,
        }}
      >
        Your Upcoming Events
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {events.map((event, i) => {
          const color = BRANCH_COLORS[event.branch] || {
            bg: "#2d6a4f",
            text: "#fff",
          };
          const isLast = i === events.length - 1;
          return (
            <div
              key={event.eventId ?? i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingBottom: isLast ? 0 : 10,
                marginBottom: isLast ? 0 : 10,
                borderBottom: isLast ? "none" : "1px solid #f0efeb",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#191919",
                    lineHeight: 1.3,
                  }}
                >
                  {event.title}
                </div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                  {event.eventDate}
                </div>
              </div>
              <span
                style={{
                  background: color.bg,
                  color: color.text,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "2px 7px",
                  borderRadius: 10,
                  flexShrink: 0,
                  marginLeft: 8,
                  marginTop: 1,
                }}
              >
                {event.branch === "Marine Corps" ? "USMC" : event.branch}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
