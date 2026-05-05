import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { linkedinColors } from "../utils/colors.js";
import { font, fontDisplay } from "../utils/fonts.js";
import { BRANCH_NAMES } from "../utils/constants.js";
import { getAuthHeaders, getJsonHeaders } from "../utils/api.js";

const styles = {
  page: {
    position: "relative",
    padding: "1.5rem 1.2rem 3rem",
    fontFamily: font,
    color: linkedinColors.text.primary,
  },
  shell: {
    position: "relative",
    width: "min(980px, 100%)",
    margin: "0 auto",
    display: "grid",
    gap: "1.1rem",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "1rem",
    alignItems: "center",
    padding: "1.2rem",
    borderRadius: 12,
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(140deg, #0f766e, #22c55e)",
    color: linkedinColors.brand.white,
    fontFamily: fontDisplay,
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "0.04em",
    flexShrink: 0,
  },
  heroKicker: {
    margin: "0 0 0.2rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.72rem",
    color: linkedinColors.text.secondary,
    fontFamily: font,
    fontWeight: 500,
  },
  heroHeading: {
    margin: 0,
    fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
    lineHeight: 1.1,
    fontFamily: fontDisplay,
    fontWeight: 700,
    color: linkedinColors.text.primary,
  },
  heroSubtitle: {
    margin: "0.35rem 0 0",
    color: linkedinColors.text.secondary,
    maxWidth: "56ch",
    lineHeight: 1.5,
    fontSize: "0.875rem",
    fontFamily: font,
  },
  card: {
    borderRadius: 12,
    border: `1px solid ${linkedinColors.background.border}`,
    background: linkedinColors.background.card,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: "1.25rem",
    display: "grid",
    gap: "1rem",
  },
  infoGrid: {
    display: "grid",
    gap: "0.9rem",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  infoItem: {
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 10,
    padding: "0.95rem 1rem",
    background: linkedinColors.background.page,
  },
  infoItemWide: {
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 10,
    padding: "0.95rem 1rem",
    background: linkedinColors.background.page,
    gridColumn: "1 / -1",
  },
  infoLabel: {
    margin: 0,
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 600,
    color: linkedinColors.brand.blue,
    fontFamily: font,
  },
  infoValue: {
    margin: "0.45rem 0 0",
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    fontFamily: font,
    fontSize: "0.95rem",
  },
  sectionKicker: {
    margin: "0 0 0.2rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.72rem",
    color: linkedinColors.text.secondary,
    fontFamily: font,
    fontWeight: 500,
  },
  sectionHeading: {
    margin: "0.1rem 0 0",
    fontFamily: fontDisplay,
    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
    fontWeight: 600,
    color: linkedinColors.text.primary,
  },
  serviceForm: {
    display: "grid",
    gridTemplateColumns: "1.4fr repeat(2, minmax(0, 0.7fr)) auto",
    gap: "0.8rem",
    alignItems: "end",
  },
  field: {
    display: "grid",
    gap: "0.34rem",
    textAlign: "left",
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
  btnPrimary: {
    border: 0,
    borderRadius: 10,
    padding: "0.68rem 1rem",
    background: linkedinColors.brand.blue,
    color: linkedinColors.brand.white,
    fontFamily: font,
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    whiteSpace: "nowrap",
  },
  btnPrimaryHover: {
    transform: "translateY(-1px)",
    boxShadow: `0 10px 20px rgba(10, 102, 194, 0.18)`,
  },
  btnPrimaryDisabled: {
    opacity: 0.78,
    cursor: "not-allowed",
  },
  serviceError: {
    margin: 0,
    color: linkedinColors.accent.notification,
    fontWeight: 500,
    fontFamily: font,
    fontSize: "0.875rem",
  },
  serviceList: {
    display: "grid",
    gap: "0.75rem",
  },
  serviceItem: {
    border: `1px solid ${linkedinColors.background.border}`,
    borderRadius: 10,
    padding: "0.95rem 1rem",
    background: linkedinColors.background.page,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  serviceItemName: {
    margin: 0,
    fontSize: "1rem",
    fontFamily: fontDisplay,
    fontWeight: 600,
    color: linkedinColors.text.primary,
  },
  serviceItemYears: {
    margin: "0.3rem 0 0",
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    fontSize: "0.875rem",
    fontFamily: font,
  },
  btnDelete: {
    border: `1px solid rgba(204, 16, 22, 0.24)`,
    background: linkedinColors.background.card,
    color: linkedinColors.accent.notification,
    fontFamily: font,
    fontWeight: 700,
    fontSize: "0.875rem",
    borderRadius: 10,
    padding: "0.5rem 0.85rem",
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
    flexShrink: 0,
  },
  btnDeleteHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 8px 16px rgba(204, 16, 22, 0.12)",
    background: "rgba(254, 242, 242, 0.96)",
  },
  emptyText: {
    margin: 0,
    color: linkedinColors.text.secondary,
    lineHeight: 1.5,
    fontFamily: font,
    fontSize: "0.9rem",
  },
};


export function Profile() {
  const { veteran, token, BASE_URL, services, servicesLoading: loadingServices, refreshServices: loadServices } = useOutletContext();

  const fullName = useMemo(
    () => [veteran?.first_name, veteran?.last_name].filter(Boolean).join(" ") || "Veteran",
    [veteran]
  );
  const initials = useMemo(
    () => fullName.split(" ").filter(Boolean).slice(0, 2).map((namePart) => namePart[0].toUpperCase()).join(""),
    [fullName]
  );

  const [serviceError, setServiceError] = useState("");
  const [savingService, setSavingService] = useState(false);
  const [addBtnHover, setAddBtnHover] = useState(false);
  const [hoveredDelete, setHoveredDelete] = useState(null);
  const [serviceForm, setServiceForm] = useState({ branch: "", year_start: "", year_end: "" });

  const handleServiceChange = (changeEvent) => {
    const { name, value } = changeEvent.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = async (submitEvent) => {
    submitEvent.preventDefault();
    setSavingService(true);
    setServiceError("");
    try {
      const payload = {
        branch: serviceForm.branch.trim(),
        year_start: Number(serviceForm.year_start),
        year_end: Number(serviceForm.year_end),
      };
      const res = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        headers: getJsonHeaders(token),
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let message = "Failed to add service";
        try { const body = await res.json(); message = body?.detail || message; } catch {}
        throw new Error(message);
      }
      await res.json();
      setServiceForm({ branch: "", year_start: "", year_end: "" });
      await loadServices();
    } catch (error) {
      setServiceError(error.message || "Failed to add service");
    } finally {
      setSavingService(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    setServiceError("");
    try {
      const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      if (!res.ok) {
        let message = "Failed to remove service";
        try { const body = await res.json(); message = body?.detail || message; } catch {}
        throw new Error(message);
      }
      await loadServices();
    } catch (error) {
      setServiceError(error.message || "Failed to remove service");
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.hero}>
          <div style={styles.avatar}>{initials}</div>
          <div>
            <p style={styles.heroKicker}>Veteran Profile</p>
            <h1 style={styles.heroHeading}>{fullName}</h1>
            <p style={styles.heroSubtitle}>
              Keep your service history updated so your profile reflects your background.
            </p>
          </div>
        </header>

        <div style={styles.card}>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <h2 style={styles.infoLabel}>Email</h2>
              <p style={styles.infoValue}>{veteran?.email || "Unavailable"}</p>
            </div>
            <div style={styles.infoItem}>
              <h2 style={styles.infoLabel}>Username</h2>
              <p style={styles.infoValue}>{veteran?.username || "Unavailable"}</p>
            </div>
            <div style={styles.infoItemWide}>
              <h2 style={styles.infoLabel}>Services</h2>
              <p style={styles.infoValue}>Add your military service history below to keep your profile current.</p>
            </div>
          </div>

          <section style={{ display: "grid", gap: "0.95rem" }}>
            <div>
              <p style={styles.sectionKicker}>Military Service</p>
              <h2 style={styles.sectionHeading}>Service History</h2>
            </div>

            <form style={styles.serviceForm} onSubmit={handleAddService}>
              <label style={styles.field}>
                <span style={styles.fieldLabel}>Branch</span>
                <select style={styles.input} name="branch" value={serviceForm.branch} onChange={handleServiceChange} required>
                  <option value="" disabled>Select a branch</option>
                  {BRANCH_NAMES.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
                </select>
              </label>
              <label style={styles.field}>
                <span style={styles.fieldLabel}>Start Year</span>
                <input
                  style={styles.input}
                  type="number"
                  name="year_start"
                  value={serviceForm.year_start}
                  onChange={handleServiceChange}
                  placeholder="2001"
                  min="1900"
                  max="2100"
                  required
                />
              </label>
              <label style={styles.field}>
                <span style={styles.fieldLabel}>End Year</span>
                <input
                  style={styles.input}
                  type="number"
                  name="year_end"
                  value={serviceForm.year_end}
                  onChange={handleServiceChange}
                  placeholder="2005"
                  min="1900"
                  max="2100"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={savingService}
                style={{
                  ...styles.btnPrimary,
                  ...(addBtnHover && !savingService ? styles.btnPrimaryHover : {}),
                  ...(savingService ? styles.btnPrimaryDisabled : {}),
                }}
                onMouseEnter={() => setAddBtnHover(true)}
                onMouseLeave={() => setAddBtnHover(false)}
              >
                {savingService ? "Saving..." : "Add Service"}
              </button>
            </form>

            {serviceError ? <p style={styles.serviceError}>{serviceError}</p> : null}

            <div style={styles.serviceList}>
              {loadingServices ? (
                <p style={styles.emptyText}>Loading services...</p>
              ) : services.length ? (
                services.map((service, i) => (
                  <div style={styles.serviceItem} key={service.Id || service.id}>
                    <div>
                      <h3 style={styles.serviceItemName}>{service.Branch || service.branch}</h3>
                      <p style={styles.serviceItemYears}>
                        {service.YearStart || service.year_start} – {service.YearEnd || service.year_end}
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{
                        ...styles.btnDelete,
                        ...(hoveredDelete === i ? styles.btnDeleteHover : {}),
                      }}
                      onMouseEnter={() => setHoveredDelete(i)}
                      onMouseLeave={() => setHoveredDelete(null)}
                      onClick={() => handleDeleteService(service.Id || service.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p style={styles.emptyText}>No service records yet. Add your first branch above.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
