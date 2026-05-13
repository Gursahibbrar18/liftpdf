# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> Page Numbers tool >> position picker and start number visible
- Location: tests/tools.spec.ts:237:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel(/start number/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel(/start number/i)

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
  - heading "Add Page Numbers" [level=1]
  - text: Stamp
  - paragraph: Choose the position (header or footer), start number, font, size and colour. Applies to all pages or a custom range.
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
  - paragraph: Position
  - button "Bottom centre"
  - button "Bottom left"
  - button "Bottom right"
  - button "Top centre"
  - text: Start number
  - spinbutton: "1"
  - button "Add Page Numbers"
  - heading "Related Stamp tools" [level=2]
  - link "Watermark PDF Add a text or image watermark to every page.":
    - /url: /watermark-pdf
  - link "Header & Footer Add custom headers and footers to every page.":
    - /url: /header-footer-pdf
  - link "Bates Numbering Add Bates stamps for legal and business documents.":
    - /url: /bates-numbering-pdf
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
  235 | 
  236 | test.describe("Page Numbers tool", () => {
  237 |   test("position picker and start number visible", async ({ page }) => {
  238 |     await page.goto("/page-numbers-pdf");
  239 |     await uploadPDF(page);
  240 |     await page.getByRole("button", { name: /page numbers/i }).click();
  241 |     await expect(page.getByRole("button", { name: /bottom centre/i })).toBeVisible();
> 242 |     await expect(page.getByLabel(/start number/i)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  243 |   });
  244 | });
  245 | 
```