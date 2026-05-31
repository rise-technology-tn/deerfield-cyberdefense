/*
 * Server-only security helpers for the form route handlers.
 * (Imported only from /app/api/* — never shipped to the client.)
 */
import { NextResponse } from "next/server";

// In-memory sliding-window rate limiter. Per-process only: behind multiple
// serverless instances, back this with a shared store (Redis/Upstash). See SECURITY.md.
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const since = now - windowMs;
  const hits = (buckets.get(key) || []).filter((t) => t > since);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

// Opportunistically drop stale buckets so the Map can't grow unbounded.
const sweep = setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [k, v] of buckets) {
    const fresh = v.filter((t) => t > cutoff);
    if (fresh.length) buckets.set(k, fresh);
    else buckets.delete(k);
  }
}, 30 * 60 * 1000);
// Don't keep the process alive just for the sweep (Node only).
(sweep as { unref?: () => void }).unref?.();

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Read at most `maxBytes` of JSON; reject anything larger or malformed.
export async function readJsonLimited(
  req: Request,
  maxBytes = 8 * 1024
): Promise<Record<string, unknown> | null> {
  const len = Number(req.headers.get("content-length") || "0");
  if (len > maxBytes) return null;
  const text = await req.text();
  if (text.length > maxBytes) return null;
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const tooMany = () =>
  NextResponse.json(
    { ok: false, error: "Too many requests. Please try again later." },
    { status: 429 }
  );

export const badRequest = () =>
  NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });

export const ok = () => NextResponse.json({ ok: true });

// Redact an email for logs: j***@company.com
export const redactEmail = (e: string) => e.replace(/(^.).*(@.*$)/, "$1***$2");
