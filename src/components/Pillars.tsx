import { Icon } from "../lib/icons";
import { PILLARS } from "../lib/data";
import type { Direction } from "../lib/tweaks";

function PillarsHead() {
  return (
    <div className="sec-head reveal">
      <p className="eyebrow">What we do</p>
      <h2>Four pillars of managed cyberdefense.</h2>
      <p>
        A full security operation delivered as a service — from 24/7 detection to forensics,
        testing, and architecture.
      </p>
    </div>
  );
}

// ---------- A : asymmetric bento ----------
function PillarsBento() {
  const span = ["span7 feature", "span5", "span5", "span7 feature"];
  return (
    <section className="section">
      <div className="wrap">
        <PillarsHead />
        <div className="bento reveal">
          {PILLARS.map((p, i) => (
            <article className={"pcard " + span[i]} key={p.ix}>
              <div className="pc-top">
                <span className="pc-ix">{p.ix} / 04</span>
                <span className="pc-ic">
                  <Icon name={p.icon} size={23} />
                </span>
              </div>
              <p className="pc-tag">{p.tag}</p>
              <h3>{p.title}</h3>
              <ul className="pcaps">
                {p.caps.map((c) => (
                  <li key={c}>
                    <Icon name="check" size={16} /> {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- B : blueprint columns ----------
function PillarsBlueprint() {
  return (
    <section className="section">
      <div className="wrap">
        <PillarsHead />
        <div className="blue-pillars reveal">
          {PILLARS.map((p) => (
            <div className="bp" key={p.ix}>
              <div className="bp-ix">{p.ix}</div>
              <div className="bp-ic">
                <Icon name={p.icon} size={26} />
              </div>
              <p className="bp-tag">{p.tag}</p>
              <h3>{p.title}</h3>
              <ul className="bp-caps">
                {p.caps.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- C : monolith rows ----------
function PillarsMonolith({ onAssess }: { onAssess: () => void }) {
  return (
    <section className="section">
      <div className="wrap">
        <PillarsHead />
        <div className="mono-pillars reveal">
          {PILLARS.map((p) => (
            <div className="mrow" key={p.ix} onClick={onAssess}>
              <div className="m-ix">{p.ix}</div>
              <div>
                <p className="m-tag">{p.tag}</p>
                <h3>{p.title}</h3>
              </div>
              <p className="m-caps">{p.caps.join(" · ")}</p>
              <div className="m-go">
                <Icon name="arrow-up-right" size={19} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pillars({
  direction,
  onAssess,
}: {
  direction: Direction;
  onAssess: () => void;
}) {
  if (direction === "arch") return <PillarsBlueprint />;
  if (direction === "mono") return <PillarsMonolith onAssess={onAssess} />;
  return <PillarsBento />;
}
