export const dynamicParams = false;
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { demoRepository, categories } from "@aarambham/core";
import { Badge, EditorialArt } from "@aarambham/ui";
export function generateStaticParams() {
  return demoRepository.listArticles().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = demoRepository.getArticle(slug);
  return { title: a?.title || "Not found", description: a?.summary };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = demoRepository.getArticle(slug);
  if (!article) notFound();
  return (
    <article className="article-layout">
      <div className="eyebrow">
        <Link href="/">హోమ్</Link> /{" "}
        <Link href={`/${article.categoryId}`}>
          {categories.find((c) => c.id === article.categoryId)?.name}
        </Link>
      </div>
      <Badge tone="orange">నమూనా కథనం · NOT A REAL NEWS REPORT</Badge>
      <h1>{article.title}</h1>
      <p className="article-deck">{article.summary}</p>
      <div className="story-byline">
        Design sample · 24 October 2026 · No verified byline assigned
      </div>
      <EditorialArt kind={article.art} />
      <div className="article-body">
        <div className="trust-note">
          ఇది కల్పిత వార్త కాదు — పేజీ రూపకల్పనను వివరించే నమూనా విషయం మాత్రమే.
        </div>
        {article.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <hr />
        <p>
          <Link href="/corrections-policy">సవరణల విధానం →</Link>
        </p>
        <Link className="button button-secondary" href="/latest">
          మరిన్ని నమూనా కథనాలు →
        </Link>
      </div>
    </article>
  );
}
