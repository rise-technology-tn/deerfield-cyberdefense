import { Icon } from "../lib/icons";

type Props = { onPortal: () => void; onAssess: () => void };

export function CtaBand({ onPortal, onAssess }: Props) {
  return (
    <section className="cta">
      <div className="cta-mesh" />
      <div className="wrap cta-inner">
        <div className="reveal">
          <p className="eyebrow no-rule">Intelligent security for intelligent business</p>
          <h2>See what your infrastructure looks like to an adversary.</h2>
          <p>
            Book a security assessment — our analysts map your exposure on-premise and in the
            cloud, and show you exactly where Deerfield steps in.
          </p>
        </div>
        <div className="reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button className="btn btn-white btn-lg" onClick={onAssess}>
            Get a security assessment <Icon name="arrow-right" size={17} />
          </button>
          <button
            className="btn btn-lg"
            style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            onClick={onPortal}
          >
            <Icon name="lock" size={16} /> Enter M-SOC Portal
          </button>
        </div>
      </div>
    </section>
  );
}
