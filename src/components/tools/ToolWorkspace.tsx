"use client";

import dynamic from "next/dynamic";
import { UploadZone } from "./UploadZone";
import { useState } from "react";

const MergeTool = dynamic(() => import("./MergeTool").then((m) => m.MergeTool));
const SplitTool = dynamic(() => import("./SplitTool").then((m) => m.SplitTool));
const RotateTool = dynamic(() => import("./RotateTool").then((m) => m.RotateTool));
const WhiteoutTool = dynamic(() => import("./WhiteoutTool").then((m) => m.WhiteoutTool));
const WatermarkTool = dynamic(() => import("./WatermarkTool").then((m) => m.WatermarkTool));
const PageNumbersTool = dynamic(() => import("./PageNumbersTool").then((m) => m.PageNumbersTool));
const DeletePagesTool = dynamic(() => import("./DeletePagesTool").then((m) => m.DeletePagesTool));

const TOOL_MAP: Record<string, React.ComponentType> = {
  "merge-pdf": MergeTool,
  "split-pdf": SplitTool,
  "rotate-pdf": RotateTool,
  "whiteout-pdf": WhiteoutTool,
  "watermark-pdf": WatermarkTool,
  "page-numbers-pdf": PageNumbersTool,
  "delete-pdf-pages": DeletePagesTool,
};

function GenericUpload() {
  const [, setFiles] = useState<File[]>([]);
  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
      <UploadZone onFiles={setFiles} />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Full processing coming soon — the tool UI is being built.
      </p>
    </div>
  );
}

export function ToolWorkspace({ slug }: { slug: string }) {
  const Tool = TOOL_MAP[slug];

  if (Tool) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
        <Tool />
      </div>
    );
  }

  return <GenericUpload />;
}
