# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Homepage >> loads with correct title
- Location: tests/navigation.spec.ts:23:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('LiftPDF')
Expected: visible
Error: strict mode violation: getByText('LiftPDF') resolved to 3 elements:
    1) <span class="text-xl font-bold text-foreground tracking-tight">…</span> aka getByRole('banner').getByRole('link', { name: 'LiftPDF' })
    2) <span class="text-xl font-bold">…</span> aka getByRole('contentinfo').getByRole('link', { name: 'LiftPDF' })
    3) <p class="text-xs text-muted-foreground">…</p> aka getByText('© 2026 LiftPDF. All rights')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('LiftPDF')

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
    - generic [ref=e36]:
      - generic [ref=e37]:
        - img [ref=e38]
        - text: No sign-up · No watermarks · Free forever
      - heading "Every PDF tool you'll ever need" [level=1] [ref=e40]:
        - text: Every PDF tool
        - text: you'll ever need
      - paragraph [ref=e41]: Merge, split, compress, convert, edit and sign PDFs — free and unlimited. Everything runs in your browser. Your files never leave your device.
      - generic [ref=e42]:
        - link "Open PDF Editor" [ref=e43] [cursor=pointer]:
          - /url: /pdf-editor
          - text: Open PDF Editor
          - img [ref=e44]
        - link "Merge PDFs" [ref=e46] [cursor=pointer]:
          - /url: /merge-pdf
      - generic [ref=e47]:
        - generic [ref=e48]:
          - img [ref=e49]
          - text: Files processed in your browser — never uploaded
        - generic [ref=e51]:
          - img [ref=e52]
          - text: Instant results, no queue
        - generic [ref=e54]:
          - img [ref=e55]
          - text: No watermarks on output
    - generic [ref=e58]:
      - generic [ref=e59]:
        - heading "Popular tools" [level=2] [ref=e60]
        - paragraph [ref=e61]: The tools people use every day — all free, all instant.
        - generic [ref=e62]:
          - link "Merge PDF Combine multiple PDF files into a single document." [ref=e63] [cursor=pointer]:
            - /url: /merge-pdf
            - img [ref=e65]
            - generic [ref=e69]:
              - heading "Merge PDF" [level=3] [ref=e71]
              - paragraph [ref=e72]: Combine multiple PDF files into a single document.
          - link "Compress PDF Reduce PDF file size while preserving quality." [ref=e73] [cursor=pointer]:
            - /url: /compress-pdf
            - img [ref=e75]
            - generic [ref=e78]:
              - heading "Compress PDF" [level=3] [ref=e80]
              - paragraph [ref=e81]: Reduce PDF file size while preserving quality.
          - link "PDF to Word Convert PDF to an editable Word document." [ref=e82] [cursor=pointer]:
            - /url: /pdf-to-word
            - img [ref=e84]
            - generic [ref=e87]:
              - heading "PDF to Word" [level=3] [ref=e89]
              - paragraph [ref=e90]: Convert PDF to an editable Word document.
          - link "PDF Editor Edit text, images, links and shapes directly in your PDF." [ref=e91] [cursor=pointer]:
            - /url: /pdf-editor
            - img [ref=e93]
            - generic [ref=e96]:
              - heading "PDF Editor" [level=3] [ref=e98]
              - paragraph [ref=e99]: Edit text, images, links and shapes directly in your PDF.
          - link "Split PDF Split a PDF into multiple files by page range." [ref=e100] [cursor=pointer]:
            - /url: /split-pdf
            - img [ref=e102]
            - generic [ref=e108]:
              - heading "Split PDF" [level=3] [ref=e110]
              - paragraph [ref=e111]: Split a PDF into multiple files by page range.
          - link "PDF to JPG Convert PDF pages to high-quality JPG or PNG images." [ref=e112] [cursor=pointer]:
            - /url: /pdf-to-jpg
            - img [ref=e114]
            - generic [ref=e118]:
              - heading "PDF to JPG" [level=3] [ref=e120]
              - paragraph [ref=e121]: Convert PDF pages to high-quality JPG or PNG images.
          - link "Word to PDF Convert Word documents to PDF with perfect formatting." [ref=e122] [cursor=pointer]:
            - /url: /word-to-pdf
            - img [ref=e124]
            - generic [ref=e128]:
              - heading "Word to PDF" [level=3] [ref=e130]
              - paragraph [ref=e131]: Convert Word documents to PDF with perfect formatting.
          - link "Rotate PDF Rotate pages 90° or 180° and save permanently." [ref=e132] [cursor=pointer]:
            - /url: /rotate-pdf
            - img [ref=e134]
            - generic [ref=e137]:
              - heading "Rotate PDF" [level=3] [ref=e139]
              - paragraph [ref=e140]: Rotate pages 90° or 180° and save permanently.
          - link "Whiteout PDF Cover sensitive content by painting over it in white." [ref=e141] [cursor=pointer]:
            - /url: /whiteout-pdf
            - img [ref=e143]
            - generic [ref=e146]:
              - heading "Whiteout PDF" [level=3] [ref=e148]
              - paragraph [ref=e149]: Cover sensitive content by painting over it in white.
          - link "OCR PDF Make scanned PDFs searchable and selectable." [ref=e150] [cursor=pointer]:
            - /url: /ocr-pdf
            - img [ref=e152]
            - generic [ref=e157]:
              - heading "OCR PDF" [level=3] [ref=e159]
              - paragraph [ref=e160]: Make scanned PDFs searchable and selectable.
          - link "Encrypt PDF Protect your PDF with a password using AES-256." [ref=e161] [cursor=pointer]:
            - /url: /encrypt-pdf
            - img [ref=e163]
            - generic [ref=e166]:
              - heading "Encrypt PDF" [level=3] [ref=e168]
              - paragraph [ref=e169]: Protect your PDF with a password using AES-256.
          - link "Watermark PDF Add a text or image watermark to every page." [ref=e170] [cursor=pointer]:
            - /url: /watermark-pdf
            - img [ref=e172]
            - generic [ref=e175]:
              - heading "Watermark PDF" [level=3] [ref=e177]
              - paragraph [ref=e178]: Add a text or image watermark to every page.
      - generic [ref=e179]:
        - generic [ref=e181]: Edit
        - generic [ref=e183]:
          - link "PDF Editor Edit text, images, links and shapes directly in your PDF." [ref=e184] [cursor=pointer]:
            - /url: /pdf-editor
            - img [ref=e186]
            - generic [ref=e189]:
              - heading "PDF Editor" [level=3] [ref=e191]
              - paragraph [ref=e192]: Edit text, images, links and shapes directly in your PDF.
          - link "Whiteout PDF Cover sensitive content by painting over it in white." [ref=e193] [cursor=pointer]:
            - /url: /whiteout-pdf
            - img [ref=e195]
            - generic [ref=e198]:
              - heading "Whiteout PDF" [level=3] [ref=e200]
              - paragraph [ref=e201]: Cover sensitive content by painting over it in white.
          - link "Annotate PDF Highlight, strikethrough, underline and add sticky notes." [ref=e202] [cursor=pointer]:
            - /url: /annotate-pdf
            - img [ref=e204]
            - generic [ref=e207]:
              - heading "Annotate PDF" [level=3] [ref=e209]
              - paragraph [ref=e210]: Highlight, strikethrough, underline and add sticky notes.
          - link "Fill & Sign PDF Fill out PDF forms and add your signature." [ref=e211] [cursor=pointer]:
            - /url: /fill-sign-pdf
            - img [ref=e213]
            - generic [ref=e215]:
              - heading "Fill & Sign PDF" [level=3] [ref=e217]
              - paragraph [ref=e218]: Fill out PDF forms and add your signature.
          - link "Find & Replace Search and replace text across your entire PDF." [ref=e219] [cursor=pointer]:
            - /url: /find-replace-pdf
            - img [ref=e221]
            - generic [ref=e229]:
              - heading "Find & Replace" [level=3] [ref=e231]
              - paragraph [ref=e232]: Search and replace text across your entire PDF.
          - link "Edit Metadata Soon Change title, author, subject and keyword fields.":
            - /url: /edit-pdf-metadata
            - generic:
              - img
            - generic:
              - generic:
                - heading "Edit Metadata" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Change title, author, subject and keyword fields.
      - generic [ref=e233]:
        - generic [ref=e235]: Organize
        - generic [ref=e237]:
          - link "Merge PDF Combine multiple PDF files into a single document." [ref=e238] [cursor=pointer]:
            - /url: /merge-pdf
            - img [ref=e240]
            - generic [ref=e244]:
              - heading "Merge PDF" [level=3] [ref=e246]
              - paragraph [ref=e247]: Combine multiple PDF files into a single document.
          - link "Split PDF Split a PDF into multiple files by page range." [ref=e248] [cursor=pointer]:
            - /url: /split-pdf
            - img [ref=e250]
            - generic [ref=e256]:
              - heading "Split PDF" [level=3] [ref=e258]
              - paragraph [ref=e259]: Split a PDF into multiple files by page range.
          - link "Organize Pages Visually drag, rotate or delete pages before saving." [ref=e260] [cursor=pointer]:
            - /url: /organize-pdf
            - img [ref=e262]
            - generic [ref=e267]:
              - heading "Organize Pages" [level=3] [ref=e269]
              - paragraph [ref=e270]: Visually drag, rotate or delete pages before saving.
          - link "Delete Pages Remove unwanted pages from your PDF." [ref=e271] [cursor=pointer]:
            - /url: /delete-pdf-pages
            - img [ref=e273]
            - generic [ref=e276]:
              - heading "Delete Pages" [level=3] [ref=e278]
              - paragraph [ref=e279]: Remove unwanted pages from your PDF.
          - link "Extract Pages Extract specific pages to a new PDF file." [ref=e280] [cursor=pointer]:
            - /url: /extract-pdf-pages
            - img [ref=e282]
            - generic [ref=e287]:
              - heading "Extract Pages" [level=3] [ref=e289]
              - paragraph [ref=e290]: Extract specific pages to a new PDF file.
          - link "Alternate & Mix Soon Interleave pages from two PDFs alternately.":
            - /url: /alternate-mix-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Alternate & Mix" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Interleave pages from two PDFs alternately.
          - link "Split by Bookmarks Soon Split a PDF into chapters using its bookmark outline.":
            - /url: /split-pdf-by-outline
            - generic:
              - img
            - generic:
              - generic:
                - heading "Split by Bookmarks" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Split a PDF into chapters using its bookmark outline.
      - generic [ref=e291]:
        - generic [ref=e293]: Convert
        - generic [ref=e295]:
          - link "Compress PDF Reduce PDF file size while preserving quality." [ref=e296] [cursor=pointer]:
            - /url: /compress-pdf
            - img [ref=e298]
            - generic [ref=e301]:
              - heading "Compress PDF" [level=3] [ref=e303]
              - paragraph [ref=e304]: Reduce PDF file size while preserving quality.
          - link "PDF to Word Convert PDF to an editable Word document." [ref=e305] [cursor=pointer]:
            - /url: /pdf-to-word
            - img [ref=e307]
            - generic [ref=e310]:
              - heading "PDF to Word" [level=3] [ref=e312]
              - paragraph [ref=e313]: Convert PDF to an editable Word document.
          - link "Word to PDF Convert Word documents to PDF with perfect formatting." [ref=e314] [cursor=pointer]:
            - /url: /word-to-pdf
            - img [ref=e316]
            - generic [ref=e320]:
              - heading "Word to PDF" [level=3] [ref=e322]
              - paragraph [ref=e323]: Convert Word documents to PDF with perfect formatting.
          - link "PDF to Excel Extract tables from PDF into an Excel spreadsheet." [ref=e324] [cursor=pointer]:
            - /url: /pdf-to-excel
            - img [ref=e326]
            - generic [ref=e328]:
              - heading "PDF to Excel" [level=3] [ref=e330]
              - paragraph [ref=e331]: Extract tables from PDF into an Excel spreadsheet.
          - link "Excel to PDF Convert Excel spreadsheets to PDF." [ref=e332] [cursor=pointer]:
            - /url: /excel-to-pdf
            - img [ref=e334]
            - generic [ref=e337]:
              - heading "Excel to PDF" [level=3] [ref=e339]
              - paragraph [ref=e340]: Convert Excel spreadsheets to PDF.
          - link "PDF to PowerPoint Convert PDF to an editable PowerPoint presentation." [ref=e341] [cursor=pointer]:
            - /url: /pdf-to-ppt
            - img [ref=e343]
            - generic [ref=e346]:
              - heading "PDF to PowerPoint" [level=3] [ref=e348]
              - paragraph [ref=e349]: Convert PDF to an editable PowerPoint presentation.
          - link "PowerPoint to PDF Convert PowerPoint presentations to PDF." [ref=e350] [cursor=pointer]:
            - /url: /ppt-to-pdf
            - img [ref=e352]
            - generic [ref=e355]:
              - heading "PowerPoint to PDF" [level=3] [ref=e357]
              - paragraph [ref=e358]: Convert PowerPoint presentations to PDF.
          - link "PDF to JPG Convert PDF pages to high-quality JPG or PNG images." [ref=e359] [cursor=pointer]:
            - /url: /pdf-to-jpg
            - img [ref=e361]
            - generic [ref=e365]:
              - heading "PDF to JPG" [level=3] [ref=e367]
              - paragraph [ref=e368]: Convert PDF pages to high-quality JPG or PNG images.
          - link "JPG to PDF Combine images into a single PDF document." [ref=e369] [cursor=pointer]:
            - /url: /jpg-to-pdf
            - img [ref=e371]
            - generic [ref=e375]:
              - heading "JPG to PDF" [level=3] [ref=e377]
              - paragraph [ref=e378]: Combine images into a single PDF document.
          - link "OCR PDF Make scanned PDFs searchable and selectable." [ref=e379] [cursor=pointer]:
            - /url: /ocr-pdf
            - img [ref=e381]
            - generic [ref=e386]:
              - heading "OCR PDF" [level=3] [ref=e388]
              - paragraph [ref=e389]: Make scanned PDFs searchable and selectable.
          - link "Convert to Grayscale Soon Remove colour from your PDF to reduce file size.":
            - /url: /grayscale-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Convert to Grayscale" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Remove colour from your PDF to reduce file size.
          - link "HTML to PDF Soon Convert a webpage or HTML file to PDF.":
            - /url: /html-to-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "HTML to PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Convert a webpage or HTML file to PDF.
      - generic [ref=e390]:
        - generic [ref=e392]: Security
        - generic [ref=e394]:
          - link "Encrypt PDF Protect your PDF with a password using AES-256." [ref=e395] [cursor=pointer]:
            - /url: /encrypt-pdf
            - img [ref=e397]
            - generic [ref=e400]:
              - heading "Encrypt PDF" [level=3] [ref=e402]
              - paragraph [ref=e403]: Protect your PDF with a password using AES-256.
          - link "Unlock PDF Remove the password from a PDF you own." [ref=e404] [cursor=pointer]:
            - /url: /unlock-pdf
            - img [ref=e406]
            - generic [ref=e409]:
              - heading "Unlock PDF" [level=3] [ref=e411]
              - paragraph [ref=e412]: Remove the password from a PDF you own.
      - generic [ref=e413]:
        - generic [ref=e415]: Stamp
        - generic [ref=e417]:
          - link "Watermark PDF Add a text or image watermark to every page." [ref=e418] [cursor=pointer]:
            - /url: /watermark-pdf
            - img [ref=e420]
            - generic [ref=e423]:
              - heading "Watermark PDF" [level=3] [ref=e425]
              - paragraph [ref=e426]: Add a text or image watermark to every page.
          - link "Add Page Numbers Insert page numbers into a PDF at any position." [ref=e427] [cursor=pointer]:
            - /url: /page-numbers-pdf
            - img [ref=e429]
            - generic [ref=e432]:
              - heading "Add Page Numbers" [level=3] [ref=e434]
              - paragraph [ref=e435]: Insert page numbers into a PDF at any position.
          - link "Header & Footer Soon Add custom headers and footers to every page.":
            - /url: /header-footer-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Header & Footer" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Add custom headers and footers to every page.
          - link "Bates Numbering Soon Add Bates stamps for legal and business documents.":
            - /url: /bates-numbering-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Bates Numbering" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Add Bates stamps for legal and business documents.
      - generic [ref=e436]:
        - generic [ref=e438]: Layout
        - generic [ref=e440]:
          - link "Rotate PDF Rotate pages 90° or 180° and save permanently." [ref=e441] [cursor=pointer]:
            - /url: /rotate-pdf
            - img [ref=e443]
            - generic [ref=e446]:
              - heading "Rotate PDF" [level=3] [ref=e448]
              - paragraph [ref=e449]: Rotate pages 90° or 180° and save permanently.
          - link "Crop PDF Soon Trim margins or change the visible area of your PDF.":
            - /url: /crop-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Crop PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Trim margins or change the visible area of your PDF.
          - link "Resize PDF Soon Scale pages or add padding to fit a standard page size.":
            - /url: /resize-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Resize PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Scale pages or add padding to fit a standard page size.
          - link "Flatten PDF Soon Merge form fields and annotations into the page content.":
            - /url: /flatten-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Flatten PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Merge form fields and annotations into the page content.
          - link "N-Up Soon Print multiple PDF pages per sheet.":
            - /url: /n-up-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "N-Up" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Print multiple PDF pages per sheet.
          - link "Deskew PDF Soon Automatically straighten crooked scanned pages.":
            - /url: /deskew-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Deskew PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Automatically straighten crooked scanned pages.
          - link "Repair PDF Soon Recover a corrupted or damaged PDF file.":
            - /url: /repair-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Repair PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Recover a corrupted or damaged PDF file.
      - generic [ref=e450]:
        - generic [ref=e452]: Forms
        - generic [ref=e454]:
          - link "Create Fillable PDF Soon Add interactive text fields, checkboxes and dropdowns.":
            - /url: /create-fillable-pdf
            - generic:
              - img
            - generic:
              - generic:
                - heading "Create Fillable PDF" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Add interactive text fields, checkboxes and dropdowns.
          - link "Edit PDF Forms Soon Modify existing form fields and their properties.":
            - /url: /edit-pdf-forms
            - generic:
              - img
            - generic:
              - generic:
                - heading "Edit PDF Forms" [level=3]
                - generic:
                  - img
                  - text: Soon
              - paragraph: Modify existing form fields and their properties.
  - contentinfo [ref=e455]:
    - generic [ref=e456]:
      - generic [ref=e457]:
        - generic [ref=e458]:
          - link "LiftPDF" [ref=e459] [cursor=pointer]:
            - /url: /
            - img [ref=e461]
            - generic [ref=e463]: LiftPDF
          - paragraph [ref=e464]: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
        - generic [ref=e465]:
          - heading "Edit" [level=3] [ref=e466]
          - list [ref=e467]:
            - listitem [ref=e468]:
              - link "PDF Editor" [ref=e469] [cursor=pointer]:
                - /url: /pdf-editor
            - listitem [ref=e470]:
              - link "Whiteout PDF" [ref=e471] [cursor=pointer]:
                - /url: /whiteout-pdf
            - listitem [ref=e472]:
              - link "Annotate PDF" [ref=e473] [cursor=pointer]:
                - /url: /annotate-pdf
            - listitem [ref=e474]:
              - link "Fill & Sign PDF" [ref=e475] [cursor=pointer]:
                - /url: /fill-sign-pdf
            - listitem [ref=e476]:
              - link "Find & Replace" [ref=e477] [cursor=pointer]:
                - /url: /find-replace-pdf
        - generic [ref=e478]:
          - heading "Organize" [level=3] [ref=e479]
          - list [ref=e480]:
            - listitem [ref=e481]:
              - link "Merge PDF" [ref=e482] [cursor=pointer]:
                - /url: /merge-pdf
            - listitem [ref=e483]:
              - link "Split PDF" [ref=e484] [cursor=pointer]:
                - /url: /split-pdf
            - listitem [ref=e485]:
              - link "Organize Pages" [ref=e486] [cursor=pointer]:
                - /url: /organize-pdf
            - listitem [ref=e487]:
              - link "Delete Pages" [ref=e488] [cursor=pointer]:
                - /url: /delete-pdf-pages
            - listitem [ref=e489]:
              - link "Extract Pages" [ref=e490] [cursor=pointer]:
                - /url: /extract-pdf-pages
        - generic [ref=e491]:
          - heading "Convert" [level=3] [ref=e492]
          - list [ref=e493]:
            - listitem [ref=e494]:
              - link "Compress PDF" [ref=e495] [cursor=pointer]:
                - /url: /compress-pdf
            - listitem [ref=e496]:
              - link "PDF to Word" [ref=e497] [cursor=pointer]:
                - /url: /pdf-to-word
            - listitem [ref=e498]:
              - link "Word to PDF" [ref=e499] [cursor=pointer]:
                - /url: /word-to-pdf
            - listitem [ref=e500]:
              - link "PDF to Excel" [ref=e501] [cursor=pointer]:
                - /url: /pdf-to-excel
            - listitem [ref=e502]:
              - link "Excel to PDF" [ref=e503] [cursor=pointer]:
                - /url: /excel-to-pdf
            - listitem [ref=e504]:
              - link "PDF to PowerPoint" [ref=e505] [cursor=pointer]:
                - /url: /pdf-to-ppt
        - generic [ref=e506]:
          - heading "Layout" [level=3] [ref=e507]
          - list [ref=e508]:
            - listitem [ref=e509]:
              - link "Rotate PDF" [ref=e510] [cursor=pointer]:
                - /url: /rotate-pdf
      - generic [ref=e511]:
        - paragraph [ref=e512]: © 2026 LiftPDF. All rights reserved.
        - generic [ref=e513]:
          - link "Privacy Policy" [ref=e514] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Terms of Service" [ref=e515] [cursor=pointer]:
            - /url: /terms-of-service
          - link "Contact" [ref=e516] [cursor=pointer]:
            - /url: /contact
  - alert [ref=e517]
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
> 26  |     await expect(page.getByText("LiftPDF")).toBeVisible();
      |                                             ^ Error: expect(locator).toBeVisible() failed
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