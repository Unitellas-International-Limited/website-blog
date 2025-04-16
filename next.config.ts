import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "creatorapp.zoho.com",
      },
    ],
  },
};

export default nextConfig;
