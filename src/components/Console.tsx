import { useState, type ReactNode } from "react";
import { Icon } from "../lib/icons";

function PanelMonitor() {
  const rows: [string, string, string, string, string][] = [
    ["Endpoint EDR / XDR", "1,284 hosts", "var(--success)", "Healthy", "#E2F3EA"],
    ["Cloud — AWS · Azure", "37 accounts", "var(--success)", "Healthy", "#E2F3EA"],
    ["Identity / SSO", "Okta · Entra", "var(--warning)", "2 advisories", "#FBF2D8"],
    ["On-prem network sensors", "14 sites", "var(--success)", "Healthy", "#E2F3EA"],
  ];
  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        {([["Coverage", "99.2%"], ["Sources live", "62 / 62"], ["Open cases", "3"]] as const).map(
          (m) => (
            <div
              key={m[0]}
              style={{
                flex: 1,
                background: "var(--grey-50)",
                border: "1px solid var(--grey-150)",
                borderRadius: 10,
                padding: "13px 15px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "var(--fg4)",
                }}
              >
                {m[0]}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--fg1)",
                  marginTop: 5,
                }}
              >
                {m[1]}
              </div>
            </div>
          )
        )}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            padding: "14px 8px",
            borderTop: i ? "1px solid var(--grey-150)" : "none",
          }}
        >
          <Icon name="circle-dot" size={17} color="var(--fg4)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{r[0]}</div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg3)",
                marginTop: 2,
              }}
            >
              {r[1]}
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: r[2],
              background: r[4],
              padding: "4px 11px",
              borderRadius: 999,
            }}
          >
            {r[3]}
          </span>
        </div>
      ))}
    </div>
  );
}

function PanelRespond() {
  const steps: [string, string, boolean][] = [
    ["Detected", "Anomalous OAuth grant flagged by detection rule DR-2208", true],
    ["Enriched", "Correlated with 3 prior sign-ins · CTI risk score 87", true],
    ["Contained", "Token revoked, session killed, account quarantined", true],
    ["Analyst review", "L3 CSIRT confirms true positive, notifies your team", false],
  ];
  return (
    <div style={{ padding: 22 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--fg4)",
          marginBottom: 18,
        }}
      >
        Automated response · case #4471
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 15 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 27,
                height: 27,
                borderRadius: "50%",
                background: s[2] ? "var(--brand-red)" : "#fff",
                border: "2px solid var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
              }}
            >
              {s[2] && <Icon name="check" size={14} color="#fff" />}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 2, flex: 1, background: "var(--grey-200)", minHeight: 28 }} />
            )}
          </div>
          <div style={{ paddingBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg1)" }}>{s[0]}</div>
            <div style={{ fontSize: 13, color: "var(--fg2)", marginTop: 3, lineHeight: 1.5 }}>
              {s[1]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelComply() {
  const frameworks: [string, number][] = [
    ["ISO 27001", 96],
    ["NIS-2", 91],
    ["SOC 2 Type II", 100],
    ["GDPR controls", 84],
  ];
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--fg4)",
          marginBottom: 20,
        }}
      >
        Control coverage · current quarter
      </div>
      {frameworks.map((f) => (
        <div key={f[0]} style={{ marginBottom: 19 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg1)" }}>{f[0]}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 600,
                color: f[1] === 100 ? "#137C44" : "var(--fg2)",
              }}
            >
              {f[1]}%
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: "var(--grey-150)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: f[1] + "%",
                borderRadius: 999,
                background: f[1] === 100 ? "var(--success)" : "var(--brand-red)",
                transition: "width .6s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

type Tab = { ic: string; h: string; d: string; panel: ReactNode };

export function Console() {
  const [active, setActive] = useState(0);
  const tabs: Tab[] = [
    {
      ic: "activity",
      h: "Unified monitoring",
      d: "Endpoint, cloud, identity, and network signal correlated in one view your analysts and ours share — on-premise and in the cloud.",
      panel: <PanelMonitor />,
    },
    {
      ic: "siren",
      h: "Incident response",
      d: "Pre-approved playbooks contain threats in seconds; L3 / CSIRT analysts confirm, investigate, and escalate only what matters.",
      panel: <PanelRespond />,
    },
    {
      ic: "scroll-text",
      h: "Continuous compliance",
      d: "Live control coverage and audit-ready evidence mapped to ISO 27001 and NIS-2, generated from your real telemetry.",
      panel: <PanelComply />,
    },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">The operation</p>
          <h2>One operations center for your whole security posture.</h2>
          <p>
            Plug Deerfield into your existing tools and we run the SOC — detection engineering,
            monitoring, and response, all under one SLA.
          </p>
        </div>
        <div className="console reveal">
          <div className="con-tabs">
            {tabs.map((t, i) => (
              <button
                key={t.h}
                className={"ctab" + (i === active ? " active" : "")}
                onClick={() => setActive(i)}
              >
                <div className="ct-h">
                  <span className="ct-ic">
                    <Icon name={t.ic} size={19} />
                  </span>
                  {t.h}
                </div>
                <p className="ct-d">{t.d}</p>
              </button>
            ))}
          </div>
          <div className="con-panel">{tabs[active].panel}</div>
        </div>
      </div>
    </section>
  );
}
