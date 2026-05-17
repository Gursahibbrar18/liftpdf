"use client";

import dynamic from "next/dynamic";

const MergeTool    = dynamic(() => import("./MergeTool").then(m => m.MergeTool));
const PDFWorkspace = dynamic(() => import("./PDFWorkspace").then(m => m.PDFWorkspace));

const WORKSPACE_SLUGS = new Set([
  "pdf-editor",
  "whiteout-pdf",
  "rotate-pdf",
  "split-pdf",
  "watermark-pdf",
  "page-numbers-pdf",
  "delete-pdf-pages",
  "fill-sign-pdf",
  "annotate-pdf",
  "crop-pdf",
]);

const INITIAL_TOOL_MAP: Record<string, string> = {
  "pdf-editor": "text",
  "fill-sign-pdf": "sign",
  "annotate-pdf": "annotate",
};

export function ToolWorkspace({ slug }: { slug: string }) {
  if (slug === "merge-pdf") {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
        <MergeTool />
      </div>
    );
  }

  if (WORKSPACE_SLUGS.has(slug)) {
    return <PDFWorkspace initialTool={INITIAL_TOOL_MAP[slug] ?? slug} />;
  }

  return null;
}
