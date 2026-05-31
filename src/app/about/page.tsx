import type { Metadata } from "next";
import About from "../../views/About";

export const metadata: Metadata = {
  title: "About us",
  description:
    "A network of Cyber Security Operations Centers operating 24/7 since 2008 — protecting enterprise infrastructure on-premise and in the cloud.",
};

export default function Page() {
  return <About />;
}
