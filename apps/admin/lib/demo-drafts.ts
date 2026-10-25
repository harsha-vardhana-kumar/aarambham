import type { Article } from "@aarambham/core";
import { articleInputSchema } from "@aarambham/validation";
const key = "aarambham:demo-drafts:v1";
export function readDrafts(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((a): a is Article => {
      if (!a || typeof a !== "object") return false;
      return (
        typeof a.id === "string" &&
        typeof a.slug === "string" &&
        Array.isArray(a.body) &&
        a.body.every((p: unknown) => typeof p === "string") &&
        a.isDemo === true &&
        a.status === "draft" &&
        articleInputSchema.safeParse({ ...a, body: a.body.join("\n\n") })
          .success
      );
    });
  } catch {
    return [];
  }
}
export function saveDemoDraft(article: Article) {
  const existing = readDrafts().filter((a) => a.id !== article.id);
  sessionStorage.setItem(key, JSON.stringify([article, ...existing]));
}
export function clearDemoDrafts() {
  sessionStorage.removeItem(key);
}
