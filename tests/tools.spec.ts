/**
 * Tool tests — uploads a real PDF to each tool and verifies the workspace appears
 * and the download button is reachable.
 */
import { test, expect } from "@playwright/test";
import path from "path";

const PDF = path.join(__dirname, "fixtures/test.pdf");
const WORKSPACE_UPLOAD_LABEL = /choose pdf file|upload pdf file/i;
const PDF_EDITOR_TOOLBAR = [
  "Text",
  "Forms",
  "Image",
  "Sign",
  "Whiteout",
  "Annotate",
  "Shapes",
  "Crop",
  "Rotate",
  "Delete Pages",
  "Watermark",
  "Page Numbers",
];

async function uploadPDF(page: import("@playwright/test").Page, filePath = PDF) {
  // UploadZone has a hidden <input id="file-input">. In WebKit-like timing and
  // parallel runs, setting the file immediately after navigation can occasionally
  // race the hydrated onChange handler, so wait for the input and retry once.
  const input = page.locator("#file-input");
  await expect(input).toBeAttached();
  await input.setInputFiles(filePath);
  try {
    await expect(page.getByText("test.pdf")).toBeVisible({ timeout: 2_000 });
  } catch {
    await input.setInputFiles([]);
    await input.setInputFiles(filePath);
    await expect(page.getByText("test.pdf")).toBeVisible({ timeout: 10_000 });
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toolbarButton(page: import("@playwright/test").Page, label: string) {
  // Some limited tools append a small "soon" badge to the accessible name.
  return page.locator("button").filter({ hasText: new RegExp(`^${escapeRegExp(label)}`, "i") }).first();
}

test.describe("Merge PDF", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/merge-pdf");
  });

  test("upload zone is visible", async ({ page }) => {
    await expect(page.getByText(WORKSPACE_UPLOAD_LABEL)).toBeVisible();
  });

  test("can add a file", async ({ page }) => {
    await uploadPDF(page);
    // File name should appear in the list
    await expect(page.getByText("test.pdf")).toBeVisible();
  });

  test("merge button appears after adding 2 files", async ({ page }) => {
    // First file — verify the "add at least one more" hint
    await uploadPDF(page);
    await expect(page.getByText("test.pdf")).toBeVisible();
    await expect(page.getByText(/add at least one more/i)).toBeVisible();
    // Add 2 files at once — setInputFiles with same file twice doesn't re-fire onChange
    await page.locator("#file-input").setInputFiles([PDF, PDF]);
    // Merge button should now show total of 3 files
    await expect(page.getByRole("button", { name: /merge \d+ pdfs/i })).toBeVisible();
  });

  test("can add multiple files", async ({ page }) => {
    // First file
    await uploadPDF(page);
    await expect(page.getByText("test.pdf")).toBeVisible();
    // Add second file via the add more button
    const addMore = page.getByRole("button", { name: /add more/i });
    if (await addMore.isVisible()) {
      await addMore.click();
      await page.locator("#file-input").setInputFiles(PDF);
    }
  });
});

test.describe("PDF Workspace — single-file tools", () => {
  const SINGLE_FILE_TOOLS = [
    { slug: "whiteout-pdf",     tab: /whiteout/i,      action: /apply/i },
    { slug: "rotate-pdf",       tab: /rotate/i,        action: /rotate/i },
    { slug: "delete-pdf-pages", tab: /delete pages/i,  action: /delete/i },
    { slug: "watermark-pdf",    tab: /watermark/i,     action: /add watermark/i },
    { slug: "page-numbers-pdf", tab: /page numbers/i,  action: /add page numbers/i },
    { slug: "split-pdf",        tab: /split/i,         action: /split pdf/i },
  ];

  for (const { slug, tab } of SINGLE_FILE_TOOLS) {
    test.describe(`/${slug}`, () => {
      test("upload zone is visible before upload", async ({ page }) => {
        await page.goto(`/${slug}`);
        await expect(page.getByText(WORKSPACE_UPLOAD_LABEL)).toBeVisible();
      });

      test("workspace appears after upload", async ({ page }) => {
        await page.goto(`/${slug}`);
        await uploadPDF(page);
        // File bar should show the filename
        await expect(page.getByText("test.pdf")).toBeVisible();
        // All tool tabs should be visible
        await expect(page.getByRole("button", { name: tab })).toBeVisible();
      });

      test("correct tool tab is active by default", async ({ page }) => {
        await page.goto(`/${slug}`);
        await uploadPDF(page);
        const activeTab = page.getByRole("button", { name: tab });
        await expect(activeTab).toBeVisible();
        // Active tab has bg-primary class
        await expect(activeTab).toHaveClass(/bg-primary/);
      });

      test("active tool panel is reachable", async ({ page }) => {
        await page.goto(`/${slug}`);
        await uploadPDF(page);
        const activeTab = page.getByRole("button", { name: tab });
        await activeTab.click();
        await expect(activeTab).toHaveClass(/bg-primary/);
      });

      test("can switch to another tool tab", async ({ page }) => {
        await page.goto(`/${slug}`);
        await uploadPDF(page);
        // Click the Rotate tab (if not already on it)
        const rotateTab = page.getByRole("button", { name: /^rotate$/i });
        if (await rotateTab.isVisible()) {
          await rotateTab.click();
          await expect(rotateTab).toHaveClass(/bg-primary/);
        }
      });

      test("change file resets to upload zone", async ({ page }) => {
        await page.goto(`/${slug}`);
        await uploadPDF(page);
        await page.getByRole("button", { name: /change file/i }).click();
        await expect(page.getByText(WORKSPACE_UPLOAD_LABEL)).toBeVisible();
      });
    });
  }
});

test.describe("PDF Editor toolbar and overlays", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pdf-editor");
    await uploadPDF(page);
    await expect(page.getByText("test.pdf")).toBeVisible();
  });

  test("shows the Sejda-like editor toolbar after upload", async ({ page }) => {
    for (const label of PDF_EDITOR_TOOLBAR) {
      await expect(toolbarButton(page, label)).toBeVisible();
    }
  });

  test("text overlay controls are available by default", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /^text$/i })).toBeVisible();
    await expect(page.getByText(/Click anywhere on a page to add text/i)).toBeVisible();
    await expect(page.getByText(/Select a toolbar item, then click the PDF page/i)).toBeVisible();
  });

  test("sign overlay controls can be selected", async ({ page }) => {
    await toolbarButton(page, "Sign").click();
    await expect(page.getByRole("heading", { name: /^sign$/i })).toBeVisible();
    await expect(page.getByText(/place a typed signature/i)).toBeVisible();
    await expect(page.getByText(/Type signature/i)).toBeVisible();
  });
});

test.describe("Page thumbnails in workspace", () => {
  test("thumbnails render after upload", async ({ page }) => {
    await page.goto("/delete-pdf-pages");
    await uploadPDF(page);
    // Wait for thumbnails — they're rendered async via PDF.js
    // The page strip should show "Pages" heading
    await expect(page.getByText("Pages", { exact: true })).toBeVisible({ timeout: 15_000 });
  });

  test("zoom modal opens on thumbnail click", async ({ page }) => {
    await page.goto("/rotate-pdf");
    await uploadPDF(page);
    // Wait for at least one thumbnail to appear
    const thumb = page.locator('img[alt="Page 1"]').first();
    await expect(thumb).toBeVisible({ timeout: 15_000 });
    // force:true bypasses the invisible hover-overlay that Playwright sees as intercepting
    await thumb.click({ force: true });
    // Modal should open
    await expect(page.getByText(/page 1 of/i)).toBeVisible();
  });

  test("zoom modal closes on escape", async ({ page }) => {
    await page.goto("/rotate-pdf");
    await uploadPDF(page);
    const thumb = page.locator('img[alt="Page 1"]').first();
    await expect(thumb).toBeVisible({ timeout: 15_000 });
    await thumb.click({ force: true });
    await page.keyboard.press("Escape");
    await expect(page.getByText(/page 1 of/i)).not.toBeVisible();
  });
});

test.describe("Delete Pages — thumbnail selection", () => {
  test("page thumbnails shown in workspace mode", async ({ page }) => {
    await page.goto("/delete-pdf-pages");
    await uploadPDF(page);
    // Wait for thumbnails (PDF.js renders async); .first() because both workspace panel
    // and DeletePagesTool panel render thumbnails with the same alt text
    await expect(page.locator('img[alt="Page 1"]').first()).toBeVisible({ timeout: 15_000 });
  });

  test("clicking a thumbnail marks it for deletion", async ({ page }) => {
    await page.goto("/delete-pdf-pages");
    await uploadPDF(page);
    // Switch to Delete Pages tab in workspace
    await page.getByRole("button", { name: /delete pages/i }).click();
    // Wait for the DeletePagesTool thumbnail buttons (button wrapper, not workspace-panel div)
    const thumbButton = page.locator("button").filter({ has: page.locator('img[alt="Page 1"]') }).last();
    await expect(thumbButton).toBeVisible({ timeout: 15_000 });
    await thumbButton.click();
    // Workspace mode uses the shared Sejda-style "Apply changes" action after selection.
    await expect(page.getByText(/keeping 2 pages/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /^apply changes$/i }).first()).toBeVisible();
  });
});

test.describe("Whiteout tool", () => {
  test("canvas appears after upload", async ({ page }) => {
    await page.goto("/whiteout-pdf");
    await uploadPDF(page);
    // The shared Sejda-style page canvas should appear after upload.
    await expect(page.getByTestId("editor-page-1")).toBeVisible({ timeout: 15_000 });
  });

  test("can draw a whitebox on the canvas", async ({ page }) => {
    await page.goto("/whiteout-pdf");
    await uploadPDF(page);
    const canvas = page.getByTestId("editor-page-1");
    await expect(canvas).toBeVisible({ timeout: 15_000 });
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + 50, box.y + 50);
      await expect(page.getByText(/1 pending edit/i)).toBeVisible();
    }
  });
});

test.describe("Rotate tool", () => {
  test("angle options are selectable", async ({ page }) => {
    await page.goto("/rotate-pdf");
    await uploadPDF(page);
    // Should see the 3 angle options
    await expect(page.getByRole("button", { name: /90° clockwise/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /180°/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /90° counter/i })).toBeVisible();
    // Click 180
    await page.getByRole("button", { name: /180°/i }).click();
    await expect(page.getByRole("button", { name: /180°/i })).toHaveClass(/bg-primary/);
  });
});

test.describe("Split tool", () => {
  test("range inputs are visible after upload", async ({ page }) => {
    await page.goto("/split-pdf");
    await uploadPDF(page);
    // Switch to split tab
    await page.getByRole("button", { name: /^split$/i }).click();
    await expect(page.getByText(/custom page ranges/i)).toBeVisible();
    await expect(page.getByPlaceholder("Name")).toBeVisible();
  });

  test("can add a range", async ({ page }) => {
    await page.goto("/split-pdf");
    await uploadPDF(page);
    await page.getByRole("button", { name: /^split$/i }).click();
    await page.getByRole("button", { name: /add range/i }).click();
    // Should now have 2 range rows
    const labels = page.getByPlaceholder("Name");
    expect(await labels.count()).toBe(2);
  });
});

test.describe("Watermark tool", () => {
  test("text input and sliders visible", async ({ page }) => {
    await page.goto("/watermark-pdf");
    await uploadPDF(page);
    await page.getByRole("button", { name: /^watermark$/i }).click();
    await expect(page.getByPlaceholder(/confidential/i)).toBeVisible();
    // Use specific text to avoid matching the tool description paragraph
    await expect(page.getByText(/Opacity —/)).toBeVisible();
    await expect(page.getByText(/Angle —/)).toBeVisible();
  });
});

test.describe("Page Numbers tool", () => {
  test("position picker and start number visible", async ({ page }) => {
    await page.goto("/page-numbers-pdf");
    await uploadPDF(page);
    await page.getByRole("button", { name: /page numbers/i }).click();
    await expect(page.getByRole("button", { name: /bottom centre/i })).toBeVisible();
    await expect(page.getByLabel(/start number/i)).toBeVisible();
  });
});
