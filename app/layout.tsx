import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scene - The home of live music",
  description:
    "The shared gig calendar for you and your friends. Import or scan tickets automatically, collect stubs and review shows.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourscene.uk"),
  icons: {
    icon: "/scene-logo.svg",
    shortcut: "/scene-logo.svg",
    apple: "/scene-logo.svg",
  },
  openGraph: {
    title: "Scene - The home of live music",
    description:
      "The shared gig calendar for you and your friends. Import or scan tickets automatically, collect stubs and review shows.",
    url: "https://ourscene.uk",
    siteName: "Scene",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scene - The home of live music",
    description:
      "The shared gig calendar for you and your friends. Import or scan tickets automatically, collect stubs and review shows.",
  },
  // TODO: Add the Smart App Banner once the app is live on the App Store.
  // Uncomment and fill in the App Store ID from App Store Connect → App Information:
  // other: {
  //   "apple-itunes-app": "app-id=<APP_STORE_ID>",
  // },
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
