"use client";

import dynamic from "next/dynamic";

const MergeTool    = dynamic(() => import("./MergeTool").then(m => m.MergeTool));
const PDFWorkspace = dynamic(() => import("./PDFWorkspace").then(m => m.PDFWorkspace));

const WORKSPACE_SLUGS = new Set([
  "whiteout-pdf",
  "rotate-pdf",
  "split-pdf",
  "watermark-pdf",
  "page-numbers-pdf",
  "delete-pdf-pages",
]);

export function ToolWorkspace({ slug }: { slug: string }) {
  if (slug === "merge-pdf") {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
        <MergeTool />
      </div>
    );
  }

  if (WORKSPACE_SLUGS.has(slug)) {
    return <PDFWorkspace initialTool={slug} />;
  }

  return null;
}
