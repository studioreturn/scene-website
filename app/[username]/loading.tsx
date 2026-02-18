export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-scene-bg flex flex-col items-center justify-start px-4 pt-16 pb-24">
      <div className="w-full max-w-md bg-scene-surface border border-scene-border rounded-card-lg overflow-hidden shadow-2xl animate-pulse">
        {/* Header accent band */}
        <div className="h-2 bg-scene-border w-full" />

        <div className="p-8">
          {/* Avatar skeleton */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-scene-border" />
            <div className="space-y-2 flex flex-col items-center w-full">
              <div className="h-5 bg-scene-border rounded-full w-40" />
              <div className="h-3.5 bg-scene-border rounded-full w-24" />
              <div className="h-3 bg-scene-border rounded-full w-56 mt-2" />
              <div className="h-3 bg-scene-border rounded-full w-48" />
            </div>
          </div>

          {/* Stat pills skeleton */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="h-8 bg-scene-border rounded-full w-32" />
            <div className="h-8 bg-scene-border rounded-full w-40" />
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-scene-border" />

          {/* Gig stubs skeleton */}
          <div className="space-y-3">
            <div className="h-3 bg-scene-border rounded-full w-24" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-scene-border rounded-card"
              />
            ))}
          </div>

          {/* Button skeletons */}
          <div className="mt-8 space-y-3">
            <div className="h-12 bg-scene-border rounded-full" />
            <div className="h-12 bg-scene-border rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
