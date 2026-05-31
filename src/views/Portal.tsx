"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "../components/Nav";
import { TweaksPanel } from "../components/TweaksPanel";
import { Icon } from "../lib/icons";

const EMAIL_RE = /\S+@\S+\.\S+/;

function LoginCard() {
  const [f, setF] = useState({ email: "", pw: "" });
  const [stage, setStage] = useState<"form" | "auth" | "done">("form");
  const valid = EMAIL_RE.test(f.email) && f.pw.length >= 1;

  // Credentials are NEVER sent to the marketing site/API. A real deployment
  // would hand off to the isolated MySOC identity provider over its own origin.
  const submit = () => {
    if (!valid) return;
    setStage("auth");
    setTimeout(() => setStage("done"), 1100);
  };

  if (stage === "done") {
    return (
      <div className="login-card">
        <div
          className="modal-success"
          style={{ padding: "30px 0", alignItems: "flex-start", textAlign: "left" }}
        >
          <div className="ck">
            <Icon name="shield-check" size={30} color="var(--success)" />
          </div>
          <h3>Access granted</h3>
          <p>
            Welcome back. Establishing a secure session to your SOC tenant — live cases, analyst
            chat and reports are loading.
          </p>
          <Link className="btn btn-primary btn-lg" href="/portal" style={{ marginTop: 6 }}>
            Open dashboard <Icon name="arrow-right" size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-card">
      <span className="secure">
        <Icon name="lock" size={13} /> TLS · SSO enabled
      </span>
      <h1>Sign in to MySOC</h1>
      <p className="sub">Secure customer access to live cases, reports and your analyst team.</p>
      <div className="fieldset">
        <label>Work email</label>
        <input
          type="email"
          autoComplete="username"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
          placeholder="you@company.com"
        />
      </div>
      <div className="fieldset">
        <label>Password</label>
        <input
          type="password"
          autoComplete="current-password"
          value={f.pw}
          onChange={(e) => setF({ ...f, pw: e.target.value })}
          placeholder="••••••••"
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
      </div>
      <div className="row-between">
        <label className="check">
          <input type="checkbox" /> Keep me signed in
        </label>
        <Link href="/portal">Forgot password?</Link>
      </div>
      <button
        className="btn btn-primary btn-block btn-lg"
        disabled={!valid || stage === "auth"}
        style={{ opacity: valid ? 1 : 0.5, cursor: valid ? "pointer" : "not-allowed" }}
        onClick={submit}
      >
        {stage === "auth" ? (
          <>
            <Icon name="loader" size={17} /> Authenticating…
          </>
        ) : (
          <>
            Enter portal <Icon name="arrow-right" size={17} />
          </>
        )}
      </button>
      <div className="modal-sso">
        <span className="ln" />
        <span>or continue with SSO</span>
        <span className="ln" />
      </div>
      <div className="sso-btns">
        <button onClick={submit}>Okta</button>
        <button onClick={submit}>Microsoft Entra</button>
      </div>
    </div>
  );
}

export default function Portal() {
  const perks = [
    "Live security cases, updated in real time",
    "Direct analyst chat with your SOC team",
    "Reports, posture scores & audit-ready evidence",
    "Compliance coverage — ISO 27001 · NIS-2",
  ];
  return (
    <div className="portal-page">
      <div className="portal-bar">
        <div className="wrap" style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Logo />
          <Link className="back" href="/">
            <Icon name="arrow-left" size={15} /> Back to site
          </Link>
        </div>
      </div>
      <div className="portal-body">
        <div className="wrap">
          <div className="login-wrap">
            <LoginCard />
            <div className="login-aside">
              <p className="la-eyebrow">MySOC Portal</p>
              <h2>Your security operation, in one secure place.</h2>
              <p>
                The same console our analysts use to watch your environment — now in your hands,
                24/7.
              </p>
              <ul className="la-list">
                {perks.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={18} /> {p}
                  </li>
                ))}
              </ul>
              <div className="la-status">
                <span className="d" /> All systems operational · SOC online
              </div>
            </div>
          </div>
        </div>
      </div>
      <TweaksPanel />
    </div>
  );
}
