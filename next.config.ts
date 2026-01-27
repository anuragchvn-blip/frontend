import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["react-plotly.js"],
  images: {
    localPatterns: [
      {
        pathname: '/team/**',
      },
      {
        pathname: '/images/**',
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
