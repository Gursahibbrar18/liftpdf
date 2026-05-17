export interface WorkspaceProcessResult {
  bytes: Uint8Array;
  filename: string;
  message?: string;
}

export type WorkspaceProcessedHandler = (
  result: WorkspaceProcessResult
) => void | Promise<void>;
