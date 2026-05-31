import { useState, type CSSProperties } from "react";
import { useTweaks, type Direction, type Theme } from "../lib/tweaks";
import { Icon } from "../lib/icons";

const ACCENTS: { hex: string; label: string }[] = [
  { hex: "#CF1C32", label: "Red" },
  { hex: "#2A6FDB", label: "Cobalt" },
  { hex: "#414854", label: "Titanium" },
];

const panelStyle: CSSProperties = {
  position: "fixed",
  right: 16,
  bottom: 16,
  zIndex: 2147483646,
  width: 248,
  background: "rgba(250,249,247,.82)",
  WebkitBackdropFilter: "blur(20px) saturate(160%)",
  backdropFilter: "blur(20px) saturate(160%)",
  border: ".5px solid rgba(255,255,255,.6)",
  borderRadius: 14,
  boxShadow: "0 12px 40px rgba(0,0,0,.18)",
  color: "#29261b",
  font: "12px/1.4 ui-sans-serif, system-ui, sans-serif",
  padding: "12px 14px 14px",
};

const sect: CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "rgba(41,38,27,.45)",
  margin: "12px 0 6px",
};

const seg: CSSProperties = {
  display: "flex",
  gap: 4,
  padding: 2,
  borderRadius: 8,
  background: "rgba(0,0,0,.06)",
};

function segBtn(active: boolean): CSSProperties {
  return {
    flex: 1,
    border: 0,
    borderRadius: 6,
    padding: "6px 4px",
    cursor: "pointer",
    font: "inherit",
    fontWeight: 500,
    background: active ? "rgba(255,255,255,.95)" : "transparent",
    boxShadow: active ? "0 1px 2px rgba(0,0,0,.12)" : "none",
    color: "inherit",
  };
}

export function TweaksPanel({ showDirection = false }: { showDirection?: boolean }) {
  const [t, setTweak] = useTweaks();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open appearance tweaks"
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 2147483646,
          width: 42,
          height: 42,
          borderRadius: 12,
          border: ".5px solid rgba(0,0,0,.12)",
          background: "rgba(250,249,247,.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 24px rgba(0,0,0,.16)",
          cursor: "pointer",
          color: "#29261b",
        }}
      >
        <Icon name="activity" size={18} />
      </button>
    );
  }

  return (
    <div style={panelStyle} role="dialog" aria-label="Appearance tweaks">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <b style={{ fontSize: 12 }}>Tweaks</b>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close tweaks"
          style={{ border: 0, background: "transparent", cursor: "pointer", color: "rgba(41,38,27,.6)" }}
        >
          <Icon name="x" size={15} />
        </button>
      </div>

      <div style={sect}>Theme</div>
      <div style={seg}>
        {(["light", "obsidian"] as Theme[]).map((m) => (
          <button key={m} style={segBtn(t.theme === m)} onClick={() => setTweak("theme", m)}>
            {m === "light" ? "Light" : "Obsidian"}
          </button>
        ))}
      </div>

      {showDirection && (
        <>
          <div style={sect}>Home layout</div>
          <div style={seg}>
            {(
              [
                ["ops", "Ops"],
                ["arch", "Blueprint"],
                ["mono", "Monolith"],
              ] as [Direction, string][]
            ).map(([v, label]) => (
              <button
                key={v}
                style={segBtn(t.direction === v)}
                onClick={() => setTweak("direction", v)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      <div style={sect}>Accent</div>
      <div style={{ display: "flex", gap: 6 }}>
        {ACCENTS.map((a) => {
          const on = t.accent.toLowerCase() === a.hex.toLowerCase();
          return (
            <button
              key={a.hex}
              title={a.label}
              aria-label={a.label}
              onClick={() => setTweak("accent", a.hex)}
              style={{
                flex: 1,
                height: 34,
                borderRadius: 7,
                cursor: "pointer",
                background: a.hex,
                border: 0,
                boxShadow: on
                  ? "0 0 0 2px rgba(0,0,0,.85), 0 2px 6px rgba(0,0,0,.18)"
                  : "0 0 0 .5px rgba(0,0,0,.15)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
