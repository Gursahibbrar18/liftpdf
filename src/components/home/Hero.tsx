import Link from "next/link";
import { ArrowRight, Shield, Zap, Eye } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative background stripes — Sejda-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #2563eb 0px, #2563eb 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          No sign-up &nbsp;·&nbsp; No watermarks &nbsp;·&nbsp; Free forever
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
          Every PDF tool
          <br />
          <span className="text-primary">you&apos;ll ever need</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Merge, split, compress, convert, edit and sign PDFs — free and
          unlimited. Everything runs in your browser. Your files never leave
          your device.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/pdf-editor"
            className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-base"
          >
            Open PDF Editor
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/merge-pdf"
            className="flex items-center gap-2 px-6 py-3.5 bg-white text-foreground rounded-xl font-semibold border border-border hover:bg-accent transition-colors text-base"
          >
            Merge PDFs
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            Files processed in your browser — never uploaded
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Instant results, no queue
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-violet-500" />
            No watermarks on output
          </div>
        </div>
      </div>
    </section>
  );
}
