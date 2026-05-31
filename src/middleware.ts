import { NextResponse, type NextRequest } from "next/server";

/*
 * Per-request Content-Security-Policy with a fresh nonce.
 *
 * - script-src uses a nonce + 'strict-dynamic': only scripts Next.js emits with
 *   that nonce (and scripts they load) execute. No inline-script injection works,
 *   which is the strongest practical XSS defense.
 * - style-src allows 'unsafe-inline' because React writes inline style attributes
 *   and Next injects critical CSS; inline STYLES are far lower risk than scripts.
 * - Everything else is self-hosted, so the only origin allowed is 'self'.
 */
export function middleware(request: NextRequest) {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const nonce = btoa(bin);

  const csp = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
      process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'"
    }`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `manifest-src 'self'`,
    `worker-src 'self'`,
    `upgrade-insecure-requests`,
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  // Apply to all routes except Next's static assets (which are immutable and need
  // no nonce). Keeps the CSP on HTML documents and API responses.
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|assets|fonts).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
