# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> Merge PDF >> merge button appears after adding file
- Location: tests/tools.spec.ts:30:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /merge/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /merge/i })

```

```yaml
- banner:
  - link "LiftPDF":
    - /url: /
  - navigation:
    - button "Edit"
    - button "Organize"
    - button "Convert"
    - button "Security"
    - button "Stamp"
    - button "Layout"
    - button "Forms"
  - link "All Tools":
    - /url: /all-tools
- main:
  - link "All tools":
    - /url: /
  - heading "Merge PDF" [level=1]
  - text: Organize
  - paragraph: Drag and drop as many PDFs as you need, reorder them and merge in one click. Supports up to 100 MB total free.
  - button "Choose File"
  - paragraph: Choose PDF files to merge
  - paragraph: or drag and drop — add as many as you need
  - text: Max 100 MB free · Files never leave your browser 1 file — drag to reorder
  - button "Clear all"
  - list:
    - listitem:
      - paragraph: test.pdf
      - paragraph: 0.00 MB
      - button
  - paragraph: Add at least one more PDF to merge.
  - heading "Related Organize tools" [level=2]
  - link "Split PDF Split a PDF into multiple files by page range.":
    - /url: /split-pdf
  - link "Organize Pages Visually drag, rotate or delete pages before saving.":
    - /url: /organize-pdf
  - link "Delete Pages Remove unwanted pages from your PDF.":
    - /url: /delete-pdf-pages
  - link "Extract Pages Extract specific pages to a new PDF file.":
    - /url: /extract-pdf-pages
- contentinfo:
  - link "LiftPDF":
    - /url: /
  - paragraph: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
  - heading "Edit" [level=3]
  - list:
    - listitem:
      - link "PDF Editor":
        - /url: /pdf-editor
    - listitem:
      - link "Whiteout PDF":
        - /url: /whiteout-pdf
    - listitem:
      - link "Annotate PDF":
        - /url: /annotate-pdf
    - listitem:
      - link "Fill & Sign PDF":
        - /url: /fill-sign-pdf
    - listitem:
      - link "Find & Replace":
        - /url: /find-replace-pdf
  - heading "Organize" [level=3]
  - list:
    - listitem:
      - link "Merge PDF":
        - /url: /merge-pdf
    - listitem:
      - link "Split PDF":
        - /url: /split-pdf
    - listitem:
      - link "Organize Pages":
        - /url: /organize-pdf
    - listitem:
      - link "Delete Pages":
        - /url: /delete-pdf-pages
    - listitem:
      - link "Extract Pages":
        - /url: /extract-pdf-pages
  - heading "Convert" [level=3]
  - list:
    - listitem:
      - link "Compress PDF":
        - /url: /compress-pdf
    - listitem:
      - link "PDF to Word":
        - /url: /pdf-to-word
    - listitem:
      - link "Word to PDF":
        - /url: /word-to-pdf
    - listitem:
      - link "PDF to Excel":
        - /url: /pdf-to-excel
    - listitem:
      - link "Excel to PDF":
        - /url: /excel-to-pdf
    - listitem:
      - link "PDF to PowerPoint":
        - /url: /pdf-to-ppt
  - heading "Layout" [level=3]
  - list:
    - listitem:
      - link "Rotate PDF":
        - /url: /rotate-pdf
  - paragraph: © 2026 LiftPDF. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy-policy
  - link "Terms of Service":
    - /url: /terms-of-service
  - link "Contact":
    - /url: /contact
- alert
```

# Test source

```ts
  1   | /**
  2   |  * Tool tests — uploads a real PDF to each tool and verifies the workspace appears
  3   |  * and the download button is reachable.
  4   |  */
  5   | import { test, expect } from "@playwright/test";
  6   | import path from "path";
  7   | 
  8   | const PDF = path.join(__dirname, "fixtures/test.pdf");
  9   | 
  10  | async function uploadPDF(page: import("@playwright/test").Page, filePath = PDF) {
  11  |   // UploadZone has a hidden <input id="file-input">
  12  |   await page.locator("#file-input").setInputFiles(filePath);
  13  | }
  14  | 
  15  | test.describe("Merge PDF", () => {
  16  |   test.beforeEach(async ({ page }) => {
  17  |     await page.goto("/merge-pdf");
  18  |   });
  19  | 
  20  |   test("upload zone is visible", async ({ page }) => {
  21  |     await expect(page.getByText(/choose pdf file/i)).toBeVisible();
  22  |   });
  23  | 
  24  |   test("can add a file", async ({ page }) => {
  25  |     await uploadPDF(page);
  26  |     // File name should appear in the list
  27  |     await expect(page.getByText("test.pdf")).toBeVisible();
  28  |   });
  29  | 
  30  |   test("merge button appears after adding file", async ({ page }) => {
  31  |     await uploadPDF(page);
> 32  |     await expect(page.getByRole("button", { name: /merge/i })).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  33  |   });
  34  | 
  35  |   test("can add multiple files", async ({ page }) => {
  36  |     // First file
  37  |     await uploadPDF(page);
  38  |     await expect(page.getByText("test.pdf")).toBeVisible();
  39  |     // Add second file via the add more button
  40  |     const addMore = page.getByRole("button", { name: /add more/i });
  41  |     if (await addMore.isVisible()) {
  42  |       await addMore.click();
  43  |       await page.locator("#file-input").setInputFiles(PDF);
  44  |     }
  45  |   });
  46  | });
  47  | 
  48  | test.describe("PDF Workspace — single-file tools", () => {
  49  |   const SINGLE_FILE_TOOLS = [
  50  |     { slug: "whiteout-pdf",     tab: /whiteout/i,      action: /apply/i },
  51  |     { slug: "rotate-pdf",       tab: /rotate/i,        action: /rotate/i },
  52  |     { slug: "delete-pdf-pages", tab: /delete pages/i,  action: /delete/i },
  53  |     { slug: "watermark-pdf",    tab: /watermark/i,     action: /add watermark/i },
  54  |     { slug: "page-numbers-pdf", tab: /page numbers/i,  action: /add page numbers/i },
  55  |     { slug: "split-pdf",        tab: /split/i,         action: /split pdf/i },
  56  |   ];
  57  | 
  58  |   for (const { slug, tab, action } of SINGLE_FILE_TOOLS) {
  59  |     test.describe(`/${slug}`, () => {
  60  |       test("upload zone is visible before upload", async ({ page }) => {
  61  |         await page.goto(`/${slug}`);
  62  |         await expect(page.getByText(/choose pdf file/i)).toBeVisible();
  63  |       });
  64  | 
  65  |       test("workspace appears after upload", async ({ page }) => {
  66  |         await page.goto(`/${slug}`);
  67  |         await uploadPDF(page);
  68  |         // File bar should show the filename
  69  |         await expect(page.getByText("test.pdf")).toBeVisible();
  70  |         // All tool tabs should be visible
  71  |         await expect(page.getByRole("button", { name: tab })).toBeVisible();
  72  |       });
  73  | 
  74  |       test("correct tool tab is active by default", async ({ page }) => {
  75  |         await page.goto(`/${slug}`);
  76  |         await uploadPDF(page);
  77  |         const activeTab = page.getByRole("button", { name: tab });
  78  |         await expect(activeTab).toBeVisible();
  79  |         // Active tab has bg-primary class
  80  |         await expect(activeTab).toHaveClass(/bg-primary/);
  81  |       });
  82  | 
  83  |       test("action button is visible", async ({ page }) => {
  84  |         await page.goto(`/${slug}`);
  85  |         await uploadPDF(page);
  86  |         await expect(page.getByRole("button", { name: action })).toBeVisible();
  87  |       });
  88  | 
  89  |       test("can switch to another tool tab", async ({ page }) => {
  90  |         await page.goto(`/${slug}`);
  91  |         await uploadPDF(page);
  92  |         // Click the Rotate tab (if not already on it)
  93  |         const rotateTab = page.getByRole("button", { name: /^rotate$/i });
  94  |         if (await rotateTab.isVisible()) {
  95  |           await rotateTab.click();
  96  |           await expect(rotateTab).toHaveClass(/bg-primary/);
  97  |         }
  98  |       });
  99  | 
  100 |       test("change file resets to upload zone", async ({ page }) => {
  101 |         await page.goto(`/${slug}`);
  102 |         await uploadPDF(page);
  103 |         await page.getByRole("button", { name: /change file/i }).click();
  104 |         await expect(page.getByText(/choose pdf file/i)).toBeVisible();
  105 |       });
  106 |     });
  107 |   }
  108 | });
  109 | 
  110 | test.describe("Page thumbnails in workspace", () => {
  111 |   test("thumbnails render after upload", async ({ page }) => {
  112 |     await page.goto("/delete-pdf-pages");
  113 |     await uploadPDF(page);
  114 |     // Wait for thumbnails — they're rendered async via PDF.js
  115 |     // The page strip should show "Pages" heading
  116 |     await expect(page.getByText("Pages")).toBeVisible({ timeout: 15_000 });
  117 |   });
  118 | 
  119 |   test("zoom modal opens on thumbnail click", async ({ page }) => {
  120 |     await page.goto("/rotate-pdf");
  121 |     await uploadPDF(page);
  122 |     // Wait for at least one thumbnail to appear
  123 |     const thumb = page.locator('img[alt="Page 1"]');
  124 |     await expect(thumb).toBeVisible({ timeout: 15_000 });
  125 |     await thumb.click();
  126 |     // Modal should open
  127 |     await expect(page.getByText(/page 1 of/i)).toBeVisible();
  128 |   });
  129 | 
  130 |   test("zoom modal closes on escape", async ({ page }) => {
  131 |     await page.goto("/rotate-pdf");
  132 |     await uploadPDF(page);
```