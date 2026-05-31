"use client";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Heroes";
import { Authority } from "../components/Authority";
import { Pillars } from "../components/Pillars";
import { Console } from "../components/Console";
import { StatsBand } from "../components/StatsBand";
import { CtaBand } from "../components/CtaBand";
import { SiteFooter } from "../components/Footer";
import { AssessmentModal, PortalModal } from "../components/Modals";
import { TweaksPanel } from "../components/TweaksPanel";
import { useReveals } from "../lib/reveal";
import { useTweaks } from "../lib/tweaks";

export default function Home() {
  const [t] = useTweaks();
  const [portal, setPortal] = useState(false);
  const [assess, setAssess] = useState(false);

  const direction = t.direction;
  useReveals(direction + t.theme);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [direction]);

  return (
    <>
      <Nav active="home" />
      <Hero direction={direction} onPortal={() => setPortal(true)} onAssess={() => setAssess(true)} />
      <Authority />
      <Pillars direction={direction} onAssess={() => setAssess(true)} />
      <Console />
      <StatsBand />
      <CtaBand onPortal={() => setPortal(true)} onAssess={() => setAssess(true)} />
      <SiteFooter />

      <AssessmentModal open={assess} onClose={() => setAssess(false)} />
      <PortalModal open={portal} onClose={() => setPortal(false)} />

      <TweaksPanel showDirection />
    </>
  );
}
