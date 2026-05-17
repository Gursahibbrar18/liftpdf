import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { TOOLS, getToolBySlug, CATEGORY_META, getToolsByCategory } from "@/lib/tools";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { cn } from "@/lib/utils";

// All slugs that have a real working UI — everything else shows "Coming soon"
const BUILT_SLUGS = new Set([
  "pdf-editor",
  "merge-pdf",
  "split-pdf",
  "rotate-pdf",
  "whiteout-pdf",
  "watermark-pdf",
  "page-numbers-pdf",
  "delete-pdf-pages",
]);

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = `${tool.name} – Free Online ${tool.name} Tool`;
  const description = `${tool.longDescription} Free, no sign-up required. Works entirely in your browser.`;

  return {
    title,
    description,
    keywords: tool.keywords.join(", "),
    openGraph: { title, description, type: "website" },
    twitter: { title, description, card: "summary_large_image" },
    alternates: { canonical: `https://liftpdf.com/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const meta = CATEGORY_META[tool.category];
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== slug)
    .slice(0, 4);

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `LiftPDF ${tool.name}`,
        applicationCategory: "Utility",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: tool.longDescription,
        url: `https://liftpdf.com/${slug}`,
      },
      {
        "@type": "HowTo",
        name: `How to use ${tool.name}`,
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload your PDF",
            text: "Click the upload area or drag your PDF file onto it.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Process the file",
            text: `Apply ${tool.name.toLowerCase()} settings and click the action button.`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Download the result",
            text: "Download your processed PDF file instantly.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Tool header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All tools
            </Link>

            <div className="flex items-start gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", meta.bg)}>
                <span className={cn("text-xl", meta.color)}>
                  {/* Icon rendered via category color */}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
                  {tool.comingSoon && (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" /> Coming soon
                    </span>
                  )}
                  <span className={cn("text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full", meta.bg, meta.color)}>
                    {meta.label}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 max-w-2xl">{tool.longDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main tool area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {tool.comingSoon || !BUILT_SLUGS.has(slug) ? (
            <ComingSoonCard name={tool.name} />
          ) : (
            <ToolWorkspace slug={slug} />
          )}

          {/* Related tools */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Related {meta.label} tools
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {related.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all text-sm"
                  >
                    <div className="font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ComingSoonCard({ name }: { name: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-12 text-center">
      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-amber-500" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        {name} is coming soon
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        We&apos;re putting the finishing touches on this tool. Check back soon — we ship new tools every week.
      </p>
      <Link
        href="/all-tools"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        See all available tools
      </Link>
    </div>
  );
}

