/** Convert pdf-lib Uint8Array (ArrayBufferLike) to a safe Blob for the browser */
export function bytesToBlob(bytes: Uint8Array, type = "application/pdf"): Blob {
  const safe = new Uint8Array(bytes.length);
  safe.set(bytes);
  return new Blob([safe], { type });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadBytes(bytes: Uint8Array, filename: string) {
  // Copy into a fresh Uint8Array backed by a concrete ArrayBuffer (not SharedArrayBuffer)
  const safe = new Uint8Array(bytes.length);
  safe.set(bytes);
  downloadBlob(new Blob([safe], { type: "application/pdf" }), filename);
}

export function stripExtension(name: string) {
  return name.replace(/\.[^.]+$/, "");
}
