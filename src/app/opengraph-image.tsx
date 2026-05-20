import { ImageResponse } from "next/og";

export const alt =
  "Dzong Cafe & Grill — Branch Operations Console. A multi-module restaurant dashboard demo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #1c1410 0%, #4a1d0a 50%, #c2410c 100%)",
          padding: "72px",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7c2d12",
              fontSize: "56px",
              fontWeight: 900,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#fbbf24",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Branch Operations Console
            </div>
            <div style={{ fontSize: "40px", fontWeight: 800, marginTop: "4px" }}>
              Dzong Cafe &amp; Grill
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "56px",
            display: "flex",
            flexDirection: "column",
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "950px",
          }}
        >
          <div style={{ display: "flex" }}>Multi-branch restaurant dashboard</div>
          <div style={{ display: "flex", color: "#fbbf24" }}>
            built with Next.js + Supabase-ready architecture
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          {[
            { label: "Sales", value: "₱64K" },
            { label: "Orders", value: "187" },
            { label: "Labor", value: "23.8%" },
            { label: "Rating", value: "4.2/5" },
          ].map((tile) => (
            <div
              key={tile.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "16px", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}>
                {tile.label}
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800, marginTop: "6px" }}>
                {tile.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ display: "flex" }}>Next.js 16</div>
            <div style={{ display: "flex" }}>·</div>
            <div style={{ display: "flex" }}>Tailwind v4</div>
            <div style={{ display: "flex" }}>·</div>
            <div style={{ display: "flex" }}>Recharts</div>
            <div style={{ display: "flex" }}>·</div>
            <div style={{ display: "flex" }}>Vercel</div>
          </div>
          <div style={{ fontWeight: 600, color: "#fbbf24" }}>dzong.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
