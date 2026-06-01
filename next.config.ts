import type { NextConfig } from "next";
import { redirectRules } from "./src/data/redirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
  async redirects() {
    return redirectRules;
  },
};

export default nextConfig;
