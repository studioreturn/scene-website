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
    const sorted = [...gigs];
    if (tab === "top") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return sorted.slice(0, maxGigs);
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
