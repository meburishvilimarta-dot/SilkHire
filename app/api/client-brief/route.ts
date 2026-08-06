import { NextResponse } from 'next/server';
import { clientBriefSchema } from '@/lib/schemas/clientBrief';

export const runtime = 'nodejs';

/**
 * Receives a client brief from the site.
 *
 * Right now this validates the payload and logs it. Nothing is stored — there
 * is no database in this project by design.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Re-validate server-side with the same schema the form uses. The client
  // check is for the user; this one is the one that counts.
  const result = clientBriefSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: result.error.issues },
      { status: 422 },
    );
  }

  const brief = result.data;

  // The honeypot was filled, so this is a bot. Return 200 so it learns
  // nothing, and drop the submission on the floor.
  if (brief.website) {
    return NextResponse.json({ ok: true });
  }

  // ---------------------------------------------------------------------
  // TODO: PLUG IN THE FORM BACKEND HERE.
  //
  // This is the only place a client brief leaves the application. Pick one
  // or more of:
  //
  //   1. Email — send to `siteConfig.contactEmail` with an email API
  //      (Resend, Postmark, SendGrid). Read the key from an env var, never
  //      from source: `process.env.RESEND_API_KEY`.
  //   2. CRM — POST to HubSpot/Pipedrive/Attio, or to a generic webhook in
  //      `process.env.CRM_WEBHOOK_URL`.
  //   3. Spreadsheet or Slack — a Google Sheets append or an incoming
  //      webhook is a perfectly reasonable v1.
  //
  // Whatever you choose: await it, and return a 502 if it fails, so the
  // form shows its error state instead of a false success. Do not log the
  // full payload once this is live — it contains personal data.
  //
  // See README.md → "Where to plug in the form backend".
  // ---------------------------------------------------------------------

  console.info('[client-brief] received', {
    company: brief.company,
    email: brief.email,
    serviceNeeded: brief.serviceNeeded,
    headcount: brief.headcount,
    monthlyBudget: brief.monthlyBudget,
    startTimeline: brief.startTimeline,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
