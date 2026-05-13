# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> Page thumbnails in workspace >> thumbnails render after upload
- Location: tests/tools.spec.ts:111:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Pages')
Expected: visible
Error: strict mode violation: getByText('Pages') resolved to 12 elements:
    1) <h1 class="text-2xl font-bold text-foreground">Delete Pages</h1> aka getByRole('heading', { name: 'Delete Pages' })
    2) <p class="text-muted-foreground mt-1 max-w-2xl">Select the pages you want to remove, preview the …</p> aka getByText('Select the pages you want to')
    3) <p class="text-xs text-muted-foreground">0.00 MB · loading pages…</p> aka getByText('MB · loading pages…')
    4) <p class="text-xs font-semibold text-muted-foreground px-1 pb-1.5 border-b border-border sticky top-0 bg-white">Pages</p> aka getByText('Pages', { exact: true })
    5) <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap bg-primary text-white shadow-sm">…</button> aka getByRole('button', { name: 'Delete Pages' })
    6) <div class="font-medium text-foreground">Organize Pages</div> aka getByRole('link', { name: 'Organize Pages Visually drag' })
    7) <div class="text-xs text-muted-foreground mt-0.5 line-clamp-2">Visually drag, rotate or delete pages before savi…</div> aka getByRole('link', { name: 'Organize Pages Visually drag' })
    8) <div class="font-medium text-foreground">Extract Pages</div> aka getByRole('link', { name: 'Extract Pages Extract' })
    9) <div class="text-xs text-muted-foreground mt-0.5 line-clamp-2">Extract specific pages to a new PDF file.</div> aka getByRole('link', { name: 'Extract Pages Extract' })
    10) <a href="/organize-pdf" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Organize Pages</a> aka getByRole('link', { name: 'Organize Pages', exact: true })
    ...

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('Pages')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
            - heading "Delete Pages" [level=1] [ref=e45]
            - generic [ref=e46]: Organize
          - paragraph [ref=e47]: Select the pages you want to remove, preview the result and download the trimmed document.
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]:
              - img [ref=e53]
              - generic [ref=e56]:
                - paragraph [ref=e57]: test.pdf
                - paragraph [ref=e58]: 0.00 MB · loading pages…
            - button "Change file" [ref=e59]:
              - img [ref=e60]
              - text: Change file
          - generic [ref=e63]:
            - paragraph [ref=e66]: Pages
            - generic [ref=e72]:
              - button "Whiteout" [ref=e73]:
                - img [ref=e74]
                - text: Whiteout
              - button "Rotate" [ref=e77]:
                - img [ref=e78]
                - text: Rotate
              - button "Delete Pages" [ref=e81]:
                - img [ref=e82]
                - text: Delete Pages
              - button "Watermark" [ref=e85]:
                - img [ref=e86]
                - text: Watermark
              - button "Page Numbers" [ref=e89]:
                - img [ref=e90]
                - text: Page Numbers
              - button "Split" [ref=e93]:
                - img [ref=e94]
                - text: Split
        - generic [ref=e101]:
          - heading "Related Organize tools" [level=2] [ref=e102]
          - generic [ref=e103]:
            - link "Merge PDF Combine multiple PDF files into a single document." [ref=e104] [cursor=pointer]:
              - /url: /merge-pdf
              - generic [ref=e105]: Merge PDF
              - generic [ref=e106]: Combine multiple PDF files into a single document.
            - link "Split PDF Split a PDF into multiple files by page range." [ref=e107] [cursor=pointer]:
              - /url: /split-pdf
              - generic [ref=e108]: Split PDF
              - generic [ref=e109]: Split a PDF into multiple files by page range.
            - link "Organize Pages Visually drag, rotate or delete pages before saving." [ref=e110] [cursor=pointer]:
              - /url: /organize-pdf
              - generic [ref=e111]: Organize Pages
              - generic [ref=e112]: Visually drag, rotate or delete pages before saving.
            - link "Extract Pages Extract specific pages to a new PDF file." [ref=e113] [cursor=pointer]:
              - /url: /extract-pdf-pages
              - generic [ref=e114]: Extract Pages
              - generic [ref=e115]: Extract specific pages to a new PDF file.
  - contentinfo [ref=e116]:
    - generic [ref=e117]:
      - generic [ref=e118]:
        - generic [ref=e119]:
          - link "LiftPDF" [ref=e120] [cursor=pointer]:
            - /url: /
            - img [ref=e122]
            - generic [ref=e124]: LiftPDF
          - paragraph [ref=e125]: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
        - generic [ref=e126]:
          - heading "Edit" [level=3] [ref=e127]
          - list [ref=e128]:
            - listitem [ref=e129]:
              - link "PDF Editor" [ref=e130] [cursor=pointer]:
                - /url: /pdf-editor
            - listitem [ref=e131]:
              - link "Whiteout PDF" [ref=e132] [cursor=pointer]:
                - /url: /whiteout-pdf
            - listitem [ref=e133]:
              - link "Annotate PDF" [ref=e134] [cursor=pointer]:
                - /url: /annotate-pdf
            - listitem [ref=e135]:
              - link "Fill & Sign PDF" [ref=e136] [cursor=pointer]:
                - /url: /fill-sign-pdf
            - listitem [ref=e137]:
              - link "Find & Replace" [ref=e138] [cursor=pointer]:
                - /url: /find-replace-pdf
        - generic [ref=e139]:
          - heading "Organize" [level=3] [ref=e140]
          - list [ref=e141]:
            - listitem [ref=e142]:
              - link "Merge PDF" [ref=e143] [cursor=pointer]:
                - /url: /merge-pdf
            - listitem [ref=e144]:
              - link "Split PDF" [ref=e145] [cursor=pointer]:
                - /url: /split-pdf
            - listitem [ref=e146]:
              - link "Organize Pages" [ref=e147] [cursor=pointer]:
                - /url: /organize-pdf
            - listitem [ref=e148]:
              - link "Delete Pages" [ref=e149] [cursor=pointer]:
                - /url: /delete-pdf-pages
            - listitem [ref=e150]:
              - link "Extract Pages" [ref=e151] [cursor=pointer]:
                - /url: /extract-pdf-pages
        - generic [ref=e152]:
          - heading "Convert" [level=3] [ref=e153]
          - list [ref=e154]:
            - listitem [ref=e155]:
              - link "Compress PDF" [ref=e156] [cursor=pointer]:
                - /url: /compress-pdf
            - listitem [ref=e157]:
              - link "PDF to Word" [ref=e158] [cursor=pointer]:
                - /url: /pdf-to-word
            - listitem [ref=e159]:
              - link "Word to PDF" [ref=e160] [cursor=pointer]:
                - /url: /word-to-pdf
            - listitem [ref=e161]:
              - link "PDF to Excel" [ref=e162] [cursor=pointer]:
                - /url: /pdf-to-excel
            - listitem [ref=e163]:
              - link "Excel to PDF" [ref=e164] [cursor=pointer]:
                - /url: /excel-to-pdf
            - listitem [ref=e165]:
              - link "PDF to PowerPoint" [ref=e166] [cursor=pointer]:
                - /url: /pdf-to-ppt
        - generic [ref=e167]:
          - heading "Layout" [level=3] [ref=e168]
          - list [ref=e169]:
            - listitem [ref=e170]:
              - link "Rotate PDF" [ref=e171] [cursor=pointer]:
                - /url: /rotate-pdf
      - generic [ref=e172]:
        - paragraph [ref=e173]: © 2026 LiftPDF. All rights reserved.
        - generic [ref=e174]:
          - link "Privacy Policy" [ref=e175] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Terms of Service" [ref=e176] [cursor=pointer]:
            - /url: /terms-of-service
          - link "Contact" [ref=e177] [cursor=pointer]:
            - /url: /contact
  - alert [ref=e178]
```

# Test source

```ts
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
  32  |     await expect(page.getByRole("button", { name: /merge/i })).toBeVisible();
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
> 116 |     await expect(page.getByText("Pages")).toBeVisible({ timeout: 15_000 });
      |                                           ^ Error: expect(locator).toBeVisible() failed
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
```