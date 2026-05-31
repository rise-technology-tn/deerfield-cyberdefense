"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { PageHero } from "../components/PageHero";
import { Console } from "../components/Console";
import { CtaBand } from "../components/CtaBand";
import { SiteFooter } from "../components/Footer";
import { AssessmentModal, PortalModal } from "../components/Modals";
import { TweaksPanel } from "../components/TweaksPanel";
import { Icon } from "../lib/icons";
import { useReveals } from "../lib/reveal";
import { useTweaks } from "../lib/tweaks";

const SERVICES = [
  {
    ix: "01",
    tag: "M-SOC · 24/7/365",
    badge: "Networks & Endpoints",
    title: "Security Operations Center",
    desc: "Our 24/7/365 Security Operations Center watches your networks and endpoints without interruption. Endpoint security engineering for EDR, XDR and MDR, backed by Cyber Threat Intelligence, analysis, and full-cycle investigation.",
    caps: [
      "Endpoint security — EDR / XDR / MDR",
      "Cyber Threat Intelligence (CTI)",
      "Threat analysis & hunting",
      "Incident investigations",
      "Containment",
      "Remediation",
    ],
  },
  {
    ix: "02",
    tag: "CERT / CSIRT",
    badge: "L3 · DFIR / Forensics",
    title: "Security Incident Handling",
    desc: "When minutes count, our CERT / CSIRT team runs the response. Digital forensics and incident response, major cyber incident handling, and crisis management — from first containment through clear, defensible reporting.",
    caps: [
      "DFIR & forensics services",
      "Major cyber incident response",
      "Cyber crisis management",
      "Containment",
      "Reporting",
      "Post-incident review",
    ],
  },
  {
    ix: "03",
    tag: "VMS",
    badge: "OWASP · Risk-based",
    title: "Vulnerability Management",
    desc: "Find the exposure before an adversary does. Intrusion and penetration testing, patch management, and OWASP scanning — prioritized by real-world risk, not raw CVE counts.",
    caps: ["Intrusion testing", "PenTesting", "Patch management", "OWASP scanning"],
  },
  {
    ix: "04",
    tag: "Advisory",
    badge: "ISO 27001 · NIS-2",
    title: "Security Engineering & Consulting",
    desc: "Harden your posture and prove it. Security architecture, posture assessments, and continuous compliance monitoring mapped to the frameworks your board and regulators ask about.",
    caps: [
      "Security architecture",
      "Posture assessments",
      "Compliance — ISO 27001",
      "Compliance — NIS-2",
    ],
  },
];

export default function Services() {
  const [t] = useTweaks();
  const [portal, setPortal] = useState(false);
  const [assess, setAssess] = useState(false);
  useReveals(t.theme);

  return (
    <>
      <Nav active="services" />
      <PageHero
        crumb="Our Services"
        eyebrow="Managed Security Services"
        title="Four pillars. One operation. Under one SLA."
        lede="From 24/7 detection to forensics, testing, and architecture — Deerfield runs the security operation so your team doesn't have to assemble one."
      />

      <section className="section">
        <div className="wrap">
          {SERVICES.map((s) => (
            <div className="svc-block reveal" key={s.ix}>
              <div className="meta">
                <div className="ix">{s.ix}</div>
                <p className="tag">{s.tag}</p>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
                <span className="badge">
                  <Icon name="shield-check" size={14} /> {s.badge}
                </span>
              </div>
              <div className="svc-cap-grid">
                {s.caps.map((c, i) => (
                  <div className="svc-cap" key={c}>
                    <div className="n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="h">
                      <Icon name="check" size={16} /> {c}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Console />

      <CtaBand onPortal={() => setPortal(true)} onAssess={() => setAssess(true)} />
      <SiteFooter />
      <AssessmentModal open={assess} onClose={() => setAssess(false)} />
      <PortalModal open={portal} onClose={() => setPortal(false)} />
      <TweaksPanel />
    </>
  );
}
