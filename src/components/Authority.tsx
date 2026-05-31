import { Icon } from "../lib/icons";
import { CERTS } from "../lib/data";

export function Authority() {
  return (
    <section className="section grey authority">
      <div className="wrap a-grid">
        <div className="reveal">
          <p className="eyebrow">Global authority</p>
          <p className="lead">
            Operating on a <b>24/7 basis since 2008</b> — a network of Cyber Security Operations
            Centers watching your networks and endpoints.
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: ".08s" }}>
          <p className="body">
            Our network of Cyber Security Operations Centers (SOC) provides Managed SOC Services
            for your Networks and Endpoints. We work with National, Regional, and International
            CERT centers and Information Security organizations to detect, contain, and respond to
            threats wherever your infrastructure runs.
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
  );
}
