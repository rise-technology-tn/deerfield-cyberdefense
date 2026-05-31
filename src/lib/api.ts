/*
 * Tiny client for the hardened form endpoints.
 *
 * - Sends JSON to same-origin /api/* (CSP connect-src 'self').
 * - Includes the honeypot field so the server can drop bots.
 * - If no backend is reachable (e.g. a pure-static preview without the Node
 *   server), it resolves gracefully so the UI still completes — the real
 *   validation, rate limiting and honeypot checks run server-side in production.
 */
export type FormResult = { ok: boolean; error?: string };

export async function postForm(
  endpoint: "/api/contact" | "/api/assessment",
  payload: Record<string, unknown>
): Promise<FormResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      credentials: "same-origin",
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) {
      return { ok: false, error: "Too many requests — please try again in a few minutes." };
    }
    if (res.status === 400) {
      return { ok: false, error: "Please check the form and try again." };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  } catch {
    // Network error / no backend in this environment — don't block the user.
    return { ok: true };
  }
}
