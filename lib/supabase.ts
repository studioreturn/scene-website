import type { PublicProfileResponse } from "./types";

const SUPABASE_FUNCTION_URL =
  "https://pppynzuccijjqydhtjgu.supabase.co/functions/v1/public-profile";

// TODO: Move this to an environment variable (SUPABASE_ANON_KEY) in production.
// Add SUPABASE_ANON_KEY=<value> to your .env.local and Vercel environment variables.
const SUPABASE_ANON_KEY =
  "sb_publishable_JgxFfMF17caRez2K6C_KBQ_H8BqWVS-";

// ---------------------------------------------------------------------------
// MOCK DATA
// Used while the real Supabase Edge Function is not yet deployed.
// TODO: Remove MOCK_MODE and mock data once the Edge Function is live.
// ---------------------------------------------------------------------------
const MOCK_MODE = true;

const MOCK_PROFILES: Record<string, PublicProfileResponse> = {
  willgreen: {
    profile: {
      displayName: "Will Green",
      username: "willgreen",
      bio: "Chasing bass lines and crowd surges since 2009. 🎸",
      avatarURL: undefined,
    },
    gigs: [
      {
        id: "1",
        artist: "Fontaines D.C.",
        venue: "O2 Academy Bristol",
        date: "2025-11-14",
      },
      {
        id: "2",
        artist: "Black Midi",
        venue: "Thekla, Bristol",
        date: "2025-10-03",
      },
      {
        id: "3",
        artist: "Dry Cleaning",
        venue: "SWX, Bristol",
        date: "2025-09-20",
      },
      {
        id: "4",
        artist: "Squid",
        venue: "Motion, Bristol",
        date: "2025-08-15",
      },
    ],
    stats: {
      gigCountThisYear: 23,
      mostVisitedVenue: "O2 Academy Bristol",
    },
  },
};

// ---------------------------------------------------------------------------
// Real fetch (used when MOCK_MODE is false)
// ---------------------------------------------------------------------------
async function fetchFromEdgeFunction(
  username: string
): Promise<PublicProfileResponse | null> {
  // TODO: Swap MOCK_MODE to false once the Edge Function is deployed at:
  // POST https://pppynzuccijjqydhtjgu.supabase.co/functions/v1/public-profile
  // Body: { "username": "<username>" }
  // Returns: { profile: {...}, gigs: [...], stats: {...} }
  try {
    const res = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ username }),
      // Revalidate at most every 60 seconds (ISR-friendly)
      next: { revalidate: 60 },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Edge Function error: ${res.status}`);

    return (await res.json()) as PublicProfileResponse;
  } catch (err) {
    console.error("[supabase] fetchPublicProfile error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export async function fetchPublicProfile(
  username: string
): Promise<PublicProfileResponse | null> {
  if (MOCK_MODE) {
    // Simulate a small network delay in development
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_PROFILES[username.toLowerCase()] ?? null;
  }

  return fetchFromEdgeFunction(username);
}
