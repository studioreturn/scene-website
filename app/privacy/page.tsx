import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Scene",
  description: "How Scene handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-scene-bg px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-scene-muted text-sm hover:text-white transition-colors"
        >
          ← Back to Scene
        </Link>

        <h1 className="text-white font-bold text-3xl mt-8 mb-2">
          Privacy Policy
        </h1>
        <p className="text-scene-muted text-sm mb-10">
          Last updated: February 2026
        </p>

        {/* TODO: Replace this placeholder with a real privacy policy before launch.
            Recommended resource: https://termly.io or consult a legal professional.
            Key areas to cover: data collection, storage, third-party services (Supabase),
            user rights (GDPR / UK GDPR), contact details. */}
        <div className="bg-scene-surface border border-scene-border rounded-card-lg p-8 text-scene-muted text-sm leading-relaxed space-y-4">
          <p className="text-white font-semibold text-base">
            🚧 Coming soon
          </p>
          <p>
            This page is a placeholder. A full privacy policy will be published
            here before Scene launches publicly.
          </p>
          <p>
            Scene is a Bristol-based project. We take privacy seriously and will
            comply fully with UK GDPR. If you have any questions in the
            meantime, please contact us at{" "}
            <a
              href="mailto:hello@ourscene.uk"
              className="text-scene-accent hover:opacity-80 transition-opacity"
            >
              hello@ourscene.uk
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
