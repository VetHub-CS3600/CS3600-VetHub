import React, { useState } from "react";
import { linkedinColors } from "../utils/colors.js";

import { font, fontDisplay } from "../utils/fonts.js";

const styles = {
  page: {
    minHeight: "100svh",
    padding: "2rem 1.2rem 3rem",
    background: linkedinColors.background.page,
    fontFamily: font,
    color: linkedinColors.text.primary,
  },
  shell: {
    width: "min(980px, 100%)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.05fr 1fr",
    gap: "1.1rem",
    alignItems: "stretch",
  },
  aside: {
    borderRadius: 12,
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: "1.5rem",
    display: "grid",
    alignContent: "center",
    gap: "0.7rem",
  },
  kicker: {
    margin: 0,
    textTransform: "uppercase",
    fontSize: "0.74rem",
    letterSpacing: "0.1em",
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  asideHeading: {
    margin: 0,
    fontFamily: fontDisplay,
    fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
    lineHeight: 1.08,
    color: linkedinColors.text.primary,
  },
  asideText: {
    margin: 0,
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    maxWidth: "36ch",
    fontFamily: font,
  },
  card: {
    borderRadius: 12,
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: "1.3rem",
    display: "grid",
    gap: "0.9rem",
    alignContent: "start",
  },
  cardHeading: {
    margin: 0,
    fontFamily: fontDisplay,
    color: linkedinColors.text.primary,
    fontWeight: 600,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0.8rem",
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
    fontSize: "0.78rem",
    textTransform: "uppercase",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: linkedinColors.text.secondary,
    fontFamily: font,
  },
  input: {
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    borderRadius: 8,
    padding: "0.68rem 0.72rem",
    fontFamily: font,
    fontSize: "1rem",
    color: linkedinColors.text.primary,
    width: "100%",
    boxSizing: "border-box",
  },
  error: {
    margin: 0,
    color: linkedinColors.accent.notification,
    fontWeight: 500,
    gridColumn: "1 / -1",
    textAlign: "left",
    fontFamily: font,
    fontSize: "0.875rem",
  },
  submitBtn: {
    gridColumn: "1 / -1",
    border: 0,
    borderRadius: 8,
    padding: "0.74rem 1rem",
    background: linkedinColors.brand.blue,
    color: linkedinColors.brand.white,
    fontFamily: font,
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 160ms ease",
  },
  submitBtnHover: {
    background: linkedinColors.brand.deepBlue,
  },
  switchBtn: {
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 8,
    background: linkedinColors.background.card,
    color: linkedinColors.text.link,
    fontFamily: font,
    fontWeight: 600,
    padding: "0.62rem 0.9rem",
    cursor: "pointer",
    transition: "background 160ms ease",
  },
  switchBtnHover: {
    background: linkedinColors.background.hoverTint,
  },
};

export function Login({ login, BASE_URL }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitHover, setSubmitHover] = useState(false);
  const [switchHover, setSwitchHover] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const isRegister = mode === "register";

  const handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = async (res, fallback) => {
    try {
      const body = await res.json();
      return body?.detail || fallback;
    } catch {
      return fallback;
    }
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const payload = isRegister
        ? { username: form.username, password: form.password, first_name: form.first_name, last_name: form.last_name, email: form.email }
        : { username: form.username, password: form.password };

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const fallback = isRegister ? "Could not create account." : "Invalid username or password.";
        throw new Error(await getErrorMessage(res, fallback));
      }

      const data = await res.json();
      if (!data?.access_token) throw new Error("Authentication token missing in response.");
      await login(data.access_token);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
  };

  return (
    <section style={styles.page}>
      <div style={styles.shell}>
        <aside style={styles.aside}>
          <p style={styles.kicker}>VetHub</p>
          <h1 style={styles.asideHeading}>
            {isRegister ? "Join your veteran network" : "Welcome back"}
          </h1>
          <p style={styles.asideText}>
            {isRegister
              ? "Create your account to discover events, connect with peers, and manage your profile."
              : "Sign in to access events, update your profile, and stay connected with your community."}
          </p>
        </aside>

        <article style={styles.card}>
          <h2 style={styles.cardHeading}>{isRegister ? "Create Account" : "Login"}</h2>

          <form style={styles.form} onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <label style={styles.field}>
                  <span style={styles.fieldLabel}>First Name</span>
                  <input style={styles.input} name="first_name" value={form.first_name} onChange={handleChange} required />
                </label>
                <label style={styles.field}>
                  <span style={styles.fieldLabel}>Last Name</span>
                  <input style={styles.input} name="last_name" value={form.last_name} onChange={handleChange} required />
                </label>
                <label style={styles.fieldWide}>
                  <span style={styles.fieldLabel}>Email</span>
                  <input style={styles.input} type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
              </>
            ) : null}

            <label style={styles.field}>
              <span style={styles.fieldLabel}>Username</span>
              <input style={styles.input} name="username" value={form.username} onChange={handleChange} required />
            </label>
            <label style={styles.field}>
              <span style={styles.fieldLabel}>Password</span>
              <input style={styles.input} type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>

            {error ? <p style={styles.error}>{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                ...(submitHover && !loading ? styles.submitBtnHover : {}),
                ...(loading ? { opacity: 0.78, cursor: "not-allowed" } : {}),
              }}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
            >
              {loading
                ? isRegister ? "Creating account..." : "Signing in..."
                : isRegister ? "Create Account" : "Login"}
            </button>
          </form>

          <button
            type="button"
            onClick={switchMode}
            style={{ ...styles.switchBtn, ...(switchHover ? styles.switchBtnHover : {}) }}
            onMouseEnter={() => setSwitchHover(true)}
            onMouseLeave={() => setSwitchHover(false)}
          >
            {isRegister ? "Already have an account? Login" : "Need an account? Register"}
          </button>
        </article>
      </div>
    </section>
  );
}
