"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { SiteFooter } from "../components/Footer";
import { AssessmentModal, PortalModal } from "../components/Modals";
import { TweaksPanel } from "../components/TweaksPanel";
import { Icon } from "../lib/icons";
import { CERTS } from "../lib/data";
import { useReveals } from "../lib/reveal";
import { useTweaks } from "../lib/tweaks";

const TIMELINE = [
  { yr: "2008", lb: "24/7 SOC operations begin — continuous monitoring of networks and endpoints." },
  { yr: "L3", lb: "CSIRT incident detection & response capability established and matured." },
  { yr: "CERT", lb: "Collaboration with National, Regional & International CERT centers." },
  { yr: "2026", lb: "Coverage spans on-premise and cloud infrastructure, AI-powered." },
];

const VALUES = [
  {
    ic: "users",
    h: "People, not just tools",
    p: "Our analysts triage every alert in the SOC. Automation accelerates us; humans make the call. Your team only hears about what matters.",
  },
  {
    ic: "ruler",
    h: "Specificity over fear",
    p: "We never trade in hacker-movie clichés. Confidence comes from coverage, SLAs, and measured response — evidence, not adjectives.",
  },
  {
    ic: "clock",
    h: "Always on, since 2008",
    p: "24/7/365, without interruption. A network of Security Operations Centers that does not sleep, hand off, or look away.",
  },
];

export default function About() {
  const [t] = useTweaks();
  const [portal, setPortal] = useState(false);
  const [assess, setAssess] = useState(false);
  useReveals(t.theme);

  return (
    <>
      <Nav active="about" />
      <PageHero
        crumb="About us"
        eyebrow="Global authority"
        title="Two decades of watching, so your team never has to."
        lede="A network of Cyber Security Operations Centers, operating on a 24/7 basis since 2008 — protecting enterprise infrastructure on-premise and in the cloud."
      />

      <section className="section">
        <div className="wrap about-intro">
          <div className="reveal">
            <p className="eyebrow">Who we are</p>
            <p className="lead">
              Operating on a <b>24/7 basis since 2008</b> — calm experts in the room, around the
              clock.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: ".08s" }}>
            <p className="body">
              Our network of Cyber Security Operations Centers (SOC) provides Managed SOC Services
              for your Networks and Endpoints. We protect, monitor, detect, and respond to attacks
              on your IT infrastructure — on-premise and in the cloud.
            </p>
            <p className="body">
              We work with National, Regional, and International CERT centers and Information
              Security organizations, with L3 / CSIRT incident detection and response at the core
              of everything we do.
            </p>
            <div className="certs">
              {CERTS.map((c) => (
                <span className="cert" key={c.t}>
                  <Icon name={c.ic} size={13} /> {c.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section grey tight">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">The operation, over time</p>
            <h2>Built for continuity.</h2>
          </div>
          <div className="timeline reveal">
            {TIMELINE.map((m) => (
              <div className="tl-item" key={m.yr}>
                <div className="yr">{m.yr}</div>
                <div className="lb">{m.lb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">How we operate</p>
            <h2>The principles behind the SOC.</h2>
          </div>
          <div className="values reveal">
            {VALUES.map((v) => (
              <article className="value-card" key={v.h}>
                <div className="vc-ic">
                  <Icon name={v.ic} size={23} />
                </div>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </article>
            ))}
          </div>
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
