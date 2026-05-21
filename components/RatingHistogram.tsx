import type { SceneStats } from "@/lib/types";

type Distribution = NonNullable<SceneStats["ratingDistribution"]>;

interface RatingHistogramProps {
  distribution: Distribution;
}

export default function RatingHistogram({ distribution }: RatingHistogramProps) {
  const stars = [1, 2, 3, 4, 5] as const;
  const maxCount = Math.max(...stars.map((s) => distribution[s]), 1);

  return (
    <div className="bg-scene-surface border border-scene-border rounded-2xl p-3 mb-3">
      <div className="flex items-end gap-1.5" style={{ height: 56 }}>
        {stars.map((star) => {
          const count = distribution[star];
          const barHeightPct = count > 0 ? Math.max((count / maxCount) * 100, 8) : 0;

          return (
            <div key={star} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
              {count > 0 && (
                <span className="text-white text-[10px] font-semibold leading-none">
                  {count}
                </span>
              )}
              <div className="w-full flex items-end" style={{ flex: 1 }}>
                {count > 0 ? (
                  <div
                    className="w-full rounded-sm bg-white"
                    style={{ height: `${barHeightPct}%` }}
                  />
                ) : (
                  <div className="w-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Star labels */}
      <div className="flex gap-1.5 mt-1.5">
        {stars.map((star) => (
          <div key={star} className="flex-1 text-center">
            <span className="text-scene-muted text-[10px]">★{star}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
