export type ToolCategory =
  | "edit"
  | "organize"
  | "convert"
  | "security"
  | "stamp"
  | "layout"
  | "forms";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
  comingSoon?: boolean;
}

export const CATEGORY_META: Record<
  ToolCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  edit: {
    label: "Edit",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  organize: {
    label: "Organize",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  convert: {
    label: "Convert",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  security: {
    label: "Security",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  stamp: {
    label: "Stamp",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  layout: {
    label: "Layout",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  forms: {
    label: "Forms",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
};

export const TOOLS: Tool[] = [
  // ── EDIT ──────────────────────────────────────────────────────────────────
  {
    slug: "pdf-editor",
    name: "PDF Editor",
    description: "Add text, signatures, highlights, shapes and page operations in one workspace.",
    longDescription:
      "Upload once, add visible text, signatures, images, highlights, shapes, whiteout areas and page operations, keep editing, then apply and download when finished. Existing PDF text editing is planned next.",
    category: "edit",
    icon: "Pencil",
    keywords: ["edit pdf", "pdf editor", "edit pdf text", "modify pdf"],
  },
  {
    slug: "whiteout-pdf",
    name: "Whiteout PDF",
    description: "Cover sensitive content by painting over it in white.",
    longDescription:
      "Draw white rectangles over any content you want to hide. Perfect for redacting names, prices or private information before sharing.",
    category: "edit",
    icon: "Eraser",
    keywords: ["whiteout pdf", "redact pdf", "white out pdf", "hide pdf text"],
  },
  {
    slug: "annotate-pdf",
    name: "Annotate PDF",
    description: "Highlight and mark up pages inside the shared PDF editor.",
    longDescription:
      "Review documents by applying highlight-style overlays and continuing with other PDF tools before final download. Sticky notes and freehand drawing are planned next.",
    category: "edit",
    icon: "Highlighter",
    keywords: ["annotate pdf", "highlight pdf", "comment pdf", "markup pdf"],
  },
  {
    slug: "fill-sign-pdf",
    name: "Fill & Sign PDF",
    description: "Fill out PDF forms and add your signature.",
    longDescription:
      "Add typed text and signatures in the shared editor, then keep applying other PDF changes before downloading. Field detection, checkboxes and drawn/uploaded signatures are planned next.",
    category: "edit",
    icon: "PenLine",
    keywords: [
      "fill pdf form",
      "sign pdf",
      "pdf signature",
      "fill and sign pdf",
    ],
  },
  {
    slug: "find-replace-pdf",
    name: "Find & Replace",
    description: "Search and replace text across your entire PDF.",
    longDescription:
      "Find every occurrence of a word or phrase and replace it instantly — ideal for correcting repeated mistakes across large documents.",
    category: "edit",
    icon: "Replace",
    keywords: ["find replace pdf", "search replace pdf", "edit pdf text"],
  },
  {
    slug: "edit-pdf-metadata",
    name: "Edit Metadata",
    description: "Change title, author, subject and keyword fields.",
    longDescription:
      "Update a PDF's document properties so it appears correctly in search results, document managers and browsers.",
    category: "edit",
    icon: "FileEdit",
    keywords: ["pdf metadata", "edit pdf properties", "pdf document info"],
    comingSoon: true,
  },

  // ── ORGANIZE ──────────────────────────────────────────────────────────────
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into a single document.",
    longDescription:
      "Drag and drop as many PDFs as you need, reorder them and merge in one click. Supports up to 100 MB total free.",
    category: "organize",
    icon: "GitMerge",
    keywords: ["merge pdf", "combine pdf", "join pdf files", "pdf merger"],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Split a PDF into multiple files by page range.",
    longDescription:
      "Define custom page ranges or extract every page as a separate file. Download all parts as a ZIP archive.",
    category: "organize",
    icon: "Scissors",
    keywords: ["split pdf", "separate pdf pages", "divide pdf", "pdf splitter"],
  },
  {
    slug: "organize-pdf",
    name: "Organize Pages",
    description: "Visually drag, rotate or delete pages before saving.",
    longDescription:
      "See every page as a thumbnail. Drag to reorder, click to rotate, tick to delete — then download the reordered PDF.",
    category: "organize",
    icon: "LayoutGrid",
    keywords: [
      "organize pdf pages",
      "reorder pdf",
      "rearrange pdf pages",
      "page organizer",
    ],
  },
  {
    slug: "delete-pdf-pages",
    name: "Delete Pages",
    description: "Remove unwanted pages from your PDF.",
    longDescription:
      "Select the pages you want to remove, preview the result and download the trimmed document.",
    category: "organize",
    icon: "Trash2",
    keywords: [
      "delete pdf pages",
      "remove pdf pages",
      "delete page from pdf",
    ],
  },
  {
    slug: "extract-pdf-pages",
    name: "Extract Pages",
    description: "Extract specific pages to a new PDF file.",
    longDescription:
      "Pick individual pages or page ranges and export them as a new standalone PDF in seconds.",
    category: "organize",
    icon: "FileOutput",
    keywords: [
      "extract pdf pages",
      "pull pages from pdf",
      "pdf page extractor",
    ],
  },
  {
    slug: "alternate-mix-pdf",
    name: "Alternate & Mix",
    description: "Interleave pages from two PDFs alternately.",
    longDescription:
      "Perfect for combining front and back scans of a double-sided document. Pages are merged in alternating order.",
    category: "organize",
    icon: "Shuffle",
    keywords: ["alternate pdf", "interleave pdf pages", "mix pdf"],
    comingSoon: true,
  },
  {
    slug: "split-pdf-by-outline",
    name: "Split by Bookmarks",
    description: "Split a PDF into chapters using its bookmark outline.",
    longDescription:
      "Automatically split a long document at each top-level bookmark. Great for splitting ebooks, reports or manuals into chapters.",
    category: "organize",
    icon: "BookOpen",
    keywords: [
      "split pdf by bookmark",
      "split pdf by outline",
      "split pdf chapters",
    ],
    comingSoon: true,
  },

  // ── CONVERT ───────────────────────────────────────────────────────────────
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size while preserving quality.",
    longDescription:
      "Choose from three compression levels — Screen, eBook or Printer. Processed entirely in your browser; your file never leaves your device.",
    category: "convert",
    icon: "Archive",
    keywords: [
      "compress pdf",
      "reduce pdf size",
      "pdf compressor",
      "shrink pdf",
    ],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF to an editable Word document.",
    longDescription:
      "Turn any PDF into a fully editable DOCX file. Best results with text-based PDFs — run OCR first if your file is a scanned image.",
    category: "convert",
    icon: "FileText",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to word"],
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to PDF with perfect formatting.",
    longDescription:
      "Upload a DOCX or DOC file and get a perfectly formatted PDF. Fonts, tables and images are preserved exactly as in Word.",
    category: "convert",
    icon: "FileType",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf"],
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    description: "Extract tables from PDF into an Excel spreadsheet.",
    longDescription:
      "Detect and extract all tables from a PDF and convert them to an editable XLSX file. Ideal for financial reports and data tables.",
    category: "convert",
    icon: "Table",
    keywords: ["pdf to excel", "pdf to xlsx", "convert pdf to excel"],
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF.",
    longDescription:
      "Upload XLS or XLSX files and convert them to clean, print-ready PDF documents. All sheets are included by default.",
    category: "convert",
    icon: "FileSpreadsheet",
    keywords: ["excel to pdf", "xlsx to pdf", "convert excel to pdf"],
  },
  {
    slug: "pdf-to-ppt",
    name: "PDF to PowerPoint",
    description: "Convert PDF to an editable PowerPoint presentation.",
    longDescription:
      "Each PDF page becomes a separate slide in a PPTX file you can edit in PowerPoint or Google Slides.",
    category: "convert",
    icon: "MonitorPlay",
    keywords: ["pdf to ppt", "pdf to powerpoint", "convert pdf to pptx"],
  },
  {
    slug: "ppt-to-pdf",
    name: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF.",
    longDescription:
      "Upload a PPTX or PPT file and convert it to a PDF with all slides, animations-flattened and fonts embedded.",
    category: "convert",
    icon: "Presentation",
    keywords: ["ppt to pdf", "powerpoint to pdf", "pptx to pdf"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages to high-quality JPG or PNG images.",
    longDescription:
      "Every page of your PDF is rendered as a separate image file. Choose JPG or PNG and set the output resolution. Download all as a ZIP.",
    category: "convert",
    icon: "Image",
    keywords: [
      "pdf to jpg",
      "pdf to image",
      "pdf to png",
      "convert pdf to image",
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Combine images into a single PDF document.",
    longDescription:
      "Upload one or more JPG, PNG or WEBP images. Reorder them, then convert to a neat PDF with one image per page.",
    category: "convert",
    icon: "ImagePlus",
    keywords: [
      "jpg to pdf",
      "image to pdf",
      "png to pdf",
      "convert image to pdf",
    ],
  },
  {
    slug: "ocr-pdf",
    name: "OCR PDF",
    description: "Make scanned PDFs searchable and selectable.",
    longDescription:
      "Optical character recognition (OCR) adds an invisible text layer to scanned pages so you can search, copy and paste the content.",
    category: "convert",
    icon: "ScanText",
    keywords: [
      "ocr pdf",
      "make pdf searchable",
      "scanned pdf to text",
      "pdf ocr online",
    ],
  },
  {
    slug: "grayscale-pdf",
    name: "Convert to Grayscale",
    description: "Remove colour from your PDF to reduce file size.",
    longDescription:
      "Convert a colour PDF to pure black-and-white grayscale. Useful for reducing print costs or ensuring consistent output.",
    category: "convert",
    icon: "Contrast",
    keywords: ["grayscale pdf", "black and white pdf", "remove color from pdf"],
    comingSoon: true,
  },
  {
    slug: "html-to-pdf",
    name: "HTML to PDF",
    description: "Convert a webpage or HTML file to PDF.",
    longDescription:
      "Paste a URL or upload an HTML file and get a pixel-perfect PDF rendered by a real browser engine.",
    category: "convert",
    icon: "Globe",
    keywords: ["html to pdf", "webpage to pdf", "url to pdf", "web to pdf"],
    comingSoon: true,
  },

  // ── SECURITY ──────────────────────────────────────────────────────────────
  {
    slug: "encrypt-pdf",
    name: "Encrypt PDF",
    description: "Protect your PDF with a password using AES-256.",
    longDescription:
      "Add a strong AES-256 password to your PDF so only authorised people can open or print it.",
    category: "security",
    icon: "Lock",
    keywords: [
      "encrypt pdf",
      "password protect pdf",
      "lock pdf",
      "secure pdf",
    ],
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    description: "Remove the password from a PDF you own.",
    longDescription:
      "Enter the password to unlock your PDF and download an unrestricted copy you can open anywhere.",
    category: "security",
    icon: "Unlock",
    keywords: [
      "unlock pdf",
      "remove pdf password",
      "decrypt pdf",
      "pdf password remover",
    ],
  },

  // ── STAMP ─────────────────────────────────────────────────────────────────
  {
    slug: "watermark-pdf",
    name: "Watermark PDF",
    description: "Add a text or image watermark to every page.",
    longDescription:
      "Stamp 'CONFIDENTIAL', your company logo or any custom text across all pages. Control opacity, position, angle and font size.",
    category: "stamp",
    icon: "Stamp",
    keywords: [
      "watermark pdf",
      "add watermark to pdf",
      "stamp pdf",
      "pdf watermark",
    ],
  },
  {
    slug: "page-numbers-pdf",
    name: "Add Page Numbers",
    description: "Insert page numbers into a PDF at any position.",
    longDescription:
      "Choose the position (header or footer), start number, font, size and colour. Applies to all pages or a custom range.",
    category: "stamp",
    icon: "Hash",
    keywords: [
      "add page numbers to pdf",
      "pdf page numbers",
      "number pdf pages",
    ],
  },
  {
    slug: "header-footer-pdf",
    name: "Header & Footer",
    description: "Add custom headers and footers to every page.",
    longDescription:
      "Insert text, dates or page numbers in the header and footer with full control over font, size, colour and position.",
    category: "stamp",
    icon: "AlignJustify",
    keywords: [
      "header footer pdf",
      "add header to pdf",
      "add footer to pdf",
      "pdf header",
    ],
    comingSoon: true,
  },
  {
    slug: "bates-numbering-pdf",
    name: "Bates Numbering",
    description: "Add Bates stamps for legal and business documents.",
    longDescription:
      "Apply sequential Bates numbers with a custom prefix and suffix to each page — the standard for legal document management.",
    category: "stamp",
    icon: "ListOrdered",
    keywords: [
      "bates numbering pdf",
      "bates stamp pdf",
      "legal pdf numbering",
    ],
    comingSoon: true,
  },

  // ── LAYOUT ────────────────────────────────────────────────────────────────
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate pages 90° or 180° and save permanently.",
    longDescription:
      "Fix landscape or upside-down pages. Rotate all pages at once or select individual pages and apply different rotations.",
    category: "layout",
    icon: "RotateCw",
    keywords: ["rotate pdf", "rotate pdf pages", "turn pdf", "flip pdf"],
  },
  {
    slug: "crop-pdf",
    name: "Crop PDF",
    description: "Trim margins or change the visible area of your PDF.",
    longDescription:
      "Drag handles to define the crop area per page or apply the same crop to all pages. Useful for removing scanner borders.",
    category: "layout",
    icon: "Crop",
    keywords: [
      "crop pdf",
      "trim pdf margins",
      "pdf crop tool",
      "remove pdf border",
    ],
    comingSoon: true,
  },
  {
    slug: "resize-pdf",
    name: "Resize PDF",
    description: "Scale pages or add padding to fit a standard page size.",
    longDescription:
      "Resize all pages to A4, Letter or any custom size. Add white padding to avoid cutting content, or scale to fit.",
    category: "layout",
    icon: "Maximize2",
    keywords: [
      "resize pdf",
      "change pdf page size",
      "pdf resize",
      "scale pdf",
    ],
    comingSoon: true,
  },
  {
    slug: "flatten-pdf",
    name: "Flatten PDF",
    description: "Merge form fields and annotations into the page content.",
    longDescription:
      "Flattening burns form data and annotations into the page so they can't be edited or removed — ideal before archiving or printing.",
    category: "layout",
    icon: "Layers",
    keywords: [
      "flatten pdf",
      "flatten pdf form",
      "flatten pdf annotations",
      "pdf flatten",
    ],
    comingSoon: true,
  },
  {
    slug: "n-up-pdf",
    name: "N-Up",
    description: "Print multiple PDF pages per sheet.",
    longDescription:
      "Arrange 2, 4, 6, 8 or 16 pages per sheet for compact printing. Great for handouts, booklets and poster layouts.",
    category: "layout",
    icon: "Grid2x2",
    keywords: ["n-up pdf", "multiple pages per sheet", "pdf booklet", "impose pdf"],
    comingSoon: true,
  },
  {
    slug: "deskew-pdf",
    name: "Deskew PDF",
    description: "Automatically straighten crooked scanned pages.",
    longDescription:
      "Detect and correct the tilt angle on each scanned page automatically. Makes OCR more accurate and documents easier to read.",
    category: "layout",
    icon: "SlidersHorizontal",
    keywords: ["deskew pdf", "straighten pdf", "fix scanned pdf", "pdf deskew"],
    comingSoon: true,
  },
  {
    slug: "repair-pdf",
    name: "Repair PDF",
    description: "Recover a corrupted or damaged PDF file.",
    longDescription:
      "Attempt to repair a PDF that won't open or displays errors. Recovers as much content as possible from damaged files.",
    category: "layout",
    icon: "Wrench",
    keywords: [
      "repair pdf",
      "fix corrupted pdf",
      "damaged pdf",
      "pdf repair tool",
    ],
    comingSoon: true,
  },

  // ── FORMS ─────────────────────────────────────────────────────────────────
  {
    slug: "create-fillable-pdf",
    name: "Create Fillable PDF",
    description: "Add interactive text fields, checkboxes and dropdowns.",
    longDescription:
      "Turn any static PDF into an interactive form. Add text inputs, checkboxes, radio buttons, dropdowns and signature fields.",
    category: "forms",
    icon: "ClipboardList",
    keywords: [
      "create fillable pdf",
      "interactive pdf form",
      "pdf form creator",
      "add form fields pdf",
    ],
    comingSoon: true,
  },
  {
    slug: "edit-pdf-forms",
    name: "Edit PDF Forms",
    description: "Modify existing form fields and their properties.",
    longDescription:
      "Change the position, size, font, colour and validation rules of any existing form field. Works with all standard PDF forms.",
    category: "forms",
    icon: "FormInput",
    keywords: ["edit pdf form", "modify pdf form fields", "pdf form editor"],
    comingSoon: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export const ALL_CATEGORIES: ToolCategory[] = [
  "edit",
  "organize",
  "convert",
  "security",
  "stamp",
  "layout",
  "forms",
];

export const FEATURED_TOOLS = [
  "merge-pdf",
  "compress-pdf",
  "pdf-to-word",
  "pdf-editor",
  "split-pdf",
  "pdf-to-jpg",
  "word-to-pdf",
  "rotate-pdf",
  "whiteout-pdf",
  "ocr-pdf",
  "encrypt-pdf",
  "watermark-pdf",
];
