"use client";
import { useState, type ChangeEvent } from "react";
import { Nav } from "../components/Nav";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/Footer";
import { PortalModal } from "../components/Modals";
import { Honeypot } from "../components/Honeypot";
import { TweaksPanel } from "../components/TweaksPanel";
import { Icon } from "../lib/icons";
import { postForm } from "../lib/api";
import { useReveals } from "../lib/reveal";
import { useTweaks } from "../lib/tweaks";

const EMAIL_RE = /\S+@\S+\.\S+/;

const CONTACT_INFO = [
  {
    ic: "phone-call",
    k: "24/7 SOC hotline",
    v: "+1 (888) 555-0124",
    d: "Active incident? Reach an analyst now — any hour, any day.",
  },
  {
    ic: "mail",
    k: "General enquiries",
    v: "hello@deerfield-cs.com",
    d: "Sales, partnerships, and security assessments.",
  },
  {
    ic: "lock",
    k: "MySOC Portal",
    v: "Existing customers",
    d: "Live cases, reports and analyst chat — sign in securely.",
  },
];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [f, setF] = useState({ name: "", email: "", company: "", msg: "", website: "" });
  const set = (k: keyof typeof f) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const valid =
    f.name.trim().length > 1 && EMAIL_RE.test(f.email) && f.company.trim().length > 1;

  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setErr("");
    const r = await postForm("/api/contact", {
      name: f.name.trim(),
      email: f.email.trim(),
      company: f.company.trim(),
      message: f.msg.trim(),
      website: f.website,
    });
    setBusy(false);
    if (r.ok) setSent(true);
    else setErr(r.error || "Please try again.");
  };

  if (sent) {
    return (
      <div className="contact-card">
        <div className="modal-success" style={{ padding: "30px 0" }}>
          <div className="ck">
            <Icon name="check" size={30} color="var(--success)" />
          </div>
          <h3>Message received</h3>
          <p>
            Thanks, {f.name.split(" ")[0]}. A Deerfield analyst will respond to <b>{f.email}</b>{" "}
            within one business day. For an active incident, call the 24/7 SOC hotline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <h3>Talk to our SOC</h3>
      <p className="ds-small" style={{ marginBottom: 22 }}>
        Tell us what you're protecting. No obligation.
      </p>
      <div className="modal-bd" style={{ padding: 0, gap: 15 }}>
        <div className="row2">
          <div className="fieldset">
            <label>Full name</label>
            <input value={f.name} onChange={set("name")} placeholder="Jane Mercer" maxLength={120} />
          </div>
          <div className="fieldset">
            <label>Work email</label>
            <input
              type="email"
              value={f.email}
              onChange={set("email")}
              placeholder="you@company.com"
              maxLength={254}
            />
          </div>
        </div>
        <div className="fieldset">
          <label>Company</label>
          <input
            value={f.company}
            onChange={set("company")}
            placeholder="Acme Corporation"
            maxLength={120}
          />
        </div>
        <div className="fieldset">
          <label>How can we help?</label>
          <textarea
            className="ta"
            value={f.msg}
            onChange={set("msg")}
            maxLength={4000}
            placeholder="Tell us about your environment and what you need covered."
          />
        </div>
        <Honeypot value={f.website} onChange={(v) => setF({ ...f, website: v })} />
        {err && (
          <p className="modal-note" style={{ color: "var(--brand-red)" }}>
            {err}
          </p>
        )}
        <button
          className="btn btn-primary btn-block btn-lg"
          disabled={!valid || busy}
          style={{
            opacity: valid && !busy ? 1 : 0.5,
            cursor: valid && !busy ? "pointer" : "not-allowed",
            marginTop: 4,
          }}
          onClick={submit}
        >
          {busy ? (
            <>
              <Icon name="loader" size={17} /> Sending…
            </>
          ) : (
            <>
              Send message <Icon name="arrow-right" size={17} />
            </>
          )}
        </button>
        <p className="modal-note">We'll never share your details.</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [t] = useTweaks();
  const [portal, setPortal] = useState(false);
  useReveals(t.theme);

  return (
    <>
      <Nav active="contact" />
      <PageHero
        crumb="Contact us"
        eyebrow="Talk to our SOC"
        title="Reach the people who never stop watching."
        lede="Whether you're scoping a managed security operation or responding to a live incident, you'll talk to an analyst — not a queue."
      />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="reveal">
            <ContactForm />
          </div>
          <div className="contact-info reveal" style={{ transitionDelay: ".08s" }}>
            {CONTACT_INFO.map((c) => (
              <div className="ci-item" key={c.k}>
                <div className="ci-ic">
                  <Icon name={c.ic} size={21} />
                </div>
                <div>
                  <div className="k">{c.k}</div>
                  <div className="v">{c.v}</div>
                  <div className="d">{c.d}</div>
                </div>
              </div>
            ))}
            <div className="ci-item" style={{ alignItems: "center" }}>
              <div className="ci-ic">
                <Icon name="activity" size={21} />
              </div>
              <div>
                <div className="k">SOC status</div>
                <div className="v" style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--success)",
                      boxShadow: "0 0 0 3px var(--success-tint)",
                    }}
                  />
                  All systems operational
                </div>
                <div className="d">Continuous 24/7/365 coverage · since 2008.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <PortalModal open={portal} onClose={() => setPortal(false)} />
      <TweaksPanel />
    </>
  );
}
