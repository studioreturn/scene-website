/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow remote images from Supabase storage (for user avatars).
  // TODO: Add any other image host domains if avatars are served from a CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pppynzuccijjqydhtjgu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Serve /.well-known/apple-app-site-association with the correct Content-Type.
  // Next.js serves static files from /public automatically, but we need to ensure
  // no file extension is required and the MIME type is application/json.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
