"use client";
/*
 * Site tweak state: theme (light / obsidian), accent (red / cobalt / titanium),
 * and home layout direction (ops / arch / mono). Persisted to localStorage and
 * reflected onto <html data-*> so the CSS can skin everything. Shared across all
 * pages via context.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ACCENT_BY_HEX } from "./data";

export type Direction = "ops" | "arch" | "mono";
export type Theme = "light" | "obsidian";

export type Tweaks = {
  direction: Direction;
  accent: string; // hex
  theme: Theme;
};

const DEFAULTS: Tweaks = {
  direction: "ops",
  accent: "#CF1C32",
  theme: "light",
};

const STORAGE_KEY = "df_tweaks";

type SetTweak = <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;

const TweaksContext = createContext<[Tweaks, SetTweak] | null>(null);

function readInitial(): Tweaks {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const next: Tweaks = { ...DEFAULTS };
    if (raw.theme === "light" || raw.theme === "obsidian") next.theme = raw.theme;
    if (raw.direction === "ops" || raw.direction === "arch" || raw.direction === "mono") {
      next.direction = raw.direction;
    }
    if (typeof raw.accent === "string" && ACCENT_BY_HEX[raw.accent.toLowerCase()]) {
      next.accent = raw.accent;
    }
    return next;
  } catch {
    return { ...DEFAULTS };
  }
}

export function TweaksProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<Tweaks>(readInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
    } catch {
      /* storage blocked — purely cosmetic, ignore */
    }
    const el = document.documentElement;
    el.dataset.direction = t.direction;
    el.dataset.accent = ACCENT_BY_HEX[t.accent.toLowerCase()] || "red";
    el.dataset.theme = t.theme;
  }, [t]);

  const value = useMemo<[Tweaks, SetTweak]>(() => {
    const setTweak: SetTweak = (key, val) => setT((prev) => ({ ...prev, [key]: val }));
    return [t, setTweak];
  }, [t]);

  return <TweaksContext.Provider value={value}>{children}</TweaksContext.Provider>;
}

export function useTweaks(): [Tweaks, SetTweak] {
  const ctx = useContext(TweaksContext);
  if (!ctx) throw new Error("useTweaks must be used within <TweaksProvider>");
  return ctx;
}
