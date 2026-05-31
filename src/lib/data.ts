// Shared content data for the site (ported verbatim from the design handoff).
import type { CSSProperties } from "react";

export type Pillar = {
  ix: string;
  tag: string;
  icon: string;
  title: string;
  caps: string[];
};

export const PILLARS: Pillar[] = [
  {
    ix: "01",
    tag: "M-SOC · 24/7/365",
    icon: "radar",
    title: "Security Operations Center",
    caps: [
      "Endpoint security engineering — EDR / XDR / MDR",
      "Cyber Threat Intelligence (CTI)",
      "Threat analysis & hunting",
      "Incident investigations",
      "Containment & remediation",
    ],
  },
  {
    ix: "02",
    tag: "CERT / CSIRT",
    icon: "siren",
    title: "Security Incident Handling",
    caps: [
      "DFIR & forensics services",
      "Major cyber incident response",
      "Cyber crisis management",
      "Containment",
      "Reporting",
    ],
  },
  {
    ix: "03",
    tag: "VMS",
    icon: "scan-search",
    title: "Vulnerability Management",
    caps: ["Intrusion testing", "PenTesting", "Patch management", "OWASP scanning"],
  },
  {
    ix: "04",
    tag: "Advisory",
    icon: "drafting-compass",
    title: "Security Engineering & Consulting",
    caps: [
      "Security architecture",
      "Posture assessments",
      "Compliance — ISO 27001",
      "Compliance — NIS-2",
    ],
  },
];

export type SocEvent = {
  sev: string;
  h: string;
  src: string;
  tag: string;
  k: "ok" | "warn" | "watch";
};

export const SOC_EVENTS: SocEvent[] = [
  { sev: "var(--brand-red)", h: "Credential stuffing blocked", src: "edge-fw-03", tag: "Contained", k: "ok" },
  { sev: "var(--high)", h: "Anomalous OAuth grant", src: "ident-svc", tag: "Triaging", k: "warn" },
  { sev: "var(--warning)", h: "Admin login · unusual geo", src: "azure-ad", tag: "Watch", k: "watch" },
  { sev: "var(--success)", h: "EDR baseline restored", src: "host-pool-7", tag: "Resolved", k: "ok" },
  { sev: "var(--brand-red)", h: "Lateral movement attempt", src: "edr-xdr", tag: "Contained", k: "ok" },
  { sev: "var(--high)", h: "Unsigned binary executed", src: "endpoint-114", tag: "Investigating", k: "warn" },
  { sev: "var(--warning)", h: "Outbound to new C2 domain", src: "dns-sensor", tag: "Watch", k: "watch" },
  { sev: "var(--success)", h: "Patch deployed · CVE-2026-1180", src: "vms-orch", tag: "Remediated", k: "ok" },
  { sev: "var(--high)", h: "Phishing payload detonated", src: "mail-gw", tag: "Triaging", k: "warn" },
  { sev: "var(--brand-red)", h: "Ransomware canary tripped", src: "file-svc-02", tag: "Contained", k: "ok" },
];

export const TAG_STYLE: Record<SocEvent["k"], CSSProperties> = {
  ok: { color: "#137C44", background: "#E2F3EA" },
  warn: { color: "#B8470F", background: "#FCEBE0" },
  watch: { color: "#946C00", background: "#FBF2D8" },
};

export const CERTS = [
  { ic: "globe", t: "National · Regional · International CERT" },
  { ic: "shield-check", t: "ISO 27001" },
  { ic: "scale", t: "NIS-2 aligned" },
  { ic: "clock", t: "Operating since 2008" },
];

export const ACCENT_BY_HEX: Record<string, string> = {
  "#cf1c32": "red",
  "#2a6fdb": "cobalt",
  "#414854": "titanium",
};

// Router paths (the SPA equivalent of the prototype's *.html links).
export const NAV_LINKS = [
  { k: "home", label: "Home", href: "/" },
  { k: "about", label: "About us", href: "/about" },
  { k: "services", label: "Our Services", href: "/services" },
  { k: "faq", label: "FAQ's", href: "/faq" },
  { k: "contact", label: "Contact us", href: "/contact" },
];
