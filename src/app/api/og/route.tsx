import { ImageResponse } from "next/og";
import { getPage, getSettings } from "@/lib/seo/repository";

export const runtime = "nodejs";

// Dynamic social card: /api/og?path=/pricing
// Title and description come from the SEO database, so editing a page in the
// admin updates its share image too — no per-route image files to maintain.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/";

  const [page, settings] = await Promise.all([getPage(path), getSettings()]);
  const title = page?.ogTitle ?? page?.title ?? settings.siteName;
  const description = page?.ogDescription ?? page?.description ?? settings.defaultDescription;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#071A3D",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            backgroundColor: "#145CFF",
            opacity: 0.28,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: "#FFD43B" }} />
          <div
            style={{
              color: "#FFD43B",
              fontSize: 24,
              letterSpacing: 6,
              fontWeight: 700,
            }}
          >
            {settings.siteName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: title.length > 60 ? 62 : 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "rgba(255,255,255,0.72)",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {description.length > 155 ? `${description.slice(0, 155)}…` : description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 22 }}>
            {`${settings.baseUrl.replace(/^https?:\/\//, "")}${path === "/" ? "" : path}`}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 22 }}>
            Narrative Infrastructure
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
