# Working on AARAMBHAM

- Keep `apps/web` and `apps/admin` independently buildable; share domain types and design primitives through workspace packages.
- Milestone 1 scope is frontend and contracts. Do not create cloud resources, integrate a backend, collect credentials, or claim local demo actions are production workflows.
- Read `docs/brand/BRAND_GUIDELINES.md` before changing visual identity. Never fabricate an official logo, credentials, staff, biographies or historical editions.
- Keep demonstration labels, noindex controls, empty archive states, and permission-disabled operations until an explicit later milestone changes them.
- Treat client-supplied 1999 as historical context pending original source verification, not continuous-publication proof.
- Do not import contact details from PRESS ID cards. Do not copy unlicensed articles/scans.
- Telugu headlines use Noto Serif Telugu; body uses Noto Sans Telugu; English UI uses Inter. Fonts are self-hosted via Fontsource.
- Components must not directly connect to providers. Use repository/storage/auth contracts. UI role checks are never security enforcement.
- Keep forms labeled, keyboard focus visible, mobile layouts usable, and inline errors accessible. Render article text as text, never untrusted HTML.
- Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and relevant Playwright checks before proposing changes. Record actual results, including blocked checks.
- Work on a feature branch; do not merge, deploy, or modify production resources as part of review.
