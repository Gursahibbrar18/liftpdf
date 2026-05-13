import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface PageNumberOptions {
  position?: "bottom-center" | "bottom-right" | "bottom-left" | "top-center";
  startNumber?: number;
  fontSize?: number;
  margin?: number;
}

export async function addPageNumbers(
  file: File,
  options: PageNumberOptions = {}
): Promise<Uint8Array> {
  const {
    position = "bottom-center",
    startNumber = 1,
    fontSize = 11,
    margin = 24,
  } = options;

  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);

  doc.getPages().forEach((page, i) => {
    const { width, height } = page.getSize();
    const label = String(startNumber + i);
    const textWidth = font.widthOfTextAtSize(label, fontSize);

    let x: number;
    let y: number;

    switch (position) {
      case "bottom-left":
        x = margin;
        y = margin;
        break;
      case "bottom-right":
        x = width - textWidth - margin;
        y = margin;
        break;
      case "top-center":
        x = (width - textWidth) / 2;
        y = height - margin - fontSize;
        break;
      default: // bottom-center
        x = (width - textWidth) / 2;
        y = margin;
    }

    page.drawText(label, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
  });

  return doc.save();
}
