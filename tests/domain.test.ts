import test from "node:test";
import assert from "node:assert/strict";
import {
  articleInputSchema,
  archiveFilterSchema,
  scheduleSchema,
} from "../packages/validation/src";
import {
  canDownloadEdition,
  demoRepository,
  type ArchiveEdition,
} from "../packages/core/src";
import { hasCapability } from "../packages/auth/src";
test("article input rejects empty and short content, accepts Telugu and trims", () => {
  assert.equal(
    articleInputSchema.safeParse({
      title: "",
      summary: "",
      body: "",
      categoryId: "",
    }).success,
    false,
  );
  const result = articleInputSchema.parse({
    title: "  మన ఊరి కథనాలకు కొత్త ఆరంభం  ",
    summary: "స్థానిక జీవితానికి అద్దం పట్టే నమూనా కథనం.",
    body: "ఇది ప్రదర్శన కోసం మాత్రమే రూపొందించిన నమూనా కథనం. ఇందులో నిజమైన సంఘటనలను నివేదించడం లేదు.",
    categoryId: "districts",
  });
  assert.equal(result.title, "మన ఊరి కథనాలకు కొత్త ఆరంభం");
});
test("archive selectors reject invalid date ranges", () => {
  assert.equal(archiveFilterSchema.safeParse({ year: 1998 }).success, false);
  assert.equal(archiveFilterSchema.safeParse({ month: 13 }).success, false);
  assert.equal(
    archiveFilterSchema.safeParse({ date: "2026-02-30" }).success,
    false,
  );
  assert.equal(
    archiveFilterSchema.safeParse({ year: 1999, month: 1, date: "1999-01-01" })
      .success,
    true,
  );
});
test("download requires availability, approved rights and an asset", () => {
  const e: ArchiveEdition = {
    id: "test",
    publication: "aarambham",
    issueDate: "1999-01-01",
    availability: "pending",
    rights: "pending",
    ocrStatus: "not-started",
    metadataVerified: false,
  };
  assert.equal(canDownloadEdition(e), false);
  assert.equal(
    canDownloadEdition({ ...e, availability: "available", pdfAssetId: "scan" }),
    false,
  );
  assert.equal(
    canDownloadEdition({ ...e, availability: "available", rights: "approved" }),
    false,
  );
  assert.equal(
    canDownloadEdition({
      ...e,
      availability: "available",
      rights: "approved",
      pdfAssetId: "scan",
    }),
    true,
  );
});
test("reporter cannot publish or manage users under proposed policy", () => {
  assert.equal(hasCapability("reporter", "write"), true);
  assert.equal(hasCapability("reporter", "publish"), false);
  assert.equal(hasCapability("reporter", "manage-users"), false);
  assert.equal(hasCapability("editor", "review"), true);
  assert.equal(hasCapability("admin", "configure"), false);
  assert.equal(hasCapability("super-admin", "configure"), true);
});
test("sample content never implies archive availability or real events", () => {
  assert.equal(demoRepository.listArchiveEditions().length, 0);
  assert.ok(demoRepository.listArticles().every((a) => a.isDemo));
  assert.equal(demoRepository.getArticle("missing"), undefined);
  assert.equal(
    new Set(demoRepository.listArticles().map((a) => a.slug)).size,
    demoRepository.listArticles().length,
  );
});
test("schedule contract rejects past or timezone-free dates", () => {
  assert.equal(scheduleSchema.safeParse("2000-01-01T00:00:00Z").success, false);
  assert.equal(scheduleSchema.safeParse("2099-01-01T09:00:00").success, false);
  assert.equal(
    scheduleSchema.safeParse("2099-01-01T09:00:00+05:30").success,
    true,
  );
});
function luminance(hex: string) {
  const rgb = hex
    .replace("#", "")
    .match(/../g)!
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
test("principal normal-text color pairs meet WCAG AA", () => {
  for (const [fg, bg] of [
    ["#173B8F", "#FFFFFF"],
    ["#1A2433", "#FFFFFF"],
    ["#526071", "#FFFFFF"],
    ["#526071", "#FFF8DB"],
    ["#B4232A", "#FFFFFF"],
    ["#A95200", "#FFFFFF"],
    ["#7C4400", "#FFF3DC"],
    ["#FFFFFF", "#173B8F"],
  ]) {
    const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    assert.ok((values[0] + 0.05) / (values[1] + 0.05) >= 4.5, `${fg} on ${bg}`);
  }
});
