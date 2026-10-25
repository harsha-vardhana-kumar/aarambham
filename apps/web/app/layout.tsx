import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@aarambham/ui";
import { categories } from "@aarambham/core";
import "@aarambham/ui/styles.css";
import "./web.css";
export const metadata: Metadata = {
  title: { default: "ఆరంభం | AARAMBHAM — Demo", template: "%s | ఆరంభం · Demo" },
  description:
    "ఆరంభం తెలుగు డిజిటల్ పత్రిక — నమూనా రూపకల్పన. Demonstration content only.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te">
      <body>
        <a className="skip-link" href="#main">
          ప్రధాన విషయానికి వెళ్లండి
        </a>
        <div className="demo-notice">
          నమూనా వెబ్‌సైట్ · Demonstration only — stories and illustrations are
          samples, not current news.
        </div>
        <header className="site-header">
          <div className="utility-bar">
            <span>
              తెలుగు ప్రజల స్వరం <span className="utility-divider">/</span> A
              DIGITAL PREVIEW
            </span>
            <div>
              <Link href="/our-legacy">1999 · మన వారసత్వం</Link>
              <Link href="/epaper">ఈ–పేపర్ ↗</Link>
            </div>
          </div>
          <div className="masthead-row">
            <div className="masthead-note">
              <span className="eyebrow">సత్యమే దైవం</span>
              <p>
                అక్షరానికి ఆరంభం.
                <br />
                ఆలోచనకు కొత్త దారి.
              </p>
            </div>
            <Link href="/" aria-label="ఆరంభం హోమ్">
              <Logo />
            </Link>
            <div className="masthead-date">
              <span className="eyebrow">DESIGN EDITION</span>
              <time dateTime="2026-10-24">24 అక్టోబర్ 2026</time>
              <span>నమూనా సంచిక · తెలుగు</span>
            </div>
          </div>
          <nav className="main-nav" aria-label="ప్రధాన విభాగాలు">
            <Link href="/" className="home-link">
              హోమ్
            </Link>
            <Link href="/latest">తాజా వార్తలు</Link>
            {categories.slice(0, 6).map((c) => (
              <Link key={c.id} href={`/${c.slug}`}>
                {c.name}
              </Link>
            ))}
            <Link href="/video">వీడియోలు</Link>
            <Link href="/archives">ఆర్కైవ్స్</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="footer-top">
            <div>
              <Logo compact />
              <p>
                స్పష్టమైన సమాచారం. బాధ్యతాయుతమైన జర్నలిజం.
                <br />A new digital chapter for a Telugu publication.
              </p>
            </div>
            <div>
              <h2>విభాగాలు</h2>
              {categories.slice(0, 5).map((c) => (
                <Link key={c.id} href={`/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div>
              <h2>ఆరంభం గురించి</h2>
              {[
                ["about", "మా గురించి"],
                ["our-legacy", "మన వారసత్వం"],
                ["editorial-team", "సంపాదక వర్గం"],
                ["contact", "సంప్రదించండి"],
              ].map(([slug, title]) => (
                <Link key={slug} href={`/${slug}`}>
                  {title}
                </Link>
              ))}
            </div>
            <div>
              <h2>పాఠకుల కోసం</h2>
              {[
                ["editorial-policy", "సంపాదకీయ విధానం"],
                ["corrections-policy", "సవరణల విధానం"],
                ["privacy", "గోప్యతా విధానం"],
                ["terms", "వినియోగ నిబంధనలు"],
              ].map(([slug, title]) => (
                <Link key={slug} href={`/${slug}`}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>ఆరంభం · AARAMBHAM · TRUTH IS GOD</span>
            <span>Milestone 1 preview • Policies awaiting approval</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
