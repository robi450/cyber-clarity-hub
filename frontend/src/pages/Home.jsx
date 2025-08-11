// src/pages/Home.jsx
import { useEffect, useState } from "react";

const LINKS = [
  { label: "New Idea", href: "#new", kind: "blue" },
  { label: "Start FastAPI", href: "/api/health", kind: "green" },
  { label: "Open Docs", href: "http://localhost:8000/docs", kind: "blue" },
];

const QUOTES = [
  "“Simple is better than complex.” — The Zen of Python",
  "“Readability counts.” — The Zen of Python",
  "“Now is better than never.” — The Zen of Python",
];

export default function Home() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [apiOk, setApiOk] = useState(null);

  useEffect(() => {
    const i = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[i]);
  }, []);

  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(d => setApiOk(!!d.ok)).catch(() => setApiOk(false));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="container">
        <div className="hero">
          <div className="badge">Python • FastAPI • React • Cyber</div>
          <h1>Build faster. Ship safer.</h1>
          <p className="muted">
            MicroSaaS starter with a cyber-inspired theme. Blue/Green energy,
            keyboard-friendly, and mobile-ready.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            <a className="btn" href="#quick">Quick Win</a>
            <a className="btn secondary" href="#learning">
              <span className="kbd">L</span> Learning Hub
            </a>
          </div>

          <div className="row cols-3" style={{ marginTop: 18 }}>
            <div className="stat">
              <span className="muted">API</span>
              <strong style={{ color: apiOk ? "var(--green)" : "var(--muted)" }}>
                {apiOk === null ? "…" : apiOk ? "Healthy" : "Down"}
              </strong>
            </div>
            <div className="stat">
              <span className="muted">Quote</span>
              <strong>{quote}</strong>
            </div>
            <div className="stat">
              <span className="muted">Focus</span>
              <div className="progress"><span style={{ width: "68%" }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section id="quick" className="container" style={{ marginTop: 18 }}>
        <div className="row cols-3">
          {LINKS.map((l) => (
            <a key={l.label} className="card" href={l.href} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className={`ico ${l.kind}`}>{l.kind === "green" ? "✓" : "⚡"}</span>
                <div>
                  <strong>{l.label}</strong>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {l.kind === "green" ? "Ping your API" : "Create, navigate, explore"}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* LEARNING (Cybersecurity certs) */}
      <section id="learning" className="container">
        <h2 style={{ margin: "6px 0 10px" }}>Learning • Cybersecurity</h2>
        <div className="row cols-3">
          <CertCard title="CompTIA Security+"
            desc="Objectives & quick drills."
            link="https://www.comptia.org/certifications/security" />
          <CertCard title="CompTIA CySA+"
            desc="Threat detection & analytics."
            link="https://www.comptia.org/certifications/cybersecurity-analyst" />
          <CertCard title="CompTIA Pentest+"
            desc="Offensive ops practice."
            link="https://www.comptia.org/certifications/pentest" />
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      {/* TOOLS */}
      <section id="tools" className="container" style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "6px 0 10px" }}>Tools</h2>
        <div className="row cols-3">
          <ToolCard label="FastAPI Docs" href="http://localhost:8000/docs" />
          <ToolCard label="API Health" href="/api/health" />
          <ToolCard label="Frontend (Vite)" href="http://localhost:5173" />
        </div>
      </section>
    </main>
  );
}

function CertCard({ title, desc, link }) {
  return (
    <a className="card" href={link} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
      <strong>{title}</strong>
      <div className="muted" style={{ margin: "6px 0 10px" }}>{desc}</div>
      <button className="btn">Open</button>
    </a>
  );
}

function ToolCard({ label, href }) {
  return (
    <a className="card" href={href} style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="ico blue">⚙</span>
        <div>
          <strong>{label}</strong>
          <div className="muted" style={{ fontSize: 13 }}>Quick access</div>
        </div>
      </div>
    </a>
  );
}

