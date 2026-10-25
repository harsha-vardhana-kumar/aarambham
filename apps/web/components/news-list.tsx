"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { demoRepository, districts, categories } from "@aarambham/core";
import { EmptyState } from "@aarambham/ui";
import { StoryCard } from "./story-card";
export function NewsList({ category }: { category?: string }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState(params.get("district") || "");
  const [selectedCategory, setCategory] = useState("");
  const all = demoRepository.listArticles();
  const articles = all.filter(
    (a) =>
      (!category || category === "districts" || a.categoryId === category) &&
      (!selectedCategory || a.categoryId === selectedCategory) &&
      (!district || a.districtId === district) &&
      `${a.title} ${a.summary}`.includes(query.trim()),
  );
  return (
    <>
      <div className="filter-bar">
        <label className="field">
          కథనాల శోధన
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="తెలుగులో వెతకండి…"
          />
        </label>
        {!category && (
          <label className="field">
            విభాగం
            <select
              value={selectedCategory}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">అన్ని విభాగాలు</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="field">
          జిల్లా
          <select
            aria-label="జిల్లా"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">అన్ని జిల్లాలు</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="eyebrow" aria-live="polite">
        {articles.length} SAMPLE STORIES / నమూనా కథనాలు
      </p>
      {articles.length ? (
        <div className="listing-grid">
          {articles.map((a) => (
            <StoryCard article={a} key={a.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="కథనాలు కనుగొనబడలేదు"
          description="వేరే పదం లేదా జిల్లా ఎంచుకోండి."
        >
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setDistrict("");
              setCategory("");
            }}
          >
            ఫిల్టర్లు తొలగించండి
          </button>
        </EmptyState>
      )}
    </>
  );
}
