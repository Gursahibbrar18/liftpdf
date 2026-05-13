# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Header navigation >> mobile menu opens
- Location: tests/navigation.spec.ts:72:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/all tools/i)
Expected: visible
Error: strict mode violation: getByText(/all tools/i) resolved to 2 elements:
    1) <a href="/all-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">All Tools</a> aka getByText('All Tools').first()
    2) <a href="/all-tools" class="block text-sm font-semibold text-primary pb-2 border-b border-border">All Tools</a> aka getByRole('link', { name: 'All Tools' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/all tools/i)

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
      - button "Toggle menu" [active] [ref=e10]:
        - img [ref=e11]
    - generic [ref=e15]:
      - link "All Tools" [ref=e16] [cursor=pointer]:
        - /url: /all-tools
      - generic [ref=e17]:
        - paragraph [ref=e18]: Edit
        - generic [ref=e19]:
          - link "PDF Editor" [ref=e20] [cursor=pointer]:
            - /url: /pdf-editor
            - img [ref=e21]
            - generic [ref=e24]: PDF Editor
          - link "Whiteout PDF" [ref=e25] [cursor=pointer]:
            - /url: /whiteout-pdf
            - img [ref=e26]
            - generic [ref=e29]: Whiteout PDF
          - link "Annotate PDF" [ref=e30] [cursor=pointer]:
            - /url: /annotate-pdf
            - img [ref=e31]
            - generic [ref=e34]: Annotate PDF
          - link "Fill & Sign PDF" [ref=e35] [cursor=pointer]:
            - /url: /fill-sign-pdf
            - img [ref=e36]
            - generic [ref=e38]: Fill & Sign PDF
          - link "Find & Replace" [ref=e39] [cursor=pointer]:
            - /url: /find-replace-pdf
            - img [ref=e40]
            - generic [ref=e48]: Find & Replace
          - link "Edit Metadata" [ref=e49] [cursor=pointer]:
            - /url: /edit-pdf-metadata
            - img [ref=e50]
            - generic [ref=e54]: Edit Metadata
      - generic [ref=e55]:
        - paragraph [ref=e56]: Organize
        - generic [ref=e57]:
          - link "Merge PDF" [ref=e58] [cursor=pointer]:
            - /url: /merge-pdf
            - img [ref=e59]
            - generic [ref=e63]: Merge PDF
          - link "Split PDF" [ref=e64] [cursor=pointer]:
            - /url: /split-pdf
            - img [ref=e65]
            - generic [ref=e71]: Split PDF
          - link "Organize Pages" [ref=e72] [cursor=pointer]:
            - /url: /organize-pdf
            - img [ref=e73]
            - generic [ref=e78]: Organize Pages
          - link "Delete Pages" [ref=e79] [cursor=pointer]:
            - /url: /delete-pdf-pages
            - img [ref=e80]
            - generic [ref=e83]: Delete Pages
          - link "Extract Pages" [ref=e84] [cursor=pointer]:
            - /url: /extract-pdf-pages
            - img [ref=e85]
            - generic [ref=e90]: Extract Pages
          - link "Alternate & Mix" [ref=e91] [cursor=pointer]:
            - /url: /alternate-mix-pdf
            - img [ref=e92]
            - generic [ref=e98]: Alternate & Mix
          - link "Split by Bookmarks" [ref=e99] [cursor=pointer]:
            - /url: /split-pdf-by-outline
            - img [ref=e100]
            - generic [ref=e102]: Split by Bookmarks
      - generic [ref=e103]:
        - paragraph [ref=e104]: Convert
        - generic [ref=e105]:
          - link "Compress PDF" [ref=e106] [cursor=pointer]:
            - /url: /compress-pdf
            - img [ref=e107]
            - generic [ref=e110]: Compress PDF
          - link "PDF to Word" [ref=e111] [cursor=pointer]:
            - /url: /pdf-to-word
            - img [ref=e112]
            - generic [ref=e115]: PDF to Word
          - link "Word to PDF" [ref=e116] [cursor=pointer]:
            - /url: /word-to-pdf
            - img [ref=e117]
            - generic [ref=e121]: Word to PDF
          - link "PDF to Excel" [ref=e122] [cursor=pointer]:
            - /url: /pdf-to-excel
            - img [ref=e123]
            - generic [ref=e125]: PDF to Excel
          - link "Excel to PDF" [ref=e126] [cursor=pointer]:
            - /url: /excel-to-pdf
            - img [ref=e127]
            - generic [ref=e130]: Excel to PDF
          - link "PDF to PowerPoint" [ref=e131] [cursor=pointer]:
            - /url: /pdf-to-ppt
            - img [ref=e132]
            - generic [ref=e135]: PDF to PowerPoint
          - link "PowerPoint to PDF" [ref=e136] [cursor=pointer]:
            - /url: /ppt-to-pdf
            - img [ref=e137]
            - generic [ref=e140]: PowerPoint to PDF
          - link "PDF to JPG" [ref=e141] [cursor=pointer]:
            - /url: /pdf-to-jpg
            - img [ref=e142]
            - generic [ref=e146]: PDF to JPG
          - link "JPG to PDF" [ref=e147] [cursor=pointer]:
            - /url: /jpg-to-pdf
            - img [ref=e148]
            - generic [ref=e152]: JPG to PDF
          - link "OCR PDF" [ref=e153] [cursor=pointer]:
            - /url: /ocr-pdf
            - img [ref=e154]
            - generic [ref=e159]: OCR PDF
          - link "Convert to Grayscale" [ref=e160] [cursor=pointer]:
            - /url: /grayscale-pdf
            - img [ref=e161]
            - generic [ref=e164]: Convert to Grayscale
          - link "HTML to PDF" [ref=e165] [cursor=pointer]:
            - /url: /html-to-pdf
            - img [ref=e166]
            - generic [ref=e169]: HTML to PDF
      - generic [ref=e170]:
        - paragraph [ref=e171]: Security
        - generic [ref=e172]:
          - link "Encrypt PDF" [ref=e173] [cursor=pointer]:
            - /url: /encrypt-pdf
            - img [ref=e174]
            - generic [ref=e177]: Encrypt PDF
          - link "Unlock PDF" [ref=e178] [cursor=pointer]:
            - /url: /unlock-pdf
            - img [ref=e179]
            - generic [ref=e182]: Unlock PDF
      - generic [ref=e183]:
        - paragraph [ref=e184]: Stamp
        - generic [ref=e185]:
          - link "Watermark PDF" [ref=e186] [cursor=pointer]:
            - /url: /watermark-pdf
            - img [ref=e187]
            - generic [ref=e190]: Watermark PDF
          - link "Add Page Numbers" [ref=e191] [cursor=pointer]:
            - /url: /page-numbers-pdf
            - img [ref=e192]
            - generic [ref=e195]: Add Page Numbers
          - link "Header & Footer" [ref=e196] [cursor=pointer]:
            - /url: /header-footer-pdf
            - img [ref=e197]
            - generic [ref=e198]: Header & Footer
          - link "Bates Numbering" [ref=e199] [cursor=pointer]:
            - /url: /bates-numbering-pdf
            - img [ref=e200]
            - generic [ref=e203]: Bates Numbering
      - generic [ref=e204]:
        - paragraph [ref=e205]: Layout
        - generic [ref=e206]:
          - link "Rotate PDF" [ref=e207] [cursor=pointer]:
            - /url: /rotate-pdf
            - img [ref=e208]
            - generic [ref=e211]: Rotate PDF
          - link "Crop PDF" [ref=e212] [cursor=pointer]:
            - /url: /crop-pdf
            - img [ref=e213]
            - generic [ref=e216]: Crop PDF
          - link "Resize PDF" [ref=e217] [cursor=pointer]:
            - /url: /resize-pdf
            - img [ref=e218]
            - generic [ref=e223]: Resize PDF
          - link "Flatten PDF" [ref=e224] [cursor=pointer]:
            - /url: /flatten-pdf
            - img [ref=e225]
            - generic [ref=e229]: Flatten PDF
          - link "N-Up" [ref=e230] [cursor=pointer]:
            - /url: /n-up-pdf
            - img [ref=e231]
            - generic [ref=e233]: N-Up
          - link "Deskew PDF" [ref=e234] [cursor=pointer]:
            - /url: /deskew-pdf
            - img [ref=e235]
            - generic [ref=e236]: Deskew PDF
          - link "Repair PDF" [ref=e237] [cursor=pointer]:
            - /url: /repair-pdf
            - img [ref=e238]
            - generic [ref=e240]: Repair PDF
      - generic [ref=e241]:
        - paragraph [ref=e242]: Forms
        - generic [ref=e243]:
          - link "Create Fillable PDF" [ref=e244] [cursor=pointer]:
            - /url: /create-fillable-pdf
            - img [ref=e245]
            - generic [ref=e248]: Create Fillable PDF
          - link "Edit PDF Forms" [ref=e249] [cursor=pointer]:
            - /url: /edit-pdf-forms
            - img [ref=e250]
            - generic [ref=e252]: Edit PDF Forms
  - main [ref=e253]:
    - generic [ref=e255]:
      - generic [ref=e256]:
        - img [ref=e257]
        - text: No sign-up · No watermarks · Free forever
      - heading "Every PDF tool you'll ever need" [level=1] [ref=e259]:
        - text: Every PDF tool
        - text: you'll ever need
      - paragraph [ref=e260]: Merge, split, compress, convert, edit and sign PDFs — free and unlimited. Everything runs in your browser. Your files never leave your device.
      - generic [ref=e261]:
        - link "Open PDF Editor" [ref=e262] [cursor=pointer]:
          - /url: /pdf-editor
          - text: Open PDF Editor
          - img [ref=e263]
        - link "Merge PDFs" [ref=e265] [cursor=pointer]:
          - /url: /merge-pdf
      - generic [ref=e266]:
        - generic [ref=e267]:
          - img [ref=e268]
          - text: Files processed in your browser — never uploaded
        - generic [ref=e270]:
          - img [ref=e271]
          - text: Instant results, no queue
        - generic [ref=e273]:
          - img [ref=e274]
          - text: No watermarks on output
    - generic [ref=e277]:
      - generic [ref=e278]:
        - heading "Popular tools" [level=2] [ref=e279]
        - paragraph [ref=e280]: The tools people use every day — all free, all instant.
        - generic [ref=e281]:
          - link "Merge PDF Combine multiple PDF files into a single document." [ref=e282] [cursor=pointer]:
            - /url: /merge-pdf
            - img [ref=e284]
            - generic [ref=e288]:
              - heading "Merge PDF" [level=3] [ref=e290]
              - paragraph [ref=e291]: Combine multiple PDF files into a single document.
          - link "Compress PDF Reduce PDF file size while preserving quality." [ref=e292] [cursor=pointer]:
            - /url: /compress-pdf
            - img [ref=e294]
            - generic [ref=e297]:
              - heading "Compress PDF" [level=3] [ref=e299]
              - paragraph [ref=e300]: Reduce PDF file size while preserving quality.
          - link "PDF to Word Convert PDF to an editable Word document." [ref=e301] [cursor=pointer]:
            - /url: /pdf-to-word
            - img [ref=e303]
            - generic [ref=e306]:
              - heading "PDF to Word" [level=3] [ref=e308]
              - paragraph [ref=e309]: Convert PDF to an editable Word document.
          - link "PDF Editor Edit text, images, links and shapes directly in your PDF." [ref=e310] [cursor=pointer]:
            - /url: /pdf-editor
            - img [ref=e312]
            - generic [ref=e315]:
              - heading "PDF Editor" [level=3] [ref=e317]
              - paragraph [ref=e318]: Edit text, images, links and shapes directly in your PDF.
          - link "Split PDF Split a PDF into multiple files by page range." [ref=e319] [cursor=pointer]:
            - /url: /split-pdf
            - img [ref=e321]
            - generic [ref=e327]:
              - heading "Split PDF" [level=3] [ref=e329]
              - paragraph [ref=e330]: Split a PDF into multiple files by page range.
          - link "PDF to JPG Convert PDF pages to high-quality JPG or PNG images." [ref=e331] [cursor=pointer]:
            - /url: /pdf-to-jpg
            - img [ref=e333]
            - generic [ref=e337]:
              - heading "PDF to JPG" [level=3] [ref=e339]
              - paragraph [ref=e340]: Convert PDF pages to high-quality JPG or PNG images.
          - link "Word to PDF Convert Word documents to PDF with perfect formatting." [ref=e341] [cursor=pointer]:
            - /url: /word-to-pdf
            - img [ref=e343]
            - generic [ref=e347]:
              - heading "Word to PDF" [level=3] [ref=e349]
              - paragraph [ref=e350]: Convert Word documents to PDF with perfect formatting.
          - link "Rotate PDF Rotate pages 90° or 180° and save permanently." [ref=e351] [cursor=pointer]:
            - /url: /rotate-pdf
            - img [ref=e353]
            - generic [ref=e356]:
              - heading "Rotate PDF" [level=3] [ref=e358]
              - paragraph [ref=e359]: Rotate pages 90° or 180° and save permanently.
          - link "Whiteout PDF Cover sensitive content by painting over it in white." [ref=e360] [cursor=pointer]:
            - /url: /whiteout-pdf
            - img [ref=e362]
            - generic [ref=e365]:
              - heading "Whiteout PDF" [level=3] [ref=e367]
              - paragraph [ref=e368]: Cover sensitive content by painting over it in white.
          - link "OCR PDF Make scanned PDFs searchable and selectable." [ref=e369] [cursor=pointer]:
            - /url: /ocr-pdf
            - img [ref=e371]
            - generic [ref=e376]:
              - heading "OCR PDF" [level=3] [ref=e378]
              - paragraph [ref=e379]: Make scanned PDFs searchable and selectable.
          - link "Encrypt PDF Protect your PDF with a password using AES-256." [ref=e380] [cursor=pointer]:
            - /url: /encrypt-pdf
            - img [ref=e382]
            - generic [ref=e385]:
              - heading "Encrypt PDF" [level=3] [ref=e387]
              - paragraph [ref=e388]: Protect your PDF with a password using AES-256.
          - link "Watermark PDF Add a text or image watermark to every page." [ref=e389] [cursor=pointer]:
            - /url: /watermark-pdf
            - img [ref=e391]
            - generic [ref=e394]:
              - heading "Watermark PDF" [level=3] [ref=e396]
              - paragraph [ref=e397]: Add a text or image watermark to every page.
      - generic [ref=e398]:
        - generic [ref=e400]: Edit
        - generic [ref=e402]:
          - link "PDF Editor Edit text, images, links and shapes directly in your PDF." [ref=e403] [cursor=pointer]:
            - /url: /pdf-editor
            - img [ref=e405]
            - generic [ref=e408]:
              - heading "PDF Editor" [level=3] [ref=e410]
              - paragraph [ref=e411]: Edit text, images, links and shapes directly in your PDF.
          - link "Whiteout PDF Cover sensitive content by painting over it in white." [ref=e412] [cursor=pointer]:
            - /url: /whiteout-pdf
            - img [ref=e414]
            - generic [ref=e417]:
              - heading "Whiteout PDF" [level=3] [ref=e419]
              - paragraph [ref=e420]: Cover sensitive content by painting over it in white.
          - link "Annotate PDF Highlight, strikethrough, underline and add sticky notes." [ref=e421] [cursor=pointer]:
            - /url: /annotate-pdf
            - img [ref=e423]
            - generic [ref=e426]:
              - heading "Annotate PDF" [level=3] [ref=e428]
              - paragraph [ref=e429]: Highlight, strikethrough, underline and add sticky notes.
          - link "Fill & Sign PDF Fill out PDF forms and add your signature." [ref=e430] [cursor=pointer]:
            - /url: /fill-sign-pdf
            - img [ref=e432]
            - generic [ref=e434]:
              - heading "Fill & Sign PDF" [level=3] [ref=e436]
              - paragraph [ref=e437]: Fill out PDF forms and add your signature.
          - link "Find & Replace Search and replace text across your entire PDF." [ref=e438] [cursor=pointer]:
            - /url: /find-replace-pdf
            - img [ref=e440]
            - generic [ref=e448]:
              - heading "Find & Replace" [level=3] [ref=e450]
              - paragraph [ref=e451]: Search and replace text across your entire PDF.
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
      - generic [ref=e452]:
        - generic [ref=e454]: Organize
        - generic [ref=e456]:
          - link "Merge PDF Combine multiple PDF files into a single document." [ref=e457] [cursor=pointer]:
            - /url: /merge-pdf
            - img [ref=e459]
            - generic [ref=e463]:
              - heading "Merge PDF" [level=3] [ref=e465]
              - paragraph [ref=e466]: Combine multiple PDF files into a single document.
          - link "Split PDF Split a PDF into multiple files by page range." [ref=e467] [cursor=pointer]:
            - /url: /split-pdf
            - img [ref=e469]
            - generic [ref=e475]:
              - heading "Split PDF" [level=3] [ref=e477]
              - paragraph [ref=e478]: Split a PDF into multiple files by page range.
          - link "Organize Pages Visually drag, rotate or delete pages before saving." [ref=e479] [cursor=pointer]:
            - /url: /organize-pdf
            - img [ref=e481]
            - generic [ref=e486]:
              - heading "Organize Pages" [level=3] [ref=e488]
              - paragraph [ref=e489]: Visually drag, rotate or delete pages before saving.
          - link "Delete Pages Remove unwanted pages from your PDF." [ref=e490] [cursor=pointer]:
            - /url: /delete-pdf-pages
            - img [ref=e492]
            - generic [ref=e495]:
              - heading "Delete Pages" [level=3] [ref=e497]
              - paragraph [ref=e498]: Remove unwanted pages from your PDF.
          - link "Extract Pages Extract specific pages to a new PDF file." [ref=e499] [cursor=pointer]:
            - /url: /extract-pdf-pages
            - img [ref=e501]
            - generic [ref=e506]:
              - heading "Extract Pages" [level=3] [ref=e508]
              - paragraph [ref=e509]: Extract specific pages to a new PDF file.
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
      - generic [ref=e510]:
        - generic [ref=e512]: Convert
        - generic [ref=e514]:
          - link "Compress PDF Reduce PDF file size while preserving quality." [ref=e515] [cursor=pointer]:
            - /url: /compress-pdf
            - img [ref=e517]
            - generic [ref=e520]:
              - heading "Compress PDF" [level=3] [ref=e522]
              - paragraph [ref=e523]: Reduce PDF file size while preserving quality.
          - link "PDF to Word Convert PDF to an editable Word document." [ref=e524] [cursor=pointer]:
            - /url: /pdf-to-word
            - img [ref=e526]
            - generic [ref=e529]:
              - heading "PDF to Word" [level=3] [ref=e531]
              - paragraph [ref=e532]: Convert PDF to an editable Word document.
          - link "Word to PDF Convert Word documents to PDF with perfect formatting." [ref=e533] [cursor=pointer]:
            - /url: /word-to-pdf
            - img [ref=e535]
            - generic [ref=e539]:
              - heading "Word to PDF" [level=3] [ref=e541]
              - paragraph [ref=e542]: Convert Word documents to PDF with perfect formatting.
          - link "PDF to Excel Extract tables from PDF into an Excel spreadsheet." [ref=e543] [cursor=pointer]:
            - /url: /pdf-to-excel
            - img [ref=e545]
            - generic [ref=e547]:
              - heading "PDF to Excel" [level=3] [ref=e549]
              - paragraph [ref=e550]: Extract tables from PDF into an Excel spreadsheet.
          - link "Excel to PDF Convert Excel spreadsheets to PDF." [ref=e551] [cursor=pointer]:
            - /url: /excel-to-pdf
            - img [ref=e553]
            - generic [ref=e556]:
              - heading "Excel to PDF" [level=3] [ref=e558]
              - paragraph [ref=e559]: Convert Excel spreadsheets to PDF.
          - link "PDF to PowerPoint Convert PDF to an editable PowerPoint presentation." [ref=e560] [cursor=pointer]:
            - /url: /pdf-to-ppt
            - img [ref=e562]
            - generic [ref=e565]:
              - heading "PDF to PowerPoint" [level=3] [ref=e567]
              - paragraph [ref=e568]: Convert PDF to an editable PowerPoint presentation.
          - link "PowerPoint to PDF Convert PowerPoint presentations to PDF." [ref=e569] [cursor=pointer]:
            - /url: /ppt-to-pdf
            - img [ref=e571]
            - generic [ref=e574]:
              - heading "PowerPoint to PDF" [level=3] [ref=e576]
              - paragraph [ref=e577]: Convert PowerPoint presentations to PDF.
          - link "PDF to JPG Convert PDF pages to high-quality JPG or PNG images." [ref=e578] [cursor=pointer]:
            - /url: /pdf-to-jpg
            - img [ref=e580]
            - generic [ref=e584]:
              - heading "PDF to JPG" [level=3] [ref=e586]
              - paragraph [ref=e587]: Convert PDF pages to high-quality JPG or PNG images.
          - link "JPG to PDF Combine images into a single PDF document." [ref=e588] [cursor=pointer]:
            - /url: /jpg-to-pdf
            - img [ref=e590]
            - generic [ref=e594]:
              - heading "JPG to PDF" [level=3] [ref=e596]
              - paragraph [ref=e597]: Combine images into a single PDF document.
          - link "OCR PDF Make scanned PDFs searchable and selectable." [ref=e598] [cursor=pointer]:
            - /url: /ocr-pdf
            - img [ref=e600]
            - generic [ref=e605]:
              - heading "OCR PDF" [level=3] [ref=e607]
              - paragraph [ref=e608]: Make scanned PDFs searchable and selectable.
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
      - generic [ref=e609]:
        - generic [ref=e611]: Security
        - generic [ref=e613]:
          - link "Encrypt PDF Protect your PDF with a password using AES-256." [ref=e614] [cursor=pointer]:
            - /url: /encrypt-pdf
            - img [ref=e616]
            - generic [ref=e619]:
              - heading "Encrypt PDF" [level=3] [ref=e621]
              - paragraph [ref=e622]: Protect your PDF with a password using AES-256.
          - link "Unlock PDF Remove the password from a PDF you own." [ref=e623] [cursor=pointer]:
            - /url: /unlock-pdf
            - img [ref=e625]
            - generic [ref=e628]:
              - heading "Unlock PDF" [level=3] [ref=e630]
              - paragraph [ref=e631]: Remove the password from a PDF you own.
      - generic [ref=e632]:
        - generic [ref=e634]: Stamp
        - generic [ref=e636]:
          - link "Watermark PDF Add a text or image watermark to every page." [ref=e637] [cursor=pointer]:
            - /url: /watermark-pdf
            - img [ref=e639]
            - generic [ref=e642]:
              - heading "Watermark PDF" [level=3] [ref=e644]
              - paragraph [ref=e645]: Add a text or image watermark to every page.
          - link "Add Page Numbers Insert page numbers into a PDF at any position." [ref=e646] [cursor=pointer]:
            - /url: /page-numbers-pdf
            - img [ref=e648]
            - generic [ref=e651]:
              - heading "Add Page Numbers" [level=3] [ref=e653]
              - paragraph [ref=e654]: Insert page numbers into a PDF at any position.
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
      - generic [ref=e655]:
        - generic [ref=e657]: Layout
        - generic [ref=e659]:
          - link "Rotate PDF Rotate pages 90° or 180° and save permanently." [ref=e660] [cursor=pointer]:
            - /url: /rotate-pdf
            - img [ref=e662]
            - generic [ref=e665]:
              - heading "Rotate PDF" [level=3] [ref=e667]
              - paragraph [ref=e668]: Rotate pages 90° or 180° and save permanently.
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
      - generic [ref=e669]:
        - generic [ref=e671]: Forms
        - generic [ref=e673]:
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
  - contentinfo [ref=e674]:
    - generic [ref=e675]:
      - generic [ref=e676]:
        - generic [ref=e677]:
          - link "LiftPDF" [ref=e678] [cursor=pointer]:
            - /url: /
            - img [ref=e680]
            - generic [ref=e682]: LiftPDF
          - paragraph [ref=e683]: Fast, free PDF tools that work entirely in your browser. No sign-up. No watermarks.
        - generic [ref=e684]:
          - heading "Edit" [level=3] [ref=e685]
          - list [ref=e686]:
            - listitem [ref=e687]:
              - link "PDF Editor" [ref=e688] [cursor=pointer]:
                - /url: /pdf-editor
            - listitem [ref=e689]:
              - link "Whiteout PDF" [ref=e690] [cursor=pointer]:
                - /url: /whiteout-pdf
            - listitem [ref=e691]:
              - link "Annotate PDF" [ref=e692] [cursor=pointer]:
                - /url: /annotate-pdf
            - listitem [ref=e693]:
              - link "Fill & Sign PDF" [ref=e694] [cursor=pointer]:
                - /url: /fill-sign-pdf
            - listitem [ref=e695]:
              - link "Find & Replace" [ref=e696] [cursor=pointer]:
                - /url: /find-replace-pdf
        - generic [ref=e697]:
          - heading "Organize" [level=3] [ref=e698]
          - list [ref=e699]:
            - listitem [ref=e700]:
              - link "Merge PDF" [ref=e701] [cursor=pointer]:
                - /url: /merge-pdf
            - listitem [ref=e702]:
              - link "Split PDF" [ref=e703] [cursor=pointer]:
                - /url: /split-pdf
            - listitem [ref=e704]:
              - link "Organize Pages" [ref=e705] [cursor=pointer]:
                - /url: /organize-pdf
            - listitem [ref=e706]:
              - link "Delete Pages" [ref=e707] [cursor=pointer]:
                - /url: /delete-pdf-pages
            - listitem [ref=e708]:
              - link "Extract Pages" [ref=e709] [cursor=pointer]:
                - /url: /extract-pdf-pages
        - generic [ref=e710]:
          - heading "Convert" [level=3] [ref=e711]
          - list [ref=e712]:
            - listitem [ref=e713]:
              - link "Compress PDF" [ref=e714] [cursor=pointer]:
                - /url: /compress-pdf
            - listitem [ref=e715]:
              - link "PDF to Word" [ref=e716] [cursor=pointer]:
                - /url: /pdf-to-word
            - listitem [ref=e717]:
              - link "Word to PDF" [ref=e718] [cursor=pointer]:
                - /url: /word-to-pdf
            - listitem [ref=e719]:
              - link "PDF to Excel" [ref=e720] [cursor=pointer]:
                - /url: /pdf-to-excel
            - listitem [ref=e721]:
              - link "Excel to PDF" [ref=e722] [cursor=pointer]:
                - /url: /excel-to-pdf
            - listitem [ref=e723]:
              - link "PDF to PowerPoint" [ref=e724] [cursor=pointer]:
                - /url: /pdf-to-ppt
        - generic [ref=e725]:
          - heading "Layout" [level=3] [ref=e726]
          - list [ref=e727]:
            - listitem [ref=e728]:
              - link "Rotate PDF" [ref=e729] [cursor=pointer]:
                - /url: /rotate-pdf
      - generic [ref=e730]:
        - paragraph [ref=e731]: © 2026 LiftPDF. All rights reserved.
        - generic [ref=e732]:
          - link "Privacy Policy" [ref=e733] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Terms of Service" [ref=e734] [cursor=pointer]:
            - /url: /terms-of-service
          - link "Contact" [ref=e735] [cursor=pointer]:
            - /url: /contact
  - alert [ref=e736]
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
> 76  |     await expect(page.getByText(/all tools/i)).toBeVisible();
      |                                                ^ Error: expect(locator).toBeVisible() failed
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