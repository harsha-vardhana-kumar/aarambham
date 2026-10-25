import type { ReactNode } from "react";
export function Logo({
  compact = false,
  assetSrc,
}: {
  compact?: boolean;
  assetSrc?: string;
}) {
  return (
    <span className={`logo ${compact ? "logo-compact" : ""}`}>
      {assetSrc ? (
        <img src={assetSrc} alt="ఆరంభం — AARAMBHAM" className="approved-logo" />
      ) : (
        <>
          <span className="wordmark" lang="te">
            ఆరంభం
          </span>
          <span className="logo-caption">
            AARAMBHAM <span>•</span> TRUTH IS GOD
          </span>
          <span className="provisional">Provisional text masthead</span>
        </>
      )}
    </span>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "blue" | "orange" | "red";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-symbol" aria-hidden="true">
        ▤
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
/** Original decorative vector illustrations, never documentary photographs. */
export function EditorialArt({
  kind = "river",
}: {
  kind?: "river" | "city" | "farm" | "books";
}) {
  return (
    <div className={`editorial-art art-${kind}`}>
      <svg viewBox="0 0 900 540" aria-hidden="true" focusable="false">
        <rect
          width="900"
          height="540"
          fill={kind === "books" ? "#eee3cf" : "#dbe6e3"}
        />
        <circle cx="710" cy="125" r="58" fill="#eab364" />
        {kind === "river" ? (
          <>
            <path
              d="M0 250L160 130 340 265 500 170 740 290 900 210V540H0Z"
              fill="#94aaa1"
            />
            <path d="M0 310Q250 260 420 310T900 300V540H0Z" fill="#506e61" />
            <path
              d="M380 300Q610 340 470 405T650 540H170Q150 460 350 430T380 300"
              fill="#a9c6ca"
            />
            <path
              d="M0 400Q120 330 300 370L200 540H0ZM900 350Q700 340 640 440L700 540H900Z"
              fill="#34554c"
            />
            <path
              d="M0 460L160 425M80 540L200 470M750 510L900 450"
              stroke="#d0bd85"
              strokeWidth="3"
            />
          </>
        ) : kind === "city" ? (
          <>
            <path d="M0 390H900V540H0Z" fill="#b5beb4" />
            {[50, 160, 280, 415, 560, 720].map((x, i) => (
              <g key={x}>
                <rect
                  x={x}
                  y={220 - (i % 3) * 35}
                  width="95"
                  height={220 + (i % 3) * 35}
                  fill={i % 2 ? "#526d75" : "#849795"}
                />
                <path
                  d={`M${x + 20} 280h15m20 0h15m-50 35h15m20 0h15m-50 35h15m20 0h15`}
                  stroke="#e9dec0"
                  strokeWidth="12"
                />
              </g>
            ))}
            <path d="M0 480H900" stroke="#e9dec0" strokeWidth="5" />
          </>
        ) : kind === "farm" ? (
          <>
            <path d="M0 290Q250 210 480 290T900 270V540H0Z" fill="#9baf88" />
            <path d="M0 350L900 300V540H0Z" fill="#5a7960" />
            {[0, 130, 260, 390, 520, 650, 780].map((x) => (
              <path
                key={x}
                d={`M450 310L${x} 540`}
                stroke="#cfbf87"
                strokeWidth="28"
              />
            ))}
            <path
              d="M100 310V180M50 235Q100 130 150 235"
              stroke="#3c5d4c"
              strokeWidth="24"
              fill="none"
            />
          </>
        ) : (
          <>
            <rect x="100" y="385" width="700" height="22" fill="#526d75" />
            {[140, 220, 315, 405, 515, 610].map((x, i) => (
              <rect
                key={x}
                x={x}
                y={160 + (i % 3) * 25}
                width="65"
                height={225 - (i % 3) * 25}
                rx="4"
                fill={["#526d75", "#b97646", "#a7ad8c"][i % 3]}
              />
            ))}
            <path
              d="M170 190V350M345 250V350M640 250V350"
              stroke="#e8dbc2"
              strokeWidth="3"
            />
          </>
        )}
      </svg>
      <span>సంపాదకీయ నమూనా చిత్రం · Illustration</span>
    </div>
  );
}
