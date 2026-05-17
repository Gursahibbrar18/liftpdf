"use client";

import { useCallback, useState } from "react";
import { Upload, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  sublabel?: string;
}

export function UploadZone({
  accept = "application/pdf",
  multiple = false,
  onFiles,
  label = "Choose PDF file",
  sublabel = "or drag and drop here",
}: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      onFiles(Array.from(files));
    },
    [onFiles]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all duration-200 p-12 cursor-pointer select-none",
        dragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border bg-white hover:border-primary/50 hover:bg-accent/50"
      )}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.currentTarget.value = "";
        }}
      />

      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
        dragging ? "bg-primary/10" : "bg-primary/5"
      )}>
        {dragging
          ? <FileUp className="w-8 h-8 text-primary" />
          : <Upload className="w-8 h-8 text-primary" />
        }
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-foreground">
          {label}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>Max 100 MB free</span>
        <span>·</span>
        <span>Files never leave your browser</span>
      </div>
    </div>
  );
}
