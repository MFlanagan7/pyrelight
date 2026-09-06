import type { Metadata } from "next";
import { Cormorant_Garamond, Alegreya_Sans_SC, Spectral } from "next/font/google";
import { SiteFooter, SiteNav } from "@/components/site";
import "./globals.css";

// The three Starfall families, no substitutes. Loaded here rather than through
// the design system's Google Fonts @import so they are self-hosted at build
// time. Weights match what the design system actually uses.

/** Display: H1, section headings, card titles, quotes, numerals. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Heading: nav, buttons, eyebrows, meta, badges. Always uppercase, letterspaced. */
const alegreya = Alegreya_Sans_SC({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/** Body: all running copy. */
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://starfall.pyrelightpress.com",
  ),
  title: {
    default: "Starfall",
    template: "%s · Starfall",
  },
  description:
    "Starfall — a fifth-edition compatible fantasy setting from Pyrelight Press.",
};

const NAV = [
  { label: "What is Starfall", href: "/what-is-starfall" },
  { label: "Dispatches", href: "/dispatches" },
];

const FOOTER_COLUMNS = [
  {
    title: "The world",
    links: [
      { label: "What is Starfall", href: "/what-is-starfall" },
      { label: "Dispatches", href: "/dispatches" },
    ],
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${alegreya.variable} ${spectral.variable}`}
    >
      <body>
        <SiteNav links={NAV} />
        {children}
        <SiteFooter columns={FOOTER_COLUMNS} />
      </body>
    </html>
  );
}
