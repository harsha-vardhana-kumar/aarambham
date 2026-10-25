export const dynamicParams = false;
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@aarambham/core";
import { Badge, EmptyState } from "@aarambham/ui";
import { NewsList } from "../../components/news-list";
import { ArchiveBrowser } from "../../components/archive-browser";
const info: Record<
  string,
  { title: string; eyebrow: string; paragraphs: string[] }
> = {
  about: {
    title: "ఆరంభం గురించి",
    eyebrow: "ABOUT THE PUBLICATION",
    paragraphs: [
      "ఆరంభం — AARAMBHAM. “TRUTH IS GOD” ఈ ప్రచురణ గుర్తింపులో భాగం. తెలుగు పాఠకులకు అనువైన డిజిటల్ అనుభవాన్ని ఈ నమూనా పరిచయం చేస్తుంది.",
      "అందించిన ప్రాజెక్ట్ వివరాల ప్రకారం చారిత్రక స్థాపన సంవత్సరం 1999. మూల పత్రాలు ఈ రిపోజిటరీలో లేవు; ప్రస్తుత ప్రచురణ స్థితి, నమోదు వివరాలు ఇంకా ధృవీకరించాలి.",
    ],
  },
  "our-legacy": {
    title: "మన వారసత్వం",
    eyebrow: "A HERITAGE, A NEW CHAPTER",
    paragraphs: [
      "1999 — అందించిన చారిత్రక సమాచారంలో పేర్కొన్న స్థాపన సంవత్సరం. ఇది నిరంతర ప్రచురణ లేదా పూర్తి ఆర్కైవ్ లభ్యతకు ధృవీకరణ కాదు.",
      "నారింజ రంగు తెలుగు మాస్ట్‌హెడ్, నీలి అంచు ఉన్న సంప్రదాయ గుర్తింపు ప్రధాన సూచన. అసలు ఆమోదించిన లోగో అందిన తర్వాత ప్రస్తుత తాత్కాలిక అక్షర రూపాన్ని భర్తీ చేస్తాం.",
      "పాత సంచికలను సేకరించడం, ప్రచురణ హక్కులను నిర్ధారించడం, స్కాన్ వివరాలను భద్రపరచడం భవిష్యత్తు ఆర్కైవ్ పనిలో భాగం.",
    ],
  },
  "editorial-team": {
    title: "సంపాదక వర్గం",
    eyebrow: "PEOPLE BEHIND THE PUBLICATION",
    paragraphs: [
      "ఆమోదించిన సంపాదక వర్గం వివరాలు ఇంకా అందలేదు. పేర్లు, పదవులు, జీవిత విశేషాలు ధృవీకరణ తర్వాత మాత్రమే ఇక్కడ జోడిస్తాం.",
    ],
  },
  contact: {
    title: "సంప్రదించండి",
    eyebrow: "READER DESK",
    paragraphs: [
      "అధికారిక సంప్రదింపు వివరాలు ఆమోదం కోసం వేచి ఉన్నాయి. ఈ నమూనా వెబ్‌సైట్ సందేశాలు లేదా వ్యక్తిగత సమాచారాన్ని సేకరించదు.",
      "వార్తా సూచనలు, సవరణలు, ప్రకటనల కోసం వేర్వేరు అధికారిక సంప్రదింపు మార్గాలను భవిష్యత్తులో జోడించవచ్చు. PRESS ID కార్డుల నుంచి వ్యక్తిగత సమాచారం ఉపయోగించలేదు.",
    ],
  },
  privacy: {
    title: "గోప్యతా విధానం",
    eyebrow: "DRAFT POLICY — NOT APPROVED",
    paragraphs: [
      "ఈ నమూనాలో వినియోగదారుల ఖాతాలు, విశ్లేషణ ట్రాకర్లు లేదా సంప్రదింపు ఫారమ్‌లు అమలు చేయలేదు. హోస్టింగ్ సేవ అందించే యాక్సెస్ లాగ్‌ల విధానం అమలుకు ముందు సమీక్షించాలి.",
      "పూర్తి విధానంలో డేటా సేకరణ ఉద్దేశ్యం, నిల్వ కాలం, కుకీలు, సేవా సంస్థలు, వినియోగదారుల హక్కులు, అధికారిక సంప్రదింపు వివరాలు ఆమోదించాలి.",
    ],
  },
  "editorial-policy": {
    title: "సంపాదకీయ విధానం",
    eyebrow: "PROPOSED PRINCIPLES — AWAITING APPROVAL",
    paragraphs: [
      "వార్తలు ప్రచురించే ముందు మూలాల పరిశీలన, వాస్తవ నిర్ధారణ, సందర్భం, సంపాదకీయ సమీక్షకు ప్రాధాన్యం ఇవ్వాలని ప్రతిపాదిస్తున్నాం.",
      "వార్త, అభిప్రాయం, ప్రకటన మధ్య స్పష్టమైన తేడా ఉండాలి. ఆరోగ్య కథనాలకు సంబంధిత నిపుణుల సమీక్ష అవసరం. ఇవి ఆమోదం కోసం రూపొందించిన ముసాయిదా సూత్రాలు మాత్రమే.",
    ],
  },
  "corrections-policy": {
    title: "సవరణల విధానం",
    eyebrow: "DRAFT CORRECTIONS PROCESS",
    paragraphs: [
      "తప్పును గుర్తించినప్పుడు ఆధారాలతో సమీక్షించి, మార్పును కథనంపై స్పష్టంగా చూపించే విధానాన్ని ప్రతిపాదిస్తున్నాం.",
      "అధికారిక సవరణల సంప్రదింపు చిరునామా, బాధ్యత వహించే సంపాదకుడు, స్పందన కాలపరిమితి ఇంకా ఆమోదించలేదు. ఈ నమూనా ఫిర్యాదులు స్వీకరించదు.",
    ],
  },
  terms: {
    title: "వినియోగ నిబంధనలు",
    eyebrow: "DRAFT TERMS — NOT LEGAL ADVICE",
    paragraphs: [
      "ఇది ప్రదర్శన కోసం రూపొందించిన వెబ్‌సైట్. నమూనా కథనాలను నిజమైన వార్తలుగా లేదా ఆరోగ్య, ఆర్థిక సలహాగా పరిగణించవద్దు.",
      "ప్రచురణ హక్కులు, అనుమతించిన వినియోగం, లింకులు, బాధ్యతలు, వర్తించే చట్టం వంటి అంశాలు న్యాయ సమీక్ష తర్వాత ఖరారు చేయాలి.",
    ],
  },
};
const specials: Record<string, string> = {
  latest: "తాజా వార్తలు",
  epaper: "ఈ–పేపర్",
  archives: "చారిత్రక సంచికలు",
  video: "వీడియో వార్తలు",
};
export function generateStaticParams() {
  return [
    ...categories.map((c) => c.slug),
    ...Object.keys(info),
    ...Object.keys(specials),
  ].map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  return {
    title:
      info[section]?.title ||
      specials[section] ||
      categories.find((c) => c.slug === section)?.name ||
      "Not found",
  };
}
export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = info[section];
  if (page)
    return (
      <article className="prose-page">
        <span className="eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <Badge tone="orange">MILESTONE 1 · REVIEW REQUIRED</Badge>
        {page.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="trust-note">
          ప్రచురణ నమోదు, సంపాదకుల వివరాలు, అధికారిక విధానాలు ధృవీకరణ తర్వాత
          మాత్రమే జోడించాలి.
        </div>
      </article>
    );
  const category = categories.find((c) => c.slug === section);
  if (!category && !specials[section]) notFound();
  return (
    <div className="page-wrap">
      <div className="page-intro">
        <span className="eyebrow">
          AARAMBHAM / {section.replaceAll("-", " ").toUpperCase()}
        </span>
        <h1>{category?.name || specials[section]}</h1>
        <p>
          {section === "archives"
            ? "1999 నుంచి చారిత్రక సంచికలను భద్రపరిచే భవిష్యత్తు వేదిక. అన్ని సంవత్సరాల పత్రికలు అందుబాటులో ఉన్నాయని సూచించడం లేదు."
            : "ఇది ప్రదర్శన కోసం రూపొందించిన విభాగం. ఆమోదించిన వాస్తవ కంటెంట్ ఇంకా జోడించలేదు."}
        </p>
      </div>
      {section === "epaper" || section === "archives" ? (
        <ArchiveBrowser historical={section === "archives"} />
      ) : section === "video" ? (
        <EmptyState
          title="వీడియోలు ఇంకా అందుబాటులో లేవు"
          description="ఆమోదించిన వీడియోలు, శీర్షికలు, ట్రాన్స్‌క్రిప్ట్‌లు జోడించిన తర్వాత ఇక్కడ చూడవచ్చు."
        />
      ) : (
        <Suspense fallback={<p>కథనాలు లోడ్ అవుతున్నాయి…</p>}>
          <NewsList category={category?.id} />
        </Suspense>
      )}
    </div>
  );
}
