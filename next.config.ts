import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 adalah native addon (CJS) — jangan di-bundle webpack.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
