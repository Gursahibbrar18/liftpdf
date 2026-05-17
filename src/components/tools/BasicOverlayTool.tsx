"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { Download, RefreshCw, Type, PenLine, Highlighter, Shapes } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { cn } from "@/lib/utils";
import { downloadBytes } from "@/lib/download";
import type { WorkspaceProcessedHandler } from "./types";

type OverlayMode = "text" | "sign" | "annotate" | "shape";
type ShapeKind = "rectangle" | "line" | "arrow";
type Status = "idle" | "processing" | "done" | "error";

interface Props {
  file?: File;
  thumbnails?: string[];
  onProcessed?: WorkspaceProcessedHandler;
  mode: OverlayMode;
}

interface PageSize { width: number; height: number }

const MODE_COPY: Record<OverlayMode, { title: string; description: string; icon: React.ElementType; action: string; done: string }> = {
  text: {
    title: "Add text",
    description: "Place a text overlay on any page. Coordinates use PDF points from the bottom-left corner.",
    icon: Type,
    action: "Apply text",
    done: "Text added. Keep editing or download when finished.",
  },
  sign: {
    title: "Type signature",
    description: "Add a simple typed signature. Draw/upload signatures are coming next.",
    icon: PenLine,
    action: "Apply signature",
    done: "Signature added. Keep editing or download when finished.",
  },
  annotate: {
    title: "Highlight rectangle",
    description: "Add a translucent highlight rectangle to mark an area for review.",
    icon: Highlighter,
    action: "Apply annotation",
    done: "Annotation added. Keep editing or download when finished.",
  },
  shape: {
    title: "Draw shape",
    description: "Add a rectangle, line, or arrow-like line using page coordinates.",
    icon: Shapes,
    action: "Apply shape",
    done: "Shape added. Keep editing or download when finished.",
  },
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

function outputName(mode: OverlayMode, name: string) {
  const prefix = mode === "sign" ? "signed" : mode === "annotate" ? "annotated" : mode === "shape" ? "shaped" : "edited";
  return `${prefix}-${name}`;
}

export function BasicOverlayTool({ file, thumbnails = [], onProcessed, mode }: Props) {
  const copy = MODE_COPY[mode];
  const Icon = copy.icon;
  const [pageSizes, setPageSizes] = useState<PageSize[]>([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState(mode === "sign" ? "Your signature" : "New text");
  const [fontSize, setFontSize] = useState(mode === "sign" ? 32 : 16);
  const [x, setX] = useState(72);
  const [y, setY] = useState(120);
  const [width, setWidth] = useState(mode === "shape" ? 160 : 180);
  const [height, setHeight] = useState(mode === "annotate" ? 36 : 70);
  const [x2, setX2] = useState(260);
  const [y2, setY2] = useState(220);
  const [color, setColor] = useState(mode === "annotate" ? "#fff176" : mode === "sign" ? "#111827" : "#2563eb");
  const [shapeKind, setShapeKind] = useState<ShapeKind>("rectangle");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const doc = await PDFDocument.load(await file.arrayBuffer());
        if (cancelled) return;
        const sizes = doc.getPages().map((p) => p.getSize());
        setPageSizes(sizes);
        setPage((p) => Math.min(Math.max(p, 1), sizes.length || 1));
      } catch {
        if (!cancelled) setError("Could not read page sizes. The file may be encrypted or damaged.");
      }
    })();
    return () => { cancelled = true; };
  }, [file]);

  const pageSize = pageSizes[page - 1];
  const preview = thumbnails[page - 1];
  const needsText = mode === "text" || mode === "sign";
  const needsBox = mode === "annotate" || (mode === "shape" && shapeKind === "rectangle");
  const needsLine = mode === "shape" && (shapeKind === "line" || shapeKind === "arrow");

  const canApply = useMemo(() => {
    if (!file || !pageSize || status === "processing") return false;
    if (needsText && text.trim().length === 0) return false;
    return true;
  }, [file, pageSize, status, needsText, text]);

  const apply = async () => {
    if (!file || !pageSize) return;
    setStatus("processing");
    setError("");
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const target = doc.getPage(page - 1);
      const selected = hexToRgb(color);
      if (mode === "text" || mode === "sign") {
        const font = await doc.embedFont(mode === "sign" ? StandardFonts.TimesRomanItalic : StandardFonts.Helvetica);
        target.drawText(text, { x, y, size: fontSize, font, color: selected, maxWidth: width });
      } else if (mode === "annotate") {
        target.drawRectangle({ x, y, width, height, color: selected, opacity: 0.45, borderColor: selected, borderWidth: 1, borderOpacity: 0.8 });
      } else if (shapeKind === "rectangle") {
        target.drawRectangle({ x, y, width, height, borderColor: selected, borderWidth: 2 });
      } else {
        target.drawLine({ start: { x, y }, end: { x: x2, y: y2 }, color: selected, thickness: 2 });
        if (shapeKind === "arrow") {
          const angle = Math.atan2(y2 - y, x2 - x);
          const len = 14;
          const a1 = angle + Math.PI * 0.82;
          const a2 = angle - Math.PI * 0.82;
          target.drawLine({ start: { x: x2, y: y2 }, end: { x: x2 + Math.cos(a1) * len, y: y2 + Math.sin(a1) * len }, color: selected, thickness: 2 });
          target.drawLine({ start: { x: x2, y: y2 }, end: { x: x2 + Math.cos(a2) * len, y: y2 + Math.sin(a2) * len }, color: selected, thickness: 2 });
        }
      }
      const bytes = await doc.save();
      const filename = outputName(mode, file.name);
      if (onProcessed) await onProcessed({ bytes, filename, message: copy.done });
      else downloadBytes(bytes, filename);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Could not apply this overlay. Please check the page number and try again.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{copy.title}</h2>
          <p className="text-sm text-muted-foreground">{copy.description}</p>
        </div>
      </div>

      {preview && pageSize && (
        <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] gap-5 items-start">
          <div className="rounded-xl border border-border bg-slate-50 p-3">
            <img src={preview} alt={`Page ${page} preview`} className="mx-auto rounded border border-border shadow-sm max-h-[360px]" />
            <p className="text-[11px] text-muted-foreground text-center mt-2">
              Page {page}: {Math.round(pageSize.width)} × {Math.round(pageSize.height)} pt
            </p>
          </div>
          <div className="space-y-4">
            <ControlGrid>
              <NumberField label="Page" value={page} setValue={setPage} min={1} max={Math.max(pageSizes.length, 1)} />
              <NumberField label="X" value={x} setValue={setX} min={0} />
              <NumberField label="Y" value={y} setValue={setY} min={0} />
              {needsText && <NumberField label="Font size" value={fontSize} setValue={setFontSize} min={6} />}
              {needsBox && <NumberField label="Width" value={width} setValue={setWidth} min={1} />}
              {needsBox && <NumberField label="Height" value={height} setValue={setHeight} min={1} />}
              {needsLine && <NumberField label="End X" value={x2} setValue={setX2} min={0} />}
              {needsLine && <NumberField label="End Y" value={y2} setValue={setY2} min={0} />}
            </ControlGrid>

            {needsText && (
              <label className="block text-sm font-medium text-foreground">
                Text
                <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
              </label>
            )}

            {mode === "shape" && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Shape</p>
                <div className="flex flex-wrap gap-2">
                  {(["rectangle", "line", "arrow"] as ShapeKind[]).map((kind) => (
                    <button key={kind} onClick={() => setShapeKind(kind)} className={cn("px-3 py-2 rounded-lg border text-sm capitalize", shapeKind === kind ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent")}>{kind}</button>
                  ))}
                </div>
              </div>
            )}

            <label className="block text-sm font-medium text-foreground">
              Color
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mt-1 block h-10 w-20 rounded border border-border bg-white" />
            </label>
          </div>
        </div>
      )}

      {!pageSize && <div className="rounded-xl bg-slate-50 border border-border px-4 py-3 text-sm text-muted-foreground">Reading PDF page sizes…</div>}
      {error && <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button onClick={apply} disabled={!canApply} className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all", !canApply ? "bg-muted text-muted-foreground cursor-not-allowed" : status === "done" ? "bg-emerald-600 text-white" : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20")}>
        {status === "processing" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {status === "processing" ? "Applying…" : status === "done" ? "Applied — keep editing" : copy.action}
      </button>
    </div>
  );
}

function ControlGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{children}</div>;
}

function NumberField({ label, value, setValue, min, max }: { label: string; value: number; setValue: (n: number) => void; min?: number; max?: number }) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
