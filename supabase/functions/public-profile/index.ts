import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string") {
      return json({ error: "username is required" }, 400);
    }

    // Service role key bypasses RLS — needed because attendances RLS
    // only allows users to read their own rows.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ── 1. Profile ──────────────────────────────────────────────────────────
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, display_name, bio, avatar_url, user_number, tier, country, created_at")
      .eq("username", username)
      .single();

    if (profileError || !profile) {
      return json({ error: "Profile not found" }, 404);
    }

    // ── 2. Attended gigs (with per-attendance rating) ────────────────────────
    const { data: attendances } = await supabase
      .from("attendances")
      .select("rating, gigs(id, artist_name, venue_name, date, genre)")
      .eq("user_id", profile.id);

    type GigRow = {
      id: string;
      artist_name: string;
      venue_name: string;
      date: string;
      genre: string | null;
    };

    type AttendanceRow = {
      rating: number | null;
      gigs: GigRow | null;
    };

    const allGigsWithRating = (attendances as AttendanceRow[] ?? [])
      .filter((a): a is AttendanceRow & { gigs: GigRow } => a.gigs !== null)
      .map((a) => ({ ...a.gigs, rating: a.rating }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // ── 3. Stats ────────────────────────────────────────────────────────────
    const currentYear = new Date().getFullYear();

    const gigCountThisYear = allGigsWithRating.filter(
      (g) => new Date(g.date).getFullYear() === currentYear
    ).length;

    // Most visited venue (all time)
    const venueCounts: Record<string, number> = {};
    for (const gig of allGigsWithRating) {
      venueCounts[gig.venue_name] = (venueCounts[gig.venue_name] ?? 0) + 1;
    }
    const mostVisitedVenue =
      Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      undefined;

    // Top genre (most common genre across attended gigs)
    const genreCounts: Record<string, number> = {};
    for (const gig of allGigsWithRating) {
      if (gig.genre) {
        genreCounts[gig.genre] = (genreCounts[gig.genre] ?? 0) + 1;
      }
    }
    const topGenre =
      Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      undefined;

    // Rating distribution (only rated gigs)
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let hasAnyRating = false;
    for (const gig of allGigsWithRating) {
      if (gig.rating !== null && gig.rating >= 1 && gig.rating <= 5) {
        dist[gig.rating as 1 | 2 | 3 | 4 | 5]++;
        hasAnyRating = true;
      }
    }
    const ratingDistribution = hasAnyRating ? dist : undefined;

    // ── 4. Response ─────────────────────────────────────────────────────────
    return json({
      profile: {
        displayName: profile.display_name,
        username: profile.username,
        bio: profile.bio ?? undefined,
        avatarURL: profile.avatar_url ?? undefined,
        userNumber: profile.user_number ?? undefined,
        tier: profile.tier ?? undefined,
        country: profile.country ?? undefined,
        joinedAt: profile.created_at ?? undefined,
      },
      // Return enough gigs for both Top Rated and Recent tabs to have good candidates.
      // Frontend slices to 3 per tab after sorting.
      gigs: allGigsWithRating.slice(0, 20).map((g) => ({
        id: g.id,
        artist: g.artist_name,
        venue: g.venue_name,
        date: g.date.slice(0, 10),
        rating: g.rating ?? undefined,
      })),
      stats: {
        gigCountThisYear,
        mostVisitedVenue,
        topGenre,
        ratingDistribution,
      },
    });
  } catch (err) {
    console.error("[public-profile]", err);
    return json({ error: "Internal server error" }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
