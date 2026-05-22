import Link from "next/link";
import Image from "next/image";
import AppStoreButton from "./AppStoreButton";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-scene-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + Beta badge */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <Image src="/scene-logo.svg" alt="Scene" width={28} height={28} />
          <span className="text-white font-bold text-xl tracking-tight">Scene</span>
          <span className="bg-scene-surface border border-scene-border text-scene-muted text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full">
            Beta
          </span>
        </Link>

        {/* Nav links + CTA */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-scene-muted hover:text-white transition-colors text-sm"
          >
            What is it?
          </a>
          <AppStoreButton className="text-xs px-4 py-2" />
        </div>
      </nav>
    </header>
  );
}
