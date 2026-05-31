"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { SiteFooter } from "../components/Footer";
import { AssessmentModal, PortalModal } from "../components/Modals";
import { TweaksPanel } from "../components/TweaksPanel";
import { Icon } from "../lib/icons";
import { useReveals } from "../lib/reveal";
import { useTweaks } from "../lib/tweaks";

const FAQS = [
  {
    q: "What exactly is a Managed SOC (M-SOC)?",
    a: "A Security Operations Center we run on your behalf, 24/7/365. Our analysts monitor your networks and endpoints, triage every alert, and detect, contain and respond to threats — on-premise and in the cloud — so your team only hears about what actually matters.",
  },
  {
    q: "How fast do you respond to an incident?",
    a: "Incident detection and response is handled by our L3 / CSIRT team. Pre-approved playbooks contain threats in seconds; an analyst then confirms, investigates and escalates only what is material to your business.",
  },
  {
    q: "Do you cover cloud as well as on-premise infrastructure?",
    a: "Yes. We protect, monitor, detect and respond across your IT infrastructure both on-premise and in the cloud — correlating endpoint, identity, network and cloud signal in a single operational view.",
  },
  {
    q: "What happens during a major cyber incident?",
    a: "Our CERT / CSIRT team runs the response end to end: DFIR and forensics, containment, cyber crisis management, and clear, defensible reporting. You get one team and one line of accountability from first alert through post-incident review.",
  },
  {
    q: "Which compliance frameworks do you support?",
    a: "We provide continuous compliance monitoring mapped to ISO 27001 and NIS-2, alongside security posture assessments and audit-ready evidence generated from your real telemetry.",
  },
  {
    q: "How do you work with our existing tools and team?",
    a: "We plug into your existing stack and run the operation alongside your team — detection engineering, monitoring and response under one SLA. We also collaborate with National, Regional and International CERT centers and information security organizations.",
  },
  {
    q: "How do we access live cases and reports?",
    a: "Through the MySOC Portal — secure customer access to live cases, analyst chat, reports and your security posture. Single sign-on via Okta and Microsoft Entra is supported.",
  },
];

export default function Faq() {
  const [t] = useTweaks();
  const [open, setOpen] = useState(0);
  const [portal, setPortal] = useState(false);
  const [assess, setAssess] = useState(false);
  useReveals(t.theme);

  return (
    <>
      <Nav active="faq" />
      <PageHero
        crumb="FAQ's"
        eyebrow="Frequently asked"
        title="Straight answers for the people accountable."
        lede="What a managed security operation actually means for your team, your coverage, and your board."
      />
      <section className="section">
        <div className="wrap faq-wrap">
          {FAQS.map((f, i) => (
            // The `reveal` class lives on this STABLE wrapper. The scroll-reveal
            // adds `.in` to it imperatively; if `reveal` shared the element that
            // toggles `open`, React would rebuild className on click and strip
            // `.in`, snapping the item back to opacity:0 (it would "disappear").
            <div className="reveal" key={i}>
              <div className={"faq-item" + (open === i ? " open" : "")}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{f.q}</span>
                  <span className="chev">
                    <Icon name="chevron-right" size={17} />
                  </span>
                </button>
                <div className="faq-a">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand onPortal={() => setPortal(true)} onAssess={() => setAssess(true)} />
      <SiteFooter />
      <AssessmentModal open={assess} onClose={() => setAssess(false)} />
      <PortalModal open={portal} onClose={() => setPortal(false)} />
      <TweaksPanel />
    </>
  );
}
