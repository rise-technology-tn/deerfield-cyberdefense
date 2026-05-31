import type { Metadata } from "next";
import Contact from "../../views/Contact";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to our SOC. Scope a managed security operation or reach an analyst during a live incident — 24/7.",
};

export default function Page() {
  return <Contact />;
}
