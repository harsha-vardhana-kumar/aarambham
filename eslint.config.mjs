import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/next-env.d.ts",
      "**/playwright-report/**",
      "**/test-results/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    settings: {
      next: {
        rootDir: [
          import.meta.dirname + "/apps/web/",
          import.meta.dirname + "/apps/admin/",
        ],
      },
    },
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  // The portable UI package accepts a pre-approved logo asset without a Next runtime dependency.
  {
    files: ["packages/ui/src/index.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
];
export default config;
