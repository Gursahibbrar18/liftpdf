import Link from "next/link";
import {
  Pencil, GitMerge, Scissors, Archive, FileText, Lock, Stamp, RotateCw,
  ClipboardList, Eraser, PenLine, LayoutGrid, Trash2, FileOutput, Table,
  FileSpreadsheet, Image, ImagePlus, ScanText, Unlock, Hash, AlignJustify,
  Crop, Maximize2, Layers, Wrench, Globe, Replace, Highlighter, ListOrdered,
  SlidersHorizontal, Grid2x2, MonitorPlay, Presentation, Contrast, FileEdit,
  FileType, BookOpen, Shuffle, FormInput, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES,
  CATEGORY_META,
  getToolsByCategory,
  FEATURED_TOOLS,
  TOOLS,
} from "@/lib/tools";

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

function ToolCard({ slug }: { slug: string }) {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return null;
  const meta = CATEGORY_META[tool.category];

  return (
    <Link
      href={`/${tool.slug}`}
      className={cn(
        "group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-200",
        "bg-white hover:shadow-md hover:-translate-y-0.5",
        tool.comingSoon
          ? "border-border opacity-70 cursor-default pointer-events-none"
          : "border-border hover:border-primary/30"
      )}
    >
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
          meta.bg
        )}
      >
        <ToolIcon name={tool.icon} className={cn("w-5 h-5", meta.color)} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
            {tool.name}
          </h3>
          {tool.comingSoon && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" /> Soon
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}

export function ToolGrid() {
  const featured = FEATURED_TOOLS.filter((s) =>
    TOOLS.find((t) => t.slug === s && !t.comingSoon)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Featured tools */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Popular tools
        </h2>
        <p className="text-muted-foreground mb-8">
          The tools people use every day — all free, all instant.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featured.map((slug) => (
            <ToolCard key={slug} slug={slug} />
          ))}
        </div>
      </div>

      {/* All categories */}
      {ALL_CATEGORIES.map((cat) => {
        const meta = CATEGORY_META[cat];
        const tools = getToolsByCategory(cat);
        return (
          <div key={cat} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                  meta.bg,
                  meta.color
                )}
              >
                {meta.label}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} slug={tool.slug} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
