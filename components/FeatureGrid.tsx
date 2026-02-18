const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
    title: "Your Calendar",
    description:
      "Add gigs manually, import from a ticket URL, or paste your confirmation email. Never lose track of what you\u2019re seeing.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    title: "Discover",
    description:
      "Browse featured gigs and local artists. One tap to add to your calendar.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
        />
      </svg>
    ),
    title: "Gig Passport",
    description:
      "A visual record of every show you\u2019ve been to. Share it, review it, relive it.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-scene-border">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-16">
        Everything you need to track your gig life
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-scene-surface border border-scene-border rounded-card-lg p-8 flex flex-col gap-4 hover:border-scene-accent/40 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-scene-accent/10 flex items-center justify-center text-scene-accent">
              {f.icon}
            </div>
            <h3 className="text-white font-semibold text-lg">{f.title}</h3>
            <p className="text-scene-muted text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
