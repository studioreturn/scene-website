import Image from "next/image";

/** Converts an ISO 3166-1 alpha-2 country code to its flag emoji */
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}
import type { PublicProfileResponse } from "@/lib/types";
import GigList from "./GigList";
import RatingHistogram from "./RatingHistogram";
import OpenInAppButton from "./OpenInAppButton";
import AppStoreButton from "./AppStoreButton";

interface ProfileCardProps {
  data: PublicProfileResponse;
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const { profile, gigs, stats } = data;

  const statColumns = [
    { value: stats.gigCountThisYear, label: "Gigs this year", large: true },
    ...(stats.mostVisitedVenue
      ? [{ value: stats.mostVisitedVenue, label: "Top venue", large: false }]
      : []),
    ...(stats.topGenre
      ? [{ value: stats.topGenre, label: "Top genre", large: false }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-scene-bg px-4 pt-8 pb-16">
      <div className="max-w-sm mx-auto">

        {/* ── Avatar + name + URL pill ── */}
        <div className="flex flex-col items-center text-center gap-2 mb-4">
          {/* Avatar with optional tier pip badge */}
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 bg-scene-surface flex items-center justify-center">
              {profile.avatarURL ? (
                <Image
                  src={profile.avatarURL}
                  alt={`${profile.displayName}'s avatar`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-white text-3xl font-bold select-none">
                  {profile.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {/* Pip badge */}
            {profile.tier && (
              <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center ring-2 ring-scene-bg">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-black" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-white font-bold text-xl leading-tight">
            {profile.displayName}
          </h1>

          {/* Tier badge */}
          {profile.tier && (
            <div className="inline-flex items-center gap-1 bg-white text-black text-[10px] font-medium tracking-wide rounded-full px-2.5 py-0.5">
              <svg
                viewBox="0 0 24 24"
                className="w-2.5 h-2.5 fill-black flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {profile.tier === "alpha" ? "Alpha" : "Beta"} user
            </div>
          )}

          {/* User number + joined date */}
          {profile.userNumber !== undefined && (
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-scene-muted text-xs">
                {profile.country && (
                  <span className="mr-1">{countryFlag(profile.country)}</span>
                )}
                Scene user #{profile.userNumber}
              </p>
              {profile.joinedAt && (
                <p className="text-scene-muted text-xs">
                  Joined{" "}
                  {new Date(profile.joinedAt).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          )}

          {/* URL pill */}
          <div className="inline-flex items-center gap-1 bg-scene-surface border border-scene-border rounded-full px-3 py-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 text-scene-muted flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="text-scene-muted text-xs">
              ourscene.uk/{profile.username}
            </span>
          </div>

          {profile.bio && (
            <p className="text-scene-muted text-xs max-w-xs leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* ── Stats card ── */}
        {statColumns.length > 0 && (
          <div className="bg-scene-surface border border-scene-border rounded-2xl p-3 mb-3">
            <div className="flex divide-x divide-scene-border items-center">
              {statColumns.map((col, i) => (
                <div
                  key={i}
                  className={`flex-1 text-center ${i === 0 ? "pr-3" : i === statColumns.length - 1 ? "pl-3" : "px-3"}`}
                >
                  <p
                    className={`text-white font-bold leading-tight truncate ${
                      col.large ? "text-2xl" : "text-sm"
                    }`}
                  >
                    {col.value}
                  </p>
                  <p className="text-scene-muted text-[10px] mt-0.5">{col.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Rating histogram (shown only once backend sends ratingDistribution) ── */}
        {stats.ratingDistribution && (
          <RatingHistogram distribution={stats.ratingDistribution} />
        )}

        {/* ── Gig list fading into CTAs ── */}
        {gigs.length > 0 && (
          <>
            {/*
             * Ticket container: gradient anchors to THIS div's bottom edge,
             * so it always sits over the last ticket regardless of CTA height.
             */}
            <div className="relative">
              <GigList gigs={gigs} maxGigs={3} />
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: 220,
                  background:
                    "linear-gradient(to bottom, transparent 0%, #000000 65%)",
                }}
              />
            </div>

            {/* CTAs pulled up with negative margin to overlap the gradient */}
            <div className="relative z-10 -mt-4 flex flex-col items-center gap-3">
              <OpenInAppButton username={profile.username} className="w-full" />
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-scene-border" />
                <span className="text-scene-muted text-xs">or</span>
                <div className="flex-1 h-px bg-scene-border" />
              </div>
              <AppStoreButton className="w-full" />
            </div>
          </>
        )}

        {/* ── Footer ── */}
        <p className="mt-6 text-scene-muted text-xs text-center">
          <a href="/" className="hover:text-white transition-colors">
            What is Scene?
          </a>
        </p>

      </div>
    </div>
  );
}
