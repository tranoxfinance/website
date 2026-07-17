import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy: Record<
  Locale,
  { alt: string; tag: string; headline: string; slogan: string }
> = {
  "en-NG": {
    alt: "Tranox — Instant money transfers between Nigeria and Ivory Coast",
    tag: "CROSS-BORDER TRANSFERS",
    headline: "Send money between Nigeria and Ivory Coast in minutes",
    slogan: "Fast. Secure. Global.",
  },
  "fr-CI": {
    alt: "Tranox — Transferts d'argent instantanés entre le Nigéria et la Côte d'Ivoire",
    tag: "TRANSFERTS TRANSFRONTALIERS",
    headline:
      "Envoyez de l'argent entre le Nigéria et la Côte d'Ivoire en quelques minutes",
    slogan: "Rapide. Sûr. Mondial.",
  },
};

export function generateImageMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const locale = hasLocale(params.lang) ? params.lang : defaultLocale;
  return [
    {
      id: locale,
      alt: copy[locale].alt,
      size,
      contentType,
    },
  ];
}

export default async function Image({ id }: { id: Promise<string | number> }) {
  const rawId = String(await id);
  const locale = hasLocale(rawId) ? rawId : defaultLocale;
  const t = copy[locale];

  const logoSrc = `data:image/png;base64,${readFileSync(
    join(process.cwd(), "public", "og-logo.png"),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #060e1d 0%, #0a1322 55%, #0d1f2e 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} width={210} height={52} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              color: "#0d8fd2",
              marginBottom: 24,
              letterSpacing: "0.12em",
            }}
          >
            {t.tag}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            {t.headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 44,
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                display: "flex",
                padding: "12px 28px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              NGN
            </span>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0d8fd2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "flex" }}
            >
              <path d="m16 3 4 4-4 4" />
              <path d="M20 7H4" />
              <path d="m8 21-4-4 4-4" />
              <path d="M4 17h16" />
            </svg>
            <span
              style={{
                display: "flex",
                padding: "12px 28px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              XOF
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>{t.slogan}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
