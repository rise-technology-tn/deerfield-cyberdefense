import Link from "next/link";

export function SiteFooter() {
  const cols = [
    {
      h: "Services",
      links: [
        ["Security Operations (M-SOC)", "/services"],
        ["Incident Handling (CSIRT)", "/services"],
        ["Vulnerability Management", "/services"],
        ["Engineering & Consulting", "/services"],
      ],
    },
    {
      h: "Company",
      links: [
        ["About us", "/about"],
        ["FAQ's", "/faq"],
        ["Contact us", "/contact"],
        ["MySOC Portal", "/portal"],
      ],
    },
    {
      h: "Operations",
      links: [
        ["24/7 SOC network", "/about"],
        ["CERT partners", "/about"],
        ["Compliance (ISO · NIS-2)", "/services"],
        ["Status", "/portal"],
      ],
    },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="footer-logo" href="/" aria-label="Deerfield Cyberdefense">
              <img className="brand-mark" src="/assets/logo-mark-transparent.png" alt="" />
              <span className="brand-wm">
                <b>DEERFIELD</b>
                <i>Cyberdefense</i>
              </span>
            </Link>
            <p>
              Managed Security Services for enterprises that can't afford to look away. A 24/7
              SOC network — real analysts, measurable response, on-premise and in the cloud.
            </p>
          </div>
          {cols.map((c) => (
            <div className="fcol" key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map((l) => (
                <Link key={l[0] + l[1]} href={l[1]}>
                  {l[0]}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bot">
          <span className="cp">Copyright © 2008–2026 — Deerfield Cyberdefense</span>
          <span className="status">
            <span className="d" /> All systems operational · SOC online
          </span>
        </div>
      </div>
    </footer>
  );
}
