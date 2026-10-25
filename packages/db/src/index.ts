import type { Article, ArchiveEdition, AuditEvent } from "@aarambham/core";
export interface Page<T> {
  items: T[];
  nextCursor?: string;
}
/** Contracts only: no database connection or persistence in Milestone 1. */
export interface NewsRepository {
  listArticles(query: {
    status?: Article["status"];
    categoryId?: string;
    cursor?: string;
  }): Promise<Page<Article>>;
  getArticle(id: string): Promise<Article | null>;
  saveDraft(article: Article, expectedVersion: number): Promise<void>;
}
export interface ArchiveRepository {
  list(query: {
    year?: number;
    month?: number;
    date?: string;
    publication?: string;
    districtId?: string;
  }): Promise<Page<ArchiveEdition>>;
}
export interface AuditRepository {
  append(event: AuditEvent): Promise<void>;
}
