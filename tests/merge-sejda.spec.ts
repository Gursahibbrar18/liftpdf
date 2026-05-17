import { test, expect } from "@playwright/test";
import * as path from "path";

const PDF = path.join(__dirname, "fixtures/test.pdf");

async function uploadTwoPDFs(page: import("@playwright/test").Page) {
  await page.goto("/merge-pdf");
  const input = page.locator("#file-input");
  await expect(input).toBeAttached();
  await input.setInputFiles([PDF, PDF]);
  try {
    await expect(page.getByTestId("merge-page-board")).toBeVisible({ timeout: 15_000 });
  } catch {
    await input.setInputFiles([]);
    await input.setInputFiles([PDF, PDF]);
    await expect(page.getByTestId("merge-page-board")).toBeVisible({ timeout: 20_000 });
  }
}

test.describe("Sejda-like Merge PDF", () => {
  test("renders uploaded pages as a horizontal page board with zoom", async ({ page }) => {
    await uploadTwoPDFs(page);

    const cards = page.getByTestId("merge-page-card");
    await expect(cards).toHaveCount(6, { timeout: 15_000 });

    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(second!.x).toBeGreaterThan(first!.x);
    expect(Math.abs(second!.y - first!.y)).toBeLessThan(80);

    await cards.nth(0).getByRole("button", { name: /zoom page 1/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText(/page 1 of 6/i)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("can reorder pages left-to-right before merging", async ({ page }) => {
    await uploadTwoPDFs(page);
    const cards = page.getByTestId("merge-page-card");
    await expect(cards).toHaveCount(6, { timeout: 15_000 });

    await expect(cards.nth(0)).toContainText("Page 1");
    await cards.nth(0).getByRole("button", { name: /move page right/i }).click();

    await expect(cards.nth(0)).toContainText("Page 2");
    await expect(cards.nth(1)).toContainText("Page 1");
  });
});
