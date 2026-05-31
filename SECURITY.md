# Security overview — Deerfield Cyberdefense site

This site is built to be hardened against the common web-application attack
classes (OWASP Top 10) while remaining a fast, mostly-static marketing site.
Below is the threat model and the concrete control for each item.

## Transport & headers

| Control | Where | What it stops |
|---|---|---|
| **Content-Security-Policy** (nonce + `strict-dynamic`) | `src/middleware.ts` | XSS / script injection. Only Next's nonce'd scripts run; no inline-script or third-party script can execute. |
| **HSTS** `max-age=2y; includeSubDomains; preload` | `next.config.ts` | Protocol-downgrade / SSL-strip MITM. |
| **X-Frame-Options: DENY** + CSP `frame-ancestors 'none'` | both | Clickjacking / UI redress. |
| **X-Content-Type-Options: nosniff** | `next.config.ts` | MIME-sniffing drive-by execution. |
| **Referrer-Policy: strict-origin-when-cross-origin** | both | Referrer leakage to third parties. |
| **Permissions-Policy** (camera/mic/geo/etc. all off) | `next.config.ts` | Abuse of powerful browser features. |
| **Cross-Origin-Opener/Resource-Policy: same-origin** | `next.config.ts` | Cross-origin window / resource attacks (Spectre-class). |
| `poweredByHeader: false` | `next.config.ts` | Framework fingerprinting. |

The CSP is intentionally strict:
`default-src 'self'; script-src 'self' 'nonce-…' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests`.
`style-src` allows inline styles only (React style attributes) — never inline scripts.

## No third-party supply chain on the page

All fonts (`/public/fonts`), the logo (`/public/assets`), and icons
(`lucide-react`, bundled) are **self-hosted**. The page loads **zero** external
origins, so there is no CDN to compromise and `script-src` needs no allowlist
beyond `'self'` + nonce.

## Cross-site scripting (XSS)

- React escapes all interpolated content by default.
- There is exactly one `dangerouslySetInnerHTML` in the codebase — the no-flash
  theme bootstrap in `app/layout.tsx`, a **static, trusted constant** carrying no
  user input, served with the request nonce. No user-controlled value is ever
  rendered as HTML.

## Forms (contact + assessment) — `app/api/*`

- **Server-side validation** with `zod` (length caps, email format); the client
  validation is convenience only and never trusted.
- **Honeypot** field (`website`): hidden from users; any submission that fills it
  is silently accepted-and-dropped so bots can't detect the filter.
- **Rate limiting**: 5 submissions / IP / 10 min (`lib/server/security.ts`).
- **Body-size cap**: 8 KB; larger or malformed bodies are rejected.
- **Method allowlist**: only `POST`; `GET` returns 405.
- **No secrets shipped**: submissions are logged with a redacted email; wire your
  CRM/mailer in the route handler for production.

> The rate limiter is in-memory (per process). Behind multiple serverless
> instances, back it with a shared store (e.g. Upstash/Redis) so limits are global.

## MySOC Portal login

The portal login is a UI simulation. **Credentials are never sent to this site or
its API.** A production deployment must hand authentication to the isolated MySOC
identity provider on its own origin (SSO via Okta / Entra), ideally with WebAuthn/MFA.

## Dependency hygiene

- Minimal dependency surface; run `npm run audit` (production deps) in CI.
- No source maps shipped to production (Next default for prod).
- Keep `next` patched — most framework CVEs are fixed in patch releases. This
  build pins **next 15.5.18** (dodges CVE-2025-66478) and adds a `postcss`
  override (`^8.5.10`) so `npm audit --omit=dev` reports **0 vulnerabilities**.
  (The 2 remaining low-severity advisories are dev-only build tooling.)

## Vulnerability disclosure

`/.well-known/security.txt` publishes a security contact (RFC 9116).

## Recommended operational hardening (deploy-time)

- Terminate TLS 1.2+ only; enable OCSP stapling.
- Put the app behind a WAF / DDoS edge (Cloudflare, AWS WAF) for L7 protection.
- Submit the domain to the HSTS preload list once HSTS is verified.
- Set `ALLOWED_ORIGINS` only if you must call the API cross-origin (default: same-origin).
