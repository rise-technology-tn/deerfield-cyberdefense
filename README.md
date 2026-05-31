# Deerfield Cyberdefense — website

A multi-page marketing site for Deerfield Cyberdefense (a Managed Security
Services Provider / 24-7 SOC), built from the Claude Design handoff. Faithful
recreation of the design system, implemented in **React via Next.js (App
Router)** and hardened against common web attacks.

## Pages

- `/` — Home (hero with 3 switchable layouts, live SOC feed, four pillars, interactive console, stats, CTA)
- `/about` — authority story, timeline, operating principles
- `/services` — the four service pillars in detail + console
- `/faq` — interactive accordion
- `/contact` — validated contact form + SOC contact cards
- `/portal` — MySOC secure-login surface (UI simulation)

A floating **Tweaks** panel switches **theme** (Light / Obsidian),
**accent** (Red / Cobalt / Titanium), and, on the home page, the hero **layout**
(Ops / Blueprint / Monolith). Choices persist via `localStorage` and apply on
first paint (no flash).

## Run

```bash
npm install
npm run dev      # http://localhost:3000

npm run build    # production build
npm start        # serve the production build
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run audit`.

## Security

This build prioritizes resistance to web attacks: a strict nonce-based CSP, a
full security-header set, self-hosted assets (no CDN/supply-chain surface),
server-side validated + rate-limited + honeypot-protected forms, and XSS-safe
rendering. See **[SECURITY.md](./SECURITY.md)** for the full threat model and
control mapping.

## Structure

```
src/
  middleware.ts        per-request CSP nonce
  app/                 Next.js routes (server) + /api form handlers
    layout.tsx         root layout, no-flash theme bootstrap (nonced)
    api/contact|assessment/route.ts
  views/               page bodies (client components; NOT `src/pages`, which
                       Next reserves for the legacy Pages Router)
  components/          Nav, Footer, Heroes, Pillars, Console, Modals, …
  lib/                 icons, data, tweak context, reveal hooks, api client
    server/            server-only security helpers (rate limit, validation)
  styles/              design tokens + app/pages/theme CSS (from the handoff)
public/
  fonts/  assets/      self-hosted fonts and logo
  .well-known/security.txt, robots.txt
next.config.ts         static security headers
```

## Notes

- The live SOC feed, console panels, and portal dashboard are **illustrative**
  (no live backend / no real data).
- Forms post to same-origin API routes; with no backend reachable they degrade
  gracefully so the UI still completes.
