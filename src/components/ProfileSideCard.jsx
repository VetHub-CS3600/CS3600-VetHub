import { BRANCH_COLORS, BRANCH_ICONS } from "../utils/colors.js";

function BranchBadge({ branch }) {
  const color = BRANCH_COLORS[branch] || { bg: "#2d6a4f", text: "#fff" };
  return (
    <span
      style={{
        background: color.bg,
        color: color.text,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "3px 10px",
        borderRadius: 20,
        textTransform: "uppercase",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {branch}
    </span>
  );
}

export function ProfileSidebar({
  firstName,
  lastName,
  branch,
  title,
  location,
  servicePeriodStart,
  servicePeriodEnd,
  rank,
  mos,
  eventsJoined = 0,
  eventsHosted = 0,
  avatarUrl = null,
}) {
  const branchColor = BRANCH_COLORS[branch] || { bg: "#2d6a4f" };
  const branchIcon = BRANCH_ICONS[branch] || "🎖️";
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;

  const serviceYears =
    servicePeriodStart && servicePeriodEnd
      ? servicePeriodEnd - servicePeriodStart
      : null;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e0dfdb",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* Banner */}
      <div style={{ height: 60, background: branchColor.bg }} />

      {/* Avatar */}
      <div style={{ padding: "0 16px", marginTop: -28, marginBottom: 10 }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #fff",
            }}
          />
        ) : (
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: branchColor.bg,
              border: "3px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: avatarUrl ? 24 : 18,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {initials || branchIcon}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#191919" }}>
          {firstName} {lastName}
        </div>
        {title && (
          <div
            style={{
              fontSize: 12,
              color: "#666666",
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
        )}
        {location && (
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
            {location}
          </div>
        )}

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e0dfdb",
            margin: "12px 0",
          }}
        />

        {/* Branch */}
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#999",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Branch
          </div>
          <BranchBadge branch={branch} />
        </div>

        {/* Service Period */}
        {servicePeriodStart && servicePeriodEnd && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              Service Period
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#191919" }}>
              {servicePeriodStart} – {servicePeriodEnd}
            </div>
            {serviceYears && (
              <div style={{ fontSize: 12, color: "#666" }}>
                {serviceYears} year{serviceYears !== 1 ? "s" : ""} active duty
              </div>
            )}
          </div>
        )}

        {/* Rank */}
        {rank && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              Rank
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#191919" }}>
              {rank}
            </div>
          </div>
        )}

        {/* MOS */}
        {mos && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              MOS
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#191919" }}>
              {mos}
            </div>
          </div>
        )}

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e0dfdb",
            margin: "12px 0",
          }}
        />

        {/* Stats */}
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              flex: 1,
              background: "#f3f2ee",
              borderRadius: 8,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0A66C2" }}>
              {eventsJoined}
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>
              Events joined
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#f3f2ee",
              borderRadius: 8,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0A66C2" }}>
              {eventsHosted}
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>
              Hosted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
