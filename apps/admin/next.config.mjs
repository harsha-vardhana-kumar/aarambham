import path from "node:path";
const config = {
  outputFileTracingRoot: path.resolve(import.meta.dirname, "../.."),
  transpilePackages: [
    "@aarambham/ui",
    "@aarambham/core",
    "@aarambham/validation",
    "@aarambham/auth",
  ],
  poweredByHeader: false,
  experimental: { cpus: 2 },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default config;
