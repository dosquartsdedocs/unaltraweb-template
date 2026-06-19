import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4000/unaltraweb-template").replace(/\/$/, "");
const renderOut = process.env.RENDER_OUT || "tmp/render-smoke";
const activeProfile = process.env.SITE_PROFILE || "unaltreselfie";
const startPath = process.env.START_PATH || "/en/";
const isDocsProfile = activeProfile === "unaltredocs";

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

async function expectFigureCaptionBeforeContent(figureLocator) {
  const childOrder = await figureLocator.evaluate((figure) => {
    const children = Array.from(figure.children);
    return {
      caption: children.findIndex((child) => child.classList.contains("md-figcaption")),
      inner: children.findIndex((child) => child.classList.contains("md-figure-inner")),
    };
  });
  expect(childOrder.caption).toBeGreaterThanOrEqual(0);
  expect(childOrder.inner).toBeGreaterThan(childOrder.caption);
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
  test.skip(activeProfile !== "unaltreselfie", "unaltreselfie profile only");
  await page.goto(siteUrl("/en/"));

  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "unaltreselfie");
  await expect(page.locator("body")).toHaveClass(/site-profile-unaltreselfie/);
  await expect(page.locator(".profile-page-sidebar .profile-card")).toContainText("John Doe");
  await expect(page.locator(".profile-card-links a[aria-label='GitHub']")).toHaveCount(1);
  await expect(page.locator(".profile-card-links a[aria-label='ORCID']")).toHaveCount(1);
  const profileLinkFontSize = await page.locator(".profile-card-links a[aria-label='ORCID']").evaluate((link) => parseFloat(getComputedStyle(link).fontSize));
  const profileIconFontSize = await page.locator(".profile-card-links a[aria-label='ORCID'] i").evaluate((icon) => parseFloat(getComputedStyle(icon).fontSize));
  expect(profileIconFontSize).toBeGreaterThan(profileLinkFontSize);
  const liveNavbar = page.locator(".navbar");
  await expect(liveNavbar.locator(".navbar-nav .nav-item.active > .nav-link")).toContainText("Home");
  await expect(liveNavbar).not.toContainText("About");
  await expect(liveNavbar).toContainText("News");
  await expect(liveNavbar).toContainText("Blog");
  await expect(liveNavbar).toContainText("Publications");
  await expect(liveNavbar).toContainText("CV");
  await expect(liveNavbar).toContainText("Projects");
  const personalNavLabels = (await liveNavbar.locator(".navbar-nav > .nav-item > .nav-link").allTextContents()).map((label) => label.replace(/\s+/g, " ").trim());
  const newsNavIndex = personalNavLabels.findIndex((label) => label.includes("News"));
  const blogNavIndex = personalNavLabels.findIndex((label) => label.includes("Blog"));
  const publicationsNavIndex = personalNavLabels.findIndex((label) => label.includes("Publications"));
  expect(newsNavIndex).toBeGreaterThanOrEqual(0);
  expect(blogNavIndex).toBeGreaterThanOrEqual(0);
  expect(publicationsNavIndex).toBeGreaterThanOrEqual(0);
  expect(newsNavIndex).toBeLessThan(blogNavIndex);
  expect(blogNavIndex).toBeLessThan(publicationsNavIndex);
  await expect(page.locator(".developer-mode-switcher")).toContainText("Developer mode");
  await expect(page.locator(".profile-highlights")).toContainText("Recent News");
  await expect(page.locator(".profile-highlight-news")).toContainText("University GIS podcast");
  await expect(page.locator(".profile-highlight-news .profile-highlight-heading a")).toHaveAttribute("href", /\/en\/news\/?$/);
  await expect(page.locator(".profile-highlights")).toContainText("Selected publications");
  await expect(page.locator(".profile-highlights")).toContainText("Active projects");
  await expect(page.locator(".profile-highlights")).toContainText("Recent posts");
  const highlightHeadings = await page.locator(".profile-highlight-heading h2").allTextContents();
  expect(highlightHeadings.indexOf("Recent News")).toBeLessThan(highlightHeadings.indexOf("Recent posts"));
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
    await page.screenshot({ path: join(renderOut, `home-${theme}-${testInfo.project.name}.png`) });
  }

  await page.goto(siteUrl("/en/projects/"));
  const personalSubfigures = page.locator(".md-subfigure-set[data-layout='abc']");
  await expect(personalSubfigures).toHaveCount(1);
  await expect(personalSubfigures.locator(".md-subfigure-row").first()).toHaveAttribute("data-count", "3");
  await expect(personalSubfigures.locator(".md-subfigure-label").first()).toContainText("a");
  await expectFigureCaptionBeforeContent(personalSubfigures.first());
  const personalSubfigureLabelStyle = await personalSubfigures.locator(".md-subfigure-label").first().evaluate((node) => {
    const style = getComputedStyle(node);
    return { backgroundColor: style.backgroundColor, height: parseFloat(style.height) };
  });
  expect(personalSubfigureLabelStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(personalSubfigureLabelStyle.height).toBeGreaterThan(18);
  await expect(page.locator(".md-figure.mermaid-figure img[src$='diavisuals/flowchart.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-figure.mermaid-figure .md-figcaption")).toContainText("diavisuals style");
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
  test.skip(activeProfile !== "unaltreprojecte", "unaltreprojecte profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "unaltreprojecte");
  await expect(page.locator("body")).toHaveClass(/site-profile-unaltreprojecte/);
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
  await expect(page.locator(".page-hero .home-hero-image")).toHaveAttribute("src", /project-landscape-splash\.svg$/);
  await expectImageLoaded(page.locator(".page-hero .home-hero-image"));
  await expect(page.locator("a.dropdown-item[href$='/es/']")).toHaveCount(1);
  await page.screenshot({ path: join(renderOut, `project-home-${testInfo.project.name}.png`) });

  await page.goto(siteUrl("/en/team/"));
  await expect(page.locator(".post-title")).toContainText("Team");
  await expect(page.locator(".team-grid")).toHaveCount(1);
  await expect(page.locator(".team-grid .card")).toHaveCount(5);
  await expect(page.locator(".post > article")).toContainText("Maria Demo");
  await expect(page.locator(".post > article")).toContainText("Lina Example");
  await expect.poll(async () => page.locator(".team-icons a[aria-label='ORCID']").count()).toBeGreaterThanOrEqual(5);
  await expect.poll(async () => page.locator(".team-icons a[aria-label='Google Scholar']").count()).toBeGreaterThanOrEqual(5);
  await expect.poll(async () => page.locator(".team-icons a[aria-label='LinkedIn']").count()).toBeGreaterThanOrEqual(5);
  await expect.poll(async () => page.locator(".team-icons a[aria-label='Web']").count()).toBeGreaterThanOrEqual(5);
  const firstTeamLinkLabels = await page.locator(".team-grid .card").first().locator(".team-icons a").evaluateAll((links) => links.map((link) => link.getAttribute("aria-label")));
  expect(firstTeamLinkLabels.slice(0, 5)).toEqual(["E-mail", "Web", "ORCID", "Google Scholar", "LinkedIn"]);
  const firstTeamIconColors = await page.locator(".team-grid .card").first().locator(".team-icons a").evaluateAll((links) => links.slice(0, 5).map((link) => getComputedStyle(link.querySelector("i")).color));
  expect(firstTeamIconColors[2]).toBe("rgb(166, 206, 57)");
  expect(firstTeamIconColors[3]).toBe("rgb(66, 133, 244)");
  expect(firstTeamIconColors[4]).toBe("rgb(10, 102, 194)");
  const firstTeamPhotoBox = await page.locator(".team-photo").first().boundingBox();
  const firstTeamPhotoRadius = await page.locator(".team-photo").first().evaluate((node) => getComputedStyle(node).borderRadius);
  if (!firstTeamPhotoBox) throw new Error("Team photo is not visible");
  expect(firstTeamPhotoBox.width).toBeGreaterThanOrEqual(128);
  expect(firstTeamPhotoRadius.includes("%") || parseFloat(firstTeamPhotoRadius) > firstTeamPhotoBox.width * 0.45).toBeTruthy();
  await expectImageLoaded(page.locator(".team-photo").first());
  await page.screenshot({ path: join(renderOut, `project-team-${testInfo.project.name}.png`), fullPage: true });
  const projectTeamDesktopViewport = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteUrl("/en/team/"));
  await expect.poll(async () => page.evaluate(() => matchMedia("(max-width: 575px)").matches)).toBeTruthy();
  await expect.poll(async () => {
    const box = await page.locator(".team-grid .card").first().boundingBox();
    return box ? box.width : 0;
  }).toBeGreaterThan(330);
  const mobileFirstTeamCardBox = await page.locator(".team-grid .card").first().boundingBox();
  const mobileFirstTeamPhotoBox = await page.locator(".team-photo").first().boundingBox();
  const mobileFirstTeamTitleBox = await page.locator(".team-grid .card-title").first().boundingBox();
  const mobileFirstTeamIconsBox = await page.locator(".team-icons").first().boundingBox();
  const mobileFirstTeamBodyAlign = await page.locator(".team-grid .card-body").first().evaluate((node) => getComputedStyle(node).textAlign);
  if (!mobileFirstTeamCardBox || !mobileFirstTeamPhotoBox || !mobileFirstTeamTitleBox || !mobileFirstTeamIconsBox) throw new Error("Mobile team card is not measurable");
  expect(mobileFirstTeamCardBox.width).toBeGreaterThan(330);
  expect(mobileFirstTeamPhotoBox.width).toBeGreaterThan(70);
  expect(mobileFirstTeamPhotoBox.width).toBeLessThanOrEqual(100);
  expect(mobileFirstTeamPhotoBox.x).toBeLessThan(mobileFirstTeamTitleBox.x);
  expect(mobileFirstTeamTitleBox.y).toBeLessThan(mobileFirstTeamPhotoBox.y + mobileFirstTeamPhotoBox.height);
  expect(mobileFirstTeamIconsBox.y).toBeGreaterThan(mobileFirstTeamPhotoBox.y + mobileFirstTeamPhotoBox.height - 1);
  expect(mobileFirstTeamIconsBox.x).toBeLessThan(mobileFirstTeamTitleBox.x);
  expect(mobileFirstTeamBodyAlign).toBe("left");
  await expectNoHorizontalOverflow(page);
  if (projectTeamDesktopViewport) await page.setViewportSize(projectTeamDesktopViewport);

  await page.goto(siteUrl("/en/outputs/"));
  await expect.poll(async () => page.locator(".project-card").count()).toBeGreaterThanOrEqual(5);
  await expect(page.locator(".post > article")).toContainText("Open geospatial dataset");
  await expect(page.locator(".post > article")).toContainText("Interactive web map");
  await page.screenshot({ path: join(renderOut, `project-outputs-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/publications/"));
  await expect(page.locator(".publications")).toContainText("Goodchild");
  await expect(page.locator(".publications")).toContainText("Zaragozí");
  await expect(page.locator(".publications")).not.toContainText("Practical Handbook");
  await expect(page.locator(".page-hero")).toHaveCount(0);
  await page.screenshot({ path: join(renderOut, `project-publications-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/conferences/"));
  await expect(page.locator(".page-hero .home-hero-title")).toContainText("Conferences");
  await expect(page.locator(".page-hero .home-hero-image")).toHaveAttribute("src", /project-conference-splash\.svg$/);
  await expect(page.locator(".post > article")).toContainText("Project data workshop");
  await page.screenshot({ path: join(renderOut, `project-conferences-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/resources/"));
  await expect(page.locator(".post-title")).toContainText("Resources");
  await expect(page.locator(".post > article")).toContainText("Repositories");
  const projectSubfigures = page.locator(".md-subfigure-set[data-layout='ab/cd']");
  await expect(projectSubfigures).toHaveCount(1);
  await expect(projectSubfigures.locator(".md-subfigure-row")).toHaveCount(2);
  await expect(projectSubfigures.locator(".md-subfigure-row").first()).toHaveAttribute("data-count", "2");
  await expect(projectSubfigures.locator(".md-subfigure-row").nth(1)).toHaveAttribute("data-count", "2");
  await expect(projectSubfigures.locator(".md-subfigure-label").last()).toContainText("d");
  await expectFigureCaptionBeforeContent(projectSubfigures.first());
  await expect(page.locator(".md-figure.mermaid-figure img[src$='diavisuals/sequence.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-figure.mermaid-figure .md-figcaption")).toContainText("diavisuals style");
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
  await expect(page.locator(".page-hero")).toHaveCount(0);
  await page.screenshot({ path: join(renderOut, `project-theses-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/readings/"));
  await expect(page.locator(".post-title")).toContainText("Readings");
  await expect(page.locator(".reading-collection-index")).toContainText("Collections");
  await expect(page.locator(".reading-collection-index")).not.toContainText("Project manuals");
  await expect(page.locator(".reading-collection-index")).not.toContainText("Method notes");
  await expect(page.locator(".reading-collection-index")).toContainText("GIS");
  await expect(page.locator(".reading-collection-index")).toContainText("Remote sensing");
  await expect(page.locator(".reading-collection-title")).toHaveCount(2);
  await expect(page.locator(".reading-shelf")).toHaveCount(2);
  await expect(page.locator(".reading-cover")).toHaveCount(10);
  await expect(page.locator(".post > article")).not.toContainText("Project Geodata Handbook");
  await expect(page.locator(".post > article")).not.toContainText("Spatial Data Quality Notes");
  await expect(page.locator(".post > article")).toContainText("Applied GIS and Spatial Analysis");
  await expect(page.locator(".post > article")).toContainText("Remote Sensing and Image Interpretation");
  await expect(page.locator(".reading-rating", { hasText: "5/5" }).first()).toBeVisible();
  await expect(page.locator(".reading-ribbon", { hasText: "Available at CRAI" })).toBeVisible();
  const configuredRibbonBackground = await page.locator(".reading-ribbon", { hasText: "Available at CRAI" }).first().evaluate((ribbon) => getComputedStyle(ribbon).backgroundColor);
  expect(configuredRibbonBackground).toBe("rgb(121, 183, 255)");
  const originalProjectReadingsViewport = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(async () => page.evaluate(() => matchMedia("(max-width: 575px)").matches)).toBeTruthy();
  await expect.poll(async () => {
    const box = await page.locator(".reading-cover").first().boundingBox();
    return box ? box.width : 0;
  }).toBeGreaterThan(360);
  const firstMobileReadingCoverBox = await page.locator(".reading-cover").first().boundingBox();
  const firstMobileReadingImageBox = await page.locator(".reading-cover .cover-link").first().boundingBox();
  const firstMobileReadingMetaBox = await page.locator(".reading-cover-meta").first().boundingBox();
  const secondMobileReadingCoverBox = await page.locator(".reading-cover").nth(1).boundingBox();
  if (!firstMobileReadingCoverBox || !firstMobileReadingImageBox || !firstMobileReadingMetaBox || !secondMobileReadingCoverBox) throw new Error("Mobile reading covers are not measurable");
  expect(firstMobileReadingCoverBox.width).toBeGreaterThan(360);
  expect(firstMobileReadingImageBox.width).toBeLessThanOrEqual(196);
  expect(firstMobileReadingMetaBox.x).toBeGreaterThan(firstMobileReadingImageBox.x + firstMobileReadingImageBox.width - 1);
  expect(firstMobileReadingMetaBox.width).toBeGreaterThan(120);
  expect(secondMobileReadingCoverBox.y).toBeGreaterThan(firstMobileReadingCoverBox.y + firstMobileReadingCoverBox.height - 1);
  if (originalProjectReadingsViewport) await page.setViewportSize(originalProjectReadingsViewport);
  await page.screenshot({ path: join(renderOut, `project-readings-${testInfo.project.name}.png`), fullPage: true });

  await page.locator(".reading-cover-title", { hasText: "Practical Handbook" }).click();
  await expect(page).toHaveURL(/\/en\/readings\/calibre-rs-3-practical-handbook-of-remote-sensing-second-edition\/?$/);
  await expect(page.locator(".reading-review-nav")).toContainText("Back to readings");
  await expect(page.locator(".reading-biblio-actions")).not.toContainText("Bibliographic record");
  await expect(page.locator(".reading-biblio-actions .cite")).toContainText("CITE");
  await expect(page.locator(".reading-biblio-actions .bibtex")).toContainText("BIB");
  await page.screenshot({ path: join(renderOut, `project-reading-detail-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/readings/calibre-rs-9-image-processing-and-gis-for-remote-sensing-techniques-and-applications/"));
  await expect(page.locator(".reading-review")).toContainText("Image Processing and GIS for Remote Sensing");
  await expect(page.locator(".reading-review")).toContainText("5/5");
  await page.locator(".reading-biblio-actions .cite").click();
  const citeReadingPanel = page.locator(".reading-biblio-panel.cite");
  await expect(citeReadingPanel).toHaveClass(/open/);
  await expect(citeReadingPanel).toContainText("Image Processing and GIS for Remote Sensing");
  await expect(citeReadingPanel).toContainText("ISBN 9781118724187");
  await expect(citeReadingPanel.locator("[data-copy-target]")).toContainText("Copy");
  await expect(citeReadingPanel.locator("[data-reading-biblio-close]")).toBeVisible();
  const citePanelPosition = await citeReadingPanel.evaluate((panel) => getComputedStyle(panel).position);
  expect(citePanelPosition).toBe("fixed");
  await page.mouse.click(5, 120);
  await expect(citeReadingPanel).not.toHaveClass(/open/);
  await page.locator(".reading-biblio-actions .cite").click();
  await page.locator(".reading-biblio-actions .bibtex").click();
  await expect(page.locator(".reading-biblio-panel.bibtex")).toContainText("@book");
  await expect(page.locator(".reading-biblio-panel.bibtex [data-copy-target]")).toContainText("Copy");
  await page.keyboard.press("Escape");
  await expect(page.locator(".reading-biblio-panel.bibtex")).not.toHaveClass(/open/);
});


test("manual profile renders a multilingual handbook", async ({ page }, testInfo) => {
  test.skip(activeProfile !== "unaltremanual", "unaltremanual profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", "unaltremanual");
  await expect(page.locator("body")).toHaveClass(/site-profile-unaltremanual/);
  await expect(page.locator(".navbar-brand")).toContainText("unaltremanual");
  await expect(page.locator(".manual-navbar-logo-stack")).toHaveCount(1);
  await expect(page.locator(".manual-navbar-search")).toBeVisible();
  await expect(page.locator(".manual-sidebar .manual-brand")).toHaveCount(0);
  await expect(page.locator(".manual-sidebar [data-content-search]")).toHaveCount(0);
  await expect(page.locator(".manual-cover h1")).toContainText("unaltremanual");
  await expect(page.locator(".manual-sidebar")).toContainText("Contents");
  await expect(page.locator(".manual-sidebar")).toContainText("How this manual works");
  await expect(page.locator(".manual-sidebar")).toContainText("Assessment workflow");
  await expect(page.locator(".manual-sidebar")).toContainText("Bibliography");
  await expect(page.locator(".manual-reference-link")).toContainText("Bibliography");
  await expect(page.locator(".manual-reference-link .manual-chapter-number--blank")).toBeHidden();
  await expect(page.locator(".manual-nav .manual-sidebar-heading", { hasText: "Bibliography" })).toHaveCount(0);
  const manualNavText = (await page.locator(".manual-nav").innerText()).toLowerCase();
  expect(manualNavText.indexOf("contents")).toBeLessThan(manualNavText.indexOf("cover and preamble"));
  expect(manualNavText.indexOf("cover and preamble")).toBeLessThan(manualNavText.indexOf("how this manual works"));
  await expect(page.locator(".manual-navbar-sidebar-toggle")).toHaveCount(0);
  await expect(page.locator(".manual-sidebar .manual-sidebar-toggle")).toHaveCount(1);
  await expect(page.locator(".manual-sidebar .manual-sidebar-toggle i.ti-chevrons-left")).toBeVisible();
  const manualSidebarBox = await page.locator(".manual-sidebar").boundingBox();
  const manualToggleBox = await page.locator(".manual-sidebar .manual-sidebar-toggle").boundingBox();
  const manualBrandBox = await page.locator(".navbar-brand").boundingBox();
  const manualSearchBox = await page.locator(".manual-navbar-search").boundingBox();
  const manualFontBox = await page.locator(".manual-font-nav").boundingBox();
  if (!manualSidebarBox || !manualToggleBox || !manualBrandBox || !manualSearchBox || !manualFontBox) throw new Error("Manual sidebar and navbar controls are not visible");
  const manualDividerX = manualSidebarBox.x + manualSidebarBox.width;
  const manualToggleCenterX = manualToggleBox.x + manualToggleBox.width / 2;
  expect(Math.abs(manualDividerX - manualToggleCenterX)).toBeLessThanOrEqual(2);
  expect(manualToggleBox.width).toBeLessThanOrEqual(24);
  expect(manualToggleBox.height).toBeGreaterThan(60);
  expect(Math.abs(manualBrandBox.y - manualSearchBox.y)).toBeLessThan(16);
  expect(Math.abs(manualSearchBox.y - manualFontBox.y)).toBeLessThan(16);
  expect(manualSearchBox.width).toBeLessThanOrEqual(380);
  expect(manualSearchBox.x).toBeGreaterThan(manualBrandBox.x + manualBrandBox.width);
  expect(manualFontBox.x).toBeGreaterThan(manualSearchBox.x + manualSearchBox.width - 1);
  const manualToggleBackground = await page.locator(".manual-sidebar .manual-sidebar-toggle").evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(manualToggleBackground).not.toBe("rgb(13, 110, 253)");
  expect(manualToggleBackground).not.toBe("rgb(0, 123, 255)");
  await expect(page.locator(".manual-font-nav")).toHaveCount(1);
  await expect(page.locator(".manual-teachers")).toContainText("Jane Doe");
  await expect(page.locator(".manual-teachers .team-grid")).toHaveCount(0);
  await expect(page.locator(".manual-teacher-list")).toHaveCount(1);
  await expect(page.locator(".manual-teacher")).toHaveCount(2);
  await expect(page.locator(".manual-teacher-links a[aria-label='ORCID']")).toHaveCount(2);
  await expect(page.locator(".manual-teacher-links a[aria-label='Google Scholar']")).toHaveCount(2);
  const manualTeachersBox = await page.locator(".manual-teachers").boundingBox();
  const firstManualTeacherBox = await page.locator(".manual-teacher").first().boundingBox();
  const firstManualTeacherPhotoBox = await page.locator(".manual-teacher-photo").first().boundingBox();
  const firstManualTeacherBodyBox = await page.locator(".manual-teacher-body").first().boundingBox();
  if (!manualTeachersBox || !firstManualTeacherBox || !firstManualTeacherPhotoBox || !firstManualTeacherBodyBox) throw new Error("Manual teacher cards are not visible");
  expect(firstManualTeacherBox.width).toBeLessThan(manualTeachersBox.width);
  expect(firstManualTeacherPhotoBox.width).toBeGreaterThanOrEqual(84);
  expect(firstManualTeacherPhotoBox.height).toBeGreaterThan(firstManualTeacherBodyBox.height);
  const secondManualTeacherBox = await page.locator(".manual-teacher").nth(1).boundingBox();
  if (!secondManualTeacherBox) throw new Error("Second manual teacher card is not visible");
  expect(Math.abs(firstManualTeacherBox.y - secondManualTeacherBox.y)).toBeLessThan(8);
  const originalManualHomeViewport = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileFirstManualTeacherBox = await page.locator(".manual-teacher").first().boundingBox();
  const mobileSecondManualTeacherBox = await page.locator(".manual-teacher").nth(1).boundingBox();
  const mobileManualTeachersBox = await page.locator(".manual-teachers").boundingBox();
  if (!mobileFirstManualTeacherBox || !mobileSecondManualTeacherBox || !mobileManualTeachersBox) throw new Error("Mobile manual teacher cards are not visible");
  expect(mobileFirstManualTeacherBox.width).toBeGreaterThan(mobileManualTeachersBox.width * 0.9);
  expect(mobileSecondManualTeacherBox.y).toBeGreaterThan(mobileFirstManualTeacherBox.y + mobileFirstManualTeacherBox.height - 1);
  if (originalManualHomeViewport) await page.setViewportSize(originalManualHomeViewport);
  const firstManualTeacherLinkLabels = await page.locator(".manual-teacher").first().locator(".manual-teacher-links a").evaluateAll((links) => links.map((link) => link.getAttribute("aria-label")));
  expect(firstManualTeacherLinkLabels.slice(0, 4)).toEqual(["E-mail", "Profile", "ORCID", "Google Scholar"]);
  const firstManualTeacherPhotoStyle = await page.locator(".manual-teacher-photo").first().evaluate((node) => {
    const style = getComputedStyle(node);
    return { borderRadius: style.borderRadius, objectFit: style.objectFit };
  });
  expect(firstManualTeacherPhotoStyle.borderRadius.includes("%") || parseFloat(firstManualTeacherPhotoStyle.borderRadius) > firstManualTeacherPhotoBox.width * 0.45).toBeTruthy();
  expect(firstManualTeacherPhotoStyle.objectFit).toBe("cover");
  await expectImageLoaded(page.locator(".manual-cover-art img"));
  await page.screenshot({ path: join(renderOut, `manual-home-${testInfo.project.name}.png`) });

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
  const secondaryTocActiveBackground = await page.locator(".manual-right-rail .manual-page-toc a.active").evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(secondaryTocActiveBackground).not.toBe("rgba(0, 0, 0, 0)");
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
  const originalChapterViewport = page.viewportSize();
  await page.setViewportSize({ width: 1600, height: 900 });
  const manualMainBox = await page.locator(".manual-main").boundingBox();
  expect(manualMainBox).not.toBeNull();
  expect(manualMainBox.width).toBeGreaterThanOrEqual(850);
  const manualContentBox = await page.locator(".manual-content").boundingBox();
  const manualParagraphBox = await page.locator(".manual-content > p").first().boundingBox();
  if (!manualContentBox || !manualParagraphBox) throw new Error("Manual content width is not measurable");
  expect(manualParagraphBox.width).toBeGreaterThan(manualContentBox.width * 0.9);
  if (originalChapterViewport) await page.setViewportSize(originalChapterViewport);
  await page.setViewportSize({ width: 390, height: 740 });
  await expect(page.locator(".manual-layout")).not.toHaveClass(/manual-sidebar-collapsed/);
  await expect(page.locator(".manual-right-rail")).toBeVisible();
  const mobileManualPanelBox = await page.locator(".manual-toc-panel").boundingBox();
  if (!mobileManualPanelBox) throw new Error("Mobile manual drawer is not visible");
  expect(mobileManualPanelBox.x).toBeGreaterThan(0);
  expect(Math.abs(mobileManualPanelBox.y + mobileManualPanelBox.height - 740)).toBeLessThanOrEqual(2);
  await page.mouse.click(12, 120);
  await expect(page.locator(".manual-layout")).toHaveClass(/manual-sidebar-collapsed/);
  await page.locator(".manual-sidebar .manual-sidebar-toggle").click();
  await expect(page.locator(".manual-layout")).not.toHaveClass(/manual-sidebar-collapsed/);
  if (originalChapterViewport) await page.setViewportSize(originalChapterViewport);
  await page.locator(".manual-content h2", { hasText: "Diagram workflow" }).evaluate((node) => node.scrollIntoView({ block: "start" }));
  await expect(page.locator(".manual-page-toc a.active")).toContainText("1.2 Diagram workflow");
  await page.screenshot({ path: join(renderOut, `manual-chapter-${testInfo.project.name}.png`), fullPage: true });

  await page.locator(".manual-navbar-search [data-content-search]").fill("coordinate");
  await expect(page.locator(".manual-navbar-search [data-content-search-results]")).toContainText("Data and tools");
  await page.locator(".manual-navbar-search [data-content-search]").fill("Practical Handbook");
  await expect(page.locator(".manual-navbar-search [data-content-search-results]")).toContainText("Bibliography");
  await page.screenshot({ path: join(renderOut, `manual-search-${testInfo.project.name}.png`), fullPage: true });

  const beforeFontSize = await page.locator(".manual-content").evaluate((node) => getComputedStyle(node).fontSize);
  await page.locator("#navbarManualFontDropdown").click();
  await page.locator(".manual-font-menu [data-manual-font='increase']").click();
  const afterFontSize = await page.locator(".manual-content").evaluate((node) => getComputedStyle(node).fontSize);
  expect(parseFloat(afterFontSize)).toBeGreaterThan(parseFloat(beforeFontSize));

  const expandedManualMainBox = await page.locator(".manual-main").boundingBox();
  if (!expandedManualMainBox) throw new Error("Expanded manual main column is not visible");
  await page.locator(".manual-sidebar .manual-sidebar-toggle").click();
  await expect(page.locator(".manual-layout")).toHaveClass(/manual-sidebar-collapsed/);
  await expect(page.locator(".manual-sidebar")).toBeVisible();
  await expect(page.locator(".manual-nav")).toBeHidden();
  await expect(page.locator(".manual-navbar-search")).toBeVisible();
  await expect(page.locator(".manual-right-rail")).toBeHidden();
  const collapsedManualSidebarBox = await page.locator(".manual-sidebar").boundingBox();
  const collapsedManualToggleBox = await page.locator(".manual-sidebar .manual-sidebar-toggle").boundingBox();
  const collapsedManualMainBox = await page.locator(".manual-main").boundingBox();
  if (!collapsedManualSidebarBox || !collapsedManualToggleBox || !collapsedManualMainBox) throw new Error("Collapsed manual sidebar rail is not visible");
  const collapsedManualDividerX = collapsedManualSidebarBox.x + collapsedManualSidebarBox.width;
  const collapsedManualToggleCenterX = collapsedManualToggleBox.x + collapsedManualToggleBox.width / 2;
  expect(collapsedManualSidebarBox.width).toBeLessThanOrEqual(34);
  expect(Math.abs(collapsedManualDividerX - collapsedManualToggleCenterX)).toBeLessThanOrEqual(2);
  expect(collapsedManualToggleBox.width).toBeLessThanOrEqual(24);
  expect(collapsedManualToggleBox.height).toBeGreaterThan(60);
  expect(Math.abs(collapsedManualMainBox.x - collapsedManualDividerX)).toBeLessThanOrEqual(2);
  expect(collapsedManualMainBox.width).toBeGreaterThan(expandedManualMainBox.width);
  await page.locator(".manual-sidebar .manual-sidebar-toggle").click();

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
  await expect.poll(async () => page.locator(".manual-references .manual-reference-links .cite").count()).toBeGreaterThan(0);
  await page.screenshot({ path: join(renderOut, `manual-code-fences-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/chapters/figures-diagrams/"));
  await expect(page.locator(".md-subfigure-set")).toHaveCount(5);
  await expect(page.locator(".md-subfigure")).toHaveCount(12);
  await expect(page.locator(".md-subfigure-set[data-layout='a+b+c']")).toHaveCount(2);
  await expect(page.locator(".md-subfigure-set[data-layout='a/b']")).toHaveCount(3);
  await expect(page.locator(".md-subfigure-set[data-layout='a+b+c']").first().locator(".md-subfigure-row")).toHaveAttribute("data-count", "3");
  await expect(page.locator(".md-subfigure-set[data-layout='a/b']").first().locator(".md-subfigure-row").first()).toHaveAttribute("data-count", "1");
  await expect(page.locator(".md-subfigure-set[data-layout='a/b']").first().locator(".md-subfigure-row").nth(1)).toHaveAttribute("data-count", "1");
  await expect(page.locator(".md-subfigure-set[data-layout='a+b+c']").nth(1).locator(".md-subfigure[data-panel='b']")).toHaveAttribute("style", /--md-subfigure-width: 68%/);
  await expect(page.locator(".md-subfigure-label").first()).toContainText("a");
  await expectFigureCaptionBeforeContent(page.locator(".md-subfigure-set[data-layout='a+b+c']").first());
  const manualSubfigureCaptionBox = await page.locator(".md-subfigure-caption").first().boundingBox();
  const manualSubfigureImageBox = await page.locator(".md-subfigure img").first().boundingBox();
  if (!manualSubfigureCaptionBox || !manualSubfigureImageBox) throw new Error("Manual subfigure caption and image are not measurable");
  expect(manualSubfigureCaptionBox.y).toBeLessThan(manualSubfigureImageBox.y);
  await expect(page.locator(".manual-content h2", { hasText: "Mermaid sources" })).toBeVisible();
  await expect(page.locator(".md-figure.mermaid-figure img[src$='manual-flow.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-subfigure img[src$='diavisuals/file-tree.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-subfigure img[src$='diavisuals/timeline.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-figure.mermaid-figure img[src$='diavisuals/quadrant.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".md-figure.mermaid-figure .md-figcaption").first()).toContainText("Mermaid source");
  await expectFigureCaptionBeforeContent(page.locator(".md-figure.mermaid-figure").first());
  const manualMermaidSurface = await page.locator(".md-figure.mermaid-figure .md-figure-inner").first().evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(manualMermaidSurface).not.toBe("rgba(0, 0, 0, 0)");
  await page.screenshot({ path: join(renderOut, `manual-figures-diagrams-${testInfo.project.name}.png`), fullPage: true });
  await page.locator(".md-subfigure img").first().click();
  await expect(page.locator(".medium-zoom-overlay")).toBeVisible();
  await expect(page.locator(".medium-zoom-image--opened")).toHaveCount(1);

  await page.goto(siteUrl("/en/bibliography/"));
  await expect(page.locator(".manual-chapter")).toHaveAttribute("data-manual-numbered", "false");
  await expect(page.locator(".manual-chapter-header h1")).toContainText("Bibliography");
  await expect(page.locator(".manual-chapter-header h1 .hd-num")).toHaveCount(0);
  const manualHeaderBox = await page.locator(".manual-chapter-header").boundingBox();
  const manualSubtitleBox = await page.locator(".manual-chapter-header .manual-subtitle").boundingBox();
  if (!manualHeaderBox || !manualSubtitleBox) throw new Error("Manual subtitle width is not measurable");
  expect(manualSubtitleBox.width).toBeGreaterThan(manualHeaderBox.width * 0.9);
  await expect(page.locator(".manual-right-rail")).toHaveCount(0);
  await expect(page.locator(".manual-chapter-nav")).toHaveCount(0);
  await expect(page.locator("#manual-selected-readings-title")).toContainText("Selected readings");
  await expect(page.locator("#manual-more-readings-title")).toContainText("More readings");
  await expect(page.locator(".manual-featured-reference")).toHaveCount(3);
  await expect(page.locator(".manual-featured-authors").first()).toContainText("Samantha Lavender");
  await expect(page.locator(".manual-featured-kind").first()).toContainText("Book");
  await expect(page.locator(".manual-featured-kind .reading-rating").first()).toContainText("4/5");
  await expect(page.locator(".manual-featured-meta").first()).toContainText("2023");
  await expect(page.locator(".manual-featured-meta").first()).not.toContainText("4/5");
  const featuredGridColumnCount = await page.locator(".manual-featured-bibliography-list ol.bibliography").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(featuredGridColumnCount).toBeGreaterThanOrEqual(2);
  const originalViewport = page.viewportSize();
  await page.locator(".manual-featured-reference").first().scrollIntoViewIfNeeded();
  const featuredCardBox = await page.locator(".manual-featured-reference").first().boundingBox();
  const featuredCoverBox = await page.locator(".manual-featured-cover").first().boundingBox();
  const featuredBodyBox = await page.locator(".manual-featured-reference-body").first().boundingBox();
  expect(featuredCardBox).not.toBeNull();
  expect(featuredCoverBox).not.toBeNull();
  expect(featuredBodyBox).not.toBeNull();
  expect(featuredCoverBox.width).toBeGreaterThanOrEqual(120);
  expect(featuredCoverBox.width).toBeLessThanOrEqual(160);
  expect(Math.abs(featuredCoverBox.x + featuredCoverBox.width / 2 - (featuredCardBox.x + featuredCardBox.width / 2))).toBeLessThanOrEqual(4);
  expect(featuredBodyBox.y).toBeGreaterThan(featuredCoverBox.y + featuredCoverBox.height - 1);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".manual-featured-reference").first().scrollIntoViewIfNeeded();
  const mobileFeaturedCardBox = await page.locator(".manual-featured-reference").first().boundingBox();
  const mobileFeaturedCoverBox = await page.locator(".manual-featured-cover").first().boundingBox();
  const mobileFeaturedBodyBox = await page.locator(".manual-featured-reference-body").first().boundingBox();
  if (!mobileFeaturedCardBox || !mobileFeaturedCoverBox || !mobileFeaturedBodyBox) throw new Error("Mobile manual featured reading layout is not measurable");
  expect(Math.abs(mobileFeaturedCoverBox.x + mobileFeaturedCoverBox.width / 2 - (mobileFeaturedCardBox.x + mobileFeaturedCardBox.width / 2))).toBeLessThanOrEqual(4);
  expect(mobileFeaturedBodyBox.y).toBeGreaterThan(mobileFeaturedCoverBox.y + mobileFeaturedCoverBox.height - 1);
  if (originalViewport) await page.setViewportSize(originalViewport);
  await expect.poll(async () => page.locator(".manual-bibliography .manual-reference-links .cite").count()).toBeGreaterThan(0);
  await expect(page.locator(".manual-chapter")).not.toContainText("How to cite (APA)");
  await page.locator(".manual-featured-reference .manual-reference-links .cite").first().click();
  await expect(page.locator(".manual-featured-reference .cite.hidden").first()).toHaveClass(/open/);
  await expect(page.locator(".manual-featured-reference .cite.hidden").first()).toContainText("Practical Handbook");
  await expect(page.locator(".manual-featured-reference .cite.hidden [data-copy-target]").first()).toContainText("Copy");
  await page.locator(".manual-featured-reference .manual-reference-links .bibtex").first().click();
  await expect(page.locator(".manual-featured-reference .bibtex.hidden").first()).toHaveClass(/open/);
  await expect(page.locator(".manual-featured-reference .bibtex.hidden").first()).toContainText("@book");
  await expect(page.locator(".manual-featured-reference .bibtex.hidden [data-copy-target]").first()).toContainText("Copy");
  await expect(page.locator(".manual-other-bibliography .manual-reference")).toHaveCount(9);
  await expect(page.locator(".manual-content")).toContainText("Geographic Information Science and Systems");
  await expect(page.locator(".manual-content")).toContainText("Remote Sensing and Image Interpretation");
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "A classic" })).toBeVisible();
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "Available at CRAI" })).toBeVisible();
  await expect(page.locator(".reading-cover figcaption.custom", { hasText: "URV teacher" })).toBeVisible();
  const featuredRibbonStyles = await page.locator(".manual-featured-cover figcaption.custom").first().evaluate((node) => {
    const style = getComputedStyle(node);
    return { position: style.position, transform: style.transform };
  });
  expect(featuredRibbonStyles.position).toBe("absolute");
  expect(featuredRibbonStyles.transform).not.toBe("none");
  await expect(page.locator(".manual-other-bibliography")).toContainText("Geographical Information Science");
  await expect(page.locator(".manual-reference-preview img[data-zoomable]")).toHaveCount(9);
  await expect(page.locator(".manual-featured-cover img[data-zoomable]")).toHaveCount(0);
  await expect(page.locator(".manual-featured-cover img[data-no-zoom]")).toHaveCount(3);
  await expect(page.locator(".manual-featured-cover a.cover-link")).toHaveCount(3);
  await expect(page.locator(".manual-featured-reference").first()).not.toContainText("Reference handbook for connecting remote sensing concepts");
  await expect(page.locator(".manual-featured-reference h3 a", { hasText: "Practical Handbook" })).toHaveAttribute("href", /\/en\/readings\/calibre-rs-3-practical-handbook-of-remote-sensing-second-edition\/?$/);
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .manual-reference-links a[href*='doi.org']")).toContainText("DOI");
  await page.locator("#gutierrezProfilingTouristsUse2020 .manual-reference-links .abstract").click();
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .abstract.hidden")).toHaveClass(/open/);
  await expect(page.locator("#gutierrezProfilingTouristsUse2020 .abstract.hidden")).toContainText("Data collected through smart travel cards");
  const manualOtherReferences = await page.locator(".manual-other-bibliography .manual-reference-text").allTextContents();
  expect(manualOtherReferences[0]).toContain("2023");
  expect(manualOtherReferences[manualOtherReferences.length - 1]).toContain("1992");
  await expect(page.locator(".reading-rating", { hasText: "5/5" }).first()).toBeVisible();
  await page.screenshot({ path: join(renderOut, `manual-bibliography-${testInfo.project.name}.png`), fullPage: true });

  await page.locator(".manual-featured-cover a.cover-link").first().click();
  await expect(page).toHaveURL(/\/en\/readings\/calibre-rs-3-practical-handbook-of-remote-sensing-second-edition\/?$/);
  await expect(page.locator(".medium-zoom-overlay")).toHaveCount(0);
  await expect(page.locator(".manual-reading-layout")).toHaveCount(1);
  await expect(page.locator(".manual-reading-layout .manual-sidebar")).toBeVisible();
  await expect(page.locator(".manual-reading-layout .manual-nav")).toContainText("Bibliography");
  await expect(page.locator(".manual-reading-layout .manual-reference-link.active")).toContainText("Bibliography");
  await expect(page.locator(".manual-reading-layout .manual-sidebar-toggle")).toHaveCount(1);
  await expect(page.locator(".manual-reading-review.manual-main")).toHaveCount(1);
  await expect(page.locator(".reading-review")).toContainText("Practical Handbook of Remote Sensing");
  await expect(page.locator(".reading-review-nav")).toContainText("Back to bibliography");
  await expect(page.locator(".reading-biblio-actions")).not.toContainText("Bibliographic record");
  await expect(page.locator(".reading-biblio-actions")).toContainText("CITE");
  await expect(page.locator(".reading-biblio-actions")).toContainText("BIB");
  await expect(page.locator(".reading-figure .reading-biblio-actions")).toHaveCount(1);
  await expect(page.locator(".reading-main > .reading-biblio-wrap")).toHaveCount(0);
  const detailCoverBox = await page.locator(".reading-figure").boundingBox();
  const detailCoverImageBox = await page.locator(".reading-figure > img").boundingBox();
  const detailActionsBox = await page.locator(".reading-biblio-actions").boundingBox();
  if (!detailCoverBox || !detailCoverImageBox || !detailActionsBox) throw new Error("Manual reading detail layout is not visible");
  expect(detailActionsBox.x).toBeGreaterThanOrEqual(detailCoverBox.x - 1);
  expect(detailActionsBox.x).toBeLessThanOrEqual(detailCoverBox.x + detailCoverBox.width + 1);
  expect(detailActionsBox.y).toBeGreaterThan(detailCoverImageBox.y + detailCoverImageBox.height);
  await page.screenshot({ path: join(renderOut, `manual-selected-reading-detail-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/ca/chapters/orientacio/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "ca");
  await expect(page.locator(".manual-chapter-header h1")).toContainText("Com funciona aquest manual");
  await expect(page.locator(".md-figcaption .figlabel").first()).toContainText("Figura 1.");
  await expect(page.locator(".md-table-caption .figlabel").first()).toContainText("Taula 1.");
  await page.screenshot({ path: join(renderOut, `manual-ca-chapter-${testInfo.project.name}.png`), fullPage: true });
});

test("unaltredocs profile renders the documentation collection", async ({ page }, testInfo) => {
  test.skip(!isDocsProfile, "unaltredocs profile only");

  await page.goto(siteUrl("/en/"));
  await expect(page.locator("html")).toHaveAttribute("data-site-profile", activeProfile);
  await expect(page.locator("body")).toHaveClass(new RegExp(`site-profile-${activeProfile}`));
  await expect(page.locator(".documentation-hero h1")).toContainText("unaltredocs");
  await expect(page.locator(".documentation-hero-cta")).toContainText("Get started");
  await expect(page.locator(".documentation-sidebar")).toContainText("What is unaltraweb?");
  await expect(page.locator(".documentation-sidebar")).toContainText("Prepare a new website");
  await expect(page.locator(".documentation-sidebar")).toContainText("User guides");
  await expect(page.locator(".documentation-sidebar")).toContainText("Profiles");
  await expect(page.locator(".documentation-sidebar")).toContainText("Standards");
  await expect(page.locator(".documentation-sidebar")).toContainText("Developers");
  await expect(page.locator(".documentation-sidebar")).toContainText("FAQs");
  await expect(page.locator(".documentation-sidebar")).toContainText("Site profiles");
  await expect(page.locator(".documentation-sidebar")).toContainText("Table of contents");
  await expect(page.locator(".documentation-sidebar")).toContainText("Operations");
  await expect(page.locator(".documentation-card")).toHaveCount(27);
  await expectImageLoaded(page.locator(".documentation-hero img"));
  await page.screenshot({ path: join(renderOut, `unaltredocs-home-${testInfo.project.name}.png`) });

  const beforeDocsFontSize = await page.locator(".documentation-content").evaluate((node) => getComputedStyle(node).fontSize);
  const docsToggle = page.locator(".documentation-sidebar > .documentation-toc-toggle");
  const docsNavbarTocToggle = page.locator(".documentation-navbar-toc-toggle");
  await expect(page.locator(".navbar")).toBeVisible();
  await expect(page.locator(".documentation-navbar-search")).toBeVisible();
  await expect(docsToggle).toHaveCount(1);
  await expect(docsToggle.locator("i.ti-chevrons-left")).toBeVisible();
  await expect(page.locator(".navbar .documentation-toc-toggle")).toHaveCount(0);
  await expect(docsNavbarTocToggle).toHaveCount(1);
  await expect(page.locator(".documentation-font-dropdown")).toHaveCount(1);
  await expect(page.locator(".documentation-font-menu [data-documentation-font]")).toHaveCount(3);
  const sidebarBox = await page.locator(".documentation-sidebar").boundingBox();
  const expandedDocsMainBox = await page.locator(".documentation-main").boundingBox();
  const tocToggleBox = await docsToggle.boundingBox();
  const brandBox = await page.locator(".navbar-brand").boundingBox();
  const fontBox = await page.locator(".documentation-font-dropdown").boundingBox();
  const searchBox = await page.locator(".documentation-navbar-search").boundingBox();
  if (!sidebarBox || !expandedDocsMainBox || !tocToggleBox || !brandBox || !fontBox || !searchBox) throw new Error("Documentation controls are not visible");
  const docsDividerX = sidebarBox.x + sidebarBox.width;
  const tocToggleCenterX = tocToggleBox.x + tocToggleBox.width / 2;
  expect(Math.abs(docsDividerX - tocToggleCenterX)).toBeLessThanOrEqual(2);
  expect(tocToggleBox.width).toBeLessThanOrEqual(24);
  expect(tocToggleBox.height).toBeGreaterThan(60);
  expect(Math.abs(brandBox.y - searchBox.y)).toBeLessThan(16);
  expect(Math.abs(searchBox.y - fontBox.y)).toBeLessThan(16);
  expect(searchBox.width).toBeLessThanOrEqual(380);
  expect(searchBox.x).toBeGreaterThan(brandBox.x + brandBox.width);
  expect(fontBox.x).toBeGreaterThan(searchBox.x + searchBox.width - 1);
  await docsToggle.click();
  await expect(page.locator(".documentation-layout")).toHaveClass(/documentation-toc-collapsed/);
  await expect(page.locator(".documentation-nav")).toBeHidden();
  const collapsedSidebarBox = await page.locator(".documentation-sidebar").boundingBox();
  const collapsedToggleBox = await docsToggle.boundingBox();
  const collapsedMainBox = await page.locator(".documentation-main").boundingBox();
  if (!collapsedSidebarBox || !collapsedToggleBox || !collapsedMainBox) throw new Error("Collapsed documentation sidebar rail is not visible");
  const collapsedDocsDividerX = collapsedSidebarBox.x + collapsedSidebarBox.width;
  const collapsedToggleCenterX = collapsedToggleBox.x + collapsedToggleBox.width / 2;
  expect(collapsedSidebarBox.width).toBeLessThanOrEqual(34);
  expect(collapsedSidebarBox.height).toBeGreaterThan(200);
  expect(Math.abs(collapsedDocsDividerX - collapsedToggleCenterX)).toBeLessThanOrEqual(2);
  expect(collapsedToggleBox.width).toBeLessThanOrEqual(24);
  expect(collapsedToggleBox.height).toBeGreaterThan(60);
  expect(Math.abs(collapsedMainBox.x - collapsedDocsDividerX)).toBeLessThanOrEqual(2);
  expect(collapsedMainBox.width).toBeGreaterThan(expandedDocsMainBox.width);
  await expect(page.locator(".navbar")).toBeVisible();
  await expect(page.locator(".documentation-navbar-search")).toBeVisible();
  await docsToggle.click();
  await expect(page.locator(".documentation-layout")).not.toHaveClass(/documentation-toc-collapsed/);
  const originalDocsViewport = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 740 });
  await expect(docsNavbarTocToggle).toBeVisible();
  await expect(page.locator(".documentation-navbar-search-icon")).toBeVisible();
  await expect(page.locator(".documentation-font-dropdown")).toBeVisible();
  await expect(page.locator("#navbarLangDropdown")).toBeVisible();
  await expect(page.locator("#light-toggle")).toBeVisible();
  const mobileDocsSearchInputBox = await page.locator("#documentation-navbar-search-input").boundingBox();
  if (!mobileDocsSearchInputBox) throw new Error("Mobile documentation search input is not visible");
  expect(mobileDocsSearchInputBox.width).toBeLessThanOrEqual(44);
  const mobileDocsSidebarBox = await page.locator(".documentation-sidebar").boundingBox();
  if (!mobileDocsSidebarBox) throw new Error("Mobile documentation drawer is not visible");
  expect(mobileDocsSidebarBox.x).toBeGreaterThan(0);
  expect(Math.abs(mobileDocsSidebarBox.y + mobileDocsSidebarBox.height - 740)).toBeLessThanOrEqual(2);
  await page.mouse.click(12, 120);
  await expect(page.locator(".documentation-layout")).toHaveClass(/documentation-toc-collapsed/);
  await docsNavbarTocToggle.click();
  await expect(page.locator(".documentation-layout")).not.toHaveClass(/documentation-toc-collapsed/);
  await docsNavbarTocToggle.click();
  await expect(page.locator(".documentation-layout")).toHaveClass(/documentation-toc-collapsed/);
  await docsToggle.click();
  await expect(page.locator(".documentation-layout")).not.toHaveClass(/documentation-toc-collapsed/);
  if (originalDocsViewport) await page.setViewportSize(originalDocsViewport);
  await page.locator("#documentationFontDropdown").click();
  await page.locator(".documentation-font-menu [data-documentation-font='increase']").click();
  const afterDocsFontSize = await page.locator(".documentation-content").evaluate((node) => getComputedStyle(node).fontSize);
  expect(parseFloat(afterDocsFontSize)).toBeGreaterThan(parseFloat(beforeDocsFontSize));

  await page.locator("[data-content-search]").fill("profiles");
  await expect(page.locator("[data-content-search-results]")).toContainText("Site profiles");
  await page.screenshot({ path: join(renderOut, `unaltredocs-search-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/profile-checklist/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Profile feature checklist");
  await expect(page.locator(".profile-feature-matrix")).toContainText("unaltredocs");
  await page.screenshot({ path: join(renderOut, `unaltredocs-profile-matrix-${testInfo.project.name}.png`), fullPage: true });

  const profilesAccordion = page.locator(".documentation-accordion-section", { has: page.locator(".documentation-accordion-title", { hasText: "Profiles" }) });
  await expect(profilesAccordion).toHaveCount(1);
  await expect(profilesAccordion.locator(".documentation-nav-link", { hasText: "Site profiles" })).toHaveCount(1);
  await expect(profilesAccordion.locator(".documentation-nav-link", { hasText: /unaltre/ })).toHaveCount(4);
  await expect(profilesAccordion.locator(".documentation-accordion-mark")).toBeVisible();
  const activeLinkMarker = await profilesAccordion.locator(".documentation-nav-link.active").evaluate((node) => getComputedStyle(node, "::before").backgroundColor);
  expect(activeLinkMarker).toBe("rgb(26, 115, 232)");
  const activePageIndent = await profilesAccordion.locator(".documentation-nav-link.active").evaluate((node) => parseFloat(getComputedStyle(node).paddingLeft));
  const inactivePageIndent = await profilesAccordion.locator(".documentation-nav-link").first().evaluate((node) => parseFloat(getComputedStyle(node).paddingLeft));
  expect(activePageIndent).toBeGreaterThan(16);
  expect(inactivePageIndent).toBeGreaterThan(16);
  await profilesAccordion.locator(".documentation-accordion-summary").click();
  await expect(profilesAccordion).toHaveJSProperty("open", false);
  await profilesAccordion.locator(".documentation-accordion-summary").click();
  await expect(profilesAccordion).toHaveJSProperty("open", true);
  const userGuidesAccordion = page.locator(".documentation-accordion-section", { has: page.locator(".documentation-accordion-title", { hasText: "User guides" }) });
  await expect(userGuidesAccordion).toHaveCount(1);
  if (!(await userGuidesAccordion.evaluate((node) => node.open))) {
    await userGuidesAccordion.locator(".documentation-accordion-summary").click();
  }
  await expect(userGuidesAccordion).toHaveJSProperty("open", true);
  await expect(profilesAccordion).toHaveJSProperty("open", true);
  const activeAccordionBackground = await profilesAccordion.evaluate((node) => getComputedStyle(node).backgroundColor);
  const inactiveOpenAccordionBackground = await userGuidesAccordion.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(activeAccordionBackground).not.toBe(inactiveOpenAccordionBackground);
  expect(inactiveOpenAccordionBackground).toBe("rgba(0, 0, 0, 0)");

  await page.goto(siteUrl("/en/docs/prepare-new-website/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Prepare a new website");
  await expect(page.locator(".documentation-content")).toContainText("Prefer local publishing to the generated");
  await expect(page.locator(".documentation-content")).toContainText("LOCAL_CORE=../unaltraweb");

  await page.goto(siteUrl("/en/docs/reusable-profile-pages/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Reusable profile pages and layouts");
  await expect(page.locator(".documentation-content")).toContainText("Team page");
  await expect(page.locator(".documentation-content")).toContainText("Calibre libraries");
  await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", /\/en\/docs\/reusable-profile-pages\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='es']")).toHaveAttribute("href", /\/es\/docs\/paginas-reutilizables\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='ca']")).toHaveAttribute("href", /\/ca\/docs\/pagines-reutilitzables\/?$/);
  await expect(page.locator("head link[rel='alternate'][hreflang='x-default']")).toHaveAttribute("href", /\/en\/docs\/reusable-profile-pages\/?$/);
  await page.screenshot({ path: join(renderOut, `unaltredocs-reusable-pages-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/documentation-collection/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Documentation collection");
  await expect(page.locator(".documentation-content")).toContainText("Documentation sidebar");
  await page.screenshot({ path: join(renderOut, `unaltredocs-documentation-collection-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/workflow/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Build workflow");
  await expect(page.locator(".documentation-page-nav")).toContainText("Next");
  await expect(page.locator(".documentation-page-nav")).toContainText("GitHub Actions in child sites");
  await page.screenshot({ path: join(renderOut, `unaltredocs-workflow-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/technical-examples/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Technical examples");
  await expect(page.locator(".documentation-content")).toContainText("flowchart LR");
  await page.screenshot({ path: join(renderOut, `unaltredocs-technical-examples-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/en/docs/markdown-syntax-sugar/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Markdown syntax sugar");
  await expect(page.locator(".documentation-content")).toContainText("Callout shorthand");
  await expect(page.locator(".documentation-content")).toContainText("Subfigure compositions");
  await expect(page.locator(".documentation-content")).toContainText("Mermaid source files as SVG figures");
  await expect(page.locator(".documentation-content .md-subfigure-set")).toHaveCount(4);
  await expect(page.locator(".documentation-content .md-subfigure-set[data-layout='a+b+c']")).toHaveCount(2);
  await expect(page.locator(".documentation-content .md-subfigure-set[data-layout='a/b']")).toHaveCount(2);
  await expect(page.locator(".documentation-content .md-subfigure-set[data-layout='a+b+c']").first().locator(".md-subfigure-row")).toHaveAttribute("data-count", "3");
  await expect(page.locator(".documentation-content .md-subfigure-set[data-layout='a/b']").first().locator(".md-subfigure-row").first()).toHaveAttribute("data-count", "1");
  await expect(page.locator(".documentation-content .md-subfigure-set[data-layout='a+b+c']").nth(1).locator(".md-subfigure[data-panel='b']")).toHaveAttribute("style", /--md-subfigure-width: 68%/);
  await expect(page.locator(".documentation-content .md-subfigure img[src$='diavisuals/flowchart.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".documentation-content .md-subfigure img[src$='diavisuals/file-tree.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".documentation-content .md-figure.mermaid-figure img[src$='diavisuals/quadrant.mmd.svg']")).toHaveCount(1);
  await expect(page.locator(".documentation-content .md-subfigure-label").first()).toContainText("a");
  await expectFigureCaptionBeforeContent(page.locator(".documentation-content .md-subfigure-set[data-layout='a+b+c']").first());
  await page.screenshot({ path: join(renderOut, `unaltredocs-markdown-syntax-sugar-${testInfo.project.name}.png`), fullPage: true });

  const profileDocs = [
    ["/en/docs/unaltreselfie/", "unaltreselfie profile", "home-light-chromium.png"],
    ["/en/docs/unaltreprojecte/", "unaltreprojecte profile", "project-home-chromium.png"],
    ["/en/docs/unaltremanual/", "unaltremanual profile", "manual-home-chromium.png"],
    ["/en/docs/unaltredocs/", "unaltredocs profile", "unaltredocs-home-chromium.png"],
  ];
  for (const [path, heading, screenshot] of profileDocs) {
    await page.goto(siteUrl(path));
    await expect(page.locator(".documentation-page-header h1")).toContainText(heading);
    await expect(page.locator(`img[src$='${screenshot}']`)).toHaveCount(1);
  }

  await page.goto(siteUrl("/en/docs/multilingual-seo/"));
  await expect(page.locator(".documentation-page-header h1")).toContainText("Multilingual SEO");
  await expect(page.locator(".documentation-content")).toContainText("self-referencing canonical URL");
  await expect(page.locator(".documentation-content")).toContainText("hreflang");
  await page.screenshot({ path: join(renderOut, `unaltredocs-multilingual-seo-${testInfo.project.name}.png`), fullPage: true });

  await page.goto(siteUrl("/es/docs/que-es-unaltraweb/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator(".documentation-page-header h1")).toContainText("¿Qué es unaltraweb?");
  await expect(page.locator(".documentation-sidebar")).toContainText("Perfiles de sitio");
  await page.screenshot({ path: join(renderOut, `unaltredocs-es-page-${testInfo.project.name}.png`), fullPage: true });
});

test("coffee mode uses coffee accents", async ({ page }) => {
  await page.goto(siteUrl(startPath));
  await page.evaluate(() => localStorage.setItem("theme", "sepia"));
  await page.reload();

  await expectThemeState(page, "sepia");
  await expectCoffeeAccent(page);
  if (isDocsProfile) {
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
  test.skip(activeProfile !== "unaltreselfie", "unaltreselfie profile only");
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
    ["/en/news/", ["News", "press", "interview", "University GIS podcast"]],
  ];

  for (const [path, needles] of pages) {
    await page.goto(siteUrl(path));
    await expect(page.locator("html")).toHaveAttribute("data-site-profile", "unaltreselfie");
    const html = await page.content();
    for (const needle of needles) {
      expect(html).toContain(needle);
    }
    if (path === "/es/") {
      await expect(page.locator(".profile-card-name")).toHaveText("Juan Nadie");
      await expect(page.locator(".profile-card-bio")).toContainText("Perfil investigador ficticio");
      await expect(page.locator(".profile-card-affiliation")).toHaveText("Universidad de Ejemplo");
      await expect(page.locator(".profile-card-meta")).toContainText("Ciudad de Ejemplo");
      await expect(page.locator(".profile-card")).not.toContainText("John Doe");
    }
    if (path === "/ca/") {
      await expect(page.locator(".profile-card-name")).toHaveText("Joan Ningu");
      await expect(page.locator(".profile-card-bio")).toContainText("Perfil investigador fictici");
      await expect(page.locator(".profile-card-affiliation")).toHaveText("Universitat d'Exemple");
      await expect(page.locator(".profile-card-meta")).toContainText("Ciutat d'Exemple");
      await expect(page.locator(".profile-card")).not.toContainText("John Doe");
    }
    if (path === "/ca/") {
      await expect(page.locator("footer")).toContainText("Fet amb");
      await expect(page.locator("footer")).toContainText("perfil unaltreselfie");
      await expect(page.locator("footer")).toContainText("basat en");
      await expect(page.locator("footer")).not.toContainText("Drets d'autor");
      await expect(page.locator("footer")).toContainText(/Darrera actualització: \d{2}\/\d{2}\/\d{4}/);
      await page.screenshot({ path: join(renderOut, `personal-ca-home-${testInfo.project.name}.png`), fullPage: true });
    }
    if (["/en/blog/", "/en/cv/", "/en/projects/", "/en/publications/", "/en/readings/", "/en/news/"].includes(path)) {
      const slug = path.replace(/^\/en\//, "").replace(/\/$/, "");
      await page.screenshot({ path: join(renderOut, `personal-${slug}-${testInfo.project.name}.png`), fullPage: true });
    }
  }
});

test("blog archive paginates demo posts", async ({ page }) => {
  test.skip(activeProfile !== "unaltreselfie", "unaltreselfie profile only");
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
  test.skip(activeProfile !== "unaltreselfie", "unaltreselfie profile only");
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
  test.skip(activeProfile !== "unaltreselfie", "unaltreselfie profile only");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteUrl("/en/"));

  await expect(page.locator(".profile-page-sidebar .profile-card")).toBeVisible();
  await expect(page.locator(".profile-page-content")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const mobileColumnCount = await page.locator(".profile-page-grid").evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(mobileColumnCount).toBe(1);
  const mobileProfileAvatarBox = await page.locator(".profile-card-avatar").boundingBox();
  const mobileProfileLinksBox = await page.locator(".profile-card-links").boundingBox();
  const mobileProfileBodyBox = await page.locator(".profile-card-body").boundingBox();
  if (!mobileProfileAvatarBox || !mobileProfileLinksBox || !mobileProfileBodyBox) throw new Error("Mobile profile card layout is not measurable");
  expect(mobileProfileBodyBox.x).toBeGreaterThan(mobileProfileAvatarBox.x + mobileProfileAvatarBox.width - 1);
  expect(mobileProfileBodyBox.y).toBeLessThan(mobileProfileAvatarBox.y + mobileProfileAvatarBox.height);
  expect(mobileProfileLinksBox.y).toBeGreaterThan(mobileProfileAvatarBox.y + mobileProfileAvatarBox.height - 1);
  expect(mobileProfileLinksBox.x).toBeLessThan(mobileProfileBodyBox.x);
  const visibleMobileProfileLinkLabels = await page.locator(".profile-card-links a span").evaluateAll((spans) => spans.filter((span) => getComputedStyle(span).display !== "none").length);
  expect(visibleMobileProfileLinkLabels).toBe(0);
  const mobileProfileLinksStyle = await page.locator(".profile-card-links").evaluate((links) => {
    const style = getComputedStyle(links);
    const iconStyle = getComputedStyle(links.querySelector("i"));
    return {
      borderTopWidth: parseFloat(style.borderTopWidth),
      borderBottomWidth: parseFloat(style.borderBottomWidth),
      iconFontSize: parseFloat(iconStyle.fontSize),
      justifyContent: style.justifyContent,
    };
  });
  expect(mobileProfileLinksStyle.borderTopWidth).toBe(0);
  expect(mobileProfileLinksStyle.borderBottomWidth).toBeGreaterThan(0);
  expect(mobileProfileLinksStyle.iconFontSize).toBeGreaterThan(20);
  expect(mobileProfileLinksStyle.justifyContent).toBe("center");

  await page.screenshot({ path: join(renderOut, `home-mobile-${testInfo.project.name}.png`), fullPage: true });
});

test("publication page does not overflow on mobile", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  if (isDocsProfile) {
    await page.goto(siteUrl("/en/docs/what-is-unaltraweb/"));
    await expect(page.locator(".documentation-layout")).toBeVisible();
    await expect(page.locator(".documentation-layout")).toHaveClass(/documentation-toc-collapsed/);
    await expect(page.locator(".navbar")).toBeVisible();
    await expect(page.locator(".documentation-navbar-toc-toggle")).toBeVisible();
    await expect(page.locator(".documentation-navbar-search")).toBeVisible();
    await expect(page.locator(".documentation-navbar-search-icon")).toBeVisible();
    await expect(page.locator(".documentation-nav")).toBeHidden();
    await page.locator(".documentation-navbar-toc-toggle").click();
    await expect(page.locator(".documentation-layout")).not.toHaveClass(/documentation-toc-collapsed/);
    await expect(page.locator(".documentation-nav")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: join(renderOut, `unaltredocs-mobile-${testInfo.project.name}.png`), fullPage: true });
    return;
  }

  if (activeProfile === "unaltremanual") {
    await page.goto(siteUrl("/en/chapters/figures-diagrams/"));
    await page.evaluate(() => localStorage.setItem("unaltrawebManualSidebarCollapsed", "false"));
    await page.reload();
    await expect(page.locator(".manual-layout")).toBeVisible();
    await expect(page.locator(".manual-sidebar")).toBeVisible();
    await expect(page.locator(".manual-right-rail")).toBeVisible();
    await expect(page.locator(".manual-navbar-toc-toggle")).toBeVisible();
    const mobileOpenToggleBox = await page.locator(".manual-sidebar .manual-sidebar-toggle").boundingBox();
    const mobileOpenPanelBox = await page.locator(".manual-toc-panel").boundingBox();
    const mobileOpenRightRailBox = await page.locator(".manual-right-rail").boundingBox();
    if (!mobileOpenToggleBox || !mobileOpenPanelBox || !mobileOpenRightRailBox) throw new Error("Open mobile manual TOCs are not measurable");
    expect(mobileOpenPanelBox.width).toBeLessThan(page.viewportSize().width);
    expect(mobileOpenPanelBox.x).toBeGreaterThan(20);
    expect(mobileOpenRightRailBox.y).toBeGreaterThan(mobileOpenPanelBox.y);
    await page.locator(".manual-sidebar .manual-sidebar-toggle").click();
    await expect(page.locator(".manual-layout")).toHaveClass(/manual-sidebar-collapsed/);
    await expect(page.locator(".manual-nav")).toBeHidden();
    await expect(page.locator(".manual-right-rail")).toBeHidden();
    await expect(page.locator(".manual-navbar-toc-toggle")).toHaveAttribute("aria-expanded", "false");
    const mobileCollapsedToggleBox = await page.locator(".manual-sidebar .manual-sidebar-toggle").boundingBox();
    const mobileCollapsedMainBox = await page.locator(".manual-main").boundingBox();
    if (!mobileCollapsedToggleBox || !mobileCollapsedMainBox) throw new Error("Collapsed mobile manual layout is not measurable");
    expect(mobileCollapsedToggleBox.width).toBeLessThanOrEqual(24);
    expect(mobileCollapsedToggleBox.height).toBeGreaterThan(60);
    expect(mobileCollapsedMainBox.y).toBeLessThan(180);
    await page.locator(".manual-navbar-toc-toggle").click();
    await expect(page.locator(".manual-layout")).not.toHaveClass(/manual-sidebar-collapsed/);
    await expect(page.locator(".manual-nav")).toBeVisible();
    await expect(page.locator(".manual-right-rail")).toBeVisible();
    await page.locator(".manual-navbar-toc-toggle").click();
    await expect(page.locator(".manual-layout")).toHaveClass(/manual-sidebar-collapsed/);
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: join(renderOut, `manual-mobile-${testInfo.project.name}.png`), fullPage: true });
    return;
  }

  await page.goto(siteUrl("/en/publications/"));
  await expect(page.locator(".publications")).toContainText("Zaragozí");
  if (activeProfile === "unaltreprojecte" || activeProfile === "unaltreselfie") {
    await expect(page.locator("#navbar.profile-navbar-drawer")).toHaveCount(1);
    await expect(page.locator(".profile-navbar-utilities")).toBeVisible();
    await expect(page.locator("#navbarNav #navbarLangDropdown")).toHaveCount(0);
    await expect(page.locator("#navbarNav #light-toggle")).toHaveCount(0);
    const profileUtilitiesBox = await page.locator(".profile-navbar-utilities").boundingBox();
    const profileNavbarToggleBox = await page.locator(".navbar-toggler").boundingBox();
    if (!profileUtilitiesBox || !profileNavbarToggleBox) throw new Error("Profile mobile navbar controls are not measurable");
    expect(profileNavbarToggleBox.x).toBeGreaterThan(profileUtilitiesBox.x + profileUtilitiesBox.width - 1);
    await page.locator(".navbar-toggler").click();
    await expect(page.locator("#navbarNav")).toHaveClass(/show/);
    const profileDrawerBox = await page.locator("#navbarNav").boundingBox();
    if (!profileDrawerBox) throw new Error("Profile mobile drawer is not measurable");
    expect(profileDrawerBox.width).toBeLessThan(page.viewportSize().width);
    expect(profileDrawerBox.x).toBeGreaterThan(20);
    if (activeProfile === "unaltreprojecte") {
      const projectMobileDropdown = page.locator("#navbarNav .nav-item.dropdown", { has: page.locator(".dropdown-toggle", { hasText: "Project" }) });
      await projectMobileDropdown.locator(".dropdown-toggle").click();
      await expect(projectMobileDropdown.locator(".dropdown-menu")).toBeVisible();
      const projectMobileToggleBox = await projectMobileDropdown.locator(".dropdown-toggle").boundingBox();
      const projectMobileMenuBox = await projectMobileDropdown.locator(".dropdown-menu").boundingBox();
      if (!projectMobileToggleBox || !projectMobileMenuBox) throw new Error("Profile mobile dropdown is not measurable");
      expect(projectMobileMenuBox.y).toBeGreaterThanOrEqual(projectMobileToggleBox.y + projectMobileToggleBox.height - 1);
      expect(projectMobileMenuBox.x).toBeLessThan(projectMobileToggleBox.x + 40);
      expect(projectMobileMenuBox.width).toBeGreaterThan(projectMobileToggleBox.width - 80);
    }
    await page.mouse.click(12, 120);
    await expect(page.locator("#navbarNav")).not.toHaveClass(/show/);
    const firstPublicationMediaBox = await page.locator(".publications ol.bibliography li > .row > .abbr").first().boundingBox();
    const firstPublicationBodyBox = await page.locator(".publications ol.bibliography li > .row > [id]").first().boundingBox();
    if (!firstPublicationMediaBox || !firstPublicationBodyBox) throw new Error("Mobile publication card is not measurable");
    expect(firstPublicationMediaBox.width).toBeLessThanOrEqual(196);
    expect(firstPublicationBodyBox.y).toBeGreaterThan(firstPublicationMediaBox.y + firstPublicationMediaBox.height - 1);
  }
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: join(renderOut, `${activeProfile}-publications-mobile-${testInfo.project.name}.png`), fullPage: true });
});
