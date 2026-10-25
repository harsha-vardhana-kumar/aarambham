import Link from "next/link";
import type { Article } from "@aarambham/core";
import { categories } from "@aarambham/core";
import { Badge, EditorialArt } from "@aarambham/ui";
export function StoryCard({
  article,
  lead = false,
  compact = false,
}: {
  article: Article;
  lead?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={`story-card ${lead ? "story-lead" : ""} ${compact ? "story-compact" : ""}`}
    >
      <Link href={`/article/${article.slug}`} aria-label={article.title}>
        <EditorialArt kind={article.art} />
      </Link>
      <div className="story-content">
        <div className="story-meta">
          <span>
            {categories.find((c) => c.id === article.categoryId)?.name}
          </span>
          <Badge>నమూనా · DEMO</Badge>
        </div>
        <h2>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h2>
        {!compact && <p>{article.summary}</p>}
        <div className="story-byline">
          నమూనా కథనం <span>•</span> పఠన సమయం 2 నిమిషాలు
        </div>
      </div>
    </article>
  );
}
