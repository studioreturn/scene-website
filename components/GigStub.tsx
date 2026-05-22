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
          className={`w-2.5 h-2.5 flex-shrink-0 ${
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

// ── Decorative barcode ────────────────────────────────────────────────────────
const BAR_H = [3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 2, 1, 1, 3, 2];
const GAP_H = [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2];

const BARCODE_BARS: { y: number; h: number }[] = [];
let _y = 0;
for (let i = 0; i < BAR_H.length; i++) {
  BARCODE_BARS.push({ y: _y, h: BAR_H[i] });
  _y += BAR_H[i] + GAP_H[i];
}
const BARCODE_TOTAL_H = _y;
// ─────────────────────────────────────────────────────────────────────────────

const STUB_W = 44;
const NOTCH_D = 18;

export default function GigStub({ gig }: GigStubProps) {
  return (
    <div
      className="relative rounded-2xl"
      style={{ border: "1px solid #2C2C2E" }}
    >
      {/* Notch circles */}
      <div
        className="absolute rounded-full z-10 pointer-events-none"
        style={{
          width: NOTCH_D, height: NOTCH_D, backgroundColor: "#000000",
          top: 0, right: STUB_W,
          transform: "translateX(50%) translateY(-50%)",
        }}
      />
      <div
        className="absolute rounded-full z-10 pointer-events-none"
        style={{
          width: NOTCH_D, height: NOTCH_D, backgroundColor: "#000000",
          bottom: 0, right: STUB_W,
          transform: "translateX(50%) translateY(50%)",
        }}
      />

      {/* Inner card */}
      <div
        className="rounded-2xl overflow-hidden flex"
        style={{ backgroundColor: "#1C1C1E" }}
      >
        {/* Main ticket body — relative so barcode can be absolutely positioned */}
        <div className="relative flex-1 px-3 py-3 min-w-0">
          {/* Full-height decorative barcode pinned to the right edge */}
          <div
            className="absolute pointer-events-none"
            style={{ top: 12, bottom: 12, right: 12, width: 11, opacity: 0.22 }}
            aria-hidden="true"
          >
            <svg
              viewBox={`0 0 1 ${BARCODE_TOTAL_H}`}
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%" }}
            >
              {BARCODE_BARS.map(({ y, h }, i) => (
                <rect key={i} x="0" y={y} width="1" height={h} fill="white" />
              ))}
            </svg>
          </div>

          {/* Text content — right padding avoids overlapping the barcode */}
          <div className="pr-4">
            <p className="text-white font-bold text-[14px] leading-snug truncate">
              {gig.artist}
            </p>
            <p className="text-[#8E8E93] text-xs mt-0.5 truncate">
              {gig.venue}
            </p>
          </div>

          <div className="flex items-center gap-1.5 mt-2 pr-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-[#636366] flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            <span className="text-[#8E8E93] text-xs">{formatDate(gig.date)}</span>
            {gig.rating !== undefined && (
              <div className="ml-1">
                <StarRating rating={gig.rating} />
              </div>
            )}
          </div>
        </div>

        {/* Perforated stub */}
        <div
          className="relative flex-shrink-0 flex flex-col items-center justify-between py-3"
          style={{ width: STUB_W }}
        >
          {/* Perforation dashes */}
          <div
            className="absolute inset-y-0"
            style={{
              left: 0,
              width: 1,
              background:
                "repeating-linear-gradient(to bottom, #000000 0px, #000000 4px, transparent 4px, transparent 9px)",
            }}
          />
          {/* Music note */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-[#636366]"
            aria-hidden="true"
          >
            <path d="M9 3v11.5a3.5 3.5 0 1 0 1 2.45V8h5V3H9z" />
          </svg>
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
