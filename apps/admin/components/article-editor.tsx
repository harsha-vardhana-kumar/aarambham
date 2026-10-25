"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, districts, demoArticles } from "@aarambham/core";
import { articleInputSchema, type ArticleInput } from "@aarambham/validation";
import { Badge, EmptyState } from "@aarambham/ui";
import { readDrafts, saveDemoDraft } from "../lib/demo-drafts";
export function ArticleEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleInput>({
    title: "",
    summary: "",
    body: "",
    categoryId: "",
    districtId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    if (!id) return;
    const a =
      readDrafts().find((a) => a.id === id) ||
      demoArticles.find((a) => a.id === id);
    if (a)
      setForm({
        title: a.title,
        summary: a.summary,
        body: a.body.join("\n\n"),
        categoryId: a.categoryId,
        districtId: a.districtId || "",
      });
    else setMissing(true);
  }, [id]);
  function change(key: keyof ArticleInput, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setMessage("");
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = articleInputSchema.safeParse(form);
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((i) => [i.path[0], i.message]),
        ),
      );
      setMessage("Please correct the highlighted fields.");
      return;
    }
    if (!categories.some((c) => c.id === result.data.categoryId)) {
      setErrors({ categoryId: "Choose a listed category." });
      return;
    }
    setErrors({});
    const draftId = id || `local-${crypto.randomUUID()}`;
    try {
      saveDemoDraft({
        id: draftId,
        slug: draftId,
        ...result.data,
        body: result.data.body.split(/\n\s*\n/),
        status: "draft",
        isDemo: true,
        updatedAt: new Date().toISOString(),
        art: "books",
      });
      setMessage(
        "Demo draft saved in this browser tab only. Nothing was submitted or published.",
      );
      if (!id) router.replace(`/articles/${draftId}/edit`);
    } catch {
      setMessage(
        "This browser could not save the demo draft. Copy your text before leaving.",
      );
    }
  }
  if (missing)
    return (
      <EmptyState
        title="Draft not found"
        description="Local drafts are available only in the browser tab where they were saved."
      >
        <Link href="/articles" className="button">
          Back to stories
        </Link>
      </EmptyState>
    );
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">EDITORIAL / STORY EDITOR</span>
          <h1>{id ? "Edit story" : "Create a story"}</h1>
          <p>A focused space for a first draft.</p>
        </div>
        <Link className="button button-secondary" href="/articles">
          ← All stories
        </Link>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="editor-grid">
          <section className="panel editor-form">
            <div className="panel-header">
              <h2>Story content</h2>
              <Badge tone="orange">DEMO DRAFT</Badge>
            </div>
            <label className="field">
              Telugu headline
              <input
                lang="te"
                value={form.title}
                onChange={(e) => change("title", e.target.value)}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "error-title" : undefined}
                placeholder="కథనానికి స్పష్టమైన శీర్షిక…"
              />
              {errors.title && (
                <span id="error-title" className="field-error">
                  {errors.title}
                </span>
              )}
            </label>
            <label className="field">
              Summary
              <textarea
                lang="te"
                rows={3}
                value={form.summary}
                onChange={(e) => change("summary", e.target.value)}
                aria-invalid={!!errors.summary}
                aria-describedby={errors.summary ? "error-summary" : undefined}
              />
              {errors.summary && (
                <span id="error-summary" className="field-error">
                  {errors.summary}
                </span>
              )}
            </label>
            <label className="field">
              Article body{" "}
              <span className="muted">
                Plain text · Separate paragraphs with a blank line
              </span>
              <textarea
                lang="te"
                rows={12}
                value={form.body}
                onChange={(e) => change("body", e.target.value)}
                aria-invalid={!!errors.body}
                aria-describedby={errors.body ? "error-body" : undefined}
              />
              {errors.body && (
                <span id="error-body" className="field-error">
                  {errors.body}
                </span>
              )}
            </label>
            <div className="editor-actions">
              <button className="button" type="submit">
                Save demo draft
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setPreview(!preview)}
                aria-expanded={preview}
              >
                {preview ? "Hide" : "Show"} preview
              </button>
            </div>
            <p role="status" className="save-message">
              {message}
            </p>
          </section>
          <aside>
            <section className="panel editor-settings">
              <h2>Story details</h2>
              <label className="field">
                Category
                <select
                  aria-label="Category"
                  value={form.categoryId}
                  onChange={(e) => change("categoryId", e.target.value)}
                  aria-invalid={!!errors.categoryId}
                  aria-describedby={
                    errors.categoryId ? "error-category" : undefined
                  }
                >
                  <option value="">Choose category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <span id="error-category" className="field-error">
                    {errors.categoryId}
                  </span>
                )}
              </label>
              <label className="field">
                District (optional)
                <select
                  value={form.districtId}
                  onChange={(e) => change("districtId", e.target.value)}
                >
                  <option value="">No district</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="editor-separator" />
              <h3>Publication controls</h3>
              <p>
                Review, scheduling and publication require authenticated server
                workflows.
              </p>
              <button
                className="button button-secondary"
                type="button"
                disabled
              >
                Submit for review unavailable
              </button>
              <button className="button" type="button" disabled>
                Publish unavailable
              </button>
            </section>
            <div className="editor-note">
              Do not enter confidential information. Demo drafts are unencrypted
              browser-tab data, not newsroom records.
            </div>
          </aside>
        </div>
      </form>
      {preview && (
        <section className="panel story-preview" aria-label="Article preview">
          <Badge>LOCAL PREVIEW · NOT PUBLISHED</Badge>
          <h2 lang="te">{form.title || "శీర్షిక నమూనా"}</h2>
          <p lang="te">{form.summary}</p>
          {form.body.split(/\n\s*\n/).map((p, i) => (
            <p lang="te" key={i}>
              {p}
            </p>
          ))}
        </section>
      )}
    </>
  );
}
