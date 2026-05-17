"use client";

import { useState, useCallback, useEffect } from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { downloadBytes } from "@/lib/download";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";
import type { WorkspaceProcessedHandler } from "./types";

type Status = "idle" | "processing" | "done" | "error";

interface Props { file?: File; thumbnails?: string[]; onProcessed?: WorkspaceProcessedHandler }

export function DeletePagesTool({ file: fileProp, thumbnails = [], onProcessed }: Props = {}) {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(thumbnails.length || 0);
  const [toDelete, setToDelete] = useState<Set<number>>(new Set());
  const [status, setStatus]     = useState<Status>("idle");
  const [error, setError]       = useState("");
  const file = fileProp ?? localFile;
  const displayPageCount = thumbnails.length || pageCount;

  // Load page count when no workspace thumbnails are available.
  useEffect(() => {
    if (!file || thumbnails.length > 0) return;
    let cancelled = false;
    file.arrayBuffer().then(bytes => PDFDocument.load(bytes)).then(doc => {
      if (!cancelled) setPageCount(doc.getPageCount());
    });
    return () => { cancelled = true; };
  }, [file, thumbnails.length]);

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setLocalFile(f);
    setToDelete(new Set());
    setStatus("idle");
    const bytes = await f.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    setPageCount(doc.getPageCount());
  }, []);

  const toggle = (i: number) =>
    setToDelete(prev => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  const handleDelete = async () => {
    if (!file || toDelete.size === 0) return;
    if (toDelete.size >= displayPageCount) {
      setError("You can't delete all pages — keep at least one.");
      return;
    }
    setStatus("processing");
    setError("");
    try {
      const sourceBytes = await file.arrayBuffer();
      const src   = await PDFDocument.load(sourceBytes);
      const doc   = await PDFDocument.create();
      const keep  = Array.from({ length: displayPageCount }, (_, i) => i).filter(i => !toDelete.has(i));
      const pages = await doc.copyPages(src, keep);
      pages.forEach(p => doc.addPage(p));
      const bytes = await doc.save();
      const filename = `deleted-pages-${file.name}`;
      if (onProcessed) {
        await onProcessed({ bytes, filename, message: "Selected pages deleted. Keep editing or download when finished." });
        setToDelete(new Set());
      } else {
        downloadBytes(bytes, filename);
      }
      setStatus("done");
    } catch {
      setError("Failed to delete pages. Please try again.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to delete pages from" />;

  const useThumbnails = thumbnails.length > 0;
  const isWorkspace = Boolean(onProcessed);

  return (
    <div className="space-y-5">
      {!fileProp && (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
          <div>
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">{displayPageCount} pages · {toDelete.size} selected</p>
          </div>
          <button onClick={() => { setLocalFile(null); setToDelete(new Set()); setStatus("idle"); }}
            className="text-xs text-muted-foreground hover:text-foreground">
            Change file
          </button>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {useThumbnails
          ? "Click a page to mark it for deletion. Red border = will be deleted."
          : "Click a page number to mark it for deletion. Red = will be deleted."}
        {toDelete.size > 0 && ` · Keeping ${displayPageCount - toDelete.size} page${displayPageCount - toDelete.size !== 1 ? "s" : ""}.`}
      </p>

      {/* Thumbnail grid (workspace mode) */}
      {useThumbnails ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {thumbnails.map((thumb, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={cn(
                "relative rounded-lg border-2 overflow-hidden transition-all group",
                toDelete.has(i)
                  ? "border-destructive shadow-destructive/30 shadow-md"
                  : "border-border hover:border-primary/50"
              )}
            >
              <img src={thumb} alt={`Page ${i + 1}`} className="w-full" />
              {toDelete.has(i) && (
                <div className="absolute inset-0 bg-destructive/25 flex items-center justify-center">
                  <div className="bg-white rounded-full p-1 shadow">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </div>
                </div>
              )}
              <div className={cn(
                "absolute bottom-0 inset-x-0 text-center text-xs py-0.5 font-medium",
                toDelete.has(i) ? "bg-destructive text-white" : "bg-black/40 text-white"
              )}>
                {i + 1}
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Numbered buttons fallback (standalone mode) */
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: displayPageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={cn(
                "w-12 h-12 rounded-xl border text-sm font-semibold transition-all",
                toDelete.has(i)
                  ? "bg-destructive/10 border-destructive text-destructive"
                  : "bg-white border-border hover:border-primary hover:text-primary"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <button
        onClick={handleDelete}
        disabled={status === "processing" || toDelete.size === 0}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          toDelete.size === 0 ? "bg-muted text-muted-foreground cursor-not-allowed"
            : status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done"       ? "bg-emerald-600 text-white"
            : "bg-destructive text-white hover:bg-destructive/90 shadow-lg"
        )}
      >
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        {status === "processing" ? (isWorkspace ? "Applying…" : "Deleting…")
          : status === "done"    ? (isWorkspace ? "Applied — keep editing" : "Download again")
          : isWorkspace ? "Apply changes" : `Delete ${toDelete.size || ""} page${toDelete.size !== 1 ? "s" : ""}`}
      </button>
    </div>
  );
}
