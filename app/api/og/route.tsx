import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function clampText(text: string, max = 90) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = clampText(searchParams.get("title") ?? "TaskLync");
  const category = searchParams.get("category");

  const geistBold = await fetch(
    "https://tasklync.com/fonts/Geist-Bold.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#080B11",
          padding: "64px",
          fontFamily: "Geist",
        }}
      >
        {/* Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(26,107,255,0.18), transparent 60%)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              backgroundColor: "#1A6BFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: "white",
            }}
          >
            TL
          </div>

          <span style={{ color: "#F0F4F8", fontSize: 22, fontWeight: 700 }}>
            TaskLync
          </span>
        </div>

        {/* Category */}
        {category && (
          <span
            style={{
              color: "#1A6BFF",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h1
          style={{
            color: "#F0F4F8",
            fontSize: title.length > 60 ? 40 : 52,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 900,
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ color: "#8B9BBB", fontSize: 16 }}>
            tasklync.com — Your home, handled.
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistBold,
          weight: 700,
        },
      ],
    }
  );
}