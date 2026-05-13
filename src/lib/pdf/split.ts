import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { bytesToBlob } from "@/lib/download";

export interface SplitRange {
  label: string;
  from: number; // 1-based
  to: number;   // 1-based inclusive
}

export async function splitPDF(
  file: File,
  ranges: SplitRange[]
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes);
  const results: { name: string; bytes: Uint8Array }[] = [];

  for (const range of ranges) {
    const doc = await PDFDocument.create();
    const indices = Array.from(
      { length: range.to - range.from + 1 },
      (_, i) => range.from - 1 + i
    ).filter((i) => i < src.getPageCount());
    const pages = await doc.copyPages(src, indices);
    pages.forEach((p) => doc.addPage(p));
    results.push({ name: `${range.label}.pdf`, bytes: await doc.save() });
  }

  return results;
}

export async function splitIntoZip(
  file: File,
  ranges: SplitRange[]
): Promise<Blob> {
  const parts = await splitPDF(file, ranges);
  if (parts.length === 1) {
    return bytesToBlob(parts[0].bytes);
  }
  const zip = new JSZip();
  parts.forEach(({ name, bytes }) => zip.file(name, bytes));
  return zip.generateAsync({ type: "blob" });
}

/** Split every page into its own file */
export function buildPageRanges(pageCount: number): SplitRange[] {
  return Array.from({ length: pageCount }, (_, i) => ({
    label: `page-${i + 1}`,
    from: i + 1,
    to: i + 1,
  }));
}
