# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Tool pages — all load without errors >> /pdf-to-word shows coming soon
- Location: tests/navigation.spec.ts:108:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/coming soon/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/coming soon/i)

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
  - heading "PDF to Word" [level=1]
  - text: Convert
  - paragraph: Turn any PDF into a fully editable DOCX file. Best results with text-based PDFs — run OCR first if your file is a scanned image.
  - heading "Related Convert tools" [level=2]
  - link "Compress PDF Reduce PDF file size while preserving quality.":
    - /url: /compress-pdf
  - link "Word to PDF Convert Word documents to PDF with perfect formatting.":
    - /url: /word-to-pdf
  - link "PDF to Excel Extract tables from PDF into an Excel spreadsheet.":
    - /url: /pdf-to-excel
  - link "Excel to PDF Convert Excel spreadsheets to PDF.":
    - /url: /excel-to-pdf
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
  11  |   "watermark-pdf",
  12  |   "page-numbers-pdf",
  13  |   "delete-pdf-pages",
  14  | ];
  15  | 
  16  | const COMING_SOON_SAMPLES = [
  17  |   "pdf-editor",
  18  |   "compress-pdf",
  19  |   "pdf-to-word",
  20  | ];
  21  | 
  22  | test.describe("Homepage", () => {
  23  |   test("loads with correct title", async ({ page }) => {
  24  |     await page.goto("/");
  25  |     await expect(page).toHaveTitle(/LiftPDF/i);
  26  |     await expect(page.getByText("LiftPDF")).toBeVisible();
  27  |   });
  28  | 
  29  |   test("hero section is visible", async ({ page }) => {
  30  |     await page.goto("/");
  31  |     await expect(page.locator("h1")).toBeVisible();
  32  |   });
  33  | 
  34  |   test("tool cards are present on homepage", async ({ page }) => {
  35  |     await page.goto("/");
  36  |     // There should be multiple tool links
  37  |     const toolLinks = page.locator('a[href^="/"]').filter({ hasText: /PDF/i });
  38  |     await expect(toolLinks.first()).toBeVisible();
  39  |   });
  40  | });
  41  | 
  42  | test.describe("Header navigation", () => {
  43  |   test("logo links to homepage", async ({ page }) => {
  44  |     await page.goto("/merge-pdf");
  45  |     await page.getByText("LiftPDF").first().click();
  46  |     await expect(page).toHaveURL("/");
  47  |   });
  48  | 
  49  |   test("All Tools link works", async ({ page }) => {
  50  |     await page.goto("/");
  51  |     await page.getByRole("link", { name: /all tools/i }).click();
  52  |     await expect(page).toHaveURL("/all-tools");
  53  |     await expect(page.getByRole("heading", { name: /all pdf tools/i })).toBeVisible();
  54  |   });
  55  | 
  56  |   test("mega-menu opens and stays open on hover", async ({ page }) => {
  57  |     await page.goto("/");
  58  |     // Hover over the Edit category
  59  |     await page.getByRole("button", { name: /edit/i }).hover();
  60  |     // Dropdown should appear and be visible
  61  |     const dropdown = page.locator('[class*="shadow-lg"]').first();
  62  |     await expect(dropdown).toBeVisible();
  63  |   });
  64  | 
  65  |   test("mega-menu link navigates correctly", async ({ page }) => {
  66  |     await page.goto("/");
  67  |     await page.getByRole("button", { name: /organize/i }).hover();
  68  |     await page.getByRole("link", { name: /merge pdf/i }).first().click();
  69  |     await expect(page).toHaveURL("/merge-pdf");
  70  |   });
  71  | 
  72  |   test("mobile menu opens", async ({ page }) => {
  73  |     await page.setViewportSize({ width: 375, height: 812 });
  74  |     await page.goto("/");
  75  |     await page.getByRole("button", { name: /toggle menu/i }).click();
  76  |     await expect(page.getByText(/all tools/i)).toBeVisible();
  77  |   });
  78  | });
  79  | 
  80  | test.describe("All Tools page", () => {
  81  |   test("loads and shows all categories", async ({ page }) => {
  82  |     await page.goto("/all-tools");
  83  |     await expect(page.getByText(/Edit/)).toBeVisible();
  84  |     await expect(page.getByText(/Organize/)).toBeVisible();
  85  |     await expect(page.getByText(/Convert/)).toBeVisible();
  86  |     await expect(page.getByText(/Security/)).toBeVisible();
  87  |   });
  88  | 
  89  |   test("tool cards link to correct pages", async ({ page }) => {
  90  |     await page.goto("/all-tools");
  91  |     await page.getByRole("link", { name: /merge pdf/i }).first().click();
  92  |     await expect(page).toHaveURL("/merge-pdf");
  93  |   });
  94  | });
  95  | 
  96  | test.describe("Tool pages — all load without errors", () => {
  97  |   for (const slug of TOOL_SLUGS) {
  98  |     test(`/  ${slug} loads`, async ({ page }) => {
  99  |       const response = await page.goto(`/${slug}`);
  100 |       expect(response?.status()).toBe(200);
  101 |       await expect(page.locator("h1")).toBeVisible();
  102 |       // Should NOT show "coming soon" on built tools
  103 |       await expect(page.getByText(/coming soon/i)).not.toBeVisible();
  104 |     });
  105 |   }
  106 | 
  107 |   for (const slug of COMING_SOON_SAMPLES) {
  108 |     test(`/${slug} shows coming soon`, async ({ page }) => {
  109 |       const response = await page.goto(`/${slug}`);
  110 |       expect(response?.status()).toBe(200);
> 111 |       await expect(page.getByText(/coming soon/i)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  112 |     });
  113 |   }
  114 | 
  115 |   test("unknown slug returns 404", async ({ page }) => {
  116 |     const response = await page.goto("/this-tool-does-not-exist");
  117 |     expect(response?.status()).toBe(404);
  118 |   });
  119 | });
  120 | 
```