import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import AppStoreButton from "@/components/AppStoreButton";
import Link from "next/link";
import dynamic from "next/dynamic";
const BristolMap = dynamic(() => import("@/components/BristolMap"), { ssr: false });

const VENUES = [
  "The Fleece",
  "Trinity",
  "Exchange",
  "The Croft",
  "SWX",
  "Marble Factory",
  "The Prospect Building",
  "Shredenhams",
  "Thekla",
  "Rough Trade Bristol",
  "The Louisiana",
  "Roundhouse",
  "Brudenell Social Club",
  "O2 Academy Brixton",
  "Gorilla",
  "The Lexington",
  "Scala",
  "Underworld",
  "MOTH Club",
  "KOKO",
  "The Cab",
  "New Cross Inn",
  "Electric Ballroom",
];

function Ticker() {
  const items = [...VENUES, ...VENUES];
  return (
    <div className="border-y border-scene-border py-4 overflow-hidden" style={{ background: "#080808" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 60s linear infinite", width: "max-content", willChange: "transform" }}
      >
        {items.map((venue, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="text-scene-muted text-sm font-medium px-6">{venue}</span>
            <span className="text-scene-separator select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <FeatureGrid />

        {/* Final download CTA */}
        <section className="relative border-t border-scene-border overflow-hidden">
          <BristolMap />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.55)", zIndex: 1 }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 flex flex-col items-center text-center gap-6" style={{ zIndex: 2 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              Download free.
            </h2>
            <p className="text-scene-muted text-base max-w-sm leading-relaxed">
              Available now on TestFlight for iOS.
            </p>
            <a
              href="https://testflight.apple.com/join/jKXRVhSz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150"
            >
              Join the beta
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-scene-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-scene-muted text-sm">
          <p>© 2026 Scene, a <a href="https://studioreturn.co" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">Return</a> product :)</p>
          <Link
            href="/privacy"
            className="text-white hover:opacity-70 transition-opacity"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
}
