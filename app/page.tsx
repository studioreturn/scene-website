import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import AppStoreButton from "@/components/AppStoreButton";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeatureGrid />

        {/* Social proof placeholder */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-scene-border">
          <div className="max-w-2xl mx-auto text-center">
            {/* TODO: Replace with real testimonials once collected */}
            <blockquote>
              <p className="text-2xl sm:text-3xl font-medium text-white leading-snug text-balance">
                &ldquo;Scene is the app I didn&apos;t know I needed.&rdquo;
              </p>
              <footer className="mt-6 text-scene-muted text-sm">
                — A very happy early tester &nbsp;
                <span className="text-xs text-scene-border italic">
                  (TODO: add real testimonials)
                </span>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-scene-border">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-scene-muted text-sm font-medium tracking-wide uppercase">
              Free to download. Made in Bristol.
            </p>
            <AppStoreButton />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-scene-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-scene-muted text-sm">
          <p>© 2026 Scene. Made with love in Bristol.</p>
          <Link
            href="/privacy"
            className="hover:text-white transition-colors underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
}
