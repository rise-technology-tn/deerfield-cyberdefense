import { useEffect, useState } from "react";
import { Icon } from "../lib/icons";
import { Honeypot } from "./Honeypot";
import { postForm } from "../lib/api";

const EMAIL_RE = /\S+@\S+\.\S+/;

type ModalProps = { open: boolean; onClose: () => void };

export function AssessmentModal({ open, onClose }: ModalProps) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ email: "", company: "", website: "" });

  useEffect(() => {
    if (open) {
      setSent(false);
      setBusy(false);
      setErr("");
      setForm({ email: "", company: "", website: "" });
    }
  }, [open]);

  if (!open) return null;
  const valid = EMAIL_RE.test(form.email) && form.company.trim().length > 1;

  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setErr("");
    const r = await postForm("/api/assessment", {
      email: form.email.trim(),
      company: form.company.trim(),
      website: form.website,
    });
    setBusy(false);
    if (r.ok) setSent(true);
    else setErr(r.error || "Please try again.");
  };

  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="modal-hd">
              <button className="x" onClick={onClose} aria-label="Close">
                <Icon name="x" size={17} />
              </button>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Free · No obligation
              </p>
              <h3>Get a security assessment</h3>
              <p>
                Tell us where to send your exposure report. A Deerfield analyst follows up within
                one business day.
              </p>
            </div>
            <div className="modal-bd">
              <div className="fieldset">
                <label>Work email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  maxLength={254}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="fieldset">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Acme Corporation"
                  value={form.company}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <Honeypot value={form.website} onChange={(v) => setForm({ ...form, website: v })} />
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
                    Request my assessment <Icon name="arrow-right" size={17} />
                  </>
                )}
              </button>
              <p className="modal-note">We'll never share your details.</p>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="ck">
              <Icon name="check" size={30} color="var(--success)" />
            </div>
            <h3>Request received</h3>
            <p>
              Thanks — a Deerfield analyst will reach out to <b>{form.email}</b> within one
              business day.
            </p>
            <button className="btn btn-ghost" onClick={onClose} style={{ marginTop: 6 }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function PortalModal({ open, onClose }: ModalProps) {
  if (!open) return null;
  // NOTE: credentials are intentionally NOT sent to the marketing API. A real
  // deployment would redirect to the dedicated, isolated MySOC auth service.
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 430 }}>
        <div className="modal-hd">
          <button className="x" onClick={onClose} aria-label="Close">
            <Icon name="x" size={17} />
          </button>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            <Icon name="lock" size={13} /> M-SOC Portal
          </p>
          <h3>Enter the M-SOC Portal</h3>
          <p>Customer access to live cases, analyst chat, reports, and your security posture.</p>
        </div>
        <div className="modal-bd">
          <div className="fieldset">
            <label>Work email</label>
            <input placeholder="you@company.com" autoComplete="username" />
          </div>
          <div className="fieldset">
            <label>Password</label>
            <input type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={onClose} style={{ marginTop: 4 }}>
            Enter portal <Icon name="arrow-right" size={17} />
          </button>
          <div className="modal-sso">
            <span className="ln" />
            <span>or continue with SSO</span>
            <span className="ln" />
          </div>
          <div className="sso-btns">
            <button onClick={onClose}>Okta</button>
            <button onClick={onClose}>Microsoft Entra</button>
          </div>
        </div>
      </div>
    </div>
  );
}
