import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scene — Your live music life",
  description:
    "Track every gig, discover what's on, and share your gig passport.",
  metadataBase: new URL("https://ourscene.uk"),
  openGraph: {
    title: "Scene — Your live music life",
    description:
      "Track every gig, discover what's on, and share your gig passport.",
    url: "https://ourscene.uk",
    siteName: "Scene",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Scene — Your live music life",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scene — Your live music life",
    description:
      "Track every gig, discover what's on, and share your gig passport.",
    images: ["/og-default.png"],
  },
  other: {
    // TODO: Replace REPLACE_WITH_APP_STORE_ID with the real App Store app ID
    // from App Store Connect → App Information.
    "apple-itunes-app": "app-id=REPLACE_WITH_APP_STORE_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-scene-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
