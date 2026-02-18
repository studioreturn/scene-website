import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-scene-bg flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-sm">
        {/* Faint logo */}
        <p className="text-scene-accent font-bold text-4xl mb-8 opacity-60">
          Scene
        </p>

        <h1 className="text-white font-bold text-2xl mb-3">
          Profile not found
        </h1>
        <p className="text-scene-muted text-sm leading-relaxed">
          We couldn&apos;t find that profile. The username might be wrong, or
          the account may no longer exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 bg-scene-surface border border-scene-border text-white text-sm font-medium px-6 py-3 rounded-full hover:border-scene-accent/40 transition-colors"
        >
          ← Back to Scene
        </Link>
      </div>
    </div>
  );
}
