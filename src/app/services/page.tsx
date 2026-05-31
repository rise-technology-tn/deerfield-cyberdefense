import type { Metadata } from "next";
import Services from "../../views/Services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Four pillars, one operation, under one SLA — Security Operations (M-SOC), Incident Handling (CSIRT), Vulnerability Management, and Engineering & Consulting.",
};

export default function Page() {
  return <Services />;
}
