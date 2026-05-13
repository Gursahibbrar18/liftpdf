"use client";

import { useState, useCallback } from "react";
import { X, GripVertical, Download, RefreshCw, FileText } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { mergePDFs } from "@/lib/pdf/merge";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";

type Status = "idle" | "processing" | "done" | "error";

export function MergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const addFiles = useCallback((incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming]);
    setStatus("idle");
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (from: number, to: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setStatus("processing");
    setError("");
    try {
      const bytes = await mergePDFs(files);
      downloadBytes(bytes, "merged.pdf");
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed. Please try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setStatus("idle");
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Upload zone — always visible so user can add more files */}
      <UploadZone
        multiple
        onFiles={addFiles}
        label="Choose PDF files to merge"
        sublabel="or drag and drop — add as many as you need"
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {files.length} file{files.length !== 1 ? "s" : ""} — drag to reorder
            </span>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Clear all
            </button>
          </div>

          <ul className="divide-y divide-border">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => { e.preventDefault(); setDragOverIdx(i); }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIdx !== null && dragIdx !== i) moveFile(dragIdx, i);
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-slate-50 group transition-colors",
                  dragOverIdx === i && dragIdx !== i && "bg-primary/5 border-l-4 border-primary"
                )}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab flex-shrink-0" />
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {i > 0 && (
                    <button
                      onClick={() => moveFile(i, i - 1)}
                      className="text-xs px-2 py-1 rounded hover:bg-accent text-muted-foreground"
                    >
                      ↑
                    </button>
                  )}
                  {i < files.length - 1 && (
                    <button
                      onClick={() => moveFile(i, i + 1)}
                      className="text-xs px-2 py-1 rounded hover:bg-accent text-muted-foreground"
                    >
                      ↓
                    </button>
                  )}
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Action */}
      {files.length >= 2 && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleMerge}
            disabled={status === "processing"}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
              status === "processing"
                ? "bg-primary/60 text-white cursor-not-allowed"
                : status === "done"
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
            )}
          >
            {status === "processing" && (
              <RefreshCw className="w-4 h-4 animate-spin" />
            )}
            {status === "done" && <Download className="w-4 h-4" />}
            {status === "processing"
              ? "Merging…"
              : status === "done"
              ? "Download again"
              : `Merge ${files.length} PDFs`}
          </button>

          {status === "done" && (
            <button
              onClick={reset}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Start over
            </button>
          )}
        </div>
      )}

      {files.length === 1 && (
        <p className="text-sm text-muted-foreground">
          Add at least one more PDF to merge.
        </p>
      )}
    </div>
  );
}
