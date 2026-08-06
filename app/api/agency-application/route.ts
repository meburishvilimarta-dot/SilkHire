import { NextResponse } from 'next/server';
import { agencyApplicationSchema } from '@/lib/schemas/agencyApplication';

export const runtime = 'nodejs';

/**
 * Receives an application from an agency that wants to be listed.
 *
 * Like the client brief route, this validates and logs. Nothing is stored.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const result = agencyApplicationSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', issues: result.error.issues },
      { status: 422 },
    );
  }

  const application = result.data;

  // Honeypot filled — a bot. Look successful, keep nothing.
  if (application.fax) {
    return NextResponse.json({ ok: true });
  }

  // ---------------------------------------------------------------------
  // TODO: PLUG IN THE FORM BACKEND HERE.
  //
  // Same options as `app/api/client-brief/route.ts`. Applications usually
  // want a different destination from client briefs — a vetting queue or a
  // dedicated inbox rather than the sales pipeline — so keep the two routes
  // pointed at different places.
  //
  // See README.md → "Where to plug in the form backend".
  // ---------------------------------------------------------------------

  console.info('[agency-application] received', {
    agencyName: application.agencyName,
    email: application.email,
    country: application.country,
    teamSize: application.teamSize,
    categories: application.categories,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
