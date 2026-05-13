"use client";

import { useState, useCallback, useEffect } from "react";
import { Download, RefreshCw, Plus, Trash2 } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { splitIntoZip, buildPageRanges, type SplitRange } from "@/lib/pdf/split";
import { downloadBlob } from "@/lib/download";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

type Mode = "ranges" | "all-pages";
type Status = "idle" | "processing" | "done" | "error";

interface Props { file?: File; thumbnails?: string[] }

export function SplitTool({ file: fileProp }: Props = {}) {
  const [file, setFile] = useState<File | null>(fileProp ?? null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<Mode>("ranges");
  const [ranges, setRanges] = useState<SplitRange[]>([{ label: "part-1", from: 1, to: 1 }]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const loadPageCount = useCallback(async (f: File) => {
    const bytes = await f.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const count = doc.getPageCount();
    setPageCount(count);
    setRanges([{ label: "part-1", from: 1, to: count }]);
  }, []);

  useEffect(() => {
    if (fileProp) { setFile(fileProp); setStatus("idle"); loadPageCount(fileProp); }
  }, [fileProp, loadPageCount]);

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setStatus("idle");
    loadPageCount(f);
  }, [loadPageCount]);

  const addRange = () =>
    setRanges((r) => [...r, { label: `part-${r.length + 1}`, from: 1, to: pageCount }]);

  const updateRange = (i: number, field: keyof SplitRange, value: string | number) =>
    setRanges((r) => r.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const removeRange = (i: number) => setRanges((r) => r.filter((_, idx) => idx !== i));

  const handleSplit = async () => {
    if (!file) return;
    setStatus("processing");
    setError("");
    try {
      const activeRanges = mode === "all-pages" ? buildPageRanges(pageCount) : ranges;
      const blob = await splitIntoZip(file, activeRanges);
      const ext = activeRanges.length === 1 ? "pdf" : "zip";
      downloadBlob(blob, `split-${file.name.replace(".pdf", "")}.${ext}`);
      setStatus("done");
    } catch {
      setError("Split failed. The file may be corrupted or encrypted.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to split" />;

  return (
    <div className="space-y-6">
      {!fileProp && (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
          <div>
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">{pageCount} pages · {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={() => { setFile(null); setStatus("idle"); }} className="text-xs text-muted-foreground hover:text-foreground">Change file</button>
        </div>
      )}

      {/* Mode */}
      <div className="flex gap-3">
        {([["ranges", "Custom page ranges"], ["all-pages", "Every page separately"]] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className={cn("px-4 py-2 rounded-lg border text-sm font-medium transition-all",
              mode === m ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent")}>
            {label}
          </button>
        ))}
      </div>

      {/* Range builder */}
      {mode === "ranges" && (
        <div className="space-y-3">
          {ranges.map((range, i) => (
            <div key={i} className="flex items-center gap-3 flex-wrap">
              <input value={range.label} onChange={(e) => updateRange(i, "label", e.target.value)}
                className="border border-border rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Name" />
              <span className="text-sm text-muted-foreground">Pages</span>
              <input type="number" min={1} max={pageCount} value={range.from} onChange={(e) => updateRange(i, "from", Number(e.target.value))}
                className="border border-border rounded-lg px-3 py-2 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <span className="text-sm text-muted-foreground">to</span>
              <input type="number" min={1} max={pageCount} value={range.to} onChange={(e) => updateRange(i, "to", Number(e.target.value))}
                className="border border-border rounded-lg px-3 py-2 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {ranges.length > 1 && (
                <button onClick={() => removeRange(i)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button onClick={addRange} className="flex items-center gap-1 text-sm text-primary hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add range
          </button>
        </div>
      )}

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={handleSplit} disabled={status === "processing"}
        className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done" ? "bg-emerald-600 text-white" : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {status === "processing" ? "Splitting…" : status === "done" ? "Download again" : "Split PDF"}
      </button>
    </div>
  );
}
