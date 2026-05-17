"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type React from "react";
import {
  Archive, ChevronDown, Crop, Eraser, FileOutput, FileText, FormInput, GitMerge,
  Hash, Image, LayoutGrid, Lock, Menu, PenLine, Pencil, RotateCw, Scissors,
  ShieldCheck, Stamp, Table, Trash2, Type, Unlock, Wrench, X, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TOOLS, type Tool } from "@/lib/tools";

const ICON_MAP: Record<string, React.ElementType> = {
  Archive, Crop, Eraser, FileOutput, FileText, FormInput, GitMerge, Hash, Image,
  LayoutGrid, Lock, PenLine, Pencil, RotateCw, Scissors, Stamp, Table, Trash2,
  Type, Unlock, Wrench,
};

const TASK_LINKS = [
  { label: "All Tools", href: "/all-tools", menu: true },
  { label: "Compress", href: "/compress-pdf" },
  { label: "Edit", href: "/pdf-editor" },
  { label: "Fill & Sign", href: "/fill-sign-pdf" },
  { label: "Merge", href: "/merge-pdf" },
  { label: "Delete Pages", href: "/delete-pdf-pages" },
  { label: "Crop", href: "/crop-pdf" },
];

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Most Popular", slugs: ["pdf-editor", "compress-pdf", "merge-pdf", "split-pdf", "delete-pdf-pages", "fill-sign-pdf"] },
  { title: "Merge", slugs: ["merge-pdf", "alternate-mix-pdf"] },
  { title: "Split", slugs: ["split-pdf", "extract-pdf-pages", "split-pdf-by-outline"] },
  { title: "Edit & Sign", slugs: ["pdf-editor", "annotate-pdf", "fill-sign-pdf", "whiteout-pdf", "crop-pdf"] },
  { title: "Compress & Scans", slugs: ["compress-pdf", "ocr-pdf", "deskew-pdf"] },
  { title: "Security", slugs: ["protect-pdf", "unlock-pdf", "flatten-pdf"] },
  { title: "Convert From PDF", slugs: ["pdf-to-word", "pdf-to-excel", "pdf-to-ppt", "pdf-to-jpg"] },
  { title: "Convert To PDF", slugs: ["word-to-pdf", "excel-to-pdf", "ppt-to-pdf", "jpg-to-pdf"] },
  { title: "Others", slugs: ["rotate-pdf", "watermark-pdf", "page-numbers-pdf", "organize-pdf"] },
];

function toolBySlug(slug: string) {
  return TOOLS.find((tool) => tool.slug === slug);
}

function ToolIcon({ tool, className }: { tool: Tool; className?: string }) {
  const Icon = ICON_MAP[tool.icon] ?? FileText;
  return <Icon className={className} />;
}

function ToolLink({ tool, onClick }: { tool: Tool; onClick?: () => void }) {
  return (
    <Link href={`/${tool.slug}`} onClick={onClick} className="group flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-accent transition-colors">
      <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
        <ToolIcon tool={tool} className="w-3.5 h-3.5 text-primary" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground group-hover:text-primary truncate">{tool.name}</span>
        {tool.comingSoon && <span className="block text-[11px] text-amber-600">Coming soon</span>}
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allToolsOpen, setAllToolsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openMega = () => {
    clearTimeout(closeTimeoutRef.current);
    setAllToolsOpen(true);
  };

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => setAllToolsOpen(false), 150);
  };

  const groups = GROUPS.map((group) => ({
    ...group,
    tools: group.slugs.map(toolBySlug).filter(Boolean) as Tool[],
  })).filter((group) => group.tools.length > 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Lift<span className="text-primary">PDF</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={scheduleClose}>
            {TASK_LINKS.map((link) => (
              link.menu ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={openMega}
                  onFocus={openMega}
                  className={cn("flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors", allToolsOpen ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent")}
                >
                  {link.label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", allToolsOpen && "rotate-180")} />
                </Link>
              ) : (
                <Link key={link.label} href={link.href} className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <button className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {allToolsOpen && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-border shadow-xl z-40" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">All PDF tools</p>
                <p className="text-xs text-muted-foreground">Choose a task first, then upload once and keep working.</p>
              </div>
              <Link href="/all-tools" onClick={() => setAllToolsOpen(false)} className="text-sm font-semibold text-primary hover:underline">View all tools</Link>
            </div>
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-5">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.title}</p>
                  <div className="space-y-1">
                    {group.tools.map((tool) => <ToolLink key={tool.slug} tool={tool} onClick={() => setAllToolsOpen(false)} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {TASK_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            {groups.slice(0, 5).map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.title}</p>
                <div className="grid grid-cols-2 gap-1">
                  {group.tools.map((tool) => <ToolLink key={tool.slug} tool={tool} onClick={() => setMobileOpen(false)} />)}
                </div>
              </div>
            ))}
            <Link href="/all-tools" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-4 py-3 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" /> Browse every tool
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
