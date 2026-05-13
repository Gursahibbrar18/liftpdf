"use client";

import { useState } from "react";
import { UploadZone } from "./UploadZone";

interface Props {
  slug: string;
}

export function ToolWorkspace({ slug: _slug }: Props) {
  const [_files, setFiles] = useState<File[]>([]);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-10">
      <UploadZone onFiles={setFiles} />
    </div>
  );
}
