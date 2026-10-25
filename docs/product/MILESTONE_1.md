# Milestone 1 product scope

## Public route inventory

`/` homepage; `/article/sample-story-1` through `/article/sample-story-9`; `/latest`; `/andhra-pradesh`; `/telangana`; `/districts` (supports district query selection); `/national`; `/international`; `/politics`; `/education-jobs`; `/business-agriculture`; `/health-ayurveda`; `/video`; `/epaper`; `/archives`; `/about`; `/our-legacy`; `/editorial-team`; `/contact`; `/privacy`; `/editorial-policy`; `/corrections-policy`; `/terms`.

Homepage includes the provisional masthead/motto, fixed design-edition date, scrollable mobile navigation, static demo breaking strip, lead and secondary stories, briefs, latest grid, district shortcuts, e-paper and video previews, sample editorial selections and footer. “Trending” is intentionally a sample selection rather than invented audience popularity. No live metrics or events are claimed. Each sample article and original illustration is labeled.

## Portal route inventory

`/login`, `/dashboard`, `/articles`, `/articles/new`, `/articles/[id]/edit`, `/drafts`, `/approvals`, `/scheduled`, `/published`, `/categories`, `/districts`, `/reporters`, `/media`, `/epaper`, `/archives`, `/homepage`, `/advertisements`, `/analytics`, `/users`, `/audit`, `/settings`.

Functional frontend interactions: story search/category/status filters; local draft create/edit with Zod errors and escaped plain-text preview; local draft reset; proposed role-policy inspection; local homepage layout sketch; mobile navigation. Dashboard counts derive from demo records and local drafts, not live activity. Original sample status is copied to a draft on save; this cannot change public sample content.

Intentionally unavailable: credential sign-in, invitations, uploads, actual approvals/scheduling/publishing, real media/edition viewing without approved files, metrics, audit persistence, server settings, live homepage changes and advertisement campaigns. Screens explain each unavailable state; no simulated success for these operations.

## Archive readiness

Year/month/date/publication/district selectors, empty viewer interface, metadata/scan/OCR placeholders, and disabled download control. Records can represent dates back to 1999, rights status, provenance and future OCR. There are zero historical editions in the fixture data.

## Acceptance and future prerequisites

Both apps must pass build/type/lint/tests, render at desktop/tablet/mobile sizes and provide consistent navigation, focus, contrast and error/empty states. Technical render checks are not a substitute for native Telugu editorial proofreading or a complete manual assistive-technology audit.

Before a public launch: approved logo; source verification for historical claims; verified staff/contacts/credentials; legally reviewed policies; licensed articles/photos/scans; backend authorization and editorial state enforcement; security review; real domain/canonical metadata; release approval. Do not conflate a successful frontend demo with production readiness.
