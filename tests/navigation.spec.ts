/**
 * Navigation tests — checks every link, page load, and the mega-menu dropdown.
 */
import { test, expect } from "@playwright/test";

const TOOL_SLUGS = [
  "merge-pdf",
  "split-pdf",
  "rotate-pdf",
  "whiteout-pdf",
  "watermark-pdf",
  "page-numbers-pdf",
  "delete-pdf-pages",
];

const COMING_SOON_SAMPLES = [
  "pdf-editor",
  "compress-pdf",
  "pdf-to-word",
];

test.describe("Homepage", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.toLowerCase()).toContain("liftpdf");
    // Logo text visible in header
    await expect(page.locator("header").getByText("LiftPDF")).toBeVisible();
  });

  test("hero section is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("tool cards are present on homepage", async ({ page }) => {
    await page.goto("/");
    // There should be multiple tool links
    const toolLinks = page.locator('a[href^="/"]').filter({ hasText: /PDF/i });
    await expect(toolLinks.first()).toBeVisible();
  });
});

test.describe("Header navigation", () => {
  test("logo links to homepage", async ({ page }) => {
    await page.goto("/merge-pdf");
    await page.getByText("LiftPDF").first().click();
    await expect(page).toHaveURL("/");
  });

  test("All Tools link works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /all tools/i }).click();
    await expect(page).toHaveURL("/all-tools");
    await expect(page.getByRole("heading", { name: /all pdf tools/i })).toBeVisible();
  });

  test("mega-menu opens and stays open on hover", async ({ page }) => {
    await page.goto("/");
    // Hover over the Edit category
    await page.getByRole("button", { name: /edit/i }).hover();
    // Dropdown should appear and be visible
    const dropdown = page.locator('[class*="shadow-lg"]').first();
    await expect(dropdown).toBeVisible();
  });

  test("mega-menu link navigates correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /organize/i }).hover();
    await page.getByRole("link", { name: /merge pdf/i }).first().click();
    await expect(page).toHaveURL("/merge-pdf");
  });

  test("mobile menu opens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    // Mobile hamburger button — find by its SVG icon presence in header
    await page.locator("header button.lg\\:hidden").click();
    await expect(page.getByRole("link", { name: /all tools/i })).toBeVisible();
  });
});

test.describe("All Tools page", () => {
  test("loads and shows all categories", async ({ page }) => {
    await page.goto("/all-tools");
    // Use the category badge spans (exact class match avoids ambiguity)
    await expect(page.locator("main span").filter({ hasText: "Edit" }).first()).toBeVisible();
    await expect(page.locator("main span").filter({ hasText: "Organize" }).first()).toBeVisible();
    await expect(page.locator("main span").filter({ hasText: "Convert" }).first()).toBeVisible();
    await expect(page.locator("main span").filter({ hasText: "Security" }).first()).toBeVisible();
  });

  test("tool cards link to correct pages", async ({ page }) => {
    await page.goto("/all-tools");
    await page.getByRole("link", { name: /merge pdf/i }).first().click();
    await expect(page).toHaveURL("/merge-pdf");
  });
});

test.describe("Tool pages — all load without errors", () => {
  for (const slug of TOOL_SLUGS) {
    test(`/  ${slug} loads`, async ({ page }) => {
      const response = await page.goto(`/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      // Should NOT show "coming soon" on built tools
      await expect(page.getByText(/coming soon/i)).not.toBeVisible();
    });
  }

  for (const slug of COMING_SOON_SAMPLES) {
    test(`/${slug} shows coming soon`, async ({ page }) => {
      const response = await page.goto(`/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(/coming soon/i)).toBeVisible();
    });
  }

  test("unknown slug returns 404", async ({ page }) => {
    const response = await page.goto("/this-tool-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
