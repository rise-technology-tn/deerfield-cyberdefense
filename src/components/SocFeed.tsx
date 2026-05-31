import { useEffect, useRef, useState } from "react";
import { Icon } from "../lib/icons";
import { SOC_EVENTS, TAG_STYLE, type SocEvent } from "../lib/data";

type Row = SocEvent & { id: number; ts: string };

function nowStamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// Illustrative live SOC feed (no real data) — mirrors the prototype's animation.
export function SocFeed() {
  const seed: Row[] = [3, 1, 2, 0].map((i, n) => ({ ...SOC_EVENTS[i], id: n, ts: nowStamp() }));
  const [rows, setRows] = useState<Row[]>(seed);
  const idRef = useRef(seed.length);

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => {
      const ev = SOC_EVENTS[Math.floor(Math.random() * SOC_EVENTS.length)];
      setRows((prev) => [{ ...ev, id: idRef.current++, ts: nowStamp() }, ...prev].slice(0, 4));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="soc reveal">
      <div className="soc-top">
        <span className="dot" />
        <span className="ttl">deerfield_msoc · live feed</span>
        <span className="live">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--success)",
              display: "inline-block",
            }}
          />{" "}
          Monitoring
        </span>
      </div>
      <div className="soc-body">
        {rows.map((r) => (
          <div className="soc-row" key={r.id}>
            <span className="sev" style={{ background: r.sev }} />
            <div className="meta">
              <div className="h">{r.h}</div>
              <div className="s">
                {r.src} · {r.ts}
              </div>
            </div>
            <span className="tag" style={TAG_STYLE[r.k]}>
              {r.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="soc-foot">
        <Icon name="activity" size={13} color="var(--brand-red)" />
        <span>
          Median time to respond&nbsp; <b>11m 42s</b> &nbsp;· trailing 24h
        </span>
      </div>
    </div>
  );
}
