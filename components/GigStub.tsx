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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-3 h-3 flex-shrink-0 ${
            i <= rating ? "fill-amber-400" : "fill-[#2C2C2E]"
          }`}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Stub width in px — must match the w-11 (44px) inner stub div
const STUB_W = 44;
const NOTCH_D = 18; // notch circle diameter

export default function GigStub({ gig }: GigStubProps) {
  return (
    /*
     * Two-div approach so the border follows the notch cutouts:
     *
     *  ┌─ outer wrapper ──────────────────────────────────────────┐
     *  │  border: 1px solid — NO overflow:hidden                  │
     *  │  Notch circles live here (z-index above border),         │
     *  │  coloured page-bg so they visually erase the border      │
     *  │  at the punch-hole positions.                            │
     *  │                                                          │
     *  │  ┌─ inner card ─────────────────────────────────────┐   │
     *  │  │  overflow:hidden — clips content to rounded rect  │   │
     *  │  │  bg: #1C1C1E                                      │   │
     *  │  └──────────────────────────────────────────────────┘   │
     *  └──────────────────────────────────────────────────────────┘
     */
    <div
      className="relative rounded-2xl"
      style={{ border: "1px solid #2C2C2E" }}
    >
      {/* ── Notch circles on the outer wrapper ── */}
      {/* Centre sits on wrapper's top edge at the divider x-position */}
      <div
        className="absolute rounded-full z-10 pointer-events-none"
        style={{
          width: NOTCH_D,
          height: NOTCH_D,
          backgroundColor: "#0A0A0A",
          top: 0,
          right: STUB_W,
          transform: "translateX(50%) translateY(-50%)",
        }}
      />
      <div
        className="absolute rounded-full z-10 pointer-events-none"
        style={{
          width: NOTCH_D,
          height: NOTCH_D,
          backgroundColor: "#0A0A0A",
          bottom: 0,
          right: STUB_W,
          transform: "translateX(50%) translateY(50%)",
        }}
      />

      {/* ── Inner card — overflow:hidden clips content only ── */}
      <div
        className="rounded-2xl overflow-hidden flex"
        style={{ backgroundColor: "#1C1C1E" }}
      >
        {/* Main ticket body */}
        <div className="flex-1 px-4 py-4 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0 flex-1">
              <p className="text-white font-bold text-base leading-snug truncate">
                {gig.artist}
              </p>
              <p className="text-[#8E8E93] text-[13px] mt-0.5 truncate">
                {gig.venue}
              </p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px] text-[#636366] flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 mt-3">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[14px] h-[14px] text-[#636366] flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            <span className="text-[#8E8E93] text-[13px]">{formatDate(gig.date)}</span>
            {gig.rating !== undefined && (
              <div className="ml-1">
                <StarRating rating={gig.rating} />
              </div>
            )}
          </div>
        </div>

        {/* Perforated stub */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{ width: STUB_W }}
        >
          {/* Dark perforation dashes — page-bg colour = holes in the card */}
          <div
            className="absolute inset-y-0"
            style={{
              left: 0,
              width: 1,
              background:
                "repeating-linear-gradient(to bottom, #0A0A0A 0px, #0A0A0A 4px, transparent 4px, transparent 9px)",
            }}
          />
          <span
            className="text-[#3A3A3C] text-[7px] font-bold tracking-widest select-none"
            style={{ writingMode: "vertical-rl" }}
          >
            ADMIT ONE
          </span>
        </div>
      </div>
    </div>
  );
}
