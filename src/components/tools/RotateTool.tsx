"use client";

import { useState, useCallback } from "react";
import { RotateCw, Download, RefreshCw } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { rotatePDF, type RotationAngle } from "@/lib/pdf/rotate";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";
import type { WorkspaceProcessedHandler } from "./types";

type Status = "idle" | "processing" | "done" | "error";

const ANGLES: { label: string; value: RotationAngle; icon: string }[] = [
  { label: "90° clockwise", value: 90, icon: "↻" },
  { label: "180°", value: 180, icon: "↕" },
  { label: "90° counter-clockwise", value: 270, icon: "↺" },
];

interface Props { file?: File; thumbnails?: string[]; onProcessed?: WorkspaceProcessedHandler }

export function RotateTool({ file: fileProp, onProcessed }: Props = {}) {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const file = fileProp ?? localFile;

  const onFiles = useCallback((files: File[]) => {
    setLocalFile(files[0]);
    setStatus("idle");
  }, []);

  const handleRotate = async () => {
    if (!file) return;
    setStatus("processing");
    setError("");
    try {
      const filename = `rotated-${file.name}`;
      const bytes = await rotatePDF(file, angle);
      if (onProcessed) {
        await onProcessed({ bytes, filename, message: "Rotation applied. Keep editing or download when finished." });
      } else {
        downloadBytes(bytes, filename);
      }
      setStatus("done");
    } catch {
      setError("Rotation failed. The file may be corrupted or encrypted.");
      setStatus("error");
    }
  };

  if (!file) return <UploadZone onFiles={onFiles} label="Choose PDF to rotate" />;

  const isWorkspace = Boolean(onProcessed);

  return (
    <div className="space-y-6">
      {!fileProp && (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
          <div>
            <p className="font-medium text-sm text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={() => { setLocalFile(null); setStatus("idle"); }}
            className="text-xs text-muted-foreground hover:text-foreground">
            Change file
          </button>
        </div>
      )}

      {/* Angle picker */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Rotation angle</p>
        <div className="flex flex-wrap gap-3">
          {ANGLES.map((a) => (
            <button
              key={a.value}
              onClick={() => setAngle(a.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all",
                angle === a.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-white hover:bg-accent text-foreground"
              )}
            >
              <span className="text-lg">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button
        onClick={handleRotate}
        disabled={status === "processing"}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          status === "processing"
            ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done"
            ? "bg-emerald-600 text-white"
            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
        )}
      >
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : status === "done" ? <Download className="w-4 h-4" /> : <RotateCw className="w-4 h-4" />}
        {status === "processing" ? (isWorkspace ? "Applying…" : "Rotating…") : status === "done" ? (isWorkspace ? "Applied — keep editing" : "Download again") : (isWorkspace ? "Apply changes" : "Rotate PDF")}
      </button>
    </div>
  );
}
