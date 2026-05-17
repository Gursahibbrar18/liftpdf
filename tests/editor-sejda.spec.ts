/**
 * Sejda-style PDF editor workflow tests.
 * These tests describe the target interaction model before implementation:
 * upload once, edit directly on the page, apply multiple changes, then download.
 */
import { test, expect } from "@playwright/test";
import * as path from "path";

const PDF = path.join(__dirname, "fixtures/test.pdf");

async function uploadPDF(page: import("@playwright/test").Page) {
  await page.goto("/pdf-editor");
  const input = page.locator("#file-input");
  await expect(input).toBeAttached();
  await input.setInputFiles(PDF);
  try {
    await expect(page.getByText("test.pdf")).toBeVisible({ timeout: 2_000 });
  } catch {
    await input.setInputFiles([]);
    await input.setInputFiles(PDF);
    await expect(page.getByText("test.pdf")).toBeVisible({ timeout: 10_000 });
  }
}

function toolbarButton(page: import("@playwright/test").Page, label: string) {
  return page.locator("button").filter({ hasText: new RegExp(`^${label}$`, "i") }).first();
}

test.describe("Sejda-like PDF editor", () => {
  test("upload page mirrors Sejda source choices and blank document entry", async ({ page }) => {
    await page.goto("/pdf-editor");
    await expect(page.getByRole("heading", { name: /online pdf editor/i })).toBeVisible();
    await expect(page.getByText(/Edit PDF files for free/i)).toBeVisible();
    await expect(page.getByText(/Dropbox/i)).toBeVisible();
    await expect(page.getByText(/Google Drive/i)).toBeVisible();
    await expect(page.getByText(/OneDrive/i)).toBeVisible();
    await expect(page.getByText(/Web Address/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /start with a blank document/i })).toBeVisible();
  });

  test("direct page editing creates movable objects and applies them as a batch", async ({ page }) => {
    await uploadPDF(page);

    for (const label of ["Text", "Forms", "Image", "Sign", "Whiteout", "Annotate", "Shapes", "Rotate", "Delete Pages", "Watermark", "Page Numbers"]) {
      await expect(toolbarButton(page, label)).toBeVisible();
    }

    await toolbarButton(page, "Text").click();
    const pageCanvas = page.getByTestId("editor-page-1");
    await expect(pageCanvas).toBeVisible({ timeout: 15_000 });
    const box = await pageCanvas.boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.click(box!.x + 120, box!.y + 120);
    const textEditor = page.getByRole("textbox", { name: /edit text on page/i });
    await expect(textEditor).toBeFocused();
    await textEditor.fill("New text");
    await expect(page.getByText("New text").first()).toBeVisible();
    await expect(page.getByText(/1 pending edit/i)).toBeVisible();

    await toolbarButton(page, "Sign").click();
    await page.mouse.click(box!.x + 150, box!.y + 180);
    const signatureEditor = page.getByRole("textbox", { name: /edit signature on page/i });
    await expect(signatureEditor).toBeFocused();
    await signatureEditor.fill("Your signature");
    await expect(page.getByText("Your signature").first()).toBeVisible();
    await expect(page.getByText(/2 pending edits/i)).toBeVisible();

    await page.getByRole("button", { name: /^apply changes$/i }).click();
    const readyDialog = page.getByRole("dialog");
    await expect(readyDialog.getByRole("heading", { name: /your document is ready/i })).toBeVisible({ timeout: 15_000 });
    await expect(readyDialog.getByRole("button", { name: /^download$/i })).toBeVisible();
    await expect(readyDialog.getByRole("button", { name: /back to editing/i })).toBeVisible();
  });

  test("text tool edits inline at the clicked page location without using the right panel", async ({ page }) => {
    await uploadPDF(page);
    await toolbarButton(page, "Text").click();

    const pageCanvas = page.getByTestId("editor-page-1");
    await expect(pageCanvas).toBeVisible({ timeout: 15_000 });
    const box = await pageCanvas.boundingBox();
    expect(box).toBeTruthy();

    await pageCanvas.click({ position: { x: 180, y: 155 } });
    const inlineEditor = page.getByRole("textbox", { name: /edit text on page/i });
    await expect(inlineEditor).toBeFocused();
    await inlineEditor.fill("Policy number ABC123");
    await expect(page.getByText("Policy number ABC123").first()).toBeVisible();
    await expect(page.getByText("New text")).toHaveCount(0);
  });

  test("signature tool lets the user type directly on the page", async ({ page }) => {
    await uploadPDF(page);
    await toolbarButton(page, "Sign").click();

    const pageCanvas = page.getByTestId("editor-page-1");
    await expect(pageCanvas).toBeVisible({ timeout: 15_000 });
    await pageCanvas.click({ position: { x: 210, y: 220 } });
    const inlineEditor = page.getByRole("textbox", { name: /edit signature on page/i });
    await expect(inlineEditor).toBeFocused();
    await inlineEditor.fill("Gursahib Brar");
    await expect(page.getByText("Gursahib Brar").first()).toBeVisible();
  });
});
