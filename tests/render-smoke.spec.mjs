import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4000/unaltraweb-template").replace(/\/$/, "");
const renderOut = process.env.RENDER_OUT || "tmp/render-smoke";
const activeProfile = process.env.SITE_PROFILE || "personal";
const startPath = process.env.START_PATH || "/en/";

mkdirSync(renderOut, { recursive: true });

const siteUrl = (path) => `${baseUrl}${path}`;

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

async function expectImageLoaded(locator) {
  await locator.scrollIntoViewIfNeeded();
  await expect
    .poll(async () => locator.evaluate((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0))
    .toBeTruthy();
}

async function expectThemeState(page, theme) {
  const integrationTheme = theme === "dark" ? "dark" : "light";
  const expectedBg = {
    light: ["#fff", "#ffffff"],
    sepia: ["#f3eacb"],
    dark: ["#1c1c1d"],
  }[theme];

  await expect(page.locator("html")).toHaveAttribute("data-theme-setting", theme);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(page.locator("html")).toHaveAttribute("data-theme-integration", integrationTheme);

  const bgVar = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color").trim().toLowerCase());
  expect(expectedBg).toContain(bgVar);
}

async function expectSepiaCoffeeAccent(page) {
  const themeVar = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim().toLowerCase());
  expect(themeVar).toBe("#7a591b");

  const activeNavColor = await page.locator(".navbar .nav-item.active > .nav-link").first().evaluate((link) => getComputedStyle(link).color);
  expect(activeNavColor).toBe("rgb(122, 89, 27)");
  expect(activeNavColor).not.toBe("rgb(26, 115, 232)");
}

test("profile page renders and supports theme modes", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.goto(siteUrl("/en/"));

  await expect(page.locator("html")).toHaveAttribute("data-site-type", "personal");
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "personal");
  await expect(page.locator("body")).toHaveClass(/site-type-personal/);
  await expect(page.locator("body")).toHaveClass(/site-profile-personal/);
  await expect(page.locator(".profile-page-sidebar .profile-card")).toContainText("Roger Tomlinson");
  await expect(page.locator(".profile-card-links a[aria-label='GitHub']")).toHaveCount(1);
  await expect(page.locator(".profile-card-links a[aria-label='ORCID']")).toHaveCount(1);
  const liveNavbar = page.locator(".navbar");
  await expect(liveNavbar).not.toContainText("About");
  await expect(liveNavbar).toContainText("Blog");
  await expect(liveNavbar).toContainText("CV");
  await expect(liveNavbar).toContainText("Projects");
  await expect(page.locator(".developer-mode-switcher")).toContainText("Developer mode");
  await expect(page.locator(".profile-highlights")).toContainText("Selected publications");
  await expect(page.locator(".profile-highlights")).toContainText("Active projects");
  await expect(page.locator(".profile-highlights")).toContainText("Recent posts");
  await expect(page.locator(".profile-highlight-projects .project-card")).toHaveCount(2);
  await expect(page.locator(".post-title")).toHaveCount(0);
  await expect(page.locator("#light-toggle-sepia")).toHaveCount(1);
  await expectImageLoaded(page.locator(".profile-card-avatar"));

  const desktopColumnCount = await page.locator(".profile-page-grid").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(desktopColumnCount).toBeGreaterThanOrEqual(2);

  for (const theme of ["light", "sepia", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await expectThemeState(page, theme);
    await page.screenshot({ path: join(renderOut, `home-${theme}-${testInfo.project.name}.png`), fullPage: true });
  }
});

test("developer mode reports the active real profile", async ({ page }) => {
  await page.goto(siteUrl(startPath));
  await expect(page.locator(".developer-mode-switcher")).toBeVisible();
  await expect(page.locator(".developer-mode-switcher")).toContainText(`Real build profile: ${activeProfile}`);
  await expect(page.locator(".developer-profile-preview")).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", activeProfile);
});

test("project profile renders real project pages", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "project", "project profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "project");
  await expect(page.locator("body")).toHaveClass(/site-profile-project/);
  await expect(page.locator(".navbar-brand")).toContainText("unaltraweb project");
  await expect(page.locator(".navbar")).toContainText("Team");
  await expect(page.locator(".navbar")).toContainText("Outputs");
  await expect(page.locator(".navbar")).toContainText("Resources");
  await expect(page.locator(".navbar")).toContainText("Readings");
  await expect(page.locator(".navbar .dropdown-toggle", { hasText: "Resources" })).toHaveCount(1);
  await expect(page.locator(".navbar .dropdown-menu .dropdown-item", { hasText: "Outputs" })).toHaveAttribute("href", /\/en\/outputs\/?$/);
  await expect(page.locator(".navbar .dropdown-menu .dropdown-item", { hasText: "Readings" })).toHaveAttribute("href", /\/en\/readings\/?$/);
  await expect(page.locator(".navbar")).not.toContainText("Blog");
  await expect(page.locator(".navbar")).not.toContainText("CV");
  await expect(page.locator(".profile-card-avatar")).toHaveCount(0);
  await expect(page.locator(".page-hero .home-hero-title")).toContainText("The project");
  await expect(page.locator(".post-title")).toHaveCount(0);
  await expectImageLoaded(page.locator(".page-hero .home-hero-image"));
  await expect(page.locator("a.dropdown-item[href$='/es/']")).toHaveCount(1);
  await page.screenshot({ path: join(renderOut, `project-home-${testInfo.project.name}.png`), fullPage: true });

  await page.getByRole("link", { name: "Team" }).click();
  await expect(page).toHaveURL(/\/en\/team\/?$/);
  await expect(page.locator(".post-title")).toContainText("Team");
  await expect(page.locator(".team-grid")).toHaveCount(1);
  await expect(page.locator(".team-grid .card")).toHaveCount(5);
  await expect(page.locator(".post > article")).toContainText("Michael Goodchild");
  await expect(page.locator(".post > article")).toContainText("Waldo Tobler");
  await expect.poll(async () => page.locator(".team-icons a[aria-label='ORCID']").count()).toBeGreaterThanOrEqual(5);
  await expectImageLoaded(page.locator(".team-photo").first());

  await page.goto(siteUrl("/en/outputs/"));
  await expect.poll(async () => page.locator(".project-card").count()).toBeGreaterThanOrEqual(2);
  await expect.poll(async () => page.locator(".project-resource-pill", { hasText: "Zenodo dataset" }).count()).toBeGreaterThanOrEqual(1);

  await page.goto(siteUrl("/en/publications/"));
  await expect(page.locator(".publications")).toContainText("Goodchild");
  await expect(page.locator(".publications")).toContainText("Zaragozí");

  await page.goto(siteUrl("/en/resources/"));
  await expect(page.locator(".post > article")).toContainText("Zenodo dataset");
  await expect(page.locator(".post > article")).toContainText("Land inventory layers");

  await page.goto(siteUrl("/en/readings/"));
  await expect(page.locator(".post-title")).toContainText("Readings");
  await expect(page.locator(".reading-shelf")).toHaveCount(1);
  await expect(page.locator(".reading-cover")).toHaveCount(2);
  await expect(page.locator(".reading-shelf")).toContainText("Project Geodata Handbook");
  await expect(page.locator(".reading-shelf")).toContainText("Spatial Data Quality Notes");

  await page.locator(".reading-cover-title", { hasText: "Project Geodata Handbook" }).click();
  await expect(page).toHaveURL(/\/en\/readings\/project-geodata-handbook\/?$/);
  await expect(page.locator(".reading-review")).toContainText("Technical manual");
  await expect(page.locator(".reading-biblio-actions")).toContainText("Bibliographic record");
});

test("sepia mode uses coffee accents", async ({ page }) => {
  await page.goto(siteUrl("/en/publications/"));
  await page.evaluate(() => localStorage.setItem("theme", "sepia"));
  await page.reload();

  await expectThemeState(page, "sepia");
  await expectSepiaCoffeeAccent(page);
});

test("theme toggle rotates through explicit modes", async ({ page }) => {
  await page.goto(siteUrl(startPath));
  await page.evaluate(() => localStorage.setItem("theme", "system"));
  await page.reload();

  const expectedSettings = ["light", "sepia", "dark", "system"];
  for (const expected of expectedSettings) {
    const themeEvent = page.evaluate(() => {
      return new Promise((resolve) => {
        document.addEventListener("unaltraweb:themechange", (event) => resolve(event.detail), { once: true });
      });
    });
    await page.locator("#light-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme-setting", expected);
    const detail = await themeEvent;
    expect(detail.themeSetting).toBe(expected);
  }
});

test("multilingual profile and publications pages render", async ({ page }) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  const pages = [
    ["/en/", ["Roger Tomlinson", "profile-card"]],
    ["/es/", ["Roger Tomlinson", "profile-card"]],
    ["/ca/", ["Roger Tomlinson", "profile-card"]],
    ["/en/blog/", ["Building a reusable academic web template", "Minimal Mistakes", "al-folio", "Bibliometrics"]],
    ["/en/cv/", ["ModernCV-style CV", "assets/pdf/cv.pdf", "make cv-preview"]],
    ["/en/projects/", ["unaltraweb template", "Minimal Mistakes profile pattern", "al-folio refactor", "Journal and article statistics"]],
    ["/en/publications/", ["Goodchild", "Zaragozí", "Gutiérrez", "Bibliometric"]],
  ];

  for (const [path, needles] of pages) {
    await page.goto(siteUrl(path));
    await expect(page.locator("html")).toHaveAttribute("data-site-type", "personal");
    await expect(page.locator("html")).toHaveAttribute("data-site-profile", "personal");
    const html = await page.content();
    for (const needle of needles) {
      expect(html).toContain(needle);
    }
  }
});

test("blog archive paginates demo posts", async ({ page }) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.goto(siteUrl("/en/blog/"));
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);
  await expect(page.locator(".pagination")).toBeVisible();
  await expect(page.locator(".pagination .page-link", { hasText: "2" })).toHaveAttribute("href", /\/en\/blog\/page\/2\/?$/);

  await page.goto(siteUrl("/en/blog/page/2/"));
  await expect(page.locator(".blog-archive")).toContainText("Static sites and slower maintenance");
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);
});

test("CV preview and project cards link to rich project pages", async ({ page }) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.goto(siteUrl("/en/cv/"));
  await expect(page.locator(".cv-download-card")).toContainText("Download PDF");
  await expect(page.locator(".cv-download-button")).toHaveAttribute("href", /assets\/pdf\/cv\.pdf$/);
  await expectImageLoaded(page.locator(".cv-download-preview img"));

  await page.goto(siteUrl("/en/projects/"));
  const firstProject = page.locator(".project-card").first();
  await expect(firstProject).toHaveClass(/has-project-hero/);
  const backgroundImage = await firstProject.evaluate((card) => getComputedStyle(card, "::before").backgroundImage);
  expect(backgroundImage).toContain("canada-gis.svg");
  await expect(firstProject.locator(".project-resource-pill", { hasText: "Zenodo dataset" })).toHaveAttribute("href", /zenodo\.org\/records\/1000001/);
  await expect(firstProject.locator(".si-zenodo")).toHaveCount(1);
  await expect(firstProject.locator("summary")).toHaveCount(0);
  await expect(firstProject.locator(".project-card-hit-area")).toHaveAttribute("href", /\/en\/projects\/canada-gis\/?$/);

  await firstProject.locator(".project-card-hit-area").click();
  await expect(page).toHaveURL(/\/en\/projects\/canada-gis\/?$/);
  await expect(page.locator(".project-resources-page")).toContainText("Zenodo dataset");
  await expect(page.locator(".project-resources-page")).toContainText("Land inventory layers");
  const projectArticle = page.locator(".container[role='main'] .post > article").first();
  await expect(projectArticle).toContainText("Project Snapshot");
  await expect(projectArticle.locator("table").first()).toContainText("National land inventory");
  await expectImageLoaded(projectArticle.locator("img").first());
});

test("mobile profile render is usable", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteUrl("/en/"));

  await expect(page.locator(".profile-page-sidebar .profile-card")).toBeVisible();
  await expect(page.locator(".profile-page-content")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const mobileColumnCount = await page.locator(".profile-page-grid").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(mobileColumnCount).toBe(1);

  await page.screenshot({ path: join(renderOut, `home-mobile-${testInfo.project.name}.png`), fullPage: true });
});

test("publication page does not overflow on mobile", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteUrl("/en/publications/"));

  await expect(page.locator(".publications")).toContainText("Zaragozí");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: join(renderOut, `publications-mobile-${testInfo.project.name}.png`), fullPage: true });
});
