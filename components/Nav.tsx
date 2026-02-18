import Link from "next/link";
import AppStoreButton from "./AppStoreButton";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-scene-bg/80 backdrop-blur-md border-b border-scene-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          Scene
        </Link>

        {/* Download CTA */}
        <AppStoreButton className="text-xs px-4 py-2" />
      </nav>
    </header>
  );
}
