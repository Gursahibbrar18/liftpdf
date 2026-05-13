"use client";

import { useState, useCallback, useEffect } from "react";
import { Download, RefreshCw } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { addPageNumbers } from "@/lib/pdf/page-numbers";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";

type Status = "idle" | "processing" | "done" | "error";
type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center";

const POSITIONS: { value: Position; label: string }[] = [
  { value: "bottom-center", label: "Bottom centre" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "top-center", label: "Top centre" },
];

interface Props { file?: File; thumbnails?: string[] }

export function PageNumbersTool({ file: fileProp }: Props = {}) {
  const [file, setFile] = useState<File | null>(fileProp ?? null);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => { if (fileProp) { setFile(fileProp); setStatus("idle"); } }, [fileProp]);

  const onFiles = useCallback((files: File[]) => { setFile(files[0]); setStatus("idle"); }, []);

  const handleApply = async () => {
    if (!file) return;
    setStatus("processing");
    setError("");
    try {
      const bytes = await addPageNumbers(file, { position, startNumber });
      downloadBytes(bytes, `numbered-${file.name}`);
      setStatus("done");
    } catch {
      setError("Failed to add page numbers. Please try again.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to number" />;

  return (
    <div className="space-y-6">
      {!fileProp && (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
          <div>
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={() => { setFile(null); setStatus("idle"); }} className="text-xs text-muted-foreground hover:text-foreground">Change file</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Position</p>
          <div className="grid grid-cols-2 gap-2">
            {POSITIONS.map((p) => (
              <button key={p.value} onClick={() => setPosition(p.value)}
                className={cn("px-3 py-2 rounded-lg border text-sm transition-all",
                  position === p.value ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-accent")}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="start-number" className="block text-sm font-medium text-foreground mb-1.5">Start number</label>
          <input id="start-number" type="number" min={0} value={startNumber} onChange={(e) => setStartNumber(Number(e.target.value))}
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={handleApply} disabled={status === "processing"}
        className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done" ? "bg-emerald-600 text-white"
            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {status === "processing" ? "Adding numbers…" : status === "done" ? "Download again" : "Add Page Numbers"}
      </button>
    </div>
  );
}
