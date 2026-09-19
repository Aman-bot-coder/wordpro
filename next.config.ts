import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on a VPS: emit a minimal standalone server bundle.
  output: "standalone",
  images: { unoptimized: true },
  // `pg` is a native-ish server dependency — keep it external to the bundle.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
