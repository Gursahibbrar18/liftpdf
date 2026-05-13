"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  X, ZoomIn, ZoomOut, Eraser, RotateCw, Trash2, Hash, Scissors, FileText, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Stamp } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadZone } from "./UploadZone";

const WhiteoutTool   = dynamic(() => import("./WhiteoutTool").then(m => m.WhiteoutTool), { ssr: false });
const RotateTool     = dynamic(() => import("./RotateTool").then(m => m.RotateTool), { ssr: false });
const DeletePagesTool= dynamic(() => import("./DeletePagesTool").then(m => m.DeletePagesTool), { ssr: false });
const WatermarkTool  = dynamic(() => import("./WatermarkTool").then(m => m.WatermarkTool), { ssr: false });
const PageNumbersTool= dynamic(() => import("./PageNumbersTool").then(m => m.PageNumbersTool), { ssr: false });
const SplitTool      = dynamic(() => import("./SplitTool").then(m => m.SplitTool), { ssr: false });

interface WorkspaceTool {
  slug: string;
  label: string;
  icon: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

const WORKSPACE_TOOLS: WorkspaceTool[] = [
  { slug: "whiteout-pdf",      label: "Whiteout",      icon: Eraser,    component: WhiteoutTool },
  { slug: "rotate-pdf",        label: "Rotate",         icon: RotateCw,  component: RotateTool },
  { slug: "delete-pdf-pages",  label: "Delete Pages",   icon: Trash2,    component: DeletePagesTool },
  { slug: "watermark-pdf",     label: "Watermark",      icon: Stamp,     component: WatermarkTool },
  { slug: "page-numbers-pdf",  label: "Page Numbers",   icon: Hash,      component: PageNumbersTool },
  { slug: "split-pdf",         label: "Split",          icon: Scissors,  component: SplitTool },
];

export function PDFWorkspace({ initialTool }: { initialTool: string }) {
  const [file, setFile]           = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [thumbsLoading, setThumbsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState(
    WORKSPACE_TOOLS.find(t => t.slug === initialTool)?.slug ?? WORKSPACE_TOOLS[0].slug
  );
  const [zoomedPage, setZoomedPage] = useState<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const renderThumbnails = useCallback(async (f: File) => {
    setThumbsLoading(true);
    setThumbnails([]);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const bytes = await f.arrayBuffer();
      const pdf   = await pdfjsLib.getDocument({ data: bytes }).promise;
      const thumbs: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas   = document.createElement("canvas");
        canvas.width   = viewport.width;
        canvas.height  = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas }).promise;
        thumbs.push(canvas.toDataURL("image/jpeg", 0.85));
        setThumbnails(prev => [...prev, thumbs[thumbs.length - 1]]);
      }
    } finally {
      setThumbsLoading(false);
    }
  }, []);

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    setFile(f);
    renderThumbnails(f);
  }, [renderThumbnails]);

  const reset = useCallback(() => {
    setFile(null);
    setThumbnails([]);
    setZoomedPage(null);
  }, []);

  // Keyboard nav for zoom modal
  useEffect(() => {
    if (zoomedPage === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedPage(null);
      if (e.key === "ArrowRight") setZoomedPage(p => p !== null && p < thumbnails.length - 1 ? p + 1 : p);
      if (e.key === "ArrowLeft")  setZoomedPage(p => p !== null && p > 0 ? p - 1 : p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomedPage, thumbnails.length]);

  if (!file) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
        <UploadZone onFiles={onFiles} label="Choose PDF file" />
        <p className="text-center text-xs text-muted-foreground mt-4">
          Upload once — then whiteout, rotate, delete pages, watermark, and more without re-uploading.
        </p>
      </div>
    );
  }

  const activeDef = WORKSPACE_TOOLS.find(t => t.slug === activeTool) ?? WORKSPACE_TOOLS[0];
  const ActiveComponent = activeDef.component;

  return (
    <div className="space-y-3">
      {/* File bar */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-border px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
              {thumbnails.length > 0 && ` · ${thumbnails.length} page${thumbnails.length !== 1 ? "s" : ""}`}
              {thumbsLoading && " · loading pages…"}
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-4"
        >
          <X className="w-3.5 h-3.5" /> Change file
        </button>
      </div>

      <div className="flex gap-3 items-start">
        {/* Left: Page thumbnail strip */}
        <div className="hidden md:flex flex-col w-[140px] flex-shrink-0">
          <div
            ref={thumbStripRef}
            className="bg-white rounded-xl border border-border p-2 max-h-[640px] overflow-y-auto space-y-2 scrollbar-thin"
          >
            <p className="text-xs font-semibold text-muted-foreground px-1 pb-1.5 border-b border-border sticky top-0 bg-white">
              Pages
            </p>

            {thumbsLoading && thumbnails.length === 0 && (
              <div className="space-y-2 pt-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-[100px] bg-muted rounded animate-pulse" />
                ))}
              </div>
            )}

            {thumbnails.map((thumb, i) => (
              <div key={i} className="relative group cursor-pointer" onClick={() => setZoomedPage(i)}>
                <img
                  src={thumb}
                  alt={`Page ${i + 1}`}
                  className="w-full rounded border border-border/50 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded transition-colors pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white/90 rounded-full p-1 shadow">
                    <ZoomIn className="w-3.5 h-3.5 text-foreground" />
                  </div>
                </div>
                <p className="text-center text-[11px] text-muted-foreground mt-1">{i + 1}</p>
              </div>
            ))}

            {thumbsLoading && thumbnails.length > 0 && (
              <div className="w-full h-[100px] bg-muted rounded animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: Tool panel */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Tool tabs */}
          <div className="bg-white rounded-xl border border-border p-1.5 flex flex-wrap gap-1">
            {WORKSPACE_TOOLS.map(tool => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.slug;
              return (
                <button
                  key={tool.slug}
                  onClick={() => setActiveTool(tool.slug)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {/* Active tool controls */}
          <div className="bg-white rounded-xl border border-border p-5">
            <ActiveComponent file={file} thumbnails={thumbnails} />
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoomedPage !== null && thumbnails[zoomedPage] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomedPage(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={() => setZoomedPage(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1 text-sm"
            >
              <X className="w-4 h-4" /> Close
            </button>

            {/* Prev / Next */}
            {zoomedPage > 0 && (
              <button
                onClick={() => setZoomedPage(zoomedPage - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {zoomedPage < thumbnails.length - 1 && (
              <button
                onClick={() => setZoomedPage(zoomedPage + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/70 hover:text-white"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <img
              src={thumbnails[zoomedPage]}
              alt={`Page ${zoomedPage + 1}`}
              className="w-full rounded-xl shadow-2xl"
            />
            <p className="text-center text-white/60 text-sm mt-3">
              Page {zoomedPage + 1} of {thumbnails.length} · Use ← → arrow keys to navigate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
