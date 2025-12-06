import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://www.notion.so/images/page-cover/**')],
  }
};

export default nextConfig;
