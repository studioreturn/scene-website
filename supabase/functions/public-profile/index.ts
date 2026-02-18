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
      .select("id, username, display_name, bio, avatar_url")
      .eq("username", username)
      .single();

    if (profileError || !profile) {
      return json({ error: "Profile not found" }, 404);
    }

    // ── 2. Attended gigs ────────────────────────────────────────────────────
    // Join attendances → gigs, ordered by gig date descending.
    const { data: attendances } = await supabase
      .from("attendances")
      .select("gigs(id, artist_name, venue_name, date)")
      .eq("user_id", profile.id);

    type GigRow = { id: string; artist_name: string; venue_name: string; date: string };

    const allGigs: GigRow[] = (attendances ?? [])
      .map((a: { gigs: GigRow | null }) => a.gigs)
      .filter((g): g is GigRow => g !== null)
      // Sort by date descending
      .sort(
        (a: GigRow, b: GigRow) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    // ── 3. Stats ────────────────────────────────────────────────────────────
    const currentYear = new Date().getFullYear();

    const gigCountThisYear = allGigs.filter(
      (g) => new Date(g.date).getFullYear() === currentYear
    ).length;

    // Most visited venue across all time
    const venueCounts: Record<string, number> = {};
    for (const gig of allGigs) {
      venueCounts[gig.venue_name] = (venueCounts[gig.venue_name] ?? 0) + 1;
    }
    const mostVisitedVenue =
      Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      undefined;

    // ── 4. Response ─────────────────────────────────────────────────────────
    return json({
      profile: {
        displayName: profile.display_name,
        username: profile.username,
        bio: profile.bio ?? undefined,
        avatarURL: profile.avatar_url ?? undefined,
      },
      // Most recent 5 gigs for the profile card
      gigs: allGigs.slice(0, 5).map((g) => ({
        id: g.id,
        artist: g.artist_name,
        venue: g.venue_name,
        // Trim to YYYY-MM-DD — the site expects a plain date string
        date: g.date.slice(0, 10),
      })),
      stats: {
        gigCountThisYear,
        mostVisitedVenue,
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
