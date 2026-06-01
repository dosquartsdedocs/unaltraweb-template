import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4000/unaltraweb-template").replace(/\/$/, "");
const renderOut = process.env.RENDER_OUT || "tmp/render-smoke";
const activeProfile = process.env.SITE_PROFILE || "personal";
const startPath = process.env.START_PATH || "/en/";
const isTechDocsProfile = ["techdocs", "software"].includes(activeProfile);

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

async function expectCoffeeAccent(page) {
  const themeVar = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim().toLowerCase());
  expect(themeVar).toBe("#7a591b");

  const activeNav = page.locator(".navbar .nav-item.active > .nav-link").first();
  if (await activeNav.count()) {
    const activeNavColor = await activeNav.evaluate((link) => getComputedStyle(link).color);
    expect(activeNavColor).toBe("rgb(122, 89, 27)");
    expect(activeNavColor).not.toBe("rgb(26, 115, 232)");
  }
}

test("profile page renders and supports theme modes", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.goto(siteUrl("/en/"));

  await expect(page.locator("html")).toHaveAttribute("data-site-type", "personal");
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "personal");
  await expect(page.locator("body")).toHaveClass(/site-type-personal/);
  await expect(page.locator("body")).toHaveClass(/site-profile-personal/);
  await expect(page.locator(".profile-page-sidebar .profile-card")).toContainText("John Doe");
  await expect(page.locator(".profile-card-links a[aria-label='GitHub']")).toHaveCount(1);
  await expect(page.locator(".profile-card-links a[aria-label='ORCID']")).toHaveCount(1);
  const profileLinkFontSize = await page.locator(".profile-card-links a[aria-label='ORCID']").evaluate((link) => parseFloat(getComputedStyle(link).fontSize));
  const profileIconFontSize = await page.locator(".profile-card-links a[aria-label='ORCID'] i").evaluate((icon) => parseFloat(getComputedStyle(icon).fontSize));
  expect(profileIconFontSize).toBeGreaterThan(profileLinkFontSize);
  const liveNavbar = page.locator(".navbar");
  await expect(liveNavbar.locator(".navbar-nav .nav-item.active > .nav-link")).toContainText("Home");
  await expect(liveNavbar).not.toContainText("About");
  await expect(liveNavbar).toContainText("Blog");
  await expect(liveNavbar).toContainText("CV");
  await expect(liveNavbar).toContainText("Projects");
  await expect(page.locator(".developer-mode-switcher")).toContainText("Developer mode");
  await expect(page.locator(".profile-highlights")).toContainText("Selected publications");
  await expect(page.locator(".profile-highlights")).toContainText("Active projects");
  await expect(page.locator(".profile-highlights")).toContainText("Recent posts");
  const highlightHeadings = await page.locator(".profile-highlight-heading h2").allTextContents();
  expect(highlightHeadings.indexOf("Recent posts")).toBeLessThan(highlightHeadings.indexOf("Selected publications"));
  await expect(page.locator(".profile-highlight-projects .project-card")).toHaveCount(2);
  await expect(page.locator(".profile-post-list time").first()).toContainText(/\d{1,2} [A-Z][a-z]{2} \d{4}/);
  await expect(page.locator(".profile-post-list time").first()).not.toContainText(/^\d{4}-\d{2}-\d{2}$/);
  await expect(page.locator("footer")).toContainText("Made with");
  await expect(page.locator("footer")).toContainText("unaltraweb");
  await expect(page.locator("footer")).toContainText("unaltreselfie profile");
  await expect(page.locator("footer")).toContainText("al-folio");
  await expect(page.locator("footer")).not.toContainText("Powered by");
  await expect(page.locator("footer")).toContainText(/Last updated: [A-Z][a-z]+ \d{1,2}, \d{4}/);
  await expect(page.locator(".post-title")).toHaveCount(0);
  await expect(page.locator("#light-toggle-sepia")).toHaveCount(1);
  await expectImageLoaded(page.locator(".profile-card-avatar"));

  const desktopColumnCount = await page.locator(".profile-page-grid").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(desktopColumnCount).toBeGreaterThanOrEqual(2);
  const selectedPublicationColumnCount = await page.locator(".profile-highlight-publications .bibliography > li > .row").first().evaluate((row) => getComputedStyle(row).gridTemplateColumns.split(" ").length);
  expect(selectedPublicationColumnCount).toBe(2);

  for (const theme of ["light", "sepia", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.reload();
    await expectThemeState(page, theme);
    await page.screenshot({ path: join(renderOut, `home-${theme}-${testInfo.project.name}.png`), fullPage: true });
  }
});

test("developer mode exposes the local profile switcher", async ({ page }) => {
  await page.goto(siteUrl(startPath));
  await expect(page.locator(".developer-mode-switcher")).toBeVisible();
  await expect(page.locator(".developer-mode-switcher")).toContainText("Developer mode");
  await expect(page.locator(".developer-mode-switcher")).toContainText("Explore a build profile");
  await expect(page.locator(".developer-mode-switcher")).not.toContainText("Real build profile");
  await expect(page.locator("[data-developer-mode-handle]")).toHaveCount(1);
  await expect(page.locator(".developer-profile-link")).toHaveCount(4);
  await expect(page.locator(".developer-profile-link", { hasText: "unaltreselfie" })).toHaveAttribute("href", /:4001\/unaltraweb-template\/en\/?$/);
  await expect(page.locator(".developer-profile-link", { hasText: "unaltreprojecte" })).toHaveAttribute("href", /:4002\/unaltraweb-template\/en\/?$/);
  await expect(page.locator(".developer-profile-link", { hasText: "unaltremanual" })).toHaveAttribute("href", /:4003\/unaltraweb-template\/en\/?$/);
  await expect(page.locator(".developer-profile-link", { hasText: "unaltredocs" })).toHaveAttribute("href", /:4004\/unaltraweb-template\/en\/?$/);
  const switcherTargets = await page.locator(".developer-profile-link").evaluateAll((links) => links.map((link) => link.getAttribute("target")));
  expect(switcherTargets).not.toContain("_blank");
  await expect(page.locator(".developer-profile-link[aria-current='page']")).toHaveCount(1);
  await expect(page.locator(".developer-profile-commands")).toHaveCount(0);
  await expect(page.locator(".developer-mode-switcher")).not.toContainText("make serve");
  const switcherColumns = await page.locator(".developer-profile-switcher").evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length);
  expect(switcherColumns).toBe(2);
  await expect(page.locator(".developer-profile-preview")).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", activeProfile);
});

test("project profile renders real project pages", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "project", "project profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "project");
  await expect(page.locator("body")).toHaveClass(/site-profile-project/);
  await expect(page.locator(".navbar-brand")).toContainText("unaltreprojecte");
  await expect(page.locator(".navbar .navbar-nav .nav-item.active > .nav-link")).toContainText("Project");
  await expect(page.locator(".navbar")).toContainText("Team");
  await expect(page.locator(".navbar")).toContainText("Conferences");
  await expect(page.locator(".navbar")).toContainText("Theses");
  await expect(page.locator(".navbar")).toContainText("Outputs");
  await expect(page.locator(".navbar")).toContainText("Resources");
  await expect(page.locator(".navbar")).toContainText("Readings");
  const topNavLabels = (await page.locator(".navbar .navbar-nav > .nav-item > .nav-link").allTextContents()).map((label) => label.replace(/\s+/g, " ").trim());
  const projectNavIndex = topNavLabels.findIndex((label) => label.includes("Project"));
  const conferencesNavIndex = topNavLabels.findIndex((label) => label.includes("Conferences"));
  const thesesNavIndex = topNavLabels.findIndex((label) => label.includes("Theses"));
  const publicationsNavIndex = topNavLabels.findIndex((label) => label.includes("Publications"));
  expect(projectNavIndex).toBeGreaterThanOrEqual(0);
  expect(conferencesNavIndex).toBeGreaterThanOrEqual(0);
  expect(thesesNavIndex).toBeGreaterThanOrEqual(0);
  expect(publicationsNavIndex).toBeGreaterThanOrEqual(0);
  expect(projectNavIndex).toBeLessThan(conferencesNavIndex);
  expect(conferencesNavIndex).toBeLessThan(thesesNavIndex);
  expect(thesesNavIndex).toBeLessThan(publicationsNavIndex);
  expect(projectNavIndex).toBeLessThan(publicationsNavIndex);
  const projectDropdown = page.locator(".navbar .nav-item.dropdown", { has: page.locator(".dropdown-toggle", { hasText: "Project" }) });
  const resourcesDropdown = page.locator(".navbar .nav-item.dropdown", { has: page.locator(".dropdown-toggle", { hasText: "Resources" }) });
  await expect(projectDropdown.locator(".dropdown-menu")).not.toContainText("Conferences");
  await expect(projectDropdown.locator(".dropdown-menu")).not.toContainText("Theses");
  await expect(resourcesDropdown.locator(".dropdown-menu")).not.toContainText("Conferences");
  await expect(resourcesDropdown.locator(".dropdown-menu")).not.toContainText("Theses");
  await expect(page.locator(".navbar .navbar-nav > .nav-item > .nav-link", { hasText: "Conferences" })).toHaveAttribute("href", /\/en\/conferences\/?$/);
  await expect(page.locator(".navbar .navbar-nav > .nav-item > .nav-link", { hasText: "Theses" })).toHaveAttribute("href", /\/en\/theses\/?$/);
  await expect(page.locator(".navbar .dropdown-toggle", { hasText: "Resources" })).toHaveCount(1);
  await expect(page.locator(".navbar .dropdown-menu .dropdown-item", { hasText: "Outputs" })).toHaveAttribute("href", /\/en\/outputs\/?$/);
  await expect(page.locator(".navbar .dropdown-menu .dropdown-item", { hasText: "Repositories" })).toHaveAttribute("href", /\/en\/repositories\/?$/);
  await expect(page.locator(".navbar .dropdown-menu .dropdown-item", { hasText: "Readings" })).toHaveAttribute("href", /\/en\/readings\/?$/);
  await expect(page.locator(".navbar")).not.toContainText("Blog");
  await expect(page.locator(".navbar")).not.toContainText("CV");
  await expect(page.locator(".profile-card-avatar")).toHaveCount(0);
  await expect(page.locator(".page-hero .home-hero-title")).toContainText("The project");
  await expect(page.locator(".post-title")).toHaveCount(0);
  await expectImageLoaded(page.locator(".page-hero .home-hero-image"));
  await expect(page.locator("a.dropdown-item[href$='/es/']")).toHaveCount(1);
  await page.screenshot({ path: join(renderOut, `project-home-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/team/"));
  await expect(page.locator(".post-title")).toContainText("Team");
  await expect(page.locator(".team-grid")).toHaveCount(1);
  await expect(page.locator(".team-grid .card")).toHaveCount(5);
  await expect(page.locator(".post > article")).toContainText("Maria Demo");
  await expect(page.locator(".post > article")).toContainText("Lina Example");
  await expect.poll(async () => page.locator(".team-icons a[aria-label='ORCID']").count()).toBeGreaterThanOrEqual(5);
  await expectImageLoaded(page.locator(".team-photo").first());
  await page.screenshot({ path: join(renderOut, `project-team-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/outputs/"));
  await expect.poll(async () => page.locator(".project-card").count()).toBeGreaterThanOrEqual(5);
  await expect(page.locator(".post > article")).toContainText("Open geospatial dataset");
  await expect(page.locator(".post > article")).toContainText("Interactive web map");
  await page.screenshot({ path: join(renderOut, `project-outputs-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/publications/"));
  await expect(page.locator(".publications")).toContainText("Goodchild");
  await expect(page.locator(".publications")).toContainText("Zaragozí");
  await expect(page.locator(".publications")).not.toContainText("Practical Handbook");
  await page.screenshot({ path: join(renderOut, `project-publications-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/resources/"));
  await expect(page.locator(".post-title")).toContainText("Resources");
  await expect(page.locator(".post > article")).toContainText("Repositories");
  await page.screenshot({ path: join(renderOut, `project-resources-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/repositories/"));
  await expect(page.locator(".post-title")).toContainText("Repositories");
  await expect(page.locator(".post > article")).toContainText("GitHub repositories");
  await expect(page.locator("a[href='https://github.com/jekyll/jekyll']")).toHaveCount(1);
  await page.screenshot({ path: join(renderOut, `project-repositories-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/theses/"));
  await expect(page.locator(".post-title")).toContainText("Theses");
  await expect(page.locator(".post > article")).toContainText("Walter Christaller");
  await expect(page.locator(".post > article")).toContainText("Defended");
  await page.screenshot({ path: join(renderOut, `project-theses-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/readings/"));
  await expect(page.locator(".post-title")).toContainText("Readings");
  await expect(page.locator(".reading-collection-index")).toContainText("Collections");
  await expect(page.locator(".reading-collection-index")).toContainText("Project manuals");
  await expect(page.locator(".reading-collection-index")).toContainText("Method notes");
  await expect(page.locator(".reading-collection-index")).toContainText("GIS");
  await expect(page.locator(".reading-collection-index")).toContainText("Remote sensing");
  await expect(page.locator(".reading-collection-title")).toHaveCount(4);
  await expect(page.locator(".reading-shelf")).toHaveCount(4);
  await expect(page.locator(".reading-cover")).toHaveCount(12);
  await expect(page.locator(".post > article")).toContainText("Project Geodata Handbook");
  await expect(page.locator(".post > article")).toContainText("Spatial Data Quality Notes");
  await expect(page.locator(".post > article")).toContainText("Applied GIS and Spatial Analysis");
  await expect(page.locator(".post > article")).toContainText("Remote Sensing and Image Interpretation");
  await expect(page.locator(".reading-rating", { hasText: "5/5" }).first()).toBeVisible();
  await expect(page.locator(".reading-ribbon", { hasText: "Available at CRAI" })).toBeVisible();
  const configuredRibbonBackground = await page.locator(".reading-ribbon", { hasText: "Available at CRAI" }).first().evaluate((ribbon) => getComputedStyle(ribbon).backgroundColor);
  expect(configuredRibbonBackground).toBe("rgb(121, 183, 255)");
  await page.screenshot({ path: join(renderOut, `project-readings-${testInfo.project.name}.png`), fullPage: true });

  await page.locator(".reading-cover-title", { hasText: "Project Geodata Handbook" }).click();
  await expect(page).toHaveURL(/\/en\/readings\/project-geodata-handbook\/?$/);
  await expect(page.locator(".reading-review")).toContainText("Technical manual");
  await expect(page.locator(".reading-biblio-actions")).toContainText("Bibliographic record");
  await page.screenshot({ path: join(renderOut, `project-reading-detail-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/readings/calibre-rs-9-image-processing-and-gis-for-remote-sensing-techniques-and-applications/"));
  await expect(page.locator(".reading-review")).toContainText("Image Processing and GIS for Remote Sensing");
  await expect(page.locator(".reading-review")).toContainText("5/5");
  await page.locator(".reading-biblio-actions .abstract").click();
  await expect(page.locator(".reading-biblio-panel.abstract")).toContainText("ISBN");
  await expect(page.locator(".reading-biblio-panel.abstract")).toContainText("9781118724187");
  await page.locator(".reading-biblio-actions .bibtex").click();
  await expect(page.locator(".reading-biblio-panel.bibtex")).toContainText("How to cite");
  await expect(page.locator(".reading-biblio-panel.bibtex")).toContainText("@book");
});


test("manual profile renders a multilingual handbook", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "manual", "manual profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "manual");
  await expect(page.locator("body")).toHaveClass(/site-profile-manual/);
  await expect(page.locator(".navbar-brand")).toContainText("unaltremanual");
  await expect(page.locator(".manual-cover h1")).toContainText("unaltremanual");
  await expect(page.locator(".manual-sidebar")).toContainText("Contents");
  await expect(page.locator(".manual-sidebar")).toContainText("How this manual works");
  await expect(page.locator(".manual-sidebar")).toContainText("Assessment workflow");
  await expect(page.locator(".manual-sidebar")).toContainText("Bibliography");
  await expect(page.locator(".manual-reference-link")).toContainText("Bibliography");
  await expect(page.locator(".manual-reference-link .manual-chapter-number--blank")).toBeHidden();
  await expect(page.locator(".manual-nav .manual-sidebar-heading", { hasText: "Bibliography" })).toHaveCount(0);
  const manualNavText = (await page.locator(".manual-nav").innerText()).toLowerCase();
  expect(manualNavText.indexOf("cover")).toBeLessThan(manualNavText.indexOf("contents"));
  await expect(page.locator(".manual-font-nav")).toHaveCount(1);
  await expect(page.locator(".manual-teachers")).toContainText("Jane Doe");
  await expect(page.locator(".manual-teachers .team-grid")).toHaveCount(1);
  await expectImageLoaded(page.locator(".manual-cover-art img"));
  await page.screenshot({ path: join(renderOut, `manual-home-${testInfo.project.name}.png`), fullPage: true });

  await page.getByRole("link", { name: /How this manual works/ }).first().click();
  await expect(page).toHaveURL(/\/en\/chapters\/orientation\/?$/);
  await expect(page.locator(".manual-chapter-header h1")).toContainText("How this manual works");
  await expect(page.locator(".manual-sidebar-item.active")).toContainText("How this manual works");
  await expect(page.locator("[data-callout='info']")).toContainText("NOTE");
  await expect(page.locator("[data-callout='objectives']")).toContainText("LEARNING OBJECTIVES");
  await expect(page.locator(".manual-chapter-header h1 .hd-num")).toContainText("1");
  await expect(page.locator(".manual-content h2 .hd-num").first()).toContainText("1.1");
  await expect(page.locator(".manual-right-rail")).toBeVisible();
  await expect(page.locator(".manual-right-rail")).toContainText("On this chapter");
  await expect(page.locator(".manual-page-toc")).toContainText("1.1 Reading path");
  await expect(page.locator(".manual-page-toc-link").first()).toContainText("1.1 Reading path");
  await expect(page.locator(".manual-page-toc a.active")).toContainText("1.1 Reading path");
  await expect(page.locator(".md-figcaption .figlabel").first()).toContainText("Figure 1.");
  await expect(page.locator(".md-table")).toHaveCount(1);
  await expect(page.locator(".md-table-caption .figlabel").first()).toContainText("Table 1.");
  await expect(page.locator(".md-table")).toContainText("Manual components checked in this chapter");
  await expect(page.locator(".md-table")).toContainText("Sidebar");
  await expect(page.locator(".md-figure img[src$='manual-flow.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-figure.mermaid-figure img[src$='manual-flow.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".manual-bibliography .manual-reference")).toContainText("Goodchild");
  await expect(page.locator(".manual-bibliography")).not.toContainText("Bibliometrics");
  await expect(page.locator(".manual-bibliography h2.bibliography").first()).toBeHidden();
  await expect(page.locator(".altmetric-embed, .__dimensions_badge_embed__")).toHaveCount(0);
  await page.locator(".manual-content h2", { hasText: "Diagram workflow" }).evaluate((node) => node.scrollIntoView({ block: "start" }));
  await expect(page.locator(".manual-page-toc a.active")).toContainText("1.2 Diagram workflow");
  await page.screenshot({ path: join(renderOut, `manual-chapter-${testInfo.project.name}.png`), fullPage: true });

  await page.locator("[data-content-search]").fill("coordinate");
  await expect(page.locator("[data-content-search-results]")).toContainText("Data and tools");
  await page.locator("[data-content-search]").fill("Practical Handbook");
  await expect(page.locator("[data-content-search-results]")).toContainText("Bibliography");
  await page.screenshot({ path: join(renderOut, `manual-search-${testInfo.project.name}.png`), fullPage: true });

  const beforeFontSize = await page.locator(".manual-content").evaluate((node) => getComputedStyle(node).fontSize);
  await page.locator("#navbarManualFontDropdown").click();
  await page.locator(".manual-font-menu [data-manual-font='increase']").click();
  const afterFontSize = await page.locator(".manual-content").evaluate((node) => getComputedStyle(node).fontSize);
  expect(parseFloat(afterFontSize)).toBeGreaterThan(parseFloat(beforeFontSize));

  await page.locator("[data-manual-sidebar-toggle]").click();
  await expect(page.locator(".manual-layout")).toHaveClass(/manual-sidebar-collapsed/);
  await expect(page.locator(".manual-sidebar")).toBeHidden();
  await expect(page.locator(".manual-right-rail")).toBeHidden();
  await page.locator("[data-manual-sidebar-toggle]").click();

  await page.goto(siteUrl("/en/chapters/data-tools/"));
  await expect(page.locator("code.language-plaintext.highlighter-rouge", { hasText: "ST_Transform" })).toHaveCount(1);
  await expect(page.locator(".language-bash.highlighter-rouge")).toContainText("ogrinfo");
  await expect(page.locator(".language-bash.highlighter-rouge")).toContainText("mkdir");
  await expect(page.locator(".language-powershell.highlighter-rouge")).toContainText("New-Item");
  await expect(page.locator(".language-powershell.highlighter-rouge")).toContainText("ogrinfo");
  await expect(page.locator(".language-sql.highlighter-rouge")).toContainText("ST_Area");
  await expect(page.locator(".language-sql.highlighter-rouge span.k").first()).toContainText("SELECT");
  await expect(page.locator(".language-python.highlighter-rouge")).toContainText("geopandas");
  await expect(page.locator(".language-r.highlighter-rouge")).toContainText("st_transform");
  await expect(page.locator(".language-haskell.highlighter-rouge")).toContainText("manhattan");
  await expect(page.locator(".manual-references .manual-reference")).toContainText("Goodchild");
  await expect(page.locator(".manual-references .manual-reference--with-preview")).toHaveCount(0);
  await expect(page.locator(".manual-references .manual-reference-links .cite")).toHaveCount(0);
  await page.screenshot({ path: join(renderOut, `manual-code-fences-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/chapters/figures-diagrams/"));
  await expect(page.locator(".md-subfigure-set")).toHaveCount(1);
  await expect(page.locator(".md-subfigure")).toHaveCount(3);
  await page.screenshot({ path: join(renderOut, `manual-figures-diagrams-${testInfo.project.name}.png`), fullPage: true });
  await page.locator(".md-subfigure img").first().click();
  await expect(page.locator(".medium-zoom-overlay")).toBeVisible();
  await expect(page.locator(".medium-zoom-image--opened")).toHaveCount(1);

  await page.goto(siteUrl("/en/bibliography/"));
  await expect(page.locator(".manual-chapter")).toHaveAttribute("data-manual-numbered", "false");
  await expect(page.locator(".manual-chapter-header h1")).toContainText("Bibliography");
  await expect(page.locator(".manual-chapter-header h1 .hd-num")).toHaveCount(0);
  await expect(page.locator(".manual-right-rail")).toContainText("On this page");
  await expect(page.locator(".manual-chapter-nav")).toHaveCount(0);
  await expect(page.locator("#manual-selected-readings-title")).toContainText("Selected readings");
  await expect(page.locator("#manual-more-readings-title")).toContainText("More readings");
  await expect(page.locator(".manual-featured-reference")).toHaveCount(3);
  await expect(page.locator(".manual-featured-authors").first()).toContainText("Samantha Lavender");
  const originalViewport = page.viewportSize();
  await page.setViewportSize({ width: 720, height: 900 });
  await page.locator(".manual-featured-reference").first().scrollIntoViewIfNeeded();
  const featuredCoverBox = await page.locator(".manual-featured-cover").first().boundingBox();
  const featuredBodyBox = await page.locator(".manual-featured-reference-body").first().boundingBox();
  expect(featuredCoverBox).not.toBeNull();
  expect(featuredBodyBox).not.toBeNull();
  expect(Math.ceil(featuredCoverBox.x + featuredCoverBox.width)).toBeLessThanOrEqual(Math.floor(featuredBodyBox.x));
  expect(Math.floor(featuredBodyBox.x - (featuredCoverBox.x + featuredCoverBox.width))).toBeGreaterThanOrEqual(16);
  if (originalViewport) await page.setViewportSize(originalViewport);
  await expect(page.locator(".manual-bibliography .manual-reference-links .cite")).toHaveCount(0);
  await expect(page.locator(".manual-chapter")).not.toContainText("How to cite (APA)");
  await page.locator(".manual-featured-reference .manual-reference-links .bibtex").first().click();
  await expect(page.locator(".manual-featured-reference .bibtex.hidden").first()).toHaveClass(/open/);
  await expect(page.locator(".manual-featured-reference .bibtex.hidden").first()).toContainText("@book");
  await expect(page.locator(".manual-other-bibliography .manual-reference")).toHaveCount(9);
  await expect(page.locator(".manual-content")).toContainText("Geographic Information Science and Systems");
  await expect(page.locator(".manual-content")).toContainText("Remote Sensing and Image Interpretation");
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "A classic" })).toBeVisible();
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "Available at CRAI" })).toBeVisible();
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "URV teacher" })).toBeVisible();
  await expect(page.locator(".manual-other-bibliography")).toContainText("Geographical Information Science");
  await expect(page.locator(".manual-reference-preview img[data-zoomable]")).toHaveCount(9);
  await expect(page.locator(".manual-featured-cover img[data-zoomable]")).toHaveCount(3);
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .manual-reference-links a[href*='doi.org']")).toContainText("DOI");
  await page.locator("#gutierrezProfilingTouristsUse2020 .manual-reference-links .abstract").click();
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .abstract.hidden")).toHaveClass(/open/);
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .abstract.hidden")).toContainText("Data collected through smart travel cards");
  const manualOtherReferences = await page.locator(".manual-other-bibliography .manual-reference-text").allTextContents();
  expect(manualOtherReferences[0]).toContain("2023");
  expect(manualOtherReferences[manualOtherReferences.length - 1]).toContain("1992");
  await expect(page.locator(".reading-rating", { hasText: "5/5" }).first()).toBeVisible();
  await page.screenshot({ path: join(renderOut, `manual-bibliography-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/ca/chapters/orientacio/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "ca");
  await expect(page.locator(".manual-chapter-header h1")).toContainText("Com funciona aquest manual");
  await expect(page.locator(".md-figcaption .figlabel").first()).toContainText("Figura 1.");
  await expect(page.locator(".md-table-caption .figlabel").first()).toContainText("Taula 1.");
  await page.screenshot({ path: join(renderOut, `manual-ca-chapter-${testInfo.project.name}.png`), fullPage: true });
});

test("techdocs profile renders the documentation collection", async ({ page }, testInfo) => {
  test.skip(!isTechDocsProfile, "techdocs profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", activeProfile);
  await expect(page.locator("body")).toHaveClass(new RegExp(`site-profile-${activeProfile}`));
  await expect(page.locator(".documentation-hero h1")).toContainText("unaltredocs");
  await expect(page.locator(".documentation-sidebar")).toContainText("What is unaltraweb?");
  await expect(page.locator(".documentation-sidebar")).toContainText("Site profiles");
  await expect(page.locator(".documentation-sidebar")).toContainText("Build");
  await expect(page.locator(".documentation-sidebar")).toContainText("Table of contents");
  await expect(page.locator(".documentation-sidebar")).toContainText("Authoring");
  await expect(page.locator(".documentation-sidebar")).toContainText("Operations");
  await expect(page.locator(".documentation-card")).toHaveCount(22);
  await expectImageLoaded(page.locator(".documentation-hero img"));
  await page.screenshot({ path: join(renderOut, `techdocs-home-${testInfo.project.name}.png`), fullPage: true });

  const beforeDocsFontSize = await page.locator(".documentation-content").evaluate((node) => getComputedStyle(node).fontSize);
  await expect(page.locator(".documentation-font-dropdown")).toHaveCount(1);
  await expect(page.locator(".documentation-font-menu [data-documentation-font]")).toHaveCount(3);
  await page.locator("#documentationFontDropdown").click();
  await page.locator(".documentation-font-menu [data-documentation-font='increase']").click();
  const afterDocsFontSize = await page.locator(".documentation-content").evaluate((node) => getComputedStyle(node).fontSize);
  expect(parseFloat(afterDocsFontSize)).toBeGreaterThan(parseFloat(beforeDocsFontSize));

  await page.locator("[data-content-search]").fill("profiles");
  await expect(page.locator("[data-content-search-results]")).toContainText("Site profiles");
  await page.screenshot({ path: join(renderOut, `techdocs-search-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/profile-checklist/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Profile feature checklist");
  await expect(page.locator(".profile-feature-matrix")).toContainText("unaltredocs");
  await page.screenshot({ path: join(renderOut, `techdocs-profile-matrix-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/reusable-profile-pages/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Reusable profile pages and layouts");
  await expect(page.locator(".documentation-content")).toContainText("Team page");
  await expect(page.locator(".documentation-content")).toContainText("Calibre libraries");
  await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", /\/en\/docs\/reusable-profile-pages\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='es']")).toHaveAttribute("href", /\/es\/docs\/paginas-reutilizables\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='ca']")).toHaveAttribute("href", /\/ca\/docs\/pagines-reutilitzables\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='x-default']")).toHaveAttribute("href", /\/en\/docs\/reusable-profile-pages\/?$/);
  await page.screenshot({ path: join(renderOut, `techdocs-reusable-pages-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/documentation-collection/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Documentation collection");
  await expect(page.locator(".documentation-content")).toContainText("Documentation sidebar");
  await page.screenshot({ path: join(renderOut, `techdocs-documentation-collection-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/workflow/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Build workflow");
  await expect(page.locator(".documentation-page-nav")).toContainText("Next");
  await expect(page.locator(".documentation-page-nav")).toContainText("GitHub Actions in child sites");
  await page.screenshot({ path: join(renderOut, `techdocs-workflow-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/technical-examples/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Technical examples");
  await expect(page.locator(".documentation-content")).toContainText("flowchart LR");
  await page.screenshot({ path: join(renderOut, `techdocs-technical-examples-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/markdown-syntax-sugar/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Markdown syntax sugar");
  await expect(page.locator(".documentation-content")).toContainText("Callout shorthand");
  await expect(page.locator(".documentation-content")).toContainText("Subfigure compositions");
  await expect(page.locator(".documentation-content")).toContainText("Mermaid source files as SVG figures");
  await page.screenshot({ path: join(renderOut, `techdocs-markdown-syntax-sugar-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/profile-screenshots/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Profile screenshots");
  await expect(page.locator("img[src$='manual-search-chromium.png']")).toHaveCount(1);
  await expect(page.locator("img[src$='techdocs-profile-matrix-chromium.png']")).toHaveCount(1);
  await page.screenshot({ path: join(renderOut, `techdocs-profile-screenshots-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/multilingual-seo/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Multilingual SEO");
  await expect(page.locator(".documentation-content")).toContainText("self-referencing canonical URL");
  await expect(page.locator(".documentation-content")).toContainText("hreflang");
  await page.screenshot({ path: join(renderOut, `techdocs-multilingual-seo-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/es/docs/que-es-unaltraweb/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator(".documentation-page-header h1")).toContainText("¿Qué es unaltraweb?");
  await expect(page.locator(".documentation-sidebar")).toContainText("Perfiles de sitio");
  await page.screenshot({ path: join(renderOut, `techdocs-es-page-${testInfo.project.name}.png`), fullPage: true });
});

test("coffee mode uses coffee accents", async ({ page }) => {
  await page.goto(siteUrl(startPath));
  await page.evaluate(() => localStorage.setItem("theme", "sepia"));
  await page.reload();

  await expectThemeState(page, "sepia");
  await expectCoffeeAccent(page);
  if (isTechDocsProfile) {
    await expect(page.locator("[data-documentation-theme-label]")).toContainText("Coffee");
  }
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

test("callout shorthand upgrades nested blockquotes", async ({ page }, testInfo) => {
  await page.goto(siteUrl(startPath));

  await page.evaluate(() => {
    const article = document.querySelector(".post article, .manual-content, .documentation-content, main");
    const fixture = document.createElement("div");
    fixture.setAttribute("data-callout-fixture", "true");
    fixture.innerHTML = `
      <blockquote><p>Plain quotation</p></blockquote>
      <blockquote><blockquote><p>Info callout</p></blockquote></blockquote>
      <blockquote><blockquote><blockquote><blockquote><blockquote><p>Learning goals</p></blockquote></blockquote></blockquote></blockquote></blockquote>
    `;
    article.appendChild(fixture);
    document.dispatchEvent(new CustomEvent("unaltraweb:contentchange", { bubbles: true }));
  });

  await expect(page.locator("[data-callout-fixture] > blockquote").first()).not.toHaveClass(/uw-callout/);
  await expect(page.locator("[data-callout-fixture] [data-callout='info']")).toContainText("NOTE");
  await expect(page.locator("[data-callout-fixture] [data-callout='info']")).toContainText("Info callout");
  await expect(page.locator("[data-callout-fixture] [data-callout='objectives']")).toContainText("LEARNING OBJECTIVES");
  await expect(page.locator("[data-callout-fixture] [data-callout='objectives']")).toContainText("Learning goals");
  await page.locator("[data-callout-fixture]").scrollIntoViewIfNeeded();
  await page.screenshot({ path: join(renderOut, `callouts-${activeProfile}-${testInfo.project.name}.png`), fullPage: true });
});

test("multilingual profile and publications pages render", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  const pages = [
    ["/en/", ["John Doe", "profile-card"]],
    ["/es/", ["Juan Nadie", "profile-card"]],
    ["/ca/", ["Joan Ningu", "profile-card"]],
    ["/en/blog/", ["Building a reusable academic web template", "Minimal Mistakes", "al-folio", "Bibliometrics", "min read"]],
    ["/ca/blog/", ["Construir una plantilla web acadèmica reutilitzable", "Minimal Mistakes", "al-folio", "Bibliometria", "min de lectura"]],
    ["/es/blog/", ["Construir una plantilla web académica reutilizable", "Minimal Mistakes", "al-folio", "Bibliometría", "min de lectura"]],
    ["/en/cv/", ["ModernCV-style CV", "assets/pdf/cv.pdf", "make cv-preview"]],
    ["/en/projects/", ["unaltraweb template", "Minimal Mistakes profile pattern", "al-folio refactor", "Journal and article statistics"]],
    ["/ca/projectes/", ["Projectes", "unaltraweb template", "Minimal Mistakes profile pattern", "al-folio refactor"]],
    ["/es/proyectos/", ["Proyectos", "unaltraweb template", "Minimal Mistakes profile pattern", "al-folio refactor"]],
    ["/en/publications/", ["Goodchild", "Zaragozí", "Gutiérrez", "Bibliometric"]],
    ["/en/readings/", ["Readings", "GIS", "Remote sensing", "Applied GIS and Spatial Analysis", "Remote Sensing and Image Interpretation"]],
  ];

  for (const [path, needles] of pages) {
    await page.goto(siteUrl(path));
    await expect(page.locator("html")).toHaveAttribute("data-site-type", "personal");
    await expect(page.locator("html")).toHaveAttribute("data-site-profile", "personal");
    const html = await page.content();
    for (const needle of needles) {
      expect(html).toContain(needle);
    }
    if (path === "/ca/") {
      await expect(page.locator("footer")).toContainText("Fet amb");
      await expect(page.locator("footer")).toContainText("perfil unaltreselfie");
      await expect(page.locator("footer")).toContainText("basat en");
      await expect(page.locator("footer")).not.toContainText("Drets d'autor");
      await expect(page.locator("footer")).toContainText(/Darrera actualització: \d{2}\/\d{2}\/\d{4}/);
      await page.screenshot({ path: join(renderOut, `personal-ca-home-${testInfo.project.name}.png`), fullPage: true });
    }
    if (["/en/blog/", "/en/cv/", "/en/projects/", "/en/publications/", "/en/readings/"].includes(path)) {
      const slug = path.replace(/^\/en\//, "").replace(/\/$/, "");
      await page.screenshot({ path: join(renderOut, `personal-${slug}-${testInfo.project.name}.png`), fullPage: true });
    }
  }
});

test("blog archive paginates demo posts", async ({ page }) => {
  test.skip(activeProfile !== "personal", "personal profile only");
  await page.goto(siteUrl("/en/blog/"));
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);
  await expect(page.locator(".blog-archive-range")).toContainText("Posts from");
  await expect(page.locator(".blog-archive-meta time").first()).toContainText(/[A-Z][a-z]{2} \d{1,2}, \d{4}/);
  await expect(page.locator(".blog-archive-meta time").first()).not.toContainText(/^\d{4}-\d{2}-\d{2}$/);
  await expect(page.locator(".blog-archive-meta .post-reading-time").first()).toContainText(/\d+ min read/);
  await expect(page.locator(".pagination")).toBeVisible();
  await expect(page.locator(".pagination .page-link", { hasText: "2" })).toHaveAttribute("href", /\/en\/blog\/page\/2\/?$/);

  await page.goto(siteUrl("/en/blog/page/2/"));
  await expect(page.locator(".post-title")).toHaveText("Blog");
  await expect(page.locator(".blog-archive")).toContainText("Static sites and slower maintenance");
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);

  await page.goto(siteUrl("/ca/blog/"));
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);
  await expect(page.locator(".blog-archive")).toContainText("Entrades del");
  await expect(page.locator(".blog-archive")).toContainText("Construir una plantilla web acadèmica reutilitzable");
  await expect(page.locator(".blog-archive")).not.toContainText("Building a reusable academic web template");
  await expect(page.locator(".blog-archive-meta time").first()).toContainText(/\d{2}\/\d{2}\/\d{4}/);

  await page.goto(siteUrl("/es/blog/"));
  await expect(page.locator(".blog-archive-item")).toHaveCount(4);
  await expect(page.locator(".blog-archive")).toContainText("Entradas del");
  await expect(page.locator(".blog-archive")).toContainText("Construir una plantilla web académica reutilizable");
  await expect(page.locator(".blog-archive")).not.toContainText("Building a reusable academic web template");
  await expect(page.locator(".blog-archive-meta time").first()).toContainText(/\d{2}\/\d{2}\/\d{4}/);
});

test("CV preview and project cards link to rich project pages", async ({ page }, testInfo) => {
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
  await page.screenshot({ path: join(renderOut, `personal-project-detail-${testInfo.project.name}.png`), fullPage: true });
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

  if (isTechDocsProfile) {
    await page.goto(siteUrl("/en/docs/what-is-unaltraweb/"));
    await expect(page.locator(".documentation-layout")).toBeVisible();
    await expect(page.locator(".documentation-layout")).toHaveClass(/documentation-toc-collapsed/);
    await expect(page.locator(".documentation-tools")).toBeVisible();
    await expect(page.locator(".documentation-search")).toBeVisible();
    await expect(page.locator(".documentation-nav")).toBeHidden();
    await page.locator("[data-documentation-sidebar-toggle]").click();
    await expect(page.locator(".documentation-layout")).not.toHaveClass(/documentation-toc-collapsed/);
    await expect(page.locator(".documentation-nav")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: join(renderOut, `techdocs-mobile-${testInfo.project.name}.png`), fullPage: true });
    return;
  }

  if (activeProfile === "manual") {
    await page.goto(siteUrl("/en/"));
    await expect(page.locator(".manual-layout")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: join(renderOut, `manual-mobile-${testInfo.project.name}.png`), fullPage: true });
    return;
  }

  await page.goto(siteUrl("/en/publications/"));
  await expect(page.locator(".publications")).toContainText("Zaragozí");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: join(renderOut, `${activeProfile}-publications-mobile-${testInfo.project.name}.png`), fullPage: true });
});
