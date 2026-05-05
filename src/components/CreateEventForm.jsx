import React, { useState } from "react";
import { linkedinColors } from "../utils/colors.js";
import { font, fontDisplay } from "../utils/fonts.js";
import { BRANCH_OPTIONS } from "../utils/constants.js";
import { getJsonHeaders } from "../utils/api.js";

const styles = {
  card: {
    background: linkedinColors.background.card,
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 12,
    padding: "1.25rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    fontFamily: font,
  },
  cardHeader: {
    marginBottom: "0.75rem",
  },
  kicker: {
    margin: "0 0 0.2rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.72rem",
    color: linkedinColors.text.secondary,
    fontFamily: font,
    fontWeight: 500,
  },
  heading: {
    margin: 0,
    fontFamily: fontDisplay,
    fontSize: "1.2rem",
    fontWeight: 600,
    color: linkedinColors.text.primary,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0.8rem",
    alignItems: "end",
  },
  field: {
    display: "grid",
    gap: "0.34rem",
    textAlign: "left",
  },
  fieldWide: {
    display: "grid",
    gap: "0.34rem",
    textAlign: "left",
    gridColumn: "1 / -1",
  },
  fieldLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(100, 116, 139, 0.3)",
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.9)",
    padding: "0.68rem 0.72rem",
    fontFamily: font,
    fontSize: "1rem",
    color: linkedinColors.text.primary,
  },
  btn: {
    border: `1px solid rgba(10, 102, 194, 0.45)`,
    color: linkedinColors.brand.blue,
    background: linkedinColors.background.card,
    borderRadius: 10,
    padding: "0.52rem 0.9rem",
    fontFamily: font,
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    justifySelf: "start",
  },
  btnHover: {
    transform: "translateY(-1px)",
    boxShadow: `0 10px 18px rgba(10, 102, 194, 0.14)`,
  },
  btnDisabled: {
    opacity: 0.75,
    cursor: "not-allowed",
  },
  error: {
    margin: "0.5rem 0 0",
    color: linkedinColors.accent.notification,
    fontWeight: 500,
    fontFamily: font,
    fontSize: "0.875rem",
  },
};

export function CreateEventForm({ BASE_URL, token, onCreated }) {
  const [form, setForm] = useState({ title: "", branch: "", event_date: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: getJsonHeaders(token),
        body: JSON.stringify({
          title: form.title.trim(),
          branch: form.branch,
          created_date: new Date().toISOString().slice(0, 10),
          event_date: form.event_date,
        }),
      });
      if (!res.ok) throw new Error("Could not create event");
      setForm({ title: "", branch: "", event_date: "" });
      onCreated?.();
    } catch (err) {
      setError(err.message || "Could not create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.card}>
      <div style={styles.cardHeader}>
        <p style={styles.kicker}>Create Event</p>
        <h2 style={styles.heading}>Host a New Event</h2>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.fieldWide}>
          <span style={styles.fieldLabel}>Title</span>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Veteran Career Networking Night"
            required
          />
        </label>

        <label style={styles.field}>
          <span style={styles.fieldLabel}>Branch</span>
          <select style={styles.input} name="branch" value={form.branch} onChange={handleChange} required>
            <option value="" disabled>Select a branch</option>
            {BRANCH_OPTIONS.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
          </select>
        </label>

        <label style={styles.field}>
          <span style={styles.fieldLabel}>Event Date</span>
          <input
            style={styles.input}
            type="date"
            name="event_date"
            value={form.event_date}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{
            ...styles.btn,
            ...(btnHover && !submitting ? styles.btnHover : {}),
            ...(submitting ? styles.btnDisabled : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>

      {error ? <p style={styles.error}>{error}</p> : null}
    </section>
  );
}
