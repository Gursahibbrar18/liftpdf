"use client";

import { useState, useCallback, useEffect } from "react";
import { X, GripVertical, Download, RefreshCw, ZoomIn, ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { UploadZone } from "./UploadZone";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";

type Status = "idle" | "processing" | "done" | "error";

interface MergePage {
  id: string;
  fileId: string;
  file: File;
  fileName: string;
  fileIndex: number;
  pageIndex: number;
  thumb: string;
}

function nextId() {
  return `merge-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

async function renderFilePages(file: File, fileIndex: number): Promise<MergePage[]> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  const fileId = nextId();
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
  const pages: MergePage[] = [];

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 0.45 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
    pages.push({
      id: `${fileId}-p${i}`,
      fileId,
      file,
      fileName: file.name,
      fileIndex,
      pageIndex: i - 1,
      thumb: canvas.toDataURL("image/jpeg", 0.9),
    });
  }

  return pages;
}

export function MergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<MergePage[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [loadingPages, setLoadingPages] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);

  const addFiles = useCallback(async (incoming: File[]) => {
    const pdfs = incoming.filter(file => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) return;

    setStatus("idle");
    setError("");
    setLoadingPages(true);
    try {
      const startIndex = files.length;
      const renderedGroups = await Promise.all(pdfs.map((file, offset) => renderFilePages(file, startIndex + offset)));
      setFiles(prev => [...prev, ...pdfs]);
      setPages(prev => [...prev, ...renderedGroups.flat()]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not render PDF pages. Please try another file.");
      setStatus("error");
    } finally {
      setLoadingPages(false);
    }
  }, [files.length]);

  const removeFile = (fileId: string) => {
    setPages(prev => prev.filter(page => page.fileId !== fileId));
    setFiles(prev => prev.filter(file => pages.some(page => page.fileId !== fileId && page.file === file)));
    setStatus("idle");
  };

  const movePage = (from: number, to: number) => {
    if (to < 0 || to >= pages.length || from === to) return;
    setPages(prev => moveItem(prev, from, to));
    setStatus("idle");
  };

  const handleMerge = async () => {
    if (pages.length < 2) return;
    setStatus("processing");
    setError("");
    try {
      const merged = await PDFDocument.create();
      const loaded = new Map<string, PDFDocument>();
      for (const item of pages) {
        let source = loaded.get(item.fileId);
        if (!source) {
          source = await PDFDocument.load(await item.file.arrayBuffer());
          loaded.set(item.fileId, source);
        }
        const [copied] = await merged.copyPages(source, [item.pageIndex]);
        merged.addPage(copied);
      }
      const bytes = await merged.save();
      downloadBytes(bytes, "merged.pdf");
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed. Please try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setPages([]);
    setStatus("idle");
    setError("");
    setZoomIdx(null);
  };

  const zoomedPage = zoomIdx === null ? null : pages[zoomIdx] ?? null;
  const uniqueFileCount = new Set(pages.map(page => page.fileId)).size;

  useEffect(() => {
    if (zoomIdx === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomIdx(null);
      if (event.key === "ArrowRight") setZoomIdx(idx => idx === null ? idx : Math.min(pages.length - 1, idx + 1));
      if (event.key === "ArrowLeft") setZoomIdx(idx => idx === null ? idx : Math.max(0, idx - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomIdx, pages.length]);

  return (
    <div className="space-y-6">
      <UploadZone
        multiple
        onFiles={addFiles}
        label="Choose PDF files to merge"
        sublabel="or drag and drop — pages appear left to right like Sejda"
      />

      {pages.length > 0 && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-sm font-semibold text-foreground">
                {pages.length} page{pages.length !== 1 ? "s" : ""} from {uniqueFileCount} PDF{uniqueFileCount !== 1 ? "s" : ""}
              </span>
              <p className="text-xs text-muted-foreground">Drag pages left-to-right to reorder before merging. Click zoom to inspect a page.</p>
            </div>
            <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Clear all
            </button>
          </div>

          <div
            data-testid="merge-page-board"
            className="flex gap-4 overflow-x-auto bg-[#edf1f5] p-4 min-h-[260px]"
            onDragOver={(e) => e.preventDefault()}
          >
            {pages.map((page, i) => (
              <article
                key={page.id}
                data-testid="merge-page-card"
                draggable
                onDragStart={(e) => { setDragIdx(i); e.dataTransfer.effectAllowed = "move"; }}
                onDragOver={(e) => { e.preventDefault(); setDragOverIdx(i); }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIdx !== null) movePage(dragIdx, i);
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                className={cn(
                  "group relative flex-shrink-0 w-36 rounded-xl border bg-white p-2 shadow-sm transition-all",
                  dragOverIdx === i && dragIdx !== i ? "border-primary ring-2 ring-primary/20" : "border-border"
                )}
              >
                <div className="absolute left-1.5 top-1.5 z-10 rounded bg-white/90 p-1 text-muted-foreground shadow cursor-grab"><GripVertical className="w-3.5 h-3.5" /></div>
                <button
                  type="button"
                  aria-label={`Zoom page ${i + 1}`}
                  onClick={() => setZoomIdx(i)}
                  className="absolute right-1.5 top-1.5 z-10 rounded bg-white/90 p-1 text-muted-foreground shadow hover:text-primary"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <img src={page.thumb} alt={`${page.fileName} page ${page.pageIndex + 1}`} className="h-44 w-full rounded-lg border border-border/60 object-contain bg-white" />
                <div className="mt-2 text-center">
                  <p className="text-xs font-bold text-foreground">Page {page.pageIndex + 1}</p>
                  <p className="truncate text-[11px] text-muted-foreground" title={page.fileName}>{page.fileName}</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button type="button" aria-label="Move page left" disabled={i === 0} onClick={() => movePage(i, i - 1)} className="rounded border border-border px-1 py-1 text-xs disabled:opacity-30"><ArrowLeft className="mx-auto w-3 h-3" /></button>
                  <button type="button" aria-label="Remove PDF file" onClick={() => removeFile(page.fileId)} className="rounded border border-border px-1 py-1 text-xs text-destructive"><X className="mx-auto w-3 h-3" /></button>
                  <button type="button" aria-label="Move page right" disabled={i === pages.length - 1} onClick={() => movePage(i, i + 1)} className="rounded border border-border px-1 py-1 text-xs disabled:opacity-30"><ArrowRight className="mx-auto w-3 h-3" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {loadingPages && (
        <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" /> Rendering page previews…
        </div>
      )}

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      {pages.length >= 2 && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleMerge}
            disabled={status === "processing"}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
              status === "processing" ? "bg-primary/60 text-white cursor-not-allowed" : status === "done" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
            )}
          >
            {status === "processing" && <RefreshCw className="w-4 h-4 animate-spin" />}
            {status === "done" && <Download className="w-4 h-4" />}
            {status === "processing" ? "Merging…" : status === "done" ? "Download again" : `Merge ${pages.length} pages`}
          </button>
          {status === "done" && <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground">Start over</button>}
        </div>
      )}

      {pages.length === 1 && <p className="text-sm text-muted-foreground">Add at least one more PDF page to merge.</p>}
      {files.length === 0 && !loadingPages && <div className="rounded-xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted-foreground flex items-center gap-2"><Layers3 className="w-4 h-4" /> Uploaded pages will appear in a horizontal strip for zooming and reordering before merge.</div>}

      {zoomedPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" onClick={() => setZoomIdx(null)}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomIdx(null)} className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Close</button>
            <img src={zoomedPage.thumb} alt={`Zoomed ${zoomedPage.fileName} page ${zoomedPage.pageIndex + 1}`} className="mx-auto max-h-[80vh] rounded-xl bg-white shadow-2xl" />
            <p className="mt-3 text-center text-sm text-white/80">Page {zoomIdx! + 1} of {pages.length} · {zoomedPage.fileName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
