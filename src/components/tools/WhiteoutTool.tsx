"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download, RefreshCw, Eraser, Trash2 } from "lucide-react";
import { UploadZone } from "./UploadZone";
import { whiteoutPDF } from "@/lib/pdf/whiteout";
import { downloadBytes } from "@/lib/download";
import { cn } from "@/lib/utils";
import type { WorkspaceProcessedHandler } from "./types";

type Status = "idle" | "processing" | "done" | "error";

interface DrawRect {
  page: number;
  x: number; y: number;
  width: number; height: number;
  canvasX: number; canvasY: number;
  canvasW: number; canvasH: number;
}

interface Props { file?: File; thumbnails?: string[]; onProcessed?: WorkspaceProcessedHandler }

export function WhiteoutTool({ file: fileProp, onProcessed }: Props = {}) {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [pageUrl, setPageUrl] = useState<string>("");
  const [pdfDims, setPdfDims] = useState({ width: 0, height: 0 });
  const [rects, setRects] = useState<DrawRect[]>([]);
  const [drawing, setDrawing] = useState<{ x: number; y: number } | null>(null);
  const [current, setCurrent] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const file = fileProp ?? localFile;
  const canvasWidth = Math.max(1, Math.round(pdfDims.width * 1.5));
  const canvasHeight = Math.max(1, Math.round(pdfDims.height * 1.5));

  // Extracted so we can call it both from onFiles and useEffect
  const renderPreview = useCallback(async (f: File) => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    const bytes = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    setPdfDims({ width: viewport.width / 1.5, height: viewport.height / 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
    setPageUrl(canvas.toDataURL("image/png"));
  }, []);

  // Auto-render when file prop is provided (workspace mode)
  useEffect(() => {
    if (!fileProp) return;
    let cancelled = false;
    (async () => {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const bytes = await fileProp.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
      if (cancelled) return;
      setPdfDims({ width: viewport.width / 1.5, height: viewport.height / 1.5 });
      setPageUrl(canvas.toDataURL("image/png"));
    })();
    return () => { cancelled = true; };
  }, [fileProp]);

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setLocalFile(f);
    setRects([]);
    setStatus("idle");
    renderPreview(f);
  }, [renderPreview]);


  /* Redraw overlays on the display canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !pageUrl) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rects.forEach((r) => {
      ctx.fillStyle = "white";
      ctx.fillRect(r.canvasX, r.canvasY, r.canvasW, r.canvasH);
      ctx.strokeStyle = "#e5e7eb";
      ctx.strokeRect(r.canvasX, r.canvasY, r.canvasW, r.canvasH);
    });
    if (current) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillRect(current.x, current.y, current.w, current.h);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#3b82f6";
      ctx.strokeRect(current.x, current.y, current.w, current.h);
      ctx.setLineDash([]);
    }
  }, [rects, current, pageUrl]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e);
    setDrawing(pos);
    setCurrent({ x: pos.x, y: pos.y, w: 0, h: 0 });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const pos = getPos(e);
    setCurrent({ x: drawing.x, y: drawing.y, w: pos.x - drawing.x, h: pos.y - drawing.y });
  };

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current) return;
    const pos = getPos(e);
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;
    const scaleX = pdfDims.width / cw;
    const scaleY = pdfDims.height / ch;
    const canvasX = Math.min(drawing.x, pos.x);
    const canvasY = Math.min(drawing.y, pos.y);
    const canvasW = Math.abs(pos.x - drawing.x);
    const canvasH = Math.abs(pos.y - drawing.y);
    if (canvasW > 4 && canvasH > 4) {
      setRects((r) => [...r, {
        page: 0,
        x: canvasX * scaleX,
        y: pdfDims.height - (canvasY + canvasH) * scaleY,
        width: canvasW * scaleX,
        height: canvasH * scaleY,
        canvasX, canvasY, canvasW, canvasH,
      }]);
    }
    setDrawing(null);
    setCurrent(null);
  };

  const handleApply = async () => {
    if (!file || rects.length === 0) return;
    setStatus("processing");
    setError("");
    try {
      const pdfRects = rects.map(({ page, x, y, width, height }) => ({ page, x, y, width, height }));
      const bytes = await whiteoutPDF(file, pdfRects);
      const filename = `whiteout-${file.name}`;
      if (onProcessed) {
        await onProcessed({ bytes, filename, message: "Whiteout applied. Keep editing or download when finished." });
        setRects([]);
      } else {
        downloadBytes(bytes, filename);
      }
      setStatus("done");
    } catch {
      setError("Whiteout failed. Please try again.");
      setStatus("error");
    }
  };

  if (!file) {
    return (
      <div className="space-y-4">
        <UploadZone onFiles={onFiles} label="Choose PDF to white out" />
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          <strong>How it works:</strong> Draw rectangles over content to cover it with white.
        </div>
      </div>
    );
  }

  const isWorkspace = Boolean(onProcessed);

  return (
    <div className="space-y-6">
      {!fileProp && (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{rects.length} whiteout area{rects.length !== 1 ? "s" : ""} drawn · Page 1 preview</p>
          </div>
          <button onClick={() => { setLocalFile(null); setRects([]); setStatus("idle"); }}
            className="text-xs text-muted-foreground hover:text-foreground">Change file</button>
        </div>
      )}
      {fileProp && (
        <p className="text-xs text-muted-foreground">
          {rects.length} whiteout area{rects.length !== 1 ? "s" : ""} drawn · Page 1 preview
        </p>
      )}

      {/* Canvas preview */}
      {pageUrl && (
        <div className="relative rounded-xl overflow-hidden border border-border shadow-sm" style={{ cursor: "crosshair" }}>
          <img ref={imgRef} src={pageUrl} alt="PDF preview" className="w-full block" />
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="absolute inset-0 w-full h-full"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Eraser className="w-3.5 h-3.5" />
        Click and drag on the page to draw a white rectangle over content you want to hide.
      </p>

      {rects.length > 0 && (
        <button onClick={() => setRects([])}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
          <Trash2 className="w-3.5 h-3.5" /> Clear all areas
        </button>
      )}

      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={handleApply} disabled={status === "processing" || rects.length === 0}
        className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
          rects.length === 0 ? "bg-muted text-muted-foreground cursor-not-allowed"
            : status === "processing" ? "bg-primary/60 text-white cursor-not-allowed"
            : status === "done" ? "bg-emerald-600 text-white"
            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {status === "processing" ? "Applying…" : status === "done" ? (isWorkspace ? "Applied — keep editing" : "Download again") : (isWorkspace ? "Apply changes" : "Apply & Download")}
      </button>
    </div>
  );
}
