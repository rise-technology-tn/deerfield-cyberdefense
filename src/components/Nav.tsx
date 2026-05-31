"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "../lib/icons";
import { NAV_LINKS } from "../lib/data";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Deerfield Cyberdefense">
      <img className="brand-mark" src="/assets/logo-mark-transparent.png" alt="" />
      <span className="brand-wm">
        <b>DEERFIELD</b>
        <i>Cyberdefense</i>
      </span>
    </Link>
  );
}

export function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.k} href={l.href} className={active === l.k ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-spacer" />
        <div className="nav-actions">
          <Link className="nav-portal" href="/portal">
            <Icon name="lock" size={15} /> MySOC Portal
          </Link>
        </div>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.k}
              href={l.href}
              className={active === l.k ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link className="nav-portal" href="/portal" onClick={() => setOpen(false)}>
            <Icon name="lock" size={15} /> MySOC Portal
          </Link>
        </div>
      )}
    </header>
  );
}
