import type { SceneGig } from "@/lib/types";

interface GigStubProps {
  gig: SceneGig;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GigStub({ gig }: GigStubProps) {
  return (
    <div className="relative bg-scene-surface border border-scene-border rounded-card overflow-hidden flex items-stretch">
      {/* Left accent strip */}
      <div className="w-1 bg-scene-accent flex-shrink-0" />

      {/* Ticket body */}
      <div className="flex-1 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-white font-semibold text-sm leading-tight">
            {gig.artist}
          </p>
          <p className="text-scene-muted text-xs mt-0.5">{gig.venue}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="text-scene-muted text-xs font-mono">
            {formatDate(gig.date)}
          </span>
        </div>
      </div>

      {/* Perforated edge decoration */}
      <div className="flex flex-col justify-around py-3 pr-4 gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-scene-border"
          />
        ))}
      </div>
    </div>
  );
}
