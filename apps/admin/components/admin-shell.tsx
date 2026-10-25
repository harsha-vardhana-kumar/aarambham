"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@aarambham/ui";
import { adminSections } from "@aarambham/core";
const symbols = [
  "◫",
  "▤",
  "✎",
  "✓",
  "◷",
  "▣",
  "⊞",
  "⌖",
  "♙",
  "▧",
  "▥",
  "▦",
  "⌂",
  "▭",
  "▥",
  "♙",
  "≡",
  "⚙",
];
export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (path === "/login") return <main id="main">{children}</main>;
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <Link href="/dashboard" className="admin-brand">
          <Logo compact />
        </Link>
        <div className="workspace-label">
          <span className="workspace-dot" /> NEWSROOM WORKSPACE
        </div>
        <nav aria-label="Newsroom navigation">
          {adminSections.map(([slug, label], i) => (
            <div key={slug}>
              {[0, 6, 12, 16].includes(i) && (
                <div className="nav-group-label">
                  {i === 0
                    ? "EDITORIAL"
                    : i === 6
                      ? "LIBRARY"
                      : i === 12
                        ? "PUBLICATION"
                        : "WORKSPACE"}
                </div>
              )}
              <Link
                href={`/${slug}`}
                aria-current={path === `/${slug}` ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="nav-symbol" aria-hidden="true">
                  {symbols[i]}
                </span>
                {label}
                {slug === "approvals" && <span className="nav-count">2</span>}
              </Link>
            </div>
          ))}
        </nav>
        <div className="sidebar-note">
          <strong>Milestone 01</strong>
          <p>
            Frontend demonstration
            <br />
            No authenticated session
          </p>
          <Link href="/login">About this preview ↗</Link>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <button
              className="menu-button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
            <span className="muted">Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>
              {adminSections.find(([s]) => path === `/${s}`)?.[1] ||
                "Story editor"}
            </strong>
          </div>
          <div className="preview-identity">
            <span className="preview-dot" /> Demo mode{" "}
            <span className="avatar">A</span>
          </div>
        </header>
        <div className="admin-demo-banner">
          <span>PREVIEW ENVIRONMENT</span> Changes stay in this browser tab.
          Authentication, approvals and publishing are not connected.
        </div>
        <main id="main" className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
