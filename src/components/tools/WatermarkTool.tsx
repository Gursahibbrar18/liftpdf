"use client";

import { useState, useCallback } from "react";
import { Download, RefreshCw } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { watermarkPDF } from "@/lib/pdf/watermark";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";

type Status = "idle" | "processing" | "done" | "error";

export function WatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [angle, setAngle] = useState(45);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onFiles = useCallback((files: File[]) => {
    setFile(files[0]);
    setStatus("idle");
  }, []);

  const handleApply = async () => {
    if (!file || !text.trim()) return;
    setStatus("processing");
    setError("");
    try {
      const bytes = await watermarkPDF(file, { text, opacity, angle });
      downloadBytes(bytes, `watermarked-${file.name}`);
      setStatus("done");
    } catch {
      setError("Failed to add watermark. Please try again.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to watermark" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
        <div>
          <p className="font-medium text-sm">{file.name}</p>
          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button onClick={() => { setFile(null); setStatus("idle"); }} className="text-xs text-muted-foreground hover:text-foreground">Change file</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Watermark text</label>
          <input value={text} onChange={(e) => setText(e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="e.g. CONFIDENTIAL" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Opacity — {Math.round(opacity * 100)}%
          </label>
          <input type="range" min={0.05} max={1} step={0.05} value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Angle — {angle}°
          </label>
          <input type="range" min={-90} max={90} step={5} value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-primary" />
        </div>
      </div>

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={handleApply} disabled={status === "processing" || !text.trim()}
        className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done" ? "bg-emerald-600 text-white"
            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {status === "processing" ? "Applying…" : status === "done" ? "Download again" : "Add Watermark"}
      </button>
    </div>
  );
}
