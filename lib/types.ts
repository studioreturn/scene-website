export interface SceneProfile {
  displayName: string;
  username: string;
  bio?: string;
  avatarURL?: string;
  userNumber?: number; // signup order — requires backend support
  tier?: "alpha" | "beta"; // requires backend support
  country?: string; // ISO 3166-1 alpha-2, e.g. "GB" — requires backend support
  joinedAt?: string; // ISO date string of signup
}

export interface SceneGig {
  id: string;
  artist: string;
  venue: string;
  date: string; // ISO 8601 date string, e.g. "2025-11-14"
  rating?: number; // 1–5 — requires backend support
}

export interface SceneStats {
  gigCountThisYear: number;
  mostVisitedVenue?: string;
  topGenre?: string; // requires backend support
  ratingDistribution?: { // requires backend support
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface PublicProfileResponse {
  profile: SceneProfile;
  gigs: SceneGig[];
  stats: SceneStats;
}
