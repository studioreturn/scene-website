import AppStoreButton from "./AppStoreButton";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      {/* Copy */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
          Your live music life,{" "}
          <span className="text-scene-accent">all in one place</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-scene-muted max-w-lg mx-auto lg:mx-0 text-balance">
          Track every gig, discover what&apos;s on, and share your gig passport
          with friends.
        </p>
        <div className="mt-10 flex justify-center lg:justify-start">
          <AppStoreButton />
        </div>
      </div>

      {/* Phone mockup placeholder */}
      <div className="flex-shrink-0 flex justify-center lg:justify-end">
        <div
          className="relative w-[220px] h-[440px] rounded-[36px] border border-scene-border overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1A1A1A 0%, #0F0F0F 60%, #0A0A0A 100%)",
            boxShadow:
              "0 0 0 1px #333, 0 32px 80px -16px rgba(200,245,58,0.08), 0 16px 40px rgba(0,0,0,0.6)",
          }}
          aria-label="Scene app mockup placeholder"
          role="img"
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-scene-bg rounded-b-2xl" />

          {/* Inner content placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-10 h-10 rounded-xl bg-scene-accent/20 flex items-center justify-center">
              <span className="text-scene-accent text-xl font-bold">S</span>
            </div>
            <div className="w-full space-y-2">
              {[80, 60, 70, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-scene-surface"
                  style={{ width: `${w}%`, margin: "0 auto" }}
                />
              ))}
            </div>
            <div className="mt-4 w-full space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-12 rounded-card bg-scene-surface border border-scene-border"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
