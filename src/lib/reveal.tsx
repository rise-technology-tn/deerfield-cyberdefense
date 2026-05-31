// Scroll-reveal hook + count-up component (ported from the design handoff).
import { useEffect, useRef, useState } from "react";

// Observe every .reveal in the tree and add .in when it scrolls into view.
// Re-runs whenever `dep` changes (e.g. switching direction re-renders the DOM).
export function useReveals(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const show = (el: Element) => el.classList.add("in");
    if (document.hidden || !("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }
    const vh = window.innerHeight || 800;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.95 && r.bottom > 0) show(el);
      else io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

// Count from 0 → end when the element first enters the viewport.
export function CountUp({ end, duration = 1400, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const reduce =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      if (reduce) {
        setVal(end);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
