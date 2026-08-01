import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
