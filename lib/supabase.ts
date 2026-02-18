import type { PublicProfileResponse } from "./types";

const SUPABASE_FUNCTION_URL =
  "https://pppynzuccijjqydhtjgu.supabase.co/functions/v1/public-profile";

// Read the anon key from the environment. Set SUPABASE_ANON_KEY in:
//   - .env.local for local development
//   - Vercel → Project → Settings → Environment Variables for production
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

// ---------------------------------------------------------------------------
// MOCK DATA
// Set MOCK_MODE = true to use local mock data instead of the Edge Function.
// Useful during local development before the Edge Function is deployed.
// ---------------------------------------------------------------------------
const MOCK_MODE = false;

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
