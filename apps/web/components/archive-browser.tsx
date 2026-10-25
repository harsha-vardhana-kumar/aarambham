"use client";
import { useState } from "react";
import { districts } from "@aarambham/core";
import { Badge, EmptyState } from "@aarambham/ui";
export function ArchiveBrowser({
  historical = false,
}: {
  historical?: boolean;
}) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [district, setDistrict] = useState("");
  const [publication, setPublication] = useState("aarambham");
  return (
    <>
      <div className="filter-bar">
        <label className="field">
          ప్రచురణ
          <select
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
          >
            <option value="aarambham">ఆరంభం</option>
          </select>
        </label>
        {historical && (
          <label className="field">
            సంవత్సరం
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setDate("");
              }}
            >
              <option value="">అన్ని సంవత్సరాలు</option>
              {Array.from({ length: 28 }, (_, i) => 2026 - i).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
        )}
        <label className="field">
          నెల
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setDate("");
            }}
          >
            <option value="">అన్ని నెలలు</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          తేదీ
          <input
            type="date"
            min="1999-01-01"
            max="2026-12-31"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) {
                setYear(e.target.value.slice(0, 4));
                setMonth(String(Number(e.target.value.slice(5, 7))));
              }
            }}
          />
        </label>
        <label className="field">
          జిల్లా
          <select
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
        0 verified editions {year && `/ ${year}`} {month && `/ month ${month}`}{" "}
        {date && `/ ${date}`} {district && `/ ${district}`}
      </p>
      <div className="archive-viewer">
        <EmptyState
          title="ఆమోదించిన సంచికలు ఇంకా అందుబాటులో లేవు"
          description="PDF ఫైళ్లు, ప్రచురణ అనుమతులు, సంచిక వివరాలు ధృవీకరించిన తర్వాత ఇక్కడ చదవవచ్చు. తేదీ ఎంపిక సంచిక లభ్యతను సూచించదు."
        >
          <button
            className="button button-secondary"
            onClick={() => {
              setYear("");
              setMonth("");
              setDate("");
              setDistrict("");
            }}
          >
            ఫిల్టర్లు తొలగించండి
          </button>
        </EmptyState>
        <aside className="archive-meta">
          <Badge tone="orange">AWAITING VERIFIED MATERIAL</Badge>
          <h2>సంచిక వివరాలు</h2>
          <dl>
            <dt>Publication</dt>
            <dd>ఆరంభం / AARAMBHAM</dd>
            <dt>Edition date · Pages · District</dt>
            <dd>Awaiting verified edition</dd>
            <dt>Original scan reference</dt>
            <dd>Not supplied</dd>
            <dt>Digitization & OCR</dt>
            <dd>Planned; no scans processed</dd>
            <dt>PDF viewer</dt>
            <dd>No approved PDF to display</dd>
          </dl>
          <button className="button button-secondary" disabled>
            Download unavailable
          </button>
        </aside>
      </div>
    </>
  );
}
