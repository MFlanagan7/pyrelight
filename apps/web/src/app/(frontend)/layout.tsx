import type { Metadata } from "next";
import { Cormorant_Garamond, Alegreya_Sans_SC, Spectral } from "next/font/google";
import { EnvBadge } from "@/components/EnvBadge";
import { SiteFooter, SiteNav } from "@/components/site";
import { getSiteSettings } from "@/lib/payload";
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

/**
 * Fallbacks for a site whose settings have not been authored yet. Without them
 * a fresh database renders a site with no navigation at all, which looks broken
 * rather than unconfigured. Editing SiteSettings replaces these entirely.
 *
 * Only routes that exist belong here. /resources is in the IA but not built, and
 * a nav that links to a 404 is worse than one item short.
 */
const FALLBACK_NAV = [
  { label: "The World", href: "/world" },
  { label: "Products", href: "/products" },
  { label: "Dispatches", href: "/dispatches" },
  { label: "About", href: "/about" },
];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  const nav =
    settings?.nav?.length
      ? settings.nav.map((n) => ({ label: n.label, href: n.href }))
      : FALLBACK_NAV;

  const footerColumns =
    settings?.footerColumns?.map((c) => ({
      title: c.title,
      links: (c.links ?? []).map((l) => ({ label: l.label, href: l.href })),
    })) ?? [];

  const socials =
    settings?.social?.map((s) => ({
      key: s.platform,
      href: s.url,
      label: s.platform,
    })) ?? [];

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${alegreya.variable} ${spectral.variable}`}
    >
      <body>
        <EnvBadge />
        <SiteNav links={nav} />
        {children}
        <SiteFooter
          columns={footerColumns}
          socials={socials}
          note={settings?.footerNote ?? undefined}
          newsletter={
            settings?.newsletter?.enabled
              ? {
                  heading: settings.newsletter.heading ?? undefined,
                  body: settings.newsletter.body ?? undefined,
                }
              : undefined
          }
        />
      </body>
    </html>
  );
}
