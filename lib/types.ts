export interface SceneProfile {
  displayName: string;
  username: string;
  bio?: string;
  avatarURL?: string;
}

export interface SceneGig {
  id: string;
  artist: string;
  venue: string;
  date: string; // ISO 8601 date string, e.g. "2025-11-14"
}

export interface SceneStats {
  gigCountThisYear: number;
  mostVisitedVenue?: string;
}

export interface PublicProfileResponse {
  profile: SceneProfile;
  gigs: SceneGig[];
  stats: SceneStats;
}
