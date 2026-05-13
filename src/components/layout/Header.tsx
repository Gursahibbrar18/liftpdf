"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  ChevronDown, Menu, X, Zap, Pencil, GitMerge, Scissors, Archive, FileText,
  Lock, Stamp, RotateCw, ClipboardList, Eraser, PenLine, LayoutGrid, Trash2,
  FileOutput, Table, FileSpreadsheet, Image, ImagePlus, ScanText, Unlock,
  Hash, AlignJustify, Crop, Maximize2, Layers, Wrench, Globe, Replace,
  Highlighter, ListOrdered, SlidersHorizontal, Grid2x2, MonitorPlay,
  Presentation, Contrast, FileEdit, FileType, BookOpen, Shuffle, FormInput,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_CATEGORIES, CATEGORY_META, getToolsByCategory, type ToolCategory } from "@/lib/tools";

const ICON_MAP: Record<string, React.ElementType> = {
  Pencil, GitMerge, Scissors, Archive, FileText, Lock, Stamp, RotateCw,
  ClipboardList, Eraser, PenLine, LayoutGrid, Trash2, FileOutput, Table,
  FileSpreadsheet, Image, ImagePlus, ScanText, Unlock, Hash, AlignJustify,
  Crop, Maximize2, Layers, Wrench, Globe, Replace, Highlighter, ListOrdered,
  SlidersHorizontal, Grid2x2, MonitorPlay, Presentation, Contrast, FileEdit,
  FileType, BookOpen, Shuffle, FormInput,
};

function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? FileText;
  return <Icon className={className} />;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openCategory = (cat: ToolCategory) => {
    clearTimeout(closeTimeoutRef.current);
    setActiveCategory(cat);
  };

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveCategory(null), 150);
  };

  const cancelClose = () => {
    clearTimeout(closeTimeoutRef.current);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Lift<span className="text-primary">PDF</span>
            </span>
          </Link>

          {/* Desktop nav — hover group includes the dropdown via scheduleClose/cancelClose */}
          <nav
            className="hidden lg:flex items-center gap-1"
            onMouseLeave={scheduleClose}
          >
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeCategory === cat
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onMouseEnter={() => openCategory(cat)}
                >
                  {meta.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform",
                      activeCategory === cat && "rotate-180"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right — just "All Tools" */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/all-tools"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              All Tools
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega-menu dropdown — cancelClose keeps it open when mouse enters */}
      {activeCategory && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-border shadow-lg z-40"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {getToolsByCategory(activeCategory).map((tool) => {
                const meta = CATEGORY_META[tool.category];
                return (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setActiveCategory(null)}
                  >
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0", meta.bg)}>
                      <ToolIcon name={tool.icon} className={cn("w-4 h-4", meta.color)} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </div>
                      {tool.comingSoon && (
                        <span className="text-xs text-muted-foreground">Soon</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/all-tools"
              className="block text-sm font-semibold text-primary pb-2 border-b border-border"
              onClick={() => setMobileOpen(false)}
            >
              All Tools
            </Link>
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const tools = getToolsByCategory(cat);
              return (
                <div key={cat}>
                  <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", meta.color)}>
                    {meta.label}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-accent text-sm text-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        <ToolIcon name={tool.icon} className={cn("w-4 h-4 flex-shrink-0", meta.color)} />
                        <span className="truncate">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
