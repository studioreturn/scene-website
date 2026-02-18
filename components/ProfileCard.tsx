import Image from "next/image";
import type { PublicProfileResponse } from "@/lib/types";
import StatPill from "./StatPill";
import GigStub from "./GigStub";
import OpenInAppButton from "./OpenInAppButton";
import AppStoreButton from "./AppStoreButton";

interface ProfileCardProps {
  data: PublicProfileResponse;
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const { profile, gigs, stats } = data;
  // Show the 5 most recent gigs
  const recentGigs = gigs.slice(0, 5);

  return (
    <div className="min-h-screen bg-scene-bg flex flex-col items-center justify-start px-4 pt-16 pb-24">
      {/* Card container */}
      <div className="w-full max-w-md bg-scene-surface border border-scene-border rounded-card-lg overflow-hidden shadow-2xl">
        {/* Header band */}
        <div className="h-2 bg-scene-accent w-full" />

        <div className="p-8">
          {/* Avatar + name */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-scene-accent overflow-hidden bg-scene-bg flex items-center justify-center">
              {profile.avatarURL ? (
                <Image
                  src={profile.avatarURL}
                  alt={`${profile.displayName}'s avatar`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-scene-accent text-3xl font-bold select-none">
                  {profile.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-white font-bold text-2xl leading-tight">
                {profile.displayName}
              </h1>
              <p className="text-scene-muted text-sm mt-0.5">
                @{profile.username}
              </p>
              {profile.bio && (
                <p className="text-scene-muted text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <StatPill
              value={stats.gigCountThisYear}
              label="gigs this year"
            />
            {stats.mostVisitedVenue && (
              <StatPill
                value={stats.mostVisitedVenue}
                label="most visited"
              />
            )}
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-scene-border" />

          {/* Recent gigs */}
          {recentGigs.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-scene-muted text-xs font-semibold uppercase tracking-widest">
                Recent gigs
              </h2>
              {recentGigs.map((gig) => (
                <GigStub key={gig.id} gig={gig} />
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <OpenInAppButton username={profile.username} className="w-full" />
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-scene-border" />
              <span className="text-scene-muted text-xs">or</span>
              <div className="flex-1 h-px bg-scene-border" />
            </div>
            <AppStoreButton className="w-full justify-center text-xs" />
          </div>
        </div>
      </div>

      {/* Footer link */}
      <p className="mt-8 text-scene-muted text-xs">
        <a href="/" className="hover:text-white transition-colors">
          What is Scene?
        </a>
      </p>
    </div>
  );
}
