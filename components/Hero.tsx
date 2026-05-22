import Image from "next/image";
import JoinBetaButton from "./JoinBetaButton";

function PhoneShot({
  src,
  alt,
  width = 210,
}: {
  src: string;
  alt: string;
  width?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ width, height: "auto", display: "block", flexShrink: 0 }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(255,255,255,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ── Copy ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* TestFlight pill */}
          <div className="inline-flex items-center gap-2 bg-scene-surface border border-scene-border rounded-xl pl-1 pr-3 py-1 mb-8">
            <Image
              src="/testflight.png"
              alt="TestFlight"
              width={22}
              height={22}
              className="flex-shrink-0"
            />
            <span className="text-white text-xs font-medium tracking-tight">
              Available on TestFlight
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.0] tracking-[-0.03em] text-balance">
The home of
                <br />
                <span className="text-white/70">live music.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-scene-muted max-w-md mx-auto lg:mx-0 leading-relaxed">
            The shared calendar for all of your gigs. Import or scan tickets automatically, collect stubs and review shows.
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
            <JoinBetaButton className="inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150" />
          </div>

        </div>

        {/* ── Two staggered phones ── */}
        {/* Desktop layout: absolute positioned, large */}
        <div className="flex-shrink-0 relative hidden lg:block" style={{ width: 430, height: 570 }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -60,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", top: 35, left: 10, transform: "rotate(-7deg)", zIndex: 0, opacity: 0.65 }}>
            <PhoneShot src="/screenshots/profile.png" alt="Scene — gig passport" width={230} />
          </div>
          <div style={{ position: "absolute", top: 0, right: 0, transform: "rotate(3deg)", zIndex: 1 }}>
            <PhoneShot src="/screenshots/home.png" alt="Scene — my gigs" width={260} />
          </div>
        </div>

        {/* Mobile / tablet layout: two phones side by side */}
        <div className="lg:hidden flex items-end justify-center gap-0 relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          />
          <div style={{ transform: "rotate(-6deg)", zIndex: 0, opacity: 0.65, marginRight: -24 }}>
            <PhoneShot src="/screenshots/profile.png" alt="Scene — gig passport" width={150} />
          </div>
          <div style={{ transform: "rotate(3deg)", zIndex: 1 }}>
            <PhoneShot src="/screenshots/home.png" alt="Scene — my gigs" width={170} />
          </div>
        </div>
      </div>
    </section>
  );
}
