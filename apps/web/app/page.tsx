import Link from "next/link";
import { demoRepository, districts } from "@aarambham/core";
import { SectionHeading, Badge } from "@aarambham/ui";
import { StoryCard } from "../components/story-card";
export default function Home() {
  const stories = demoRepository.listArticles();
  return (
    <div className="page-wrap">
      <h1 className="sr-only">ఆరంభం — తెలుగు డిజిటల్ పత్రిక నమూనా</h1>
      <div className="breaking-strip">
        <span className="breaking-label">● ముఖ్యాంశాలు</span>
        <p>
          డిజిటల్ ఆరంభానికి స్వాగతం — ఇది వార్తల ప్రదర్శన కోసం రూపొందించిన నమూనా
          మాత్రమే.
        </p>
        <Badge tone="red">DEMO</Badge>
      </div>
      <div className="edition-heading">
        <span className="eyebrow">THE FRONT PAGE / ముఖచిత్రం</span>
        <span>సమాచారం · విశ్లేషణ · ప్రజాస్వరం</span>
      </div>
      <section className="front-grid" aria-label="ప్రధాన కథనాలు">
        <StoryCard article={stories[0]} lead />
        <div className="secondary-stories">
          <StoryCard article={stories[1]} compact />
          <StoryCard article={stories[2]} compact />
        </div>
        <aside className="front-sidebar">
          <div className="sidebar-heading">
            <h2>వార్తా సంగ్రహం</h2>
            <span>THE BRIEF</span>
          </div>
          {stories.slice(3, 6).map((s, i) => (
            <Link
              className="brief-story"
              href={`/article/${s.slug}`}
              key={s.id}
            >
              <span className="brief-number">0{i + 1}</span>
              <div>
                <Badge>నమూనా</Badge>
                <h3>{s.title}</h3>
              </div>
            </Link>
          ))}
          <div className="quote-card">
            <span className="eyebrow">OUR GUIDING WORDS</span>
            <strong>“సత్యమే దైవం”</strong>
            <p>TRUTH IS GOD</p>
            <Link href="/our-legacy">మన వారసత్వం గురించి ↗</Link>
          </div>
        </aside>
      </section>
      <div className="topic-ribbon">
        <span>చదవండి</span>
        {[
          ["education-jobs", "విద్య · ఉద్యోగాలు"],
          ["business-agriculture", "వ్యవసాయం"],
          ["health-ayurveda", "ఆరోగ్యం"],
          ["international", "ప్రపంచం"],
        ].map(([s, t]) => (
          <Link key={s} href={`/${s}`}>
            {t} ↗
          </Link>
        ))}
      </div>
      <section className="content-section">
        <SectionHeading eyebrow="THE LATEST" title="తాజా కథనాలు">
          <Link href="/latest">అన్ని కథనాలు →</Link>
        </SectionHeading>
        <div className="stories-grid">
          {stories.slice(3, 7).map((a) => (
            <StoryCard article={a} key={a.id} />
          ))}
        </div>
      </section>
      <section className="district-section">
        <SectionHeading eyebrow="CLOSER TO HOME" title="మన జిల్లా · మన వార్త">
          <Link href="/districts">అన్ని జిల్లాలు →</Link>
        </SectionHeading>
        <div className="district-links">
          {districts.map((d, i) => (
            <Link href={`/districts?district=${d.id}`} key={d.id}>
              <span>
                0{i + 1} / {d.state}
              </span>
              <h3>{d.name}</h3>
              <span>నమూనా కథనాలు చూడండి ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <div className="bottom-grid">
        <section>
          <SectionHeading eyebrow="THE READING ROOM" title="పత్రికతో మీ ఉదయం" />
          <div className="epaper-promo">
            <div className="mini-paper">
              <span>నమూనా లేఅవుట్</span>
              <strong>ఆరంభం</strong>
              <hr />
              <b>
                తెలుగు అక్షరానికి
                <br />
                కొత్త ఆరంభం
              </b>
              <div className="paper-lines" />
            </div>
            <div>
              <Badge tone="blue">ఈ–పేపర్</Badge>
              <h3>
                పత్రిక అనుభూతి.
                <br />
                డిజిటల్ సౌలభ్యం.
              </h3>
              <p>ఆమోదించిన సంచికలు అందిన తర్వాత ఇక్కడ అందుబాటులో ఉంటాయి.</p>
              <Link className="button button-secondary" href="/epaper">
                ఈ–పేపర్ విభాగం →
              </Link>
            </div>
          </div>
        </section>
        <section>
          <SectionHeading eyebrow="IN FOCUS" title="వీడియో కథనాలు" />
          <div className="video-promo">
            <span className="play-icon" aria-hidden="true">
              ▷
            </span>
            <Badge>COMING AFTER APPROVAL</Badge>
            <h3>
              చూడండి. తెలుసుకోండి.
              <br />
              కొత్త కోణంలో ఆలోచించండి.
            </h3>
            <p>వీడియో కంటెంట్ ఇంకా జోడించలేదు.</p>
            <Link href="/video">వీడియో విభాగం →</Link>
          </div>
        </section>
      </div>
      <section className="content-section">
        <SectionHeading
          eyebrow="EDITOR’S SAMPLE SELECTION · NOT LIVE METRICS"
          title="ఎంపిక చేసిన కథనాలు"
        />
        <div className="trending-list">
          {stories.slice(1, 5).map((s, i) => (
            <Link key={s.id} href={`/article/${s.slug}`}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
