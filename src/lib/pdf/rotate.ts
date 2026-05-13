import { PDFDocument, degrees } from "pdf-lib";

export type RotationAngle = 90 | 180 | 270;

export async function rotatePDF(
  file: File,
  angle: RotationAngle,
  pageIndices?: number[] // undefined = all pages
): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const targets =
    pageIndices ?? Array.from({ length: doc.getPageCount() }, (_, i) => i);

  targets.forEach((i) => {
    const page = doc.getPage(i);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  });

  return doc.save();
}
