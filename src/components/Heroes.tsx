import type { ReactNode } from "react";
import { Icon } from "../lib/icons";
import { SocFeed } from "./SocFeed";
import type { Direction } from "../lib/tweaks";

type HeroProps = { onPortal: () => void; onAssess: () => void };

function HeroOps({ onPortal, onAssess }: HeroProps) {
  return (
    <section className="hero hero-ops">
      <div className="hero-glow" />
      <div className="wrap grid">
        <div>
          <p className="eyebrow reveal">Managed Security Services · 24/7</p>
          <h1 className="reveal" style={{ transitionDelay: ".04s" }}>
            Managed Security Services 24/7
          </h1>
          <p className="sub reveal" style={{ transitionDelay: ".08s" }}>
            Intelligent Security for Intelligent Business.
          </p>
          <p className="core reveal" style={{ transitionDelay: ".12s" }}>
            Incident Detection &amp; Response (L3 / CSIRT), AI-powered. We protect, monitor,
            detect, and respond to attacks on your IT infrastructure — on-premise and in the cloud.
          </p>
          <div className="hero-cta reveal" style={{ transitionDelay: ".16s" }}>
            <button className="btn btn-primary btn-lg" onClick={onPortal}>
              <Icon name="lock" size={17} /> Enter M-SOC Portal
            </button>
            <button className="btn btn-ghost btn-lg" onClick={onAssess}>
              Get a security assessment <Icon name="arrow-right" size={16} />
            </button>
          </div>
          <div className="proof reveal" style={{ transitionDelay: ".2s" }}>
            <div className="p">
              <span className="v">24/7/365</span>
              <span className="l">SOC coverage</span>
            </div>
            <div className="p">
              <span className="v">L3 / CSIRT</span>
              <span className="l">Response tier</span>
            </div>
            <div className="p">
              <span className="v">2008</span>
              <span className="l">Operating since</span>
            </div>
          </div>
        </div>
        <SocFeed />
      </div>
    </section>
  );
}

function HeroArch({ onPortal, onAssess }: HeroProps) {
  const sys: { k: string; v: ReactNode }[] = [
    {
      k: "SOC Status",
      v: (
        <>
          <span className="live-dot" /> Online
        </>
      ),
    },
    { k: "Coverage", v: "24 / 7 / 365" },
    { k: "Escalation", v: "L3 · CSIRT" },
    { k: "Perimeter", v: "On-prem + Cloud" },
    { k: "Since", v: "2008" },
  ];
  return (
    <section className="hero hero-arch">
      <div className="wrap" style={{ position: "relative" }}>
        <div className="blueprint" />
        <div className="inner">
          <div>
            <div className="coord reveal">
              <span>LAT 24/7</span>
              <span>
                <b>● M-SOC ACTIVE</b>
              </span>
              <span>NIS-2 · ISO 27001</span>
            </div>
            <p className="eyebrow reveal" style={{ transitionDelay: ".04s" }}>
              Managed Security Services
            </p>
            <h1 className="reveal" style={{ transitionDelay: ".06s", marginTop: 18 }}>
              Managed Security Services 24/7
            </h1>
            <p className="sub reveal" style={{ transitionDelay: ".1s" }}>
              Intelligent Security for Intelligent Business.
            </p>
            <p className="core reveal" style={{ transitionDelay: ".14s" }}>
              Incident Detection &amp; Response (L3 / CSIRT), AI-powered. We protect, monitor,
              detect, and respond to attacks on your IT infrastructure — on-premise and in the
              cloud.
            </p>
            <div className="hero-cta reveal" style={{ transitionDelay: ".18s" }}>
              <button className="btn btn-primary btn-lg" onClick={onPortal}>
                <Icon name="lock" size={17} /> Enter M-SOC Portal
              </button>
              <button className="btn btn-ghost btn-lg" onClick={onAssess}>
                Security assessment <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>
          <div className="sidecol reveal" style={{ transitionDelay: ".12s" }}>
            {sys.map((s) => (
              <div className="sysrow" key={s.k}>
                <span className="k">{s.k}</span>
                <span className="val">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMono({ onPortal, onAssess }: HeroProps) {
  return (
    <section className="hero hero-mono">
      <div className="wrap">
        <div className="rule reveal" />
        <p className="eyebrow reveal" style={{ transitionDelay: ".02s" }}>
          Managed Security Services · 24/7
        </p>
        <h1 className="reveal" style={{ transitionDelay: ".06s", marginTop: 24 }}>
          Managed Security Services 24/7
        </h1>
        <p className="sub reveal" style={{ transitionDelay: ".1s" }}>
          Intelligent Security for Intelligent Business.
        </p>
        <p className="core reveal" style={{ transitionDelay: ".14s" }}>
          Incident Detection &amp; Response (L3 / CSIRT), AI-powered. We protect, monitor, detect,
          and respond to attacks on your IT infrastructure — on-premise and in the cloud.
        </p>
        <div className="hero-cta reveal" style={{ transitionDelay: ".18s" }}>
          <button className="btn btn-primary btn-lg" onClick={onPortal}>
            <Icon name="lock" size={17} /> Enter M-SOC Portal
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onAssess}>
            Get a security assessment <Icon name="arrow-right" size={16} />
          </button>
        </div>
        <div className="proof reveal" style={{ transitionDelay: ".22s" }}>
          <div className="p">
            <span className="v">24/7/365</span>
            <span className="l">SOC coverage</span>
          </div>
          <div className="p">
            <span className="v">L3 / CSIRT</span>
            <span className="l">Response tier</span>
          </div>
          <div className="p">
            <span className="v">2008</span>
            <span className="l">Operating since</span>
          </div>
          <div className="p">
            <span className="v">On-prem + Cloud</span>
            <span className="l">Perimeter</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero({ direction, onPortal, onAssess }: HeroProps & { direction: Direction }) {
  if (direction === "arch") return <HeroArch onPortal={onPortal} onAssess={onAssess} />;
  if (direction === "mono") return <HeroMono onPortal={onPortal} onAssess={onAssess} />;
  return <HeroOps onPortal={onPortal} onAssess={onAssess} />;
}
