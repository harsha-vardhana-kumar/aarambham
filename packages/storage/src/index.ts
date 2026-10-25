import type { MediaAsset } from "@aarambham/core";
/** A future server-side implementation must enforce rights, MIME, size and access checks. */
export interface StorageAdapter {
  getReadUrl(asset: MediaAsset, expiresInSeconds: number): Promise<string>;
  createUpload(input: {
    key: string;
    mimeType: string;
    sizeBytes: number;
  }): Promise<{ url: string; expiresAt: string }>;
  delete(key: string): Promise<void>;
}
