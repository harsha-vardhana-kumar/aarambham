"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  adminSections,
  categories,
  districts,
  demoArticles,
  type Article,
  type Role,
} from "@aarambham/core";
import { hasCapability, type Capability } from "@aarambham/auth";
import { Badge, EmptyState } from "@aarambham/ui";
import { readDrafts, clearDemoDrafts } from "../lib/demo-drafts";
const stateLabels: Record<string, string> = {
  draft: "Draft",
  "in-review": "In review",
  scheduled: "Scheduled",
  published: "Published",
};
function StoryTable({ stories }: { stories: Article[] }) {
  return (
    <div className="table-scroll">
      <table className="story-table">
        <thead>
          <tr>
            <th scope="col">Story</th>
            <th scope="col">Section</th>
            <th scope="col">Sample status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((a) => (
            <tr key={a.id}>
              <td>
                <Link
                  href={`/articles/${a.id}/edit`}
                  className="table-story"
                  lang="te"
                >
                  {a.title}
                </Link>
                <span className="table-subtitle">
                  {a.id.startsWith("local-")
                    ? "Browser-tab draft"
                    : "Sample content"}{" "}
                  · Demo
                </span>
              </td>
              <td lang="te">
                {categories.find((c) => c.id === a.categoryId)?.name}
              </td>
              <td>
                <Badge
                  tone={
                    a.status === "in-review"
                      ? "orange"
                      : a.status === "published"
                        ? "blue"
                        : "neutral"
                  }
                >
                  {stateLabels[a.status] || a.status}
                </Badge>
              </td>
              <td>
                <Link className="table-action" href={`/articles/${a.id}/edit`}>
                  Edit draft <span aria-hidden="true">↗</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function AdminWorkspace({ section }: { section: string }) {
  const [local, setLocal] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [layout, setLayout] = useState("lead");
  const [selectedRole, setSelectedRole] = useState<Role>("editor");
  useEffect(() => {
    setLocal(readDrafts());
    setQuery("");
    setCategory("");
    setStatus("");
    setNotice("");
  }, [section]);
  const stories = [
    ...local,
    ...demoArticles.filter((a) => !local.some((l) => l.id === a.id)),
  ];
  const sectionStatus: Record<string, string> = {
    drafts: "draft",
    approvals: "in-review",
    scheduled: "scheduled",
    published: "published",
  };
  const filtered = stories.filter(
    (a) =>
      (!sectionStatus[section] || a.status === sectionStatus[section]) &&
      (!status || a.status === status) &&
      (!category || a.categoryId === category) &&
      a.title.includes(query),
  );
  const title = adminSections.find(([s]) => s === section)?.[1] || section;
  const isStories = [
    "articles",
    "drafts",
    "approvals",
    "scheduled",
    "published",
  ].includes(section);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">AARAMBHAM / NEWSROOM</span>
          <h1>
            {section === "dashboard" ? "Your newsroom, at a glance." : title}
          </h1>
          <p>
            {section === "dashboard"
              ? "A clear view of the stories taking shape. All numbers below describe sample data."
              : isStories
                ? "Explore sample stories and local drafts. Statuses do not represent live workflows."
                : "Milestone 1 · Frontend configuration preview"}
          </p>
        </div>
        {(section === "dashboard" || isStories) && (
          <Link href="/articles/new" className="button">
            + Create story
          </Link>
        )}
      </div>
      {section === "dashboard" ? (
        <>
          <div className="stats-grid">
            {[
              [
                "Stories in preview",
                stories.length,
                "All demonstration records",
              ],
              [
                "Awaiting review",
                stories.filter((a) => a.status === "in-review").length,
                "Sample approval queue",
              ],
              [
                "Sample published",
                stories.filter((a) => a.status === "published").length,
                "Not published to a live site",
              ],
              ["Local drafts", local.length, "Saved in this browser tab"],
            ].map(([label, count, note]) => (
              <div className="stat-card" key={label}>
                <span>{label}</span>
                <strong>{count}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
          <div className="dashboard-grid">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>The editorial desk</h2>
                  <p>Recent sample stories</p>
                </div>
                <Link href="/articles">View all →</Link>
              </div>
              <StoryTable stories={stories.slice(0, 5)} />
            </section>
            <aside>
              <section className="panel edition-panel">
                <span className="eyebrow">NEXT EDITION</span>
                <h2>
                  A new digital
                  <br />
                  beginning.
                </h2>
                <p>
                  No approved e-paper has been uploaded. Prepare the library
                  when source materials are ready.
                </p>
                <Link href="/epaper" className="button button-secondary">
                  Open edition library ↗
                </Link>
              </section>
              <section className="panel checklist">
                <h2>Launch readiness</h2>
                <ul>
                  <li>
                    <span>✓</span> Frontend foundation
                  </li>
                  <li>
                    <span>○</span> Approved original masthead
                  </li>
                  <li>
                    <span>○</span> Publication credentials
                  </li>
                  <li>
                    <span>○</span> Authentication & backend
                  </li>
                  <li>
                    <span>○</span> Editorial policy approval
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </>
      ) : isStories ? (
        <section className="panel">
          <div className="admin-filter-bar">
            <label className="field">
              Find a story
              <input
                type="search"
                placeholder="Search Telugu headlines…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="field">
              Section
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All sections</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            {section === "articles" && (
              <label className="field">
                Sample status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All statuses</option>
                  {Object.entries(stateLabels).map(([s, l]) => (
                    <option key={s} value={s}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className="table-result" aria-live="polite">
            {filtered.length} records · No live publication data
          </div>
          {filtered.length ? (
            <StoryTable stories={filtered} />
          ) : (
            <EmptyState
              title="No matching stories"
              description="Try another search or create a local demo draft."
            />
          )}
          {section === "approvals" && (
            <div className="panel-footnote">
              Approval decisions are unavailable until authenticated server-side
              review is implemented.
            </div>
          )}
          {section === "scheduled" && (
            <div className="panel-footnote">
              Sample status only. No timers or publication jobs are running.
            </div>
          )}
        </section>
      ) : null}
      {section === "categories" && (
        <section className="panel">
          <div className="panel-header">
            <h2>Proposed editorial taxonomy</h2>
            <Badge>READ-ONLY PREVIEW</Badge>
          </div>
          <div className="taxonomy-grid">
            {categories.map((c, i) => (
              <div key={c.id}>
                <span className="eyebrow">
                  SECTION {String(i + 1).padStart(2, "0")}
                </span>
                <h2 lang="te">{c.name}</h2>
                <code>/{c.slug}</code>
                <p>
                  {stories.filter((a) => a.categoryId === c.id).length} sample
                  stories
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {section === "districts" && (
        <section className="panel">
          <div className="panel-header">
            <h2>Sample coverage areas</h2>
            <Badge>NOT A COMPLETE DISTRICT DIRECTORY</Badge>
          </div>
          <div className="taxonomy-grid">
            {districts.map((d) => (
              <div key={d.id}>
                <span className="eyebrow">
                  {d.state === "AP" ? "Andhra Pradesh" : "Telangana"}
                </span>
                <h2 lang="te">{d.name}</h2>
                <p>Reporter assignment unavailable</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {section === "reporters" && (
        <EmptyState
          title="No verified reporters added"
          description="Reporter profiles, district assignments and account invitations require approved identities and secure authentication."
        >
          <button className="button" disabled>
            Invite reporter unavailable
          </button>
        </EmptyState>
      )}
      {section === "media" && (
        <EmptyState
          title="Your approved media belongs here"
          description="No uploaded assets. Future uploads will capture alt text, source, rights approval and storage references. Site illustrations are original decorative demo assets."
        >
          <button className="button" disabled>
            Upload unavailable
          </button>
        </EmptyState>
      )}
      {(section === "epaper" || section === "archives") && (
        <>
          <div className="library-spec">
            <div>
              <span className="eyebrow">PUBLICATION</span>
              <strong>AARAMBHAM</strong>
            </div>
            <div>
              <span className="eyebrow">VERIFIED EDITIONS</span>
              <strong>0</strong>
            </div>
            <div>
              <span className="eyebrow">RIGHTS REVIEW</span>
              <strong>Awaiting materials</strong>
            </div>
          </div>
          <EmptyState
            title={
              section === "archives"
                ? "A place for the historical record"
                : "No approved editions yet"
            }
            description={
              section === "archives"
                ? "Historical materials may date to 1999. Edition dates, original scan references, permissions and OCR status will be recorded. No historical issues have been invented."
                : "Upload and PDF processing will be connected in a future milestone. No edition is available to view or download."
            }
          >
            <button className="button" disabled>
              Add edition unavailable
            </button>
          </EmptyState>
        </>
      )}
      {section === "homepage" && (
        <div className="settings-grid">
          <section className="panel settings-panel">
            <h2>Front page composition</h2>
            <p>
              Explore a layout locally. This does not change the public website.
            </p>
            <label className="field">
              Lead arrangement
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
              >
                <option value="lead">Lead story + supporting column</option>
                <option value="balanced">Balanced three-column grid</option>
              </select>
            </label>
            <div
              className={`layout-preview ${layout === "balanced" ? "balanced" : ""}`}
              aria-label={`${layout} layout preview`}
            >
              <div>Lead</div>
              <div>Supporting</div>
              <div>The brief</div>
            </div>
            <button
              className="button"
              onClick={() =>
                setNotice(
                  "Layout preview updated locally. The public website was not changed.",
                )
              }
            >
              Apply to this preview
            </button>
            <p role="status">{notice}</p>
          </section>
          <section className="panel settings-panel">
            <h2>Editorial placement</h2>
            <p>
              Featured stories, breaking-news copy and homepage placement
              require an approved, authenticated publishing workflow.
            </p>
            <button className="button button-secondary" disabled>
              Publish layout unavailable
            </button>
          </section>
        </div>
      )}
      {section === "advertisements" && (
        <section className="panel settings-panel">
          <h2>Reserved placements</h2>
          <p>
            Placement specifications only. No advertisers, bookings or revenue
            are represented.
          </p>
          <div className="ad-placeholder">
            LEADERBOARD · RESPONSIVE · ADVERTISEMENT LABEL REQUIRED
          </div>
          <div className="ad-placeholder ad-small">
            SIDEBAR · CLEARLY LABELED
          </div>
          <button className="button" disabled>
            Create campaign unavailable
          </button>
        </section>
      )}
      {section === "analytics" && (
        <EmptyState
          title="No analytics provider connected"
          description="Audience, pageviews, reading time and referral reporting will appear after a consent and privacy review. No fabricated traffic metrics are shown."
        />
      )}
      {section === "users" && (
        <section className="panel settings-panel">
          <h2>Proposed role permissions</h2>
          <p>
            This policy preview is not a role switch, session or access-control
            implementation.
          </p>
          <label className="field role-select">
            Inspect role
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              {(["super-admin", "admin", "editor", "reporter"] as const).map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ),
              )}
            </select>
          </label>
          <div className="permission-list">
            {(
              [
                "write",
                "review",
                "publish",
                "manage-users",
                "configure",
              ] as Capability[]
            ).map((c) => (
              <div key={c}>
                <span>{c}</span>
                <Badge
                  tone={hasCapability(selectedRole, c) ? "blue" : "neutral"}
                >
                  {hasCapability(selectedRole, c)
                    ? "Proposed access"
                    : "No access"}
                </Badge>
              </div>
            ))}
          </div>
          <button className="button" disabled>
            Create user unavailable
          </button>
        </section>
      )}
      {section === "audit" && (
        <EmptyState
          title="No server audit events"
          description="A future append-only audit trail will record authenticated editorial and administrative actions. Browser preview actions are not a compliance audit log."
        />
      )}
      {section === "settings" && (
        <section className="panel settings-panel">
          <h2>Publication configuration</h2>
          <dl className="config-list">
            <dt>Publication</dt>
            <dd>ఆరంభం · AARAMBHAM</dd>
            <dt>Motto</dt>
            <dd>TRUTH IS GOD</dd>
            <dt>Language</dt>
            <dd>Telugu · te-IN</dd>
            <dt>Editorial timezone (proposed)</dt>
            <dd>Asia/Kolkata</dd>
            <dt>Historical year (client-supplied)</dt>
            <dd>1999 · Source material pending</dd>
            <dt>Brand asset</dt>
            <dd>Provisional text masthead</dd>
            <dt>Deployment</dt>
            <dd>Not deployed</dd>
          </dl>
          <h3>Local demo data</h3>
          <p>
            Reset removes only drafts saved by this preview in the current
            browser tab. The included sample stories remain.
          </p>
          <button
            className="button button-secondary"
            onClick={() => {
              try {
                clearDemoDrafts();
                setLocal([]);
                setNotice("Local demo drafts cleared.");
              } catch {
                setNotice("Browser storage is unavailable.");
              }
            }}
          >
            Clear local demo drafts
          </button>
          <p role="status">{notice}</p>
        </section>
      )}
    </>
  );
}
