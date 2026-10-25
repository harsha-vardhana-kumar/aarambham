# ఆరంభం · AARAMBHAM

**Milestone 1 — frontend demonstration.** Two independent Next.js 15 apps, one shared Telugu editorial design system. No authentication, database, uploads, publishing, analytics provider or cloud resources are connected.

## Start locally

Use Node 22 LTS and pnpm 11.25.0 (the package manager is pinned). Install pnpm with your normal Node package-manager tooling, then:

```sh
pnpm install --frozen-lockfile
pnpm dev:web     # http://localhost:3000
pnpm dev:admin   # http://localhost:3001 (separate terminal)
```

Open `/login` on the admin app and choose **Open frontend demo**. This is an explicit preview entry, not a sign-in bypass or authenticated session. Never enter private material. Demo drafts use `sessionStorage`, stay in the current tab, and disappear when the tab session ends; copied tabs may inherit initial storage depending on browser behavior.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

## Workspace

| Path                  | Purpose                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `apps/web`            | Public newspaper frontend; port 3000                             |
| `apps/admin`          | Editorial portal frontend; port 3001                             |
| `packages/ui`         | Logo, cards' visual primitives, local fonts, semantic CSS tokens |
| `packages/core`       | Shared types, taxonomy and explicitly identified demo repository |
| `packages/validation` | Zod article, date and scheduling contracts                       |
| `packages/db`         | Provider-independent repository interfaces only                  |
| `packages/auth`       | Future auth adapter and proposed role policy only                |
| `packages/storage`    | Portable media storage adapter interface only                    |
| `docs`                | Brand, product scope, architecture, hosting and validation       |
| `infrastructure/aws`  | Migration notes only; no executable infrastructure               |

## Content and brand status

The client brief identifies ఆరంభం / AARAMBHAM, motto TRUTH IS GOD, a historical establishment year of 1999 and a traditional orange wordmark with blue outline. **Original historical materials and an approved logo are not in this repository.** These details are client-supplied, not independently verified. The reusable text masthead is visibly provisional. All stories are layout demonstrations, and all illustrations are original decorative SVG scenes, not photographs of events. No historic editions or staff biographies are invented.

The header displays a fixed **design-edition date**, not a live publication date. Sample article statuses are for portal demonstrations only. The public demo intentionally displays sample content regardless of those statuses; it is not a production publishing adapter. Both apps carry `noindex`, `nofollow`, robots disallow and response-header indexing restrictions. Replace these only as part of an approved public launch; noindex is not authentication.

## Visual previews

[Public website](docs/previews/web-desktop.png) · [Admin portal](docs/previews/admin-desktop.png) · [Mobile](docs/previews/web-mobile.png)

## Documentation

- [Brand guidelines](docs/brand/BRAND_GUIDELINES.md)
- [Architecture and domain plan](docs/architecture/ARCHITECTURE.md)
- [Milestone scope and route inventory](docs/product/MILESTONE_1.md)
- [Vercel setup](docs/deployment/VERCEL.md)
- [AWS migration](docs/deployment/AWS_MIGRATION.md)
- [Validation results](docs/product/VALIDATION.md)

No deployment is included or authorized by this milestone. Create two Vercel projects only when deployment is requested.
