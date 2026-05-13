# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> Page thumbnails in workspace >> zoom modal closes on escape
- Location: tests/tools.spec.ts:130:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('img[alt="Page 1"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('img[alt="Page 1"]')

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
  - heading "Rotate PDF" [level=1]
  - text: Layout
  - paragraph: Fix landscape or upside-down pages. Rotate all pages at once or select individual pages and apply different rotations.
  - paragraph: test.pdf
  - paragraph: 0.00 MB
  - button "Change file"
  - paragraph: Pages
  - button "Whiteout"
  - button "Rotate"
  - button "Delete Pages"
  - button "Watermark"
  - button "Page Numbers"
  - button "Split"
  - paragraph: Rotation angle
  - button "↻ 90° clockwise"
  - button "↕ 180°"
  - button "↺ 90° counter-clockwise"
  - button "Rotate PDF"
  - heading "Related Layout tools" [level=2]
  - link "Crop PDF Trim margins or change the visible area of your PDF.":
    - /url: /crop-pdf
  - link "Resize PDF Scale pages or add padding to fit a standard page size.":
    - /url: /resize-pdf
  - link "Flatten PDF Merge form fields and annotations into the page content.":
    - /url: /flatten-pdf
  - link "N-Up Print multiple PDF pages per sheet.":
    - /url: /n-up-pdf
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
  133 |     const thumb = page.locator('img[alt="Page 1"]');
> 134 |     await expect(thumb).toBeVisible({ timeout: 15_000 });
      |                         ^ Error: expect(locator).toBeVisible() failed
  135 |     await thumb.click();
  136 |     await page.keyboard.press("Escape");
  137 |     await expect(page.getByText(/page 1 of/i)).not.toBeVisible();
  138 |   });
  139 | });
  140 | 
  141 | test.describe("Delete Pages — thumbnail selection", () => {
  142 |   test("page thumbnails shown in workspace mode", async ({ page }) => {
  143 |     await page.goto("/delete-pdf-pages");
  144 |     await uploadPDF(page);
  145 |     // Wait for thumbnails (PDF.js renders async)
  146 |     await expect(page.locator('img[alt="Page 1"]')).toBeVisible({ timeout: 15_000 });
  147 |   });
  148 | 
  149 |   test("clicking a thumbnail marks it for deletion", async ({ page }) => {
  150 |     await page.goto("/delete-pdf-pages");
  151 |     await uploadPDF(page);
  152 |     // Switch to Delete Pages tab in workspace
  153 |     await page.getByRole("button", { name: /delete pages/i }).click();
  154 |     // Wait for thumbnails
  155 |     const thumb = page.locator('img[alt="Page 1"]').first();
  156 |     await expect(thumb).toBeVisible({ timeout: 15_000 });
  157 |     // Click the page thumbnail card (parent button)
  158 |     await thumb.locator("..").click();
  159 |     // Delete button should now show "Delete 1 page"
  160 |     await expect(page.getByRole("button", { name: /delete 1 page/i })).toBeVisible();
  161 |   });
  162 | });
  163 | 
  164 | test.describe("Whiteout tool", () => {
  165 |   test("canvas appears after upload", async ({ page }) => {
  166 |     await page.goto("/whiteout-pdf");
  167 |     await uploadPDF(page);
  168 |     // Canvas for drawing should appear (PDF.js renders first page)
  169 |     await expect(page.locator("canvas")).toBeVisible({ timeout: 15_000 });
  170 |   });
  171 | 
  172 |   test("can draw a whitebox on the canvas", async ({ page }) => {
  173 |     await page.goto("/whiteout-pdf");
  174 |     await uploadPDF(page);
  175 |     const canvas = page.locator("canvas").first();
  176 |     await expect(canvas).toBeVisible({ timeout: 15_000 });
  177 |     const box = await canvas.boundingBox();
  178 |     if (box) {
  179 |       // Draw a rectangle on the canvas
  180 |       await page.mouse.move(box.x + 50, box.y + 50);
  181 |       await page.mouse.down();
  182 |       await page.mouse.move(box.x + 150, box.y + 150);
  183 |       await page.mouse.up();
  184 |       // "1 whiteout area drawn" should appear
  185 |       await expect(page.getByText(/1 whiteout area/i)).toBeVisible();
  186 |     }
  187 |   });
  188 | });
  189 | 
  190 | test.describe("Rotate tool", () => {
  191 |   test("angle options are selectable", async ({ page }) => {
  192 |     await page.goto("/rotate-pdf");
  193 |     await uploadPDF(page);
  194 |     // Should see the 3 angle options
  195 |     await expect(page.getByRole("button", { name: /90° clockwise/i })).toBeVisible();
  196 |     await expect(page.getByRole("button", { name: /180°/i })).toBeVisible();
  197 |     await expect(page.getByRole("button", { name: /90° counter/i })).toBeVisible();
  198 |     // Click 180
  199 |     await page.getByRole("button", { name: /180°/i }).click();
  200 |     await expect(page.getByRole("button", { name: /180°/i })).toHaveClass(/bg-primary/);
  201 |   });
  202 | });
  203 | 
  204 | test.describe("Split tool", () => {
  205 |   test("range inputs are visible after upload", async ({ page }) => {
  206 |     await page.goto("/split-pdf");
  207 |     await uploadPDF(page);
  208 |     // Switch to split tab
  209 |     await page.getByRole("button", { name: /^split$/i }).click();
  210 |     await expect(page.getByText(/custom page ranges/i)).toBeVisible();
  211 |     await expect(page.getByPlaceholder("Name")).toBeVisible();
  212 |   });
  213 | 
  214 |   test("can add a range", async ({ page }) => {
  215 |     await page.goto("/split-pdf");
  216 |     await uploadPDF(page);
  217 |     await page.getByRole("button", { name: /^split$/i }).click();
  218 |     await page.getByRole("button", { name: /add range/i }).click();
  219 |     // Should now have 2 range rows
  220 |     const labels = page.getByPlaceholder("Name");
  221 |     expect(await labels.count()).toBe(2);
  222 |   });
  223 | });
  224 | 
  225 | test.describe("Watermark tool", () => {
  226 |   test("text input and sliders visible", async ({ page }) => {
  227 |     await page.goto("/watermark-pdf");
  228 |     await uploadPDF(page);
  229 |     await page.getByRole("button", { name: /^watermark$/i }).click();
  230 |     await expect(page.getByPlaceholder(/confidential/i)).toBeVisible();
  231 |     await expect(page.getByText(/opacity/i)).toBeVisible();
  232 |     await expect(page.getByText(/angle/i)).toBeVisible();
  233 |   });
  234 | });
```