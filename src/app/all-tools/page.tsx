import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { ALL_CATEGORIES, CATEGORY_META, getToolsByCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All PDF Tools – Free Online PDF Editor & Converter | LiftPDF",
  description: "Browse all 35+ free PDF tools: merge, split, compress, convert, edit, watermark, rotate, and more. No sign-up. Files stay in your browser.",
  alternates: { canonical: "https://liftpdf.com/all-tools" },
};

export default function AllToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-foreground">All PDF Tools</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Every tool runs in your browser — your files never leave your device.
            Free and unlimited on all core tools.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {ALL_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const tools = getToolsByCategory(cat);
          return (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-5">
                <span className={cn("text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full", meta.bg, meta.color)}>
                  {meta.label}
                </span>
                <span className="text-sm text-muted-foreground">{tools.length} tools</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className={cn(
                      "group relative p-4 bg-white rounded-xl border transition-all",
                      tool.comingSoon
                        ? "border-border opacity-70 cursor-default"
                        : "border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                    )}
                  >
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", meta.bg)}>
                      <span className={cn("text-base font-bold", meta.color)}>
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {tool.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                    {tool.comingSoon && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" /> Soon
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
