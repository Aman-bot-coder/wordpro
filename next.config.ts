import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on a VPS: emit a minimal standalone server bundle.
  output: "standalone",
  images: { unoptimized: true },
  // `mysql2` is a server dependency — keep it external to the bundle.
  serverExternalPackages: ["mysql2"],
};

export default nextConfig;
