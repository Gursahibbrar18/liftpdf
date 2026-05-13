# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> Watermark tool >> text input and sliders visible
- Location: tests/tools.spec.ts:226:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/opacity/i)
Expected: visible
Error: strict mode violation: getByText(/opacity/i) resolved to 2 elements:
    1) <p class="text-muted-foreground mt-1 max-w-2xl">Stamp 'CONFIDENTIAL', your company logo or any cu…</p> aka getByText('Stamp \'CONFIDENTIAL\', your')
    2) <label class="block text-sm font-medium text-foreground mb-1.5">Opacity — 30%</label> aka getByText('Opacity — 30%')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/opacity/i)

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "LiftPDF" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e9]: LiftPDF
      - navigation [ref=e10]:
        - button "Edit" [ref=e11]:
          - text: Edit
          - img [ref=e12]
        - button "Organize" [ref=e14]:
          - text: Organize
          - img [ref=e15]
        - button "Convert" [ref=e17]:
          - text: Convert
          - img [ref=e18]
        - button "Security" [ref=e20]:
          - text: Security
          - img [ref=e21]
        - button "Stamp" [ref=e23]:
          - text: Stamp
          - img [ref=e24]
        - button "Layout" [ref=e26]:
          - text: Layout
          - img [ref=e27]
        - button "Forms" [ref=e29]:
          - text: Forms
          - img [ref=e30]
      - link "All Tools" [ref=e33] [cursor=pointer]:
        - /url: /all-tools
  - main [ref=e34]:
    - generic [ref=e35]:
      - generic [ref=e37]:
        - link "All tools" [ref=e38] [cursor=pointer]:
          - /url: /
          - img [ref=e39]
          - text: All tools
        - generic [ref=e43]:
          - generic [ref=e44]:
            - heading "Watermark PDF" [level=1] [ref=e45]
            - generic [ref=e46]: Stamp
          - paragraph [ref=e47]: Stamp 'CONFIDENTIAL', your company logo or any custom text across all pages. Control opacity, position, angle and font size.
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]:
              - img [ref=e53]
              - generic [ref=e56]:
                - paragraph [ref=e57]: test.pdf
                - paragraph [ref=e58]: 0.00 MB
            - button "Change file" [ref=e59]:
              - img [ref=e60]
              - text: Change file
          - generic [ref=e63]:
            - paragraph [ref=e66]: Pages
            - generic [ref=e67]:
              - generic [ref=e68]:
                - button "Whiteout" [ref=e69]:
                  - img [ref=e70]
                  - text: Whiteout
                - button "Rotate" [ref=e73]:
                  - img [ref=e74]
                  - text: Rotate
                - button "Delete Pages" [ref=e77]:
                  - img [ref=e78]
                  - text: Delete Pages
                - button "Watermark" [active] [ref=e81]:
                  - img [ref=e82]
                  - text: Watermark
                - button "Page Numbers" [ref=e85]:
                  - img [ref=e86]
                  - text: Page Numbers
                - button "Split" [ref=e89]:
                  - img [ref=e90]
                  - text: Split
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - generic [ref=e99]:
                    - generic [ref=e100]: Watermark text
                    - textbox "e.g. CONFIDENTIAL" [ref=e101]: CONFIDENTIAL
                  - generic [ref=e102]:
                    - generic [ref=e103]: Opacity — 30%
                    - slider [ref=e104]: "0.3"
                  - generic [ref=e105]:
                    - generic [ref=e106]: Angle — 45°
                    - slider [ref=e107]: "45"
                - button "Add Watermark" [ref=e108]:
                  - img [ref=e109]
                  - text: Add Watermark
        - generic [ref=e112]:
          - heading "Related Stamp tools" [level=2] [ref=e113]
          - generic [ref=e114]:
            - link "Add Page Numbers Insert page numbers into a PDF at any position." [ref=e115] [cursor=pointer]:
              - /url: /page-numbers-pdf
              - generic [ref=e116]: Add Page Numbers
              - generic [ref=e117]: Insert page numbers into a PDF at any position.
            - link "Header & Footer Add custom headers and footers to every page." [ref=e118] [cursor=pointer]:
              - /url: /header-footer-pdf
              - generic [ref=e119]: Header & Footer
              - generic [ref=e120]: Add custom headers and footers to every page.
            - link "Bates Numbering Add Bates stamps for legal and business documents." [ref=e121] [cursor=pointer]:
              - /url: /bates-numbering-pdf
              - generic [ref=e122]: Bates Numbering
              - generic [ref=e123]: Add Bates stamps for legal and business documents.
  - contentinfo [ref=e124]:
    - generic [ref=e125]:
      - generic [ref=e126]:
        - generic [ref=e127]:
          - link "LiftPDF" [ref=e128] [cursor=pointer]:
            - /url: /
            - img [ref=e130]
            - generic [ref=e132]: LiftPDF
          - paragraph [ref=e133]: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
        - generic [ref=e134]:
          - heading "Edit" [level=3] [ref=e135]
          - list [ref=e136]:
            - listitem [ref=e137]:
              - link "PDF Editor" [ref=e138] [cursor=pointer]:
                - /url: /pdf-editor
            - listitem [ref=e139]:
              - link "Whiteout PDF" [ref=e140] [cursor=pointer]:
                - /url: /whiteout-pdf
            - listitem [ref=e141]:
              - link "Annotate PDF" [ref=e142] [cursor=pointer]:
                - /url: /annotate-pdf
            - listitem [ref=e143]:
              - link "Fill & Sign PDF" [ref=e144] [cursor=pointer]:
                - /url: /fill-sign-pdf
            - listitem [ref=e145]:
              - link "Find & Replace" [ref=e146] [cursor=pointer]:
                - /url: /find-replace-pdf
        - generic [ref=e147]:
          - heading "Organize" [level=3] [ref=e148]
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "Merge PDF" [ref=e151] [cursor=pointer]:
                - /url: /merge-pdf
            - listitem [ref=e152]:
              - link "Split PDF" [ref=e153] [cursor=pointer]:
                - /url: /split-pdf
            - listitem [ref=e154]:
              - link "Organize Pages" [ref=e155] [cursor=pointer]:
                - /url: /organize-pdf
            - listitem [ref=e156]:
              - link "Delete Pages" [ref=e157] [cursor=pointer]:
                - /url: /delete-pdf-pages
            - listitem [ref=e158]:
              - link "Extract Pages" [ref=e159] [cursor=pointer]:
                - /url: /extract-pdf-pages
        - generic [ref=e160]:
          - heading "Convert" [level=3] [ref=e161]
          - list [ref=e162]:
            - listitem [ref=e163]:
              - link "Compress PDF" [ref=e164] [cursor=pointer]:
                - /url: /compress-pdf
            - listitem [ref=e165]:
              - link "PDF to Word" [ref=e166] [cursor=pointer]:
                - /url: /pdf-to-word
            - listitem [ref=e167]:
              - link "Word to PDF" [ref=e168] [cursor=pointer]:
                - /url: /word-to-pdf
            - listitem [ref=e169]:
              - link "PDF to Excel" [ref=e170] [cursor=pointer]:
                - /url: /pdf-to-excel
            - listitem [ref=e171]:
              - link "Excel to PDF" [ref=e172] [cursor=pointer]:
                - /url: /excel-to-pdf
            - listitem [ref=e173]:
              - link "PDF to PowerPoint" [ref=e174] [cursor=pointer]:
                - /url: /pdf-to-ppt
        - generic [ref=e175]:
          - heading "Layout" [level=3] [ref=e176]
          - list [ref=e177]:
            - listitem [ref=e178]:
              - link "Rotate PDF" [ref=e179] [cursor=pointer]:
                - /url: /rotate-pdf
      - generic [ref=e180]:
        - paragraph [ref=e181]: © 2026 LiftPDF. All rights reserved.
        - generic [ref=e182]:
          - link "Privacy Policy" [ref=e183] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Terms of Service" [ref=e184] [cursor=pointer]:
            - /url: /terms-of-service
          - link "Contact" [ref=e185] [cursor=pointer]:
            - /url: /contact
  - alert [ref=e186]
```

# Test source

```ts
  131 |     await page.goto("/rotate-pdf");
  132 |     await uploadPDF(page);
  133 |     const thumb = page.locator('img[alt="Page 1"]');
  134 |     await expect(thumb).toBeVisible({ timeout: 15_000 });
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
> 231 |     await expect(page.getByText(/opacity/i)).toBeVisible();
      |                                              ^ Error: expect(locator).toBeVisible() failed
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
  242 |     await expect(page.getByLabel(/start number/i)).toBeVisible();
  243 |   });
  244 | });
  245 | 
```