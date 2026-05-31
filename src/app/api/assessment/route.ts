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
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(120),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(`assessment:${ip}`, 5, 10 * 60 * 1000)) return tooMany();

  const body = await readJsonLimited(req);
  if (!body) return badRequest();

  const parsed = schema.safeParse(body);
  if (!parsed.success) return badRequest();

  if (parsed.data.website) return ok();

  console.log(`[form:assessment] from=${redactEmail(parsed.data.email)} company=${JSON.stringify(parsed.data.company)}`);
  return ok();
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
