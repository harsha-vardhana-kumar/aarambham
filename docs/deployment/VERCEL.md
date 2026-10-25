# Vercel demonstration setup — instructions only

No deployment was performed. After authorization, connect this same repository to **two separate Vercel projects**.

| Setting                    | Public website                                   | Admin portal                                       |
| -------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Root directory             | `apps/web`                                       | `apps/admin`                                       |
| Framework                  | Next.js                                          | Next.js                                            |
| Node                       | 22.x                                             | 22.x                                               |
| Include files outside root | Enabled                                          | Enabled                                            |
| Install command            | `cd ../.. && pnpm install --frozen-lockfile`     | same                                               |
| Build command              | `cd ../.. && pnpm --filter @aarambham/web build` | `cd ../.. && pnpm --filter @aarambham/admin build` |
| Output                     | `.next` (framework default relative to app root) | `.next`                                            |
| Package manager            | pnpm 11.25.0                                     | pnpm 11.25.0                                       |

The root package-manager declaration and lockfile are authoritative. Enable Corepack on the build platform if required (`ENABLE_EXPERIMENTAL_COREPACK=1` in Vercel's build environment), or arrange pnpm 11.25.0 explicitly before the install command. Do not install with npm inside the app roots or create nested lockfiles. Shared packages are included through the workspace and Next `transpilePackages`. Avoid ignored-build rules that skip shared package changes.

M1 runtime environment variables: **none**. The checked-in `.env.example` files are explanatory. No credentials or database URL are needed. A provider-specific CLI is not installed in this project. If using the Vercel CLI after authorization, run `vercel link` then `vercel` separately from each app directory and confirm the project/root selections; use preview deployments first. Never run `vercel --prod` until explicitly approved.

Validate both builds locally before deployment. Then verify preview navigation, nested article routes, Telugu fonts, mobile layout, draft storage, noindex and unavailable controls. Vercel deployment itself is not tested by local builds. Both projects should stay on preview domains until client sign-off; protect previews with hosting access controls if later private materials are introduced.

## Future environment contract (not used now)

- `DATABASE_URL`: server-only PostgreSQL connection secret
- `AUTH_SECRET`, `AUTH_ISSUER`, `AUTH_CLIENT_ID`, `AUTH_CLIENT_SECRET`: names to finalize with provider
- `STORAGE_BUCKET`, `STORAGE_REGION`: server adapter settings
- `PUBLIC_SITE_URL`: future server metadata canonical URL, finalized per environment

Do not add inactive database/auth SDKs just to populate these values. Future AWS values belong in Secrets Manager/server configuration, never public bundles. Migration requires a new reviewed milestone.
