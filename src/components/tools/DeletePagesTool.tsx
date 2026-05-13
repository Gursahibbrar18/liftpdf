"use client";

import { useState, useCallback } from "react";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { downloadBytes } from "@/lib/download";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

type Status = "idle" | "processing" | "done" | "error";

export function DeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [toDelete, setToDelete] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setToDelete(new Set());
    setStatus("idle");
    const bytes = await f.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    setPageCount(doc.getPageCount());
  }, []);

  const toggle = (i: number) =>
    setToDelete((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const handleDelete = async () => {
    if (!file || toDelete.size === 0) return;
    if (toDelete.size >= pageCount) {
      setError("You can't delete all pages — keep at least one.");
      return;
    }
    setStatus("processing");
    setError("");
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const doc = await PDFDocument.create();
      const keep = Array.from({ length: pageCount }, (_, i) => i).filter((i) => !toDelete.has(i));
      const pages = await doc.copyPages(src, keep);
      pages.forEach((p) => doc.addPage(p));
      downloadBytes(await doc.save(), `deleted-pages-${file.name}`);
      setStatus("done");
    } catch {
      setError("Failed to delete pages. Please try again.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to delete pages from" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
        <div>
          <p className="font-medium text-sm">{file.name}</p>
          <p className="text-xs text-muted-foreground">{pageCount} pages · {toDelete.size} selected for deletion</p>
        </div>
        <button onClick={() => { setFile(null); setToDelete(new Set()); setStatus("idle"); }}
          className="text-xs text-muted-foreground hover:text-foreground">Change file</button>
      </div>

      <p className="text-sm text-muted-foreground">Click a page number to mark it for deletion. Red = will be deleted.</p>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <button key={i} onClick={() => toggle(i)}
            className={cn("w-12 h-12 rounded-xl border text-sm font-semibold transition-all",
              toDelete.has(i)
                ? "bg-destructive/10 border-destructive text-destructive"
                : "bg-white border-border hover:border-primary hover:text-primary")}>
            {i + 1}
          </button>
        ))}
      </div>

      {toDelete.size > 0 && (
        <p className="text-sm text-muted-foreground">
          Keeping {pageCount - toDelete.size} page{pageCount - toDelete.size !== 1 ? "s" : ""}.
        </p>
      )}

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={handleDelete} disabled={status === "processing" || toDelete.size === 0}
        className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          toDelete.size === 0 ? "bg-muted text-muted-foreground cursor-not-allowed"
            : status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done" ? "bg-emerald-600 text-white"
            : "bg-destructive text-white hover:bg-destructive/90 shadow-lg")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        {status === "processing" ? "Deleting…" : status === "done" ? "Download again" : `Delete ${toDelete.size} page${toDelete.size !== 1 ? "s" : ""}`}
      </button>
    </div>
  );
}
