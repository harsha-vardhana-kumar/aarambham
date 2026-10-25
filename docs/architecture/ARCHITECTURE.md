# Milestone 1 architecture

## App boundaries

Both apps use Next.js 15 App Router, React, TypeScript and Tailwind 3.4. Public routes are server-rendered/static where possible. Filtering, archive selectors and local draft editing are isolated client components. Fonts and design CSS are shared; each app owns its layout and application-specific styles. `transpilePackages` supports workspace source imports with no separate package publishing step.

Data flow: route → feature component → `demoRepository` or admin `lib/demo-drafts` → shared typed contracts. No ORM, database connection, identity provider, storage SDK or server mutation endpoint exists. The demo repository intentionally exposes only labeled sample content. Replace it with a server repository before live publication; production queries must return only approved published content.

## Domain records

`packages/core` exports User, Role, Reporter, Editor, Article, Category, District, MediaAsset, EpaperEdition, ArchiveEdition, Advertisement, EditorialApproval and AuditEvent. IDs are opaque strings (future PostgreSQL UUIDs); dates use ISO 8601 with offsets where relevant; enum unions are portable. Demo fixtures use prefixed IDs. User records deliberately omit credentials. `packages/validation` supplies Zod input validation; this does not replace future server validation.

Proposed PostgreSQL relational plan (documentation, not executable migrations):

| Table                  | Relationships / constraints to add                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| users                  | UUID PK, identity-provider subject unique, active flag, role enum/check                                       |
| reporters / editors    | user FK; many-to-many district/category assignments                                                           |
| articles               | UUID PK, unique slug, author FK, category FK, optional district FK, status check, timestamps, version integer |
| article_revisions      | article FK, immutable text snapshot, editor FK, revision number unique per article                            |
| categories / districts | unique slug/code, state check; district directory verified before use                                         |
| media_assets           | unique storage key, MIME, size, alt, provenance and rights state                                              |
| editions               | publication FK, issue date, district FK, PDF asset FK; composite edition uniqueness                           |
| archive_metadata       | edition FK, scan reference, provenance, metadata verification, OCR status/text key                            |
| advertisements         | approved media FK, placement, valid date range, label                                                         |
| editorial_approvals    | article/revision FK, reviewer FK, decision, timestamp                                                         |
| audit_events           | actor FK, entity ID/type, action, UTC timestamp, restricted append-only metadata                              |

Add indexes on article status/published date/category/district, edition publication/date/district, and audit entity/time. Use transactions for publication, optimistic version checks for edits, stable cursor pagination, timezone-aware `timestamptz`, and controlled revision history. Never store sensitive metadata or entire draft text in audit records.

## Editorial state machine for a future milestone

Draft → in review → changes requested/draft or approved → scheduled/published. Authenticated editors/admins must authorize decisions on the server. Scheduling must verify a future timestamp and record the intended timezone. Publishing must atomically update visibility and append an audit event. Concurrent edits require expected-version checks. This state machine is a design proposal, not an implemented workflow.

Proposed roles: Reporter writes; Editor writes/reviews/publishes; Admin additionally manages users; Super Admin additionally configures the system. Assignment restrictions, least privilege, self-approval policy and server enforcement require product approval. `hasCapability` is a pure preview policy function, never an access boundary.

## Storage, historical records and OCR

Store object keys, not permanent provider URLs. A server-only storage adapter will issue short-lived URLs after rights/access checks, validate MIME/size, scan uploads, and prevent arbitrary remote URL ingestion. Archives distinguish availability from rights approval; downloads require both and a PDF reference. Current edition collections are empty. The displayed 1999–2026 range is a filter range, not a claim that issues exist.

PDF rendering will be connected only after an approved file is supplied; current viewer UI is an honest unavailable state with disabled download controls. Future OCR is asynchronous, versioned and traceable to the original scan. OCR output must not overwrite originals and requires correction/review. No OCR or PDF-processing job is installed in M1.

## Security and portability

Do not put secrets in `NEXT_PUBLIC_*` values. Future sessions need secure HttpOnly cookies, CSRF protections, rate limiting, authorization at every read/write boundary, and an identity provider. Browser-tab draft storage is unencrypted convenience data, not secure newsroom storage. React escapes draft text; no `dangerouslySetInnerHTML`. Security response headers are present; a full CSP and trusted media origins need review with future integrations.

No provider-specific core imports. PostgreSQL repository, auth adapter and storage adapter are contracts only. Public demo noindex is a content-discovery safeguard, not access control. CI does not provision or deploy resources.
