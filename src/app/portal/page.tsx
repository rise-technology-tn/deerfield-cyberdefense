import type { Metadata } from "next";
import Portal from "../../views/Portal";

export const metadata: Metadata = {
  title: "MySOC Portal",
  description: "Secure customer access to live cases, analyst chat, reports and your security posture.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Portal />;
}
