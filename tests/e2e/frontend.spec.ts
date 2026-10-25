import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";
const web = "http://127.0.0.1:3000";
const admin = "http://127.0.0.1:3001";
test("public routes, article, unknown route and index protections", async ({
  page,
  request,
}) => {
  await page.goto(web);
  await expect(
    page.getByText("Provisional text masthead").first(),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page.locator(".story-lead h2 a").click();
  await expect(page.locator("h1")).toContainText("మన ఊరు");
  for (const route of [
    "latest",
    "andhra-pradesh",
    "telangana",
    "districts",
    "national",
    "international",
    "politics",
    "education-jobs",
    "business-agriculture",
    "health-ayurveda",
    "video",
    "epaper",
    "archives",
    "about",
    "our-legacy",
    "editorial-team",
    "contact",
    "privacy",
    "editorial-policy",
    "corrections-policy",
    "terms",
  ]) {
    const response = await request.get(`${web}/${route}`);
    expect(response.status(), route).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
  expect((await request.get(`${web}/missing-page`)).status()).toBe(404);
});
test("district query and empty search can be reset", async ({ page }) => {
  await page.goto(`${web}/districts?district=guntur`);
  await expect(page.getByLabel("జిల్లా", { exact: true })).toHaveValue(
    "guntur",
  );
  await page.getByLabel("కథనాల శోధన").fill("no-result");
  await expect(page.getByText("కథనాలు కనుగొనబడలేదు")).toBeVisible();
  await page.getByRole("button", { name: "ఫిల్టర్లు తొలగించండి" }).click();
  await expect(page.locator(".story-card")).toHaveCount(9);
});
test("archive cannot imply edition or download availability", async ({
  page,
}) => {
  await page.goto(`${web}/archives`);
  await page.getByLabel("సంవత్సరం").selectOption("1999");
  await expect(page.getByText("0 verified editions")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Download unavailable" }),
  ).toBeDisabled();
  await page.getByLabel("తేదీ", { exact: true }).fill("2020-02-12");
  await expect(page.getByLabel("సంవత్సరం")).toHaveValue("2020");
});
test("portal login is honest and all screens resolve", async ({
  page,
  request,
}) => {
  await page.goto(`${admin}/login`);
  await expect(
    page.getByRole("button", { name: "Sign in unavailable" }),
  ).toBeDisabled();
  await expect(page.locator("input[type=password]")).toHaveCount(0);
  await page.getByRole("link", { name: "Open frontend demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Your newsroom, at a glance." }),
  ).toBeVisible();
  for (const route of [
    "articles",
    "drafts",
    "approvals",
    "scheduled",
    "published",
    "categories",
    "districts",
    "reporters",
    "media",
    "epaper",
    "archives",
    "homepage",
    "advertisements",
    "analytics",
    "users",
    "audit",
    "settings",
  ])
    expect((await request.get(`${admin}/${route}`)).status(), route).toBe(200);
});
test("local draft validates, saves, survives reload and remains unpublished", async ({
  page,
}) => {
  await page.goto(`${admin}/articles/new`);
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page.getByText("Use at least 8 characters.")).toBeVisible();
  await page
    .getByLabel("Telugu headline")
    .fill("తెలుగు పాఠకుల కోసం నమూనా కథనం");
  await page
    .getByLabel("Summary")
    .fill("ఇది నమూనా కథనం మాత్రమే. వాస్తవ సంఘటన కాదు.");
  await page
    .getByLabel("Article body")
    .fill(
      "ఈ నమూనా కథనం వెబ్‌సైట్ రూపకల్పనను చూపించడానికి రూపొందించబడింది. ఇందులో నిజమైన సంఘటనలను నివేదించడం లేదు.",
    );
  await page.getByLabel("Category", { exact: true }).selectOption("districts");
  await page.getByRole("button", { name: "Save demo draft" }).click();
  await expect(page).toHaveURL(/local-.*\/edit/);
  await page.reload();
  await expect(page.getByLabel("Telugu headline")).toHaveValue(
    "తెలుగు పాఠకుల కోసం నమూనా కథనం",
  );
  await expect(
    page.getByRole("button", { name: "Publish unavailable", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("link", { name: "All stories", exact: false })
    .last()
    .click();
  await expect(
    page
      .locator(".table-story")
      .filter({ hasText: "తెలుగు పాఠకుల కోసం నమూనా కథనం" }),
  ).toBeVisible();
  await page.goto(`${admin}/settings`);
  await page.getByRole("button", { name: "Clear local demo drafts" }).click();
  await page.goto(`${admin}/articles`);
  await expect(
    page
      .locator(".table-story")
      .filter({ hasText: "తెలుగు పాఠకుల కోసం నమూనా కథనం" }),
  ).toHaveCount(0);
});
for (const width of [390, 768, 1440])
  test(`responsive layouts ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const url of [
      web,
      `${web}/archives`,
      `${web}/article/sample-story-1`,
      `${admin}/dashboard`,
      `${admin}/articles/new`,
    ]) {
      await page.goto(url);
      await expect(page.locator("main h1")).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: testInfo.outputPath(
          new URL(url).port +
            new URL(url).pathname.replaceAll("/", "-") +
            ".png",
        ),
        fullPage: true,
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        url,
      ).toBeTruthy();
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Toggle navigation" }).click();
      await expect(
        page.getByRole("link", { name: "Analytics", exact: false }),
      ).toBeVisible();
    }
  });

for (const path of [
  web,
  `${web}/archives`,
  `${admin}/dashboard`,
  `${admin}/articles/new`,
  `${admin}/login`,
]) {
  test(`automated accessibility ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const separator of ["\n\n", "\n \n\n\n"]) {
  test(`minimum-length draft preserves paragraph separator ${JSON.stringify(separator)}`, async ({
    page,
  }) => {
    const paragraphLength = (50 - separator.length) / 2;
    const body =
      "A".repeat(Math.floor(paragraphLength)) +
      separator +
      "B".repeat(Math.ceil(paragraphLength));
    expect(body.length).toBe(50);
    await page.goto(`${admin}/articles/new`);
    await page
      .getByLabel("Telugu headline")
      .fill("Paragraph boundary regression");
    await page
      .getByLabel("Summary")
      .fill("Demonstration draft for paragraph preservation.");
    await page.getByLabel("Article body").fill(body);
    await page
      .getByLabel("Category", { exact: true })
      .selectOption("districts");
    await page.getByRole("button", { name: "Save demo draft" }).click();
    await expect(page).toHaveURL(/local-.*\/edit/);
    const savedUrl = page.url();
    await page.reload();
    await expect(page.getByLabel("Article body")).toHaveValue(body);
    await page.goto(`${admin}/articles/demo-1/edit`);
    await expect(page.getByLabel("Telugu headline")).not.toHaveValue("");
    await page.getByRole("button", { name: "Save demo draft" }).click();
    await expect(page.getByRole("status")).toContainText("Demo draft saved");
    await page.goto(savedUrl);
    await expect(page.getByLabel("Article body")).toHaveValue(body);
  });
}
