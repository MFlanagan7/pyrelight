import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Starfall — a fifth-edition compatible fantasy setting from Pyrelight Press";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card for every route under (frontend).
 *
 * Satori (which renders this) understands a narrow subset of CSS: flexbox only,
 * no grid, and every element with more than one child needs an explicit
 * display. It also cannot read woff2 — the font below is a TrueType file for
 * exactly that reason.
 *
 * Colours are hardcoded rather than read from tokens because this renders
 * outside the browser, where custom properties do not exist.
 */
export default async function Image() {
  const fontDir = join(process.cwd(), "src/assets/fonts");
  const [cormorant, alegreya] = await Promise.all([
    readFile(join(fontDir, "CormorantGaramond-Regular.ttf")),
    readFile(join(fontDir, "AlegreyaSansSC-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0D0C1B",
          // A small gold radial behind the wordmark only, per the design system.
          backgroundImage:
            "radial-gradient(60% 60% at 20% 50%, rgba(235,203,110,0.16) 0%, rgba(13,12,27,0) 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Alegreya",
            fontSize: 30,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#EBCB6E",
          }}
        >
          Pyrelight Press
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontFamily: "Cormorant",
            fontSize: 132,
            letterSpacing: "0.04em",
            color: "#EFECF6",
          }}
        >
          Starfall
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            maxWidth: 780,
            fontSize: 30,
            lineHeight: 1.45,
            color: "#ADA6C8",
          }}
        >
          Divinity comes down as light and lands as currency.
        </div>

        {/* Gradient hairline — the design system allows gradients only as
            hairlines and atmospheres, never as fills. */}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 320,
            height: 1,
            background: "linear-gradient(90deg, #EBCB6E 0%, rgba(235,203,110,0) 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "normal", weight: 400 },
        { name: "Alegreya", data: alegreya, style: "normal", weight: 500 },
      ],
    },
  );
}
