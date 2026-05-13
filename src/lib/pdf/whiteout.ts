import { PDFDocument, rgb } from "pdf-lib";

export interface WhiteoutRect {
  page: number;   // 0-based page index
  x: number;      // PDF points from left
  y: number;      // PDF points from bottom
  width: number;
  height: number;
}

/**
 * Overlays white rectangles on the specified page areas.
 * This visually hides content (same approach as Sejda's whiteout tool).
 * Note: underlying content is NOT cryptographically removed —
 * use this for visual redaction / print preparation, not secure redaction.
 */
export async function whiteoutPDF(
  file: File,
  rects: WhiteoutRect[]
): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);

  for (const rect of rects) {
    const page = doc.getPage(rect.page);
    page.drawRectangle({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });
  }

  return doc.save();
}
