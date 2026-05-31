import Link from "next/link";
import { Icon } from "../lib/icons";

type Props = {
  crumb: string;
  eyebrow?: string;
  title: string;
  lede?: string;
};

// Shared inner-page banner.
export function PageHero({ crumb, eyebrow, title, lede }: Props) {
  return (
    <section className="pagehero">
      <div className="glow" />
      <div className="wrap">
        <p className="crumb">
          <Link href="/">Home</Link> <Icon name="chevron-right" size={13} /> {crumb}
        </p>
        {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
        <h1 className="reveal" style={{ marginTop: eyebrow ? 20 : 0 }}>
          {title}
        </h1>
        {lede && (
          <p className="lede reveal" style={{ transitionDelay: ".06s" }}>
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
