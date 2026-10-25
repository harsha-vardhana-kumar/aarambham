export type Role = "super-admin" | "admin" | "editor" | "reporter";
export interface User {
  id: string;
  displayName: string;
  role: Role;
  active: boolean;
}
export interface Reporter {
  userId: string;
  districtIds: string[];
  bio?: string;
}
export interface Editor {
  userId: string;
  categoryIds: string[];
}
export interface Category {
  id: string;
  slug: string;
  name: string;
}
export interface District {
  id: string;
  name: string;
  state: "AP" | "TS";
}
export type ArticleStatus =
  | "draft"
  | "in-review"
  | "scheduled"
  | "published"
  | "rejected";
export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  categoryId: string;
  districtId?: string;
  authorId?: string;
  status: ArticleStatus;
  isDemo: boolean;
  updatedAt: string;
  scheduledAt?: string;
  publishedAt?: string;
  mediaId?: string;
  art: "river" | "city" | "farm" | "books";
}
export interface MediaAsset {
  id: string;
  storageKey: string;
  alt: string;
  mimeType: string;
  rights: "pending" | "approved";
  credit?: string;
  originalSource?: string;
}
export interface EpaperEdition {
  id: string;
  publication: string;
  districtId?: string;
  issueDate: string;
  pageCount?: number;
  pdfAssetId?: string;
  availability: "pending" | "available" | "restricted";
  rights: "pending" | "approved";
}
export interface ArchiveEdition extends EpaperEdition {
  originalScanReference?: string;
  provenance?: string;
  ocrStatus: "not-started" | "processing" | "complete" | "failed";
  ocrTextKey?: string;
  metadataVerified: boolean;
}
export interface Advertisement {
  id: string;
  placement: "leaderboard" | "sidebar" | "inline";
  assetId?: string;
  label: string;
  startsAt: string;
  endsAt: string;
  enabled: boolean;
}
export interface EditorialApproval {
  id: string;
  articleId: string;
  reviewerId: string;
  decision: "pending" | "approved" | "changes-requested";
  note?: string;
  decidedAt?: string;
}
export interface AuditEvent {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  occurredAt: string;
  metadata: Record<string, string>;
}
export const categories: Category[] = [
  ["andhra-pradesh", "ఆంధ్రప్రదేశ్"],
  ["telangana", "తెలంగాణ"],
  ["districts", "జిల్లా వార్తలు"],
  ["national", "జాతీయం"],
  ["international", "అంతర్జాతీయం"],
  ["politics", "రాజకీయం"],
  ["education-jobs", "విద్య · ఉద్యోగాలు"],
  ["business-agriculture", "వ్యాపారం · వ్యవసాయం"],
  ["health-ayurveda", "ఆరోగ్యం · ఆయుర్వేదం"],
].map(([slug, name]) => ({ id: slug, slug, name }));
export const districts: District[] = [
  { id: "guntur", name: "గుంటూరు", state: "AP" },
  { id: "krishna", name: "కృష్ణా", state: "AP" },
  { id: "hyderabad", name: "హైదరాబాద్", state: "TS" },
  { id: "warangal", name: "వరంగల్", state: "TS" },
];
export const adminSections = [
  ["dashboard", "Overview"],
  ["articles", "All stories"],
  ["drafts", "Drafts"],
  ["approvals", "Editorial approvals"],
  ["scheduled", "Scheduled"],
  ["published", "Published"],
  ["categories", "Categories"],
  ["districts", "Districts"],
  ["reporters", "Reporters"],
  ["media", "Media library"],
  ["epaper", "E-paper"],
  ["archives", "Historical archives"],
  ["homepage", "Homepage"],
  ["advertisements", "Advertisements"],
  ["analytics", "Analytics"],
  ["users", "Users & roles"],
  ["audit", "Audit logs"],
  ["settings", "Configuration"],
] as const;
const topics = [
  [
    "మన ఊరు, మన నది: తీర ప్రాంతాల కథలను తెలుసుకుందాం",
    "స్థానిక జీవితానికి అద్దం పట్టే కథనాల కోసం ఒక నమూనా సంపాదకీయ రూపకల్పన.",
    "andhra-pradesh",
    "river",
  ],
  [
    "నగర జీవనం: మారుతున్న వీధులు, కొత్త ఆలోచనలు",
    "మన చుట్టూ ఉన్న నగరాన్ని మరో కోణంలో చూసే నమూనా కథనం.",
    "telangana",
    "city",
  ],
  [
    "నేల నుంచి నేరుగా: వ్యవసాయ కథలకు వేదిక",
    "రైతు అనుభవాలు, సాగు పద్ధతులపై భవిష్యత్తు కథనాల నమూనా.",
    "business-agriculture",
    "farm",
  ],
  [
    "చదువుకు కొత్త దారులు: యువత కోసం ప్రత్యేక విభాగం",
    "విద్య, నైపుణ్యాలు, అవకాశాల సమాచారానికి నమూనా పేజీ.",
    "education-jobs",
    "books",
  ],
  [
    "జిల్లా కథనాలు: స్థానిక స్వరానికి ప్రాధాన్యం",
    "జిల్లా స్థాయి కథనాలను పరిచయం చేసే నమూనా.",
    "districts",
    "river",
  ],
  [
    "ప్రజా అంశాలు: ప్రశ్నలు, వివరణలు, విశ్లేషణలు",
    "ప్రజా విధానాలపై సమాచారాన్ని అందించే నమూనా విభాగం.",
    "politics",
    "city",
  ],
  [
    "దేశం గురించి తెలుసుకుందాం",
    "జాతీయ అంశాల సమగ్ర పరిచయానికి నమూనా కథనం.",
    "national",
    "books",
  ],
  [
    "ప్రపంచ పరిచయం: కొత్త దృక్కోణాలు",
    "అంతర్జాతీయ కథనాల ప్రదర్శన కోసం నమూనా.",
    "international",
    "city",
  ],
  [
    "ఆరోగ్య సమాచారం: ఆధారాలకు ప్రాధాన్యం",
    "భవిష్యత్తులో నిపుణుల సమీక్షతో సమాచారాన్ని అందించే విభాగం. ఇది వైద్య సలహా కాదు.",
    "health-ayurveda",
    "farm",
  ],
] as const;
export const demoArticles: Article[] = topics.map(
  ([title, summary, categoryId, art], i) => ({
    id: `demo-${i + 1}`,
    slug: `sample-story-${i + 1}`,
    title,
    summary,
    body: [
      summary,
      "ఇది వెబ్‌సైట్ రూపకల్పనను చూపించడానికి రూపొందించిన నమూనా కథనం మాత్రమే. ఇందులో నిజమైన సంఘటనలు లేదా తాజా వార్తలు నివేదించడం లేదు.",
      "స్థానిక కథలకు సరైన సందర్భం, స్పష్టమైన మూలాలు, సంపాదకీయ సమీక్ష అవసరం. ఆమోదించిన విషయాలు అందుబాటులోకి వచ్చిన తర్వాత ఈ ప్రదేశంలో ప్రచురించవచ్చు.",
      "పాఠకులు సులభంగా చదవడానికి విశాలమైన పంక్తులు, స్పష్టమైన శీర్షికలు, తెలుగు అక్షరాలకు అనువైన అమరిక ఉపయోగించాం.",
    ],
    categoryId,
    districtId: districts[i % 4].id,
    status: (["draft", "in-review", "scheduled", "published"] as const)[i % 4],
    isDemo: true,
    updatedAt: "2026-10-24T06:00:00Z",
    art,
  }),
);
/** Local demonstration repository. Never interprets demo status as a real publication. */
export const demoRepository = {
  listArticles: () => demoArticles,
  getArticle: (slug: string) => demoArticles.find((a) => a.slug === slug),
  listArchiveEditions: (): ArchiveEdition[] => [],
};
export function canDownloadEdition(edition: EpaperEdition): boolean {
  return (
    edition.availability === "available" &&
    edition.rights === "approved" &&
    Boolean(edition.pdfAssetId)
  );
}
