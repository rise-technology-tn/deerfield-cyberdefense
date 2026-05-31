import { z } from "zod";
import {
  badRequest,
  getClientIp,
  ok,
  rateLimit,
  readJsonLimited,
  redactEmail,
  tooMany,
} from "../../../lib/server/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(120),
  message: z.string().trim().max(4000).optional().default(""),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) return tooMany();

  const body = await readJsonLimited(req);
  if (!body) return badRequest();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest();

  // Honeypot tripped — pretend success so bots can't tell the difference.
  if (parsed.data.website) return ok();

  // No mail creds are bundled; hand off to your CRM/queue here in production.
  console.log(`[form:contact] from=${redactEmail(parsed.data.email)} company=${JSON.stringify(parsed.data.company)}`);
  return ok();
}

// Only POST is allowed.
export function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
