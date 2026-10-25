# AARAMBHAM · Brand guidelines, proposed digital edition

## Identity supplied by the client

| Element                  | Client brief                            | Evidence status                                                              |
| ------------------------ | --------------------------------------- | ---------------------------------------------------------------------------- |
| Telugu name              | ఆరంభం                                   | Confirmed in project brief                                                   |
| English name             | AARAMBHAM                               | Confirmed in project brief                                                   |
| Motto                    | TRUTH IS GOD                            | Confirmed in project brief                                                   |
| Historical establishment | 1999                                    | Client-supplied historical attribution; original materials not in repository |
| Existing masthead        | Orange Telugu wordmark outlined in blue | Described in brief; approved source artwork not supplied                     |

The traditional masthead is the primary brand reference. This project does not establish registration, current publication status, continuous publishing since 1999, editorial leadership or ownership claims. Ayurvedajyothi is a separate publication: do not import its green/magenta identity here.

## Provisional logo implementation

`Logo` in `packages/ui/src/index.tsx` uses editable Telugu text and explicitly says **Provisional text masthead**. It is not a traced, redrawn or approved official mark. The text uses darker orange `#A95200` for legibility; official artwork colors must come from the approved source file, not this approximation. It intentionally does not attempt the historical blue outline without source artwork. Blue motto lettering and orange accents maintain the proposed palette.

To replace: add the approved artwork to each app's `public/brand/` and pass `assetSrc="/brand/aarambham-approved.svg"` to every `Logo` usage, or centralize that path in a shared brand configuration. The component preserves intrinsic aspect ratio and supports a compact layout. Verify the source's transparency, contrast, permissions, clear space, and mobile legibility before replacing. Do not stretch, crop, recolor or remove source details. Keep provisional labeling until approval.

## Proposed digital tokens — not official brand HEX values

| Token                       | Value     | Intended use                          |
| --------------------------- | --------- | ------------------------------------- |
| `--color-brand-primary`     | `#173B8F` | Navigation, actions, blue panels      |
| `--color-brand-accent`      | `#F18B17` | Small decorative rules and highlights |
| `--color-background`        | `#FFFFFF` | Primary reading surface               |
| `--color-background-subtle` | `#FFF8DB` | Heritage panels                       |
| `--color-text-primary`      | `#1A2433` | Main text                             |
| `--color-text-secondary`    | `#526071` | Captions and metadata                 |
| `--color-breaking-news`     | `#B4232A` | Breaking/sample ticker indicator only |
| `--color-border`            | `#D9DFE7` | Decorative separators                 |

Orange is not a small-text-on-white color. Use `#7C4400` or `#A95200` for orange-family text, or charcoal on the orange surface. Inputs have a stronger `#7B8796` border; keyboard focus is blue and independent of color-only status indicators. Automated tests check the principal text/surface pairs against 4.5:1. Audit new pairings before use. Decorative borders need not be used as the sole affordance.

## Typography and rhythm

| Role               | Family                    | Size / line height    |
| ------------------ | ------------------------- | --------------------- |
| Masthead           | Noto Serif Telugu 700     | 3.8–6 rem / 1.55      |
| Lead headline      | Noto Serif Telugu 600–700 | 1.9–2.8 rem / 1.6–1.7 |
| Section heading    | Noto Serif Telugu 600–700 | 1.3–1.55 rem / 1.6    |
| Card headline      | Noto Serif Telugu 600     | 1.1–1.3 rem / 1.7     |
| Article body       | Noto Sans Telugu 400      | 1.125 rem / 2.15      |
| Summary            | Noto Sans Telugu 400      | 0.9–1.15 rem / 1.9–2  |
| Caption/timestamp  | Inter + Telugu fallback   | 0.65–0.8125 rem / 1.6 |
| Buttons and labels | Inter 500–600             | 0.75–0.875 rem / 1.65 |

Fonts ship locally through Fontsource with their upstream licenses; no runtime Google Fonts request. Preserve Telugu diacritics with generous line heights. Keep article reading measure near 680px. Headlines should wrap naturally without clipping.

## Layout principles

Use newspaper hierarchy: a central masthead, fine rules, editorial asymmetry, a prominent lead, compact briefs and clear section headers. Cream panels evoke paper while white maintains comfortable reading. No full-page saturated backgrounds or excessive gradients. Admin uses a restrained sidebar, clear tables, form labels and persistent demo disclosure. Red is not used for branding or normal calls to action.

Original SVG illustrations are explicitly captioned illustrations, never documentary evidence. Replace only with licensed editorial assets containing meaningful alt text, provenance and rights approval.
