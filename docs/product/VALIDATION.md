# Milestone 1 validation

Validated locally on 24 October 2026, using Node 24.22.1 and pnpm 11.25.0. CI is configured for Node 22; remote CI and Vercel deployments have not run.

| Check                   | Result                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| TypeScript              | All 8 workspace packages/apps pass strict type checking                                                  |
| ESLint                  | Pass with zero lint warnings                                                                             |
| Domain tests            | 7/7 pass                                                                                                 |
| Production builds       | Both Next.js 15.5.28 apps pass; web generates 35 static entries, admin 25, plus dynamic draft-edit route |
| Playwright              | 13/13 pass in Chromium                                                                                   |
| Responsive checks       | 390px, 768px, 1440px; no document overflow on homepage, archive, article, dashboard or editor            |
| Automated accessibility | Zero WCAG A/AA violations found by axe on homepage, archive, dashboard, new article and login            |
| Visual inspection       | Desktop public homepage, admin dashboard and mobile public homepage reviewed                             |

Browser checks cover public route inventory, nested article navigation, unknown-route 404, indexing headers, district query filtering, empty search/reset, honest login, portal route inventory, draft validation/save/reload/reset, disabled publish controls and absent archive downloads. Screenshot capture waits for page content and fonts.

Domain checks cover Telugu article validation, invalid archive dates, edition download rights, proposed role capabilities, demo/archive integrity, timezone-aware future schedules and principal text color pairs.

## Limits and observations

- No authentication, backend, media upload, real editorial actions, OCR or deployment is implemented or tested.
- Accessibility automation is not a complete assistive-technology audit. Native Telugu editorial review and broader browser/device testing are still appropriate before launch.
- A clean production rebuild was used after stale incremental output appeared during validation.
- Next.js emits an internal `NoFallbackError` diagnostic for the deliberate unknown-route request; the HTTP response is correctly 404 and the not-found UI renders.
- Playwright uses explicit loopback hosts because this execution environment restricts interface enumeration. Production configuration is not modified for that environment restriction.
- Github branch creation through the connected integration returned HTTP 403, `Resource not accessible by integration`. The local feature branch is ready; no remote branch or PR was created.

## Reviewed previews

- [Public homepage, desktop](../previews/web-desktop.png)
- [Admin dashboard, desktop](../previews/admin-desktop.png)
- [Public homepage, mobile](../previews/web-mobile.png)

## Review follow-up — 25 October 2026

Fixed the saved-draft paragraph boundary bug and aligned newsroom story headlines with the shared Noto Serif Telugu token. Draft serialization now preserves blank-line separators exactly, including additional internal whitespace, so valid 50-character drafts survive reload and subsequent saves of other stories.

Verification after these changes: TypeScript, zero-warning lint, 7 domain tests, both production builds and all 15 Chromium tests pass. The two new browser regressions cover minimum-length multi-paragraph drafts with standard and irregular blank-line separators.

GitHub Actions on the original published milestone also passed all checks. PR #1 is published and open; the earlier GitHub authorization blocker was resolved. The Vercel preview failed separately. Its PR metadata reports an unset project root; the production screenshot still points to the README-only main commit. Exact Vercel build-log diagnosis and project changes await Vercel access. No merge, manual deployment or AWS action was performed during this follow-up.
