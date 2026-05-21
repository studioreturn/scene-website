"use client";

import { useState, useMemo } from "react";
import type { SceneGig } from "@/lib/types";
import GigStub from "./GigStub";

interface GigListProps {
  gigs: SceneGig[];
  maxGigs?: number;
}

export default function GigList({ gigs, maxGigs = 3 }: GigListProps) {
  const [tab, setTab] = useState<"top" | "recent">("top");

  const displayed = useMemo(() => {
    if (tab === "top") {
      const rated = gigs.filter((g) => g.rating !== undefined);
      // If no rated gigs yet, fall back to date order so the list isn't empty
      const source = rated.length > 0 ? rated : gigs;
      return [...source]
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        .slice(0, maxGigs);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [...gigs]
      .filter((g) => new Date(g.date) <= today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxGigs);
  }, [gigs, tab, maxGigs]);

  return (
    <div>
      {/* Tab toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("top")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "top"
              ? "bg-white text-black"
              : "bg-transparent text-scene-muted border border-scene-border"
          }`}
        >
          Top Rated
        </button>
        <button
          onClick={() => setTab("recent")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "recent"
              ? "bg-white text-black"
              : "bg-transparent text-scene-muted border border-scene-border"
          }`}
        >
          Recent
        </button>
      </div>

      <div className="space-y-3">
        {displayed.map((gig) => (
          <GigStub key={gig.id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
