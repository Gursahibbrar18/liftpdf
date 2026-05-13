# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> All Tools page >> loads and shows all categories
- Location: tests/navigation.spec.ts:81:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Edit/)
Expected: visible
Error: strict mode violation: getByText(/Edit/) resolved to 8 elements:
    1) <button class="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent">…</button> aka getByRole('button', { name: 'Edit' })
    2) <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-600">Edit</span> aka getByRole('main').getByText('Edit', { exact: true })
    3) <p class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">PDF Editor</p> aka getByRole('link', { name: 'P PDF Editor Edit text,' })
    4) <p class="text-xs text-muted-foreground mt-1 line-clamp-2">Edit text, images, links and shapes directly in y…</p> aka getByRole('link', { name: 'P PDF Editor Edit text,' })
    5) <p class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">Edit Metadata</p> aka getByRole('link', { name: 'E Edit Metadata Change title' })
    6) <p class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">Edit PDF Forms</p> aka getByRole('link', { name: 'E Edit PDF Forms Modify' })
    7) <h3 class="text-xs font-semibold uppercase tracking-wider mb-3 text-blue-600">Edit</h3> aka getByRole('heading', { name: 'Edit' })
    8) <a href="/pdf-editor" class="text-sm text-muted-foreground hover:text-foreground transition-colors">PDF Editor</a> aka getByRole('link', { name: 'PDF Editor', exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Edit/)

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
        - heading "All PDF Tools" [level=1] [ref=e38]
        - paragraph [ref=e39]: Every tool runs in your browser — your files never leave your device. Free and unlimited on all core tools.
      - generic [ref=e40]:
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e43]: Edit
            - generic [ref=e44]: 6 tools
          - generic [ref=e45]:
            - link "P PDF Editor Edit text, images, links and shapes directly in your PDF." [ref=e46] [cursor=pointer]:
              - /url: /pdf-editor
              - generic [ref=e48]: P
              - paragraph [ref=e49]: PDF Editor
              - paragraph [ref=e50]: Edit text, images, links and shapes directly in your PDF.
            - link "W Whiteout PDF Cover sensitive content by painting over it in white." [ref=e51] [cursor=pointer]:
              - /url: /whiteout-pdf
              - generic [ref=e53]: W
              - paragraph [ref=e54]: Whiteout PDF
              - paragraph [ref=e55]: Cover sensitive content by painting over it in white.
            - link "A Annotate PDF Highlight, strikethrough, underline and add sticky notes." [ref=e56] [cursor=pointer]:
              - /url: /annotate-pdf
              - generic [ref=e58]: A
              - paragraph [ref=e59]: Annotate PDF
              - paragraph [ref=e60]: Highlight, strikethrough, underline and add sticky notes.
            - link "F Fill & Sign PDF Fill out PDF forms and add your signature." [ref=e61] [cursor=pointer]:
              - /url: /fill-sign-pdf
              - generic [ref=e63]: F
              - paragraph [ref=e64]: Fill & Sign PDF
              - paragraph [ref=e65]: Fill out PDF forms and add your signature.
            - link "F Find & Replace Search and replace text across your entire PDF." [ref=e66] [cursor=pointer]:
              - /url: /find-replace-pdf
              - generic [ref=e68]: F
              - paragraph [ref=e69]: Find & Replace
              - paragraph [ref=e70]: Search and replace text across your entire PDF.
            - link "E Edit Metadata Change title, author, subject and keyword fields. Soon" [ref=e71]:
              - /url: /edit-pdf-metadata
              - generic [ref=e73]: E
              - paragraph [ref=e74]: Edit Metadata
              - paragraph [ref=e75]: Change title, author, subject and keyword fields.
              - generic [ref=e76]:
                - img [ref=e77]
                - text: Soon
        - generic [ref=e80]:
          - generic [ref=e81]:
            - generic [ref=e82]: Organize
            - generic [ref=e83]: 7 tools
          - generic [ref=e84]:
            - link "M Merge PDF Combine multiple PDF files into a single document." [ref=e85] [cursor=pointer]:
              - /url: /merge-pdf
              - generic [ref=e87]: M
              - paragraph [ref=e88]: Merge PDF
              - paragraph [ref=e89]: Combine multiple PDF files into a single document.
            - link "S Split PDF Split a PDF into multiple files by page range." [ref=e90] [cursor=pointer]:
              - /url: /split-pdf
              - generic [ref=e92]: S
              - paragraph [ref=e93]: Split PDF
              - paragraph [ref=e94]: Split a PDF into multiple files by page range.
            - link "O Organize Pages Visually drag, rotate or delete pages before saving." [ref=e95] [cursor=pointer]:
              - /url: /organize-pdf
              - generic [ref=e97]: O
              - paragraph [ref=e98]: Organize Pages
              - paragraph [ref=e99]: Visually drag, rotate or delete pages before saving.
            - link "D Delete Pages Remove unwanted pages from your PDF." [ref=e100] [cursor=pointer]:
              - /url: /delete-pdf-pages
              - generic [ref=e102]: D
              - paragraph [ref=e103]: Delete Pages
              - paragraph [ref=e104]: Remove unwanted pages from your PDF.
            - link "E Extract Pages Extract specific pages to a new PDF file." [ref=e105] [cursor=pointer]:
              - /url: /extract-pdf-pages
              - generic [ref=e107]: E
              - paragraph [ref=e108]: Extract Pages
              - paragraph [ref=e109]: Extract specific pages to a new PDF file.
            - link "A Alternate & Mix Interleave pages from two PDFs alternately. Soon" [ref=e110]:
              - /url: /alternate-mix-pdf
              - generic [ref=e112]: A
              - paragraph [ref=e113]: Alternate & Mix
              - paragraph [ref=e114]: Interleave pages from two PDFs alternately.
              - generic [ref=e115]:
                - img [ref=e116]
                - text: Soon
            - link "S Split by Bookmarks Split a PDF into chapters using its bookmark outline. Soon" [ref=e119]:
              - /url: /split-pdf-by-outline
              - generic [ref=e121]: S
              - paragraph [ref=e122]: Split by Bookmarks
              - paragraph [ref=e123]: Split a PDF into chapters using its bookmark outline.
              - generic [ref=e124]:
                - img [ref=e125]
                - text: Soon
        - generic [ref=e128]:
          - generic [ref=e129]:
            - generic [ref=e130]: Convert
            - generic [ref=e131]: 12 tools
          - generic [ref=e132]:
            - link "C Compress PDF Reduce PDF file size while preserving quality." [ref=e133] [cursor=pointer]:
              - /url: /compress-pdf
              - generic [ref=e135]: C
              - paragraph [ref=e136]: Compress PDF
              - paragraph [ref=e137]: Reduce PDF file size while preserving quality.
            - link "P PDF to Word Convert PDF to an editable Word document." [ref=e138] [cursor=pointer]:
              - /url: /pdf-to-word
              - generic [ref=e140]: P
              - paragraph [ref=e141]: PDF to Word
              - paragraph [ref=e142]: Convert PDF to an editable Word document.
            - link "W Word to PDF Convert Word documents to PDF with perfect formatting." [ref=e143] [cursor=pointer]:
              - /url: /word-to-pdf
              - generic [ref=e145]: W
              - paragraph [ref=e146]: Word to PDF
              - paragraph [ref=e147]: Convert Word documents to PDF with perfect formatting.
            - link "P PDF to Excel Extract tables from PDF into an Excel spreadsheet." [ref=e148] [cursor=pointer]:
              - /url: /pdf-to-excel
              - generic [ref=e150]: P
              - paragraph [ref=e151]: PDF to Excel
              - paragraph [ref=e152]: Extract tables from PDF into an Excel spreadsheet.
            - link "E Excel to PDF Convert Excel spreadsheets to PDF." [ref=e153] [cursor=pointer]:
              - /url: /excel-to-pdf
              - generic [ref=e155]: E
              - paragraph [ref=e156]: Excel to PDF
              - paragraph [ref=e157]: Convert Excel spreadsheets to PDF.
            - link "P PDF to PowerPoint Convert PDF to an editable PowerPoint presentation." [ref=e158] [cursor=pointer]:
              - /url: /pdf-to-ppt
              - generic [ref=e160]: P
              - paragraph [ref=e161]: PDF to PowerPoint
              - paragraph [ref=e162]: Convert PDF to an editable PowerPoint presentation.
            - link "P PowerPoint to PDF Convert PowerPoint presentations to PDF." [ref=e163] [cursor=pointer]:
              - /url: /ppt-to-pdf
              - generic [ref=e165]: P
              - paragraph [ref=e166]: PowerPoint to PDF
              - paragraph [ref=e167]: Convert PowerPoint presentations to PDF.
            - link "P PDF to JPG Convert PDF pages to high-quality JPG or PNG images." [ref=e168] [cursor=pointer]:
              - /url: /pdf-to-jpg
              - generic [ref=e170]: P
              - paragraph [ref=e171]: PDF to JPG
              - paragraph [ref=e172]: Convert PDF pages to high-quality JPG or PNG images.
            - link "J JPG to PDF Combine images into a single PDF document." [ref=e173] [cursor=pointer]:
              - /url: /jpg-to-pdf
              - generic [ref=e175]: J
              - paragraph [ref=e176]: JPG to PDF
              - paragraph [ref=e177]: Combine images into a single PDF document.
            - link "O OCR PDF Make scanned PDFs searchable and selectable." [ref=e178] [cursor=pointer]:
              - /url: /ocr-pdf
              - generic [ref=e180]: O
              - paragraph [ref=e181]: OCR PDF
              - paragraph [ref=e182]: Make scanned PDFs searchable and selectable.
            - link "C Convert to Grayscale Remove colour from your PDF to reduce file size. Soon" [ref=e183]:
              - /url: /grayscale-pdf
              - generic [ref=e185]: C
              - paragraph [ref=e186]: Convert to Grayscale
              - paragraph [ref=e187]: Remove colour from your PDF to reduce file size.
              - generic [ref=e188]:
                - img [ref=e189]
                - text: Soon
            - link "H HTML to PDF Convert a webpage or HTML file to PDF. Soon" [ref=e192]:
              - /url: /html-to-pdf
              - generic [ref=e194]: H
              - paragraph [ref=e195]: HTML to PDF
              - paragraph [ref=e196]: Convert a webpage or HTML file to PDF.
              - generic [ref=e197]:
                - img [ref=e198]
                - text: Soon
        - generic [ref=e201]:
          - generic [ref=e202]:
            - generic [ref=e203]: Security
            - generic [ref=e204]: 2 tools
          - generic [ref=e205]:
            - link "E Encrypt PDF Protect your PDF with a password using AES-256." [ref=e206] [cursor=pointer]:
              - /url: /encrypt-pdf
              - generic [ref=e208]: E
              - paragraph [ref=e209]: Encrypt PDF
              - paragraph [ref=e210]: Protect your PDF with a password using AES-256.
            - link "U Unlock PDF Remove the password from a PDF you own." [ref=e211] [cursor=pointer]:
              - /url: /unlock-pdf
              - generic [ref=e213]: U
              - paragraph [ref=e214]: Unlock PDF
              - paragraph [ref=e215]: Remove the password from a PDF you own.
        - generic [ref=e216]:
          - generic [ref=e217]:
            - generic [ref=e218]: Stamp
            - generic [ref=e219]: 4 tools
          - generic [ref=e220]:
            - link "W Watermark PDF Add a text or image watermark to every page." [ref=e221] [cursor=pointer]:
              - /url: /watermark-pdf
              - generic [ref=e223]: W
              - paragraph [ref=e224]: Watermark PDF
              - paragraph [ref=e225]: Add a text or image watermark to every page.
            - link "A Add Page Numbers Insert page numbers into a PDF at any position." [ref=e226] [cursor=pointer]:
              - /url: /page-numbers-pdf
              - generic [ref=e228]: A
              - paragraph [ref=e229]: Add Page Numbers
              - paragraph [ref=e230]: Insert page numbers into a PDF at any position.
            - link "H Header & Footer Add custom headers and footers to every page. Soon" [ref=e231]:
              - /url: /header-footer-pdf
              - generic [ref=e233]: H
              - paragraph [ref=e234]: Header & Footer
              - paragraph [ref=e235]: Add custom headers and footers to every page.
              - generic [ref=e236]:
                - img [ref=e237]
                - text: Soon
            - link "B Bates Numbering Add Bates stamps for legal and business documents. Soon" [ref=e240]:
              - /url: /bates-numbering-pdf
              - generic [ref=e242]: B
              - paragraph [ref=e243]: Bates Numbering
              - paragraph [ref=e244]: Add Bates stamps for legal and business documents.
              - generic [ref=e245]:
                - img [ref=e246]
                - text: Soon
        - generic [ref=e249]:
          - generic [ref=e250]:
            - generic [ref=e251]: Layout
            - generic [ref=e252]: 7 tools
          - generic [ref=e253]:
            - link "R Rotate PDF Rotate pages 90° or 180° and save permanently." [ref=e254] [cursor=pointer]:
              - /url: /rotate-pdf
              - generic [ref=e256]: R
              - paragraph [ref=e257]: Rotate PDF
              - paragraph [ref=e258]: Rotate pages 90° or 180° and save permanently.
            - link "C Crop PDF Trim margins or change the visible area of your PDF. Soon" [ref=e259]:
              - /url: /crop-pdf
              - generic [ref=e261]: C
              - paragraph [ref=e262]: Crop PDF
              - paragraph [ref=e263]: Trim margins or change the visible area of your PDF.
              - generic [ref=e264]:
                - img [ref=e265]
                - text: Soon
            - link "R Resize PDF Scale pages or add padding to fit a standard page size. Soon" [ref=e268]:
              - /url: /resize-pdf
              - generic [ref=e270]: R
              - paragraph [ref=e271]: Resize PDF
              - paragraph [ref=e272]: Scale pages or add padding to fit a standard page size.
              - generic [ref=e273]:
                - img [ref=e274]
                - text: Soon
            - link "F Flatten PDF Merge form fields and annotations into the page content. Soon" [ref=e277]:
              - /url: /flatten-pdf
              - generic [ref=e279]: F
              - paragraph [ref=e280]: Flatten PDF
              - paragraph [ref=e281]: Merge form fields and annotations into the page content.
              - generic [ref=e282]:
                - img [ref=e283]
                - text: Soon
            - link "N N-Up Print multiple PDF pages per sheet. Soon" [ref=e286]:
              - /url: /n-up-pdf
              - generic [ref=e288]: "N"
              - paragraph [ref=e289]: N-Up
              - paragraph [ref=e290]: Print multiple PDF pages per sheet.
              - generic [ref=e291]:
                - img [ref=e292]
                - text: Soon
            - link "D Deskew PDF Automatically straighten crooked scanned pages. Soon" [ref=e295]:
              - /url: /deskew-pdf
              - generic [ref=e297]: D
              - paragraph [ref=e298]: Deskew PDF
              - paragraph [ref=e299]: Automatically straighten crooked scanned pages.
              - generic [ref=e300]:
                - img [ref=e301]
                - text: Soon
            - link "R Repair PDF Recover a corrupted or damaged PDF file. Soon" [ref=e304]:
              - /url: /repair-pdf
              - generic [ref=e306]: R
              - paragraph [ref=e307]: Repair PDF
              - paragraph [ref=e308]: Recover a corrupted or damaged PDF file.
              - generic [ref=e309]:
                - img [ref=e310]
                - text: Soon
        - generic [ref=e313]:
          - generic [ref=e314]:
            - generic [ref=e315]: Forms
            - generic [ref=e316]: 2 tools
          - generic [ref=e317]:
            - link "C Create Fillable PDF Add interactive text fields, checkboxes and dropdowns. Soon" [ref=e318]:
              - /url: /create-fillable-pdf
              - generic [ref=e320]: C
              - paragraph [ref=e321]: Create Fillable PDF
              - paragraph [ref=e322]: Add interactive text fields, checkboxes and dropdowns.
              - generic [ref=e323]:
                - img [ref=e324]
                - text: Soon
            - link "E Edit PDF Forms Modify existing form fields and their properties. Soon" [ref=e327]:
              - /url: /edit-pdf-forms
              - generic [ref=e329]: E
              - paragraph [ref=e330]: Edit PDF Forms
              - paragraph [ref=e331]: Modify existing form fields and their properties.
              - generic [ref=e332]:
                - img [ref=e333]
                - text: Soon
  - contentinfo [ref=e336]:
    - generic [ref=e337]:
      - generic [ref=e338]:
        - generic [ref=e339]:
          - link "LiftPDF" [ref=e340] [cursor=pointer]:
            - /url: /
            - img [ref=e342]
            - generic [ref=e344]: LiftPDF
          - paragraph [ref=e345]: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
        - generic [ref=e346]:
          - heading "Edit" [level=3] [ref=e347]
          - list [ref=e348]:
            - listitem [ref=e349]:
              - link "PDF Editor" [ref=e350] [cursor=pointer]:
                - /url: /pdf-editor
            - listitem [ref=e351]:
              - link "Whiteout PDF" [ref=e352] [cursor=pointer]:
                - /url: /whiteout-pdf
            - listitem [ref=e353]:
              - link "Annotate PDF" [ref=e354] [cursor=pointer]:
                - /url: /annotate-pdf
            - listitem [ref=e355]:
              - link "Fill & Sign PDF" [ref=e356] [cursor=pointer]:
                - /url: /fill-sign-pdf
            - listitem [ref=e357]:
              - link "Find & Replace" [ref=e358] [cursor=pointer]:
                - /url: /find-replace-pdf
        - generic [ref=e359]:
          - heading "Organize" [level=3] [ref=e360]
          - list [ref=e361]:
            - listitem [ref=e362]:
              - link "Merge PDF" [ref=e363] [cursor=pointer]:
                - /url: /merge-pdf
            - listitem [ref=e364]:
              - link "Split PDF" [ref=e365] [cursor=pointer]:
                - /url: /split-pdf
            - listitem [ref=e366]:
              - link "Organize Pages" [ref=e367] [cursor=pointer]:
                - /url: /organize-pdf
            - listitem [ref=e368]:
              - link "Delete Pages" [ref=e369] [cursor=pointer]:
                - /url: /delete-pdf-pages
            - listitem [ref=e370]:
              - link "Extract Pages" [ref=e371] [cursor=pointer]:
                - /url: /extract-pdf-pages
        - generic [ref=e372]:
          - heading "Convert" [level=3] [ref=e373]
          - list [ref=e374]:
            - listitem [ref=e375]:
              - link "Compress PDF" [ref=e376] [cursor=pointer]:
                - /url: /compress-pdf
            - listitem [ref=e377]:
              - link "PDF to Word" [ref=e378] [cursor=pointer]:
                - /url: /pdf-to-word
            - listitem [ref=e379]:
              - link "Word to PDF" [ref=e380] [cursor=pointer]:
                - /url: /word-to-pdf
            - listitem [ref=e381]:
              - link "PDF to Excel" [ref=e382] [cursor=pointer]:
                - /url: /pdf-to-excel
            - listitem [ref=e383]:
              - link "Excel to PDF" [ref=e384] [cursor=pointer]:
                - /url: /excel-to-pdf
            - listitem [ref=e385]:
              - link "PDF to PowerPoint" [ref=e386] [cursor=pointer]:
                - /url: /pdf-to-ppt
        - generic [ref=e387]:
          - heading "Layout" [level=3] [ref=e388]
          - list [ref=e389]:
            - listitem [ref=e390]:
              - link "Rotate PDF" [ref=e391] [cursor=pointer]:
                - /url: /rotate-pdf
      - generic [ref=e392]:
        - paragraph [ref=e393]: © 2026 LiftPDF. All rights reserved.
        - generic [ref=e394]:
          - link "Privacy Policy" [ref=e395] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Terms of Service" [ref=e396] [cursor=pointer]:
            - /url: /terms-of-service
          - link "Contact" [ref=e397] [cursor=pointer]:
            - /url: /contact
  - alert [ref=e398]
```

# Test source

```ts
  1   | /**
  2   |  * Navigation tests — checks every link, page load, and the mega-menu dropdown.
  3   |  */
  4   | import { test, expect } from "@playwright/test";
  5   | 
  6   | const TOOL_SLUGS = [
  7   |   "merge-pdf",
  8   |   "split-pdf",
  9   |   "rotate-pdf",
  10  |   "whiteout-pdf",
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
> 83  |     await expect(page.getByText(/Edit/)).toBeVisible();
      |                                          ^ Error: expect(locator).toBeVisible() failed
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
  111 |       await expect(page.getByText(/coming soon/i)).toBeVisible();
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