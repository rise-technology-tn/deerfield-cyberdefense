import type { Metadata } from "next";
import Faq from "../../views/Faq";

export const metadata: Metadata = {
  title: "FAQ's",
  description:
    "Straight answers about managed security operations — coverage, response times, compliance, and how Deerfield works with your team.",
};

export default function Page() {
  return <Faq />;
}
