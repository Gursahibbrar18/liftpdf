import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";

export interface WatermarkOptions {
  text: string;
  opacity?: number;    // 0–1, default 0.3
  fontSize?: number;   // default 60
  angle?: number;      // degrees, default 45
  color?: { r: number; g: number; b: number };
}

export async function watermarkPDF(
  file: File,
  options: WatermarkOptions
): Promise<Uint8Array> {
  const {
    text,
    opacity = 0.3,
    fontSize = 60,
    angle = 45,
    color = { r: 0.5, g: 0.5, b: 0.5 },
  } = options;

  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);

  for (const page of doc.getPages()) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: height / 2 - fontSize / 2,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: degrees(angle),
    });
  }

  return doc.save();
}
