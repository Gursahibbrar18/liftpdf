"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  X, ZoomIn, Eraser, RotateCw, Trash2, Hash, Scissors, FileText, ChevronLeft, ChevronRight,
  Type, FormInput, ImagePlus, PenLine, Highlighter, Shapes, Crop, Stamp, Undo2, Link as LinkIcon,
  Download, Cloud, Share2, Printer, Paperclip, PanelLeft, Plus, MousePointer2, Settings2,
} from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { cn } from "@/lib/utils";
import { UploadZone } from "./UploadZone";
import { downloadBytes } from "@/lib/download";
import type { WorkspaceProcessResult } from "./types";

const RotateTool      = dynamic(() => import("./RotateTool").then(m => m.RotateTool), { ssr: false });
const DeletePagesTool = dynamic(() => import("./DeletePagesTool").then(m => m.DeletePagesTool), { ssr: false });
const WatermarkTool   = dynamic(() => import("./WatermarkTool").then(m => m.WatermarkTool), { ssr: false });
const PageNumbersTool = dynamic(() => import("./PageNumbersTool").then(m => m.PageNumbersTool), { ssr: false });
const SplitTool       = dynamic(() => import("./SplitTool").then(m => m.SplitTool), { ssr: false });

type EditorTool = "text" | "forms" | "image" | "sign" | "whiteout" | "annotate" | "shapes" | "links" | "crop" | "rotate-pdf" | "delete-pdf-pages" | "watermark-pdf" | "page-numbers-pdf" | "split-pdf";
type ObjectKind = "text" | "signature" | "highlight" | "shape" | "whiteout" | "image" | "form" | "link" | "crop";
type ShapeKind = "rectangle" | "ellipse" | "line" | "arrow";

interface EditorObject {
  id: string;
  kind: ObjectKind;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  color?: string;
  fill?: string;
  shape?: ShapeKind;
  imageData?: string;
  imageType?: "png" | "jpg";
  autoFocus?: boolean;
}

interface ToolbarTool {
  slug: EditorTool;
  label: string;
  icon: React.ElementType;
  menu?: string[];
  limited?: boolean;
}

const EDITOR_TOOLS: ToolbarTool[] = [
  { slug: "text", label: "Text", icon: Type, menu: ["Find & Replace", "Font family", "Size", "Bold / Italic", "Color"] },
  { slug: "forms", label: "Forms", icon: FormInput, menu: ["Text", "Text multiline", "Drop-down list", "Radio button", "Checkbox", "Signature box", "Form Edit mode"] },
  { slug: "image", label: "Image", icon: ImagePlus, menu: ["+ New Image", "Delete existing image", "New Stamp"] },
  { slug: "sign", label: "Sign", icon: PenLine, menu: ["Type signature", "Draw signature", "Upload signature"] },
  { slug: "whiteout", label: "Whiteout", icon: Eraser },
  { slug: "annotate", label: "Annotate", icon: Highlighter, menu: ["Show annotations", "Strike out", "Highlight", "Underline", "Draw"] },
  { slug: "shapes", label: "Shapes", icon: Shapes, menu: ["Ellipse", "Rectangle", "Line", "Arrow"] },
  { slug: "links", label: "Links", icon: LinkIcon, limited: true },
  { slug: "crop", label: "Crop", icon: Crop, limited: true },
  { slug: "rotate-pdf", label: "Rotate", icon: RotateCw },
  { slug: "delete-pdf-pages", label: "Delete Pages", icon: Trash2 },
  { slug: "watermark-pdf", label: "Watermark", icon: Stamp },
  { slug: "page-numbers-pdf", label: "Page Numbers", icon: Hash },
  { slug: "split-pdf", label: "Split", icon: Scissors },
];

type PageToolProps = { file?: File; thumbnails?: string[]; onProcessed?: (result: WorkspaceProcessResult) => void | Promise<void> };
type PageToolComponent = React.ComponentType<PageToolProps>;

const PAGE_TOOL_COMPONENTS: Partial<Record<EditorTool, PageToolComponent>> = {
  "rotate-pdf": RotateTool as PageToolComponent,
  "delete-pdf-pages": DeletePagesTool as PageToolComponent,
  "watermark-pdf": WatermarkTool as PageToolComponent,
  "page-numbers-pdf": PageNumbersTool as PageToolComponent,
  "split-pdf": SplitTool as PageToolComponent,
};

const TOOL_FROM_ROUTE: Record<string, EditorTool> = {
  "pdf-editor": "text",
  "fill-sign-pdf": "sign",
  "annotate-pdf": "annotate",
  "crop-pdf": "crop",
  "whiteout-pdf": "whiteout",
  "rotate-pdf": "rotate-pdf",
  "delete-pdf-pages": "delete-pdf-pages",
  "watermark-pdf": "watermark-pdf",
  "page-numbers-pdf": "page-numbers-pdf",
  "split-pdf": "split-pdf",
};

function hexToRgb(hex = "#111827") {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

function dataUrlBytes(dataUrl: string) {
  const [, payload = ""] = dataUrl.split(",");
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function nextId() {
  return `obj-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function pendingText(count: number) {
  if (count === 0) return "No pending edits";
  return `${count} pending edit${count === 1 ? "" : "s"}`;
}

export function PDFWorkspace({ initialTool }: { initialTool: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [thumbsLoading, setThumbsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<EditorTool>(TOOL_FROM_ROUTE[initialTool] ?? (initialTool as EditorTool) ?? "text");
  const [zoomedPage, setZoomedPage] = useState<number | null>(null);
  const [lastAppliedMessage, setLastAppliedMessage] = useState("");
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [readyBytes, setReadyBytes] = useState<Uint8Array | null>(null);
  const [readyName, setReadyName] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [imageDraft, setImageDraft] = useState<{ data: string; type: "png" | "jpg" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; originalX: number; originalY: number } | null>(null);

  const renderThumbnails = useCallback(async (f: File) => {
    setThumbsLoading(true);
    setThumbnails([]);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const bytes = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.85 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
        const thumb = canvas.toDataURL("image/jpeg", 0.9);
        setThumbnails(prev => [...prev, thumb]);
      }
    } finally {
      setThumbsLoading(false);
    }
  }, []);

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setObjects([]);
    setSelectedId(null);
    setReadyBytes(null);
    setReadyName("");
    setLastAppliedMessage("");
    renderThumbnails(f);
  }, [renderThumbnails]);

  const applyProcessedFile = useCallback(async ({ bytes, filename, message }: WorkspaceProcessResult) => {
    const safeBytes = new Uint8Array(bytes.length);
    safeBytes.set(bytes);
    const nextFile = new File([safeBytes], filename, { type: "application/pdf" });
    setFile(nextFile);
    setZoomedPage(null);
    setReadyBytes(safeBytes);
    setReadyName(filename);
    setLastAppliedMessage(message ?? "Changes applied. Keep editing or download when finished.");
    await renderThumbnails(nextFile);
  }, [renderThumbnails]);

  const downloadCurrentPDF = useCallback(async () => {
    if (readyBytes && readyName) {
      downloadBytes(readyBytes, readyName);
      return;
    }
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    downloadBytes(bytes, file.name);
  }, [file, readyBytes, readyName]);

  const reset = useCallback(() => {
    setFile(null);
    setThumbnails([]);
    setObjects([]);
    setSelectedId(null);
    setZoomedPage(null);
    setReadyBytes(null);
    setReadyName("");
    setLastAppliedMessage("");
  }, []);

  useEffect(() => {
    const up = () => { dragRef.current = null; };
    const move = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const pageEl = document.querySelector(`[data-editor-object-id="${drag.id}"]`)?.closest("[data-editor-page]") as HTMLElement | null;
      const box = pageEl?.getBoundingClientRect();
      if (!box) return;
      const dx = (e.clientX - drag.startX) / box.width;
      const dy = (e.clientY - drag.startY) / box.height;
      setObjects(prev => prev.map(obj => obj.id === drag.id ? { ...obj, x: Math.max(0, Math.min(0.95, drag.originalX + dx)), y: Math.max(0, Math.min(0.95, drag.originalY + dy)) } : obj));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useEffect(() => {
    if (zoomedPage === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedPage(null);
      if (e.key === "ArrowRight") setZoomedPage(p => p !== null && p < thumbnails.length - 1 ? p + 1 : p);
      if (e.key === "ArrowLeft") setZoomedPage(p => p !== null && p > 0 ? p - 1 : p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomedPage, thumbnails.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        setObjects(prev => prev.filter(obj => obj.id !== selectedId));
        setSelectedId(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        setObjects(prev => prev.slice(0, -1));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId]);

  const selectedObject = objects.find(obj => obj.id === selectedId) ?? null;
  const activeDef = EDITOR_TOOLS.find(t => t.slug === activeTool) ?? EDITOR_TOOLS[0];
  const PageTool = PAGE_TOOL_COMPONENTS[activeTool];
  const isOverlayTool = ["text", "forms", "image", "sign", "whiteout", "annotate", "shapes", "links", "crop"].includes(activeTool);

  const addObject = useCallback((page: number, x: number, y: number) => {
    if (!isOverlayTool) return;
    if (activeTool === "image" && !imageDraft) {
      fileInputRef.current?.click();
      return;
    }
    const base = { id: nextId(), page, x, y };
    let obj: EditorObject;
    if (activeTool === "text") obj = { ...base, kind: "text", width: 0.28, height: 0.065, text: "", color: "#1d4ed8", autoFocus: true };
    else if (activeTool === "sign") obj = { ...base, kind: "signature", width: 0.32, height: 0.075, text: "", color: "#111827", autoFocus: true };
    else if (activeTool === "whiteout") obj = { ...base, kind: "whiteout", width: 0.22, height: 0.08, fill: "#ffffff" };
    else if (activeTool === "annotate") obj = { ...base, kind: "highlight", width: 0.26, height: 0.055, fill: "#fde047", color: "#facc15" };
    else if (activeTool === "shapes") obj = { ...base, kind: "shape", width: 0.22, height: 0.1, shape: "rectangle", color: "#2563eb" };
    else if (activeTool === "forms") obj = { ...base, kind: "form", width: 0.32, height: 0.065, text: "", color: "#2563eb", autoFocus: true };
    else if (activeTool === "links") obj = { ...base, kind: "link", width: 0.28, height: 0.06, text: "", color: "#0ea5e9", autoFocus: true };
    else if (activeTool === "crop") obj = { ...base, kind: "crop", width: 0.5, height: 0.55, color: "#22c55e" };
    else obj = { ...base, kind: "image", width: 0.28, height: 0.18, imageData: imageDraft!.data, imageType: imageDraft!.type };
    setObjects(prev => [...prev, obj]);
    setSelectedId(obj.id);
    if (activeTool === "image") setImageDraft(null);
  }, [activeTool, imageDraft, isOverlayTool]);

  const onPageClick = useCallback((page: number, e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-editor-object-id]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    addObject(page, Math.max(0, Math.min(0.96, (e.clientX - rect.left) / rect.width)), Math.max(0, Math.min(0.96, (e.clientY - rect.top) / rect.height)));
  }, [addObject]);

  const applyEditorObjects = useCallback(async () => {
    if (!file) return;
    if (objects.length === 0) {
      setReadyBytes(new Uint8Array(await file.arrayBuffer()));
      setReadyName(file.name);
      return;
    }
    setIsApplying(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const helvetica = await doc.embedFont(StandardFonts.Helvetica);
      const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);
      const form = doc.getForm();
      for (const obj of objects) {
        const page = doc.getPage(Math.max(0, Math.min(doc.getPageCount() - 1, obj.page - 1)));
        const { width: pw, height: ph } = page.getSize();
        const x = obj.x * pw;
        const w = obj.width * pw;
        const h = obj.height * ph;
        const y = ph - (obj.y * ph) - h;
        if (obj.kind === "text" || obj.kind === "signature") {
          page.drawText(obj.text || "", { x, y: y + h * 0.18, size: obj.kind === "signature" ? 24 : 16, font: obj.kind === "signature" ? italic : helvetica, color: hexToRgb(obj.color), maxWidth: w });
        } else if (obj.kind === "whiteout") {
          page.drawRectangle({ x, y, width: w, height: h, color: rgb(1, 1, 1), borderColor: rgb(1, 1, 1), borderWidth: 0 });
        } else if (obj.kind === "highlight") {
          page.drawRectangle({ x, y, width: w, height: h, color: hexToRgb(obj.fill || "#fde047"), opacity: 0.45, borderColor: hexToRgb(obj.color), borderWidth: 1, borderOpacity: 0.8 });
        } else if (obj.kind === "shape") {
          if (obj.shape === "line" || obj.shape === "arrow") {
            page.drawLine({ start: { x, y: y + h }, end: { x: x + w, y }, color: hexToRgb(obj.color), thickness: 2 });
            if (obj.shape === "arrow") {
              page.drawLine({ start: { x: x + w, y }, end: { x: x + w - 14, y: y + 4 }, color: hexToRgb(obj.color), thickness: 2 });
              page.drawLine({ start: { x: x + w, y }, end: { x: x + w - 4, y: y + 14 }, color: hexToRgb(obj.color), thickness: 2 });
            }
          } else if (obj.shape === "ellipse") {
            page.drawEllipse({ x: x + w / 2, y: y + h / 2, xScale: w / 2, yScale: h / 2, borderColor: hexToRgb(obj.color), borderWidth: 2 });
          } else {
            page.drawRectangle({ x, y, width: w, height: h, borderColor: hexToRgb(obj.color), borderWidth: 2 });
          }
        } else if (obj.kind === "image" && obj.imageData) {
          const bytes = dataUrlBytes(obj.imageData);
          const image = obj.imageType === "png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
          page.drawImage(image, { x, y, width: w, height: h });
        } else if (obj.kind === "form") {
          const field = form.createTextField(`LiftPDF field ${obj.id}`);
          field.setText(obj.text || "");
          field.addToPage(page, { x, y, width: w, height: h, borderColor: hexToRgb(obj.color), borderWidth: 1 });
        } else if (obj.kind === "link") {
          page.drawRectangle({ x, y, width: w, height: h, borderColor: hexToRgb(obj.color), borderWidth: 1, borderOpacity: 0.8 });
          page.drawText("Link area", { x: x + 4, y: y + 6, size: 9, font: helvetica, color: hexToRgb(obj.color) });
        } else if (obj.kind === "crop") {
          page.drawRectangle({ x, y, width: w, height: h, borderColor: hexToRgb(obj.color), borderWidth: 2, borderDashArray: [6, 4] });
        }
      }
      const bytes = await doc.save();
      const safeBytes = new Uint8Array(bytes.length);
      safeBytes.set(bytes);
      const filename = `edited-${file.name}`;
      setReadyBytes(safeBytes);
      setReadyName(filename);
      setObjects([]);
      setSelectedId(null);
      await applyProcessedFile({ bytes: safeBytes, filename, message: "Changes applied. Your document is ready — download it or go back to editing." });
    } finally {
      setIsApplying(false);
    }
  }, [file, objects, applyProcessedFile]);

  const handleImageUpload = useCallback((files: FileList | null) => {
    const picked = files?.[0];
    if (!picked) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result);
      setImageDraft({ data, type: picked.type.includes("png") ? "png" : "jpg" });
    };
    reader.readAsDataURL(picked);
  }, []);

  const updateSelected = useCallback((patch: Partial<EditorObject>) => {
    if (!selectedId) return;
    setObjects(prev => prev.map(obj => obj.id === selectedId ? { ...obj, ...patch } : obj));
  }, [selectedId]);

  if (!file) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8 md:py-14">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">PDF Editor</p>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">BETA</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Online PDF editor</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Edit PDF files for free. Fill & sign PDF, add text, images, shapes, whiteout, page numbers, watermarks, and more.</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-4 md:p-8">
          <UploadZone onFiles={onFiles} label="Upload PDF file" sublabel="or drag and drop your PDF here" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 text-xs">
            {[
              ["Dropbox", "cloud import coming soon"],
              ["Google Drive", "cloud import coming soon"],
              ["OneDrive", "cloud import coming soon"],
              ["Web Address", "URL import coming soon"],
            ].map(([source, hint]) => (
              <button key={source} disabled className="rounded-xl border border-border bg-slate-50 px-3 py-2 text-muted-foreground cursor-not-allowed text-left">
                <span className="block font-semibold text-foreground/70">{source}</span>
                <span>{hint}</span>
              </button>
            ))}
          </div>
          <button disabled className="mt-5 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm text-muted-foreground cursor-not-allowed hover:bg-slate-50">or start with a blank document — coming next</button>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left text-sm text-muted-foreground">
          <div className="rounded-xl bg-white border border-border px-4 py-3"><strong className="text-foreground">Files stay private.</strong> Processed in your browser.</div>
          <div className="rounded-xl bg-white border border-border px-4 py-3"><strong className="text-foreground">Free limits.</strong> Best for PDFs up to 200 pages or 50 MB.</div>
          <div className="rounded-xl bg-white border border-border px-4 py-3"><strong className="text-foreground">Recent files.</strong> Local-only recent file history is coming soon.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={(e) => handleImageUpload(e.target.files)} />

      <div className="flex flex-col gap-3 bg-white rounded-xl border border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sticky top-2 z-30 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-primary" /></div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB{thumbnails.length > 0 && ` · ${thumbnails.length} page${thumbnails.length !== 1 ? "s" : ""}`}{thumbsLoading && " · loading pages…"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 sm:ml-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-muted-foreground">{pendingText(objects.length)}</span>
          <button onClick={applyEditorObjects} disabled={isApplying} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-60">{isApplying ? "Applying…" : "Apply changes"}</button>
          <button onClick={downloadCurrentPDF} className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">Download</button>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><X className="w-3.5 h-3.5" /> Change file</button>
        </div>
      </div>

      {lastAppliedMessage && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-2 text-sm">{lastAppliedMessage}</div>}

      <div className="bg-white rounded-xl border border-border p-1.5 flex gap-1 overflow-x-auto shadow-sm">
        {EDITOR_TOOLS.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.slug;
          return (
            <button key={tool.slug} onClick={() => setActiveTool(tool.slug)} className={cn("group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap", isActive ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-accent")}>
              <Icon className="w-3.5 h-3.5" />{tool.label}{tool.limited && <span className={cn("text-[10px]", isActive ? "text-white/75" : "text-amber-600")}>beta</span>}
            </button>
          );
        })}
        <button onClick={() => { setObjects(prev => prev.slice(0, -1)); setSelectedId(null); }} className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"><Undo2 className="w-3.5 h-3.5" />Undo</button>
      </div>

      <div className="grid xl:grid-cols-[140px_minmax(0,1fr)_320px] gap-3 items-start">
        <aside className="hidden xl:block bg-white rounded-xl border border-border p-2 max-h-[720px] overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground px-1 pb-1.5 border-b border-border sticky top-0 bg-white flex items-center gap-1"><PanelLeft className="w-3.5 h-3.5" />Pages</p>
          {thumbsLoading && thumbnails.length === 0 && [1, 2, 3].map(i => <div key={i} className="mt-2 w-full h-[120px] bg-muted rounded animate-pulse" />)}
          {thumbnails.map((thumb, i) => <button key={i} onClick={() => setZoomedPage(i)} className="mt-2 w-full text-left group"><img src={thumb} alt={`Page ${i + 1}`} className="w-full rounded border border-border/50 shadow-sm" /><span className="block text-center text-[11px] text-muted-foreground mt-1">{i + 1}</span></button>)}
        </aside>

        <main className="min-w-0 rounded-xl border border-border bg-[#e9edf2] p-4 md:p-8 max-h-[760px] overflow-auto">
          <div className="mx-auto w-full max-w-3xl space-y-6">
            {thumbnails.map((thumb, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><span className="rounded bg-white px-2 py-1 font-semibold text-foreground shadow-sm">{index + 1}</span><button onClick={() => setActiveTool("delete-pdf-pages")} className="hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button><button onClick={() => setZoomedPage(index)} className="hover:text-primary"><ZoomIn className="w-3.5 h-3.5" /></button><button onClick={() => setActiveTool("rotate-pdf")} className="hover:text-primary"><RotateCw className="w-3.5 h-3.5" /></button></div>
                  <button disabled className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-muted-foreground shadow-sm cursor-not-allowed"><Plus className="w-3 h-3" />Insert page here</button>
                </div>
                <div data-testid={`editor-page-${index + 1}`} data-editor-page className="relative mx-auto bg-white shadow-2xl ring-1 ring-black/10 cursor-crosshair" onClick={(e) => onPageClick(index + 1, e)}>
                  <img src={thumb} alt={`Page ${index + 1}`} className="block w-full select-none pointer-events-none" />
                  {objects.filter(obj => obj.page === index + 1).map(obj => (
                    <EditableObject
                      key={obj.id}
                      obj={obj}
                      selected={obj.id === selectedId}
                      onSelect={(e) => { e.stopPropagation(); setSelectedId(obj.id); }}
                      onPointerDown={(e) => {
                        if ((e.target as HTMLElement).closest("input, textarea, button, [data-resize-handle]")) return;
                        e.stopPropagation();
                        setSelectedId(obj.id);
                        dragRef.current = { id: obj.id, startX: e.clientX, startY: e.clientY, originalX: obj.x, originalY: obj.y };
                      }}
                      onChange={(patch) => setObjects(prev => prev.map(item => item.id === obj.id ? { ...item, ...patch, autoFocus: false } : item))}
                      onResize={(corner, e) => {
                        e.stopPropagation();
                        setSelectedId(obj.id);
                        const pageEl = (e.currentTarget as HTMLElement).closest("[data-editor-page]") as HTMLElement | null;
                        const rect = pageEl?.getBoundingClientRect();
                        if (!rect) return;
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const start = { ...obj };
                        const move = (ev: PointerEvent) => {
                          const dx = (ev.clientX - startX) / rect.width;
                          const dy = (ev.clientY - startY) / rect.height;
                          setObjects(prev => prev.map(item => item.id === obj.id ? resizeObject(start, corner, dx, dy) : item));
                        };
                        const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
                        window.addEventListener("pointermove", move);
                        window.addEventListener("pointerup", up);
                      }}
                    />
                  ))}
                </div>
                <button disabled className="mx-auto flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-muted-foreground shadow-sm cursor-not-allowed"><Plus className="w-3 h-3" />Insert page here</button>
              </div>
            ))}
          </div>
        </main>

        <aside className="space-y-3">
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="flex items-start gap-2 mb-3"><Settings2 className="w-4 h-4 text-primary mt-0.5" /><div><h2 className="font-semibold text-foreground">{activeDef.label}</h2><p className="text-xs text-muted-foreground">{toolInstruction(activeTool, Boolean(imageDraft))}</p></div></div>
            {activeDef.menu && <div className="mb-3 flex flex-wrap gap-1.5">{activeDef.menu.map(item => <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-muted-foreground">{item}</span>)}</div>}
            {activeTool === "image" && <button onClick={() => fileInputRef.current?.click()} className="mb-3 w-full rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary">{imageDraft ? "Image ready — click a page to place" : "+ New Image"}</button>}
            {activeTool === "links" && <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">Link annotations are visually marked in this beta. Full clickable PDF link export is clearly marked as limited.</div>}
            {activeTool === "crop" && <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">Crop selection can be marked on the page; true page-box cropping is limited in this browser beta.</div>}
            {selectedObject ? <PropertiesPanel obj={selectedObject} onChange={updateSelected} onDelete={() => { setObjects(prev => prev.filter(o => o.id !== selectedObject.id)); setSelectedId(null); }} /> : <div className="rounded-lg bg-slate-50 border border-border p-3 text-sm text-muted-foreground"><MousePointer2 className="w-4 h-4 mb-2" />Select a toolbar item, then click the PDF page to place it. Click an object to edit, drag to move, or press Delete.</div>}
          </div>

          {PageTool && <div className="rounded-xl border border-border bg-white p-4"><PageTool file={file} thumbnails={thumbnails} onProcessed={applyProcessedFile} /></div>}

          <div className="rounded-xl border border-border bg-white p-3 flex justify-around text-muted-foreground"><button title="Attachments" className="p-2 hover:text-primary"><Paperclip className="w-4 h-4" /></button><button title="Save to cloud" className="p-2 hover:text-primary"><Cloud className="w-4 h-4" /></button><button title="Share" className="p-2 hover:text-primary"><Share2 className="w-4 h-4" /></button><button title="Print" className="p-2 hover:text-primary"><Printer className="w-4 h-4" /></button></div>
        </aside>
      </div>

      {readyBytes && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl grid md:grid-cols-[1fr_260px] gap-6">
            <div><h2 className="text-2xl font-bold text-foreground">Your document is ready</h2><p className="mt-2 text-sm text-muted-foreground">{readyName}</p><button onClick={downloadCurrentPDF} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"><Download className="w-4 h-4" />Download</button><div className="mt-4 flex gap-2 text-muted-foreground"><button className="rounded-lg border border-border p-2"><Cloud className="w-4 h-4" /></button><button className="rounded-lg border border-border p-2"><Share2 className="w-4 h-4" /></button><button className="rounded-lg border border-border p-2"><Printer className="w-4 h-4" /></button></div></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Continue editing this document</p><div className="mt-3 grid grid-cols-2 gap-2 text-sm">{["Edit", "Compress", "Extract Pages", "Merge", "Crop", "Show more"].map(item => <button key={item} onClick={() => item === "Edit" || item === "Crop" ? setReadyBytes(null) : undefined} className="rounded-lg bg-white border border-border px-3 py-2 text-left hover:border-primary/40">{item}</button>)}</div><button onClick={() => setReadyBytes(null)} className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-semibold">Back to editing</button><button onClick={reset} className="mt-2 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-destructive">Start over / Delete files</button></div>
          </div>
        </div>
      )}

      {zoomedPage !== null && thumbnails[zoomedPage] && <ZoomModal thumb={thumbnails[zoomedPage]} page={zoomedPage + 1} total={thumbnails.length} onClose={() => setZoomedPage(null)} onPrev={() => setZoomedPage(p => p !== null ? Math.max(0, p - 1) : p)} onNext={() => setZoomedPage(p => p !== null ? Math.min(thumbnails.length - 1, p + 1) : p)} />}
    </div>
  );
}

function toolInstruction(tool: EditorTool, imageReady: boolean) {
  if (tool === "text") return "Click anywhere on a page to add text. Select it to edit style and text.";
  if (tool === "forms") return "Click a page to add a visible fillable text field.";
  if (tool === "image") return imageReady ? "Now click the page to place the uploaded image." : "Upload an image, then click the PDF to place and resize it.";
  if (tool === "sign") return "Click a page to place a typed signature. Draw/upload signature modes are available from the menu soon.";
  if (tool === "whiteout") return "Click a page to place a whiteout box, then drag and resize it.";
  if (tool === "annotate") return "Click a page to add a highlight annotation.";
  if (tool === "shapes") return "Click a page to add a shape, then choose rectangle, ellipse, line, or arrow.";
  if (tool === "links") return "Add links by making an area selection on the page. Export is beta-limited.";
  if (tool === "crop") return "Mark the crop area. Full crop-box export is limited.";
  return "Use this page operation, then continue editing or download once.";
}

function resizeObject(obj: EditorObject, corner: "se" | "sw" | "ne" | "nw", dx: number, dy: number): EditorObject {
  const minW = 0.04;
  const minH = 0.025;
  let { x, y, width, height } = obj;
  if (corner.includes("e")) width = Math.max(minW, obj.width + dx);
  if (corner.includes("s")) height = Math.max(minH, obj.height + dy);
  if (corner.includes("w")) {
    width = Math.max(minW, obj.width - dx);
    x = Math.max(0, obj.x + dx);
  }
  if (corner.includes("n")) {
    height = Math.max(minH, obj.height - dy);
    y = Math.max(0, obj.y + dy);
  }
  return { ...obj, x: Math.max(0, Math.min(0.98, x)), y: Math.max(0, Math.min(0.98, y)), width: Math.min(1 - x, width), height: Math.min(1 - y, height), autoFocus: false };
}

function EditableObject({
  obj,
  selected,
  onSelect,
  onPointerDown,
  onChange,
  onResize,
}: {
  obj: EditorObject;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onChange: (patch: Partial<EditorObject>) => void;
  onResize: (corner: "se" | "sw" | "ne" | "nw", e: React.PointerEvent) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  useEffect(() => {
    if (selected && obj.autoFocus) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [selected, obj.autoFocus]);

  const style = { left: `${obj.x * 100}%`, top: `${obj.y * 100}%`, width: `${obj.width * 100}%`, height: `${obj.height * 100}%` };
  const classes = cn("absolute z-10 select-none cursor-move border-2", selected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50");
  const handles = selected && (
    <>
      {(["nw", "ne", "sw", "se"] as const).map(corner => (
        <button
          key={corner}
          type="button"
          data-resize-handle
          aria-label={`Resize ${corner}`}
          onPointerDown={(e) => onResize(corner, e)}
          className={cn(
            "absolute z-20 h-3 w-3 rounded-full border border-primary bg-white shadow",
            corner === "nw" && "-left-1.5 -top-1.5 cursor-nwse-resize",
            corner === "ne" && "-right-1.5 -top-1.5 cursor-nesw-resize",
            corner === "sw" && "-left-1.5 -bottom-1.5 cursor-nesw-resize",
            corner === "se" && "-right-1.5 -bottom-1.5 cursor-nwse-resize",
          )}
        />
      ))}
    </>
  );

  if (obj.kind === "text" || obj.kind === "signature" || obj.kind === "form" || obj.kind === "link") {
    const label = obj.kind === "signature" ? "Edit signature on page" : obj.kind === "form" ? "Edit form field on page" : obj.kind === "link" ? "Edit link on page" : "Edit text on page";
    const placeholder = obj.kind === "signature" ? "Type signature" : obj.kind === "form" ? "Type field value" : obj.kind === "link" ? "Paste link" : "Type text";
    const isSignature = obj.kind === "signature";
    const isForm = obj.kind === "form";
    const isLink = obj.kind === "link";
    return (
      <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={cn(classes, "bg-white/25")} style={style}>
        {isForm || isLink ? (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            aria-label={label}
            value={obj.text ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange({ text: e.target.value })}
            onClick={(e) => { e.stopPropagation(); onSelect(e); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn("h-full w-full bg-transparent px-2 text-xs outline-none", isForm ? "border border-sky-400 bg-sky-50/80 text-sky-800" : "text-sky-700 underline")}
          />
        ) : (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            aria-label={label}
            value={obj.text ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange({ text: e.target.value })}
            onClick={(e) => { e.stopPropagation(); onSelect(e); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn("h-full w-full resize-none overflow-hidden bg-transparent px-1 leading-tight outline-none", isSignature ? "font-serif text-xl italic" : "text-sm md:text-base font-medium")}
            style={{ color: obj.color }}
          />
        )}
        {handles}
      </div>
    );
  }
  if (obj.kind === "whiteout") return <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={classes} style={{ ...style, background: "white" }}>{handles}</div>;
  if (obj.kind === "highlight") return <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={classes} style={{ ...style, background: obj.fill, opacity: 0.6 }}>{handles}</div>;
  if (obj.kind === "image") return <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={classes} style={style}><img src={obj.imageData} alt="Inserted image" className="h-full w-full object-contain pointer-events-none" />{handles}</div>;
  if (obj.kind === "crop") return <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={cn(classes, "bg-emerald-300/10 border-dashed")} style={style}>Crop area{handles}</div>;
  return <div data-editor-object-id={obj.id} onClick={onSelect} onPointerDown={onPointerDown} className={classes} style={{ ...style, borderColor: obj.color }}>{handles}</div>;
}

function PropertiesPanel({ obj, onChange, onDelete }: { obj: EditorObject; onChange: (patch: Partial<EditorObject>) => void; onDelete: () => void }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Selected {obj.kind}</p>
      {(obj.kind === "text" || obj.kind === "signature" || obj.kind === "form" || obj.kind === "link") && <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">Type directly in the selected box on the PDF page, Sejda-style. This side panel only controls style and size.</div>}
      {obj.kind === "shape" && <div><p className="text-sm font-medium text-foreground mb-2">Shape</p><div className="flex flex-wrap gap-2">{(["rectangle", "ellipse", "line", "arrow"] as ShapeKind[]).map(shape => <button key={shape} onClick={() => onChange({ shape })} className={cn("rounded-lg border px-2 py-1 text-xs capitalize", obj.shape === shape ? "border-primary bg-primary/10 text-primary" : "border-border")}>{shape}</button>)}</div></div>}
      {obj.kind !== "image" && obj.kind !== "whiteout" && <label className="block text-sm font-medium text-foreground">Color<input type="color" value={obj.color ?? obj.fill ?? "#2563eb"} onChange={(e) => onChange(obj.kind === "highlight" ? { fill: e.target.value, color: e.target.value } : { color: e.target.value })} className="mt-1 block h-10 w-20 rounded border border-border bg-white" /></label>}
      <div className="grid grid-cols-2 gap-2"><NumberInput label="Width %" value={Math.round(obj.width * 100)} onChange={(n) => onChange({ width: Math.max(0.02, n / 100) })} /><NumberInput label="Height %" value={Math.round(obj.height * 100)} onChange={(n) => onChange({ height: Math.max(0.02, n / 100) })} /></div>
      <button onClick={onDelete} className="w-full rounded-lg border border-destructive/30 px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/5">Delete selected object</button>
    </div>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return <label className="block text-xs font-medium text-foreground">{label}<input type="number" value={value} min={1} max={100} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-border px-2 py-1.5 text-sm" /></label>;
}

function ZoomModal({ thumb, page, total, onClose, onPrev, onNext }: { thumb: string; page: number; total: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}><button onClick={onClose} className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Close</button>{page > 1 && <button onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white"><ChevronLeft className="w-8 h-8" /></button>}{page < total && <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white"><ChevronRight className="w-8 h-8" /></button>}<img src={thumb} alt={`Page ${page}`} className="w-full rounded-xl shadow-2xl" /><p className="text-center text-white/60 text-sm mt-3">Page {page} of {total} · Use ← → arrow keys to navigate</p></div>
    </div>
  );
}
