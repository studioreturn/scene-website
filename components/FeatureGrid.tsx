const features = [
  {
    tag: "Bring your friends",
    title: "All your gigs\nin one place.",
    description:
      "No more \"Where did that ticket go?\". Keep them all in one shared calendar with your friends. It even syncs with Google Calendar.",
    screenshot: "/screenshots/home.png",
    alt: "Scene app — My Gigs calendar view",
    reverse: false,
  },
  {
    tag: "Add Tickets",
    title: "No need to add\nthem yourself.",
    description:
      "Scan tickets or import an email. Supports DICE, Ticketmaster, SeeTickets, Headfirst and more.",
    screenshot: "/screenshots/add-gig.png",
    alt: "Scene app — add a gig",
    reverse: true,
  },
  {
    tag: "Collect Stubs",
    title: "Remember every show.",
    description:
      "Collect tickets, review shows and share it all with your friends.",
    screenshot: "/screenshots/profile.png",
    alt: "Scene app — profile",
    reverse: false,
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" style={{ scrollMarginTop: "80px" }}>
      {features.map((f, i) => (
        <div
          key={f.tag}
          className={i % 2 !== 0 ? "border-y border-scene-border" : ""}
          style={{ background: i % 2 === 0 ? "#000000" : "#080808" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
            <div
              className={`flex flex-col lg:items-center gap-8 lg:gap-14 max-w-3xl mx-auto w-full ${
                f.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Phone — below text on mobile, natural DOM position on desktop */}
              <div
                className="order-2 lg:order-none flex-shrink-0 mx-auto lg:mx-0"
                style={{
                  width: "min(200px, 55vw)",
                  transform: f.reverse ? "rotate(2deg)" : "rotate(-2deg)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.screenshot}
                  alt={f.alt}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              {/* Text — above image on mobile */}
              <div className="order-1 lg:order-none flex-1 min-w-0 relative text-center lg:text-left">
                {/* Faint section number — hidden on mobile to avoid overflow */}
                <span
                  className="hidden lg:block absolute -top-10 left-0 text-[120px] font-bold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.04)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="relative text-scene-muted text-xs font-semibold uppercase tracking-[0.15em] mb-3">
                  {f.tag}
                </p>
                <h3 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4 whitespace-pre-line">
                  {f.title}
                </h3>
                <p className="relative text-scene-muted text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                  {f.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
