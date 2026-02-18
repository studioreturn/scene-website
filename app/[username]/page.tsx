import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicProfile } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard";

interface PageProps {
  params: { username: string };
}

// ---------------------------------------------------------------------------
// generateMetadata — dynamic Open Graph tags for each profile
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await fetchPublicProfile(params.username);

  if (!data) {
    return {
      title: "Profile not found — Scene",
    };
  }

  const { profile, stats } = data;
  const title = `${profile.displayName} on Scene`;
  const description = [
    `${profile.displayName} has been to ${stats.gigCountThisYear} gig${stats.gigCountThisYear === 1 ? "" : "s"} this year.`,
    stats.mostVisitedVenue
      ? `Their most visited venue is ${stats.mostVisitedVenue}.`
      : "",
    "See their full gig passport on Scene.",
  ]
    .filter(Boolean)
    .join(" ");

  const image = profile.avatarURL
    ? profile.avatarURL
    : "/og-default.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ourscene.uk/${profile.username}`,
      siteName: "Scene",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component — SSR, no "use client"
// ---------------------------------------------------------------------------
export default async function ProfilePage({ params }: PageProps) {
  const data = await fetchPublicProfile(params.username);

  if (!data) {
    notFound();
  }

  return <ProfileCard data={data} />;
}
