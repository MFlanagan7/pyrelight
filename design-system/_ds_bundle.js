/* @ds-bundle: {"format":4,"namespace":"StarfallDesignSystem_6487a4","components":[{"name":"FALLING_STAR","sourcePath":"assets/marks.js"},{"name":"STAR_TRAIL_PATH","sourcePath":"assets/marks.js"},{"name":"PYRE_FLAME","sourcePath":"assets/marks.js"},{"name":"PYRE_ALTAR","sourcePath":"assets/marks.js"},{"name":"SCROLL_CUE","sourcePath":"assets/marks.js"},{"name":"SOCIAL_PATHS","sourcePath":"assets/social-paths.js"},{"name":"CartButton","sourcePath":"components/commerce/CartButton.jsx"},{"name":"CartDrawer","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"CartLineItem","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"Callout","sourcePath":"components/content/Callout.jsx"},{"name":"DataTable","sourcePath":"components/content/DataTable.jsx"},{"name":"EmptyState","sourcePath":"components/content/EmptyState.jsx"},{"name":"FaqAccordion","sourcePath":"components/content/FaqAccordion.jsx"},{"name":"InfoBox","sourcePath":"components/content/InfoBox.jsx"},{"name":"SpoilerBlock","sourcePath":"components/content/SpoilerBlock.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ImageFrame","sourcePath":"components/core/ImageFrame.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"QuoteBlock","sourcePath":"components/core/QuoteBlock.jsx"},{"name":"ReadingPanel","sourcePath":"components/core/ReadingPanel.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"StatRow","sourcePath":"components/core/StatRow.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"SearchField","sourcePath":"components/navigation/SearchField.jsx"},{"name":"TableOfContents","sourcePath":"components/navigation/TableOfContents.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"WikiSidebar","sourcePath":"components/navigation/WikiSidebar.jsx"},{"name":"ContentCard","sourcePath":"components/site/ContentCard.jsx"},{"name":"ListRow","sourcePath":"components/site/ListRow.jsx"},{"name":"ListGroup","sourcePath":"components/site/ListRow.jsx"},{"name":"NewsletterForm","sourcePath":"components/site/NewsletterForm.jsx"},{"name":"ProductCard","sourcePath":"components/site/ProductCard.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"},{"name":"SiteNav","sourcePath":"components/site/SiteNav.jsx"},{"name":"SocialLinks","sourcePath":"components/site/SocialLinks.jsx"},{"name":"StartHereStrip","sourcePath":"components/site/StartHereStrip.jsx"}],"sourceHashes":{"assets/marks.js":"dfa88fe6ab7b","assets/social-paths.js":"d4e5d0a59266","components/commerce/CartButton.jsx":"4d12ee64e0f2","components/commerce/CartDrawer.jsx":"1a2c70472f03","components/content/Accordion.jsx":"a687f887a81c","components/content/Callout.jsx":"e987a97fdccf","components/content/DataTable.jsx":"292744a74de5","components/content/EmptyState.jsx":"bd5536d49782","components/content/FaqAccordion.jsx":"2184f94e1d70","components/content/InfoBox.jsx":"ef3de03081d1","components/content/SpoilerBlock.jsx":"fc6f4b1c9b56","components/content/StatBlock.jsx":"45ec4544ab07","components/core/Badge.jsx":"0774d1aefc48","components/core/Button.jsx":"700bcee89f05","components/core/ImageFrame.jsx":"6637b51d8b02","components/core/Pill.jsx":"3e4e5dcbe5a8","components/core/QuoteBlock.jsx":"92a360ed0537","components/core/ReadingPanel.jsx":"6065227b71c8","components/core/SectionHeading.jsx":"e717430e2f72","components/core/StatRow.jsx":"dbe999712cb5","components/navigation/Breadcrumbs.jsx":"a1f43bac1011","components/navigation/Pagination.jsx":"d4e84cbaa756","components/navigation/SearchField.jsx":"f484199ad6ba","components/navigation/TableOfContents.jsx":"15e0707a5f07","components/navigation/Tabs.jsx":"98d4b976545e","components/navigation/WikiSidebar.jsx":"11b5e3be17b7","components/site/ContentCard.jsx":"0824a1c7ecd3","components/site/ListRow.jsx":"61e60acc941f","components/site/NewsletterForm.jsx":"4c3d82140128","components/site/ProductCard.jsx":"143fc3c9109a","components/site/SiteFooter.jsx":"d1ee8fb715f2","components/site/SiteNav.jsx":"39b14d4317a0","components/site/SocialLinks.jsx":"c20407cdcf92","components/site/StartHereStrip.jsx":"1ace47222aea"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StarfallDesignSystem_6487a4 = window.StarfallDesignSystem_6487a4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/marks.js
try { (() => {
/**
 * The two brand marks, as path data at 24×24. Both come from the attached brand guide's
 * motif description (eight-point falling star; altar pyre). No third mark exists.
 */
const FALLING_STAR = "M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z";
const STAR_TRAIL_PATH = "M8 8 C 120 40 220 96 330 158"; /* draw in a 0 0 400 200 viewBox */
const PYRE_FLAME = "M12 2 C15 8 19 10 19 15 A7 7 0 0 1 5 15 C5 10 9 8 12 2 Z";
const PYRE_ALTAR = "M3 20.5 H21 V22 H3 Z M5 18 H19 V19.5 H5 Z";
const SCROLL_CUE = "M5 9l7 7 7-7";
Object.assign(__ds_scope, { FALLING_STAR, STAR_TRAIL_PATH, PYRE_FLAME, PYRE_ALTAR, SCROLL_CUE });
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/marks.js", error: String((e && e.message) || e) }); }

// assets/social-paths.js
try { (() => {
/**
 * SIMPLIFIED PLACEHOLDER GLYPHS — geometric approximations at 24×24, drawn so nothing
 * misrepresents a platform's real mark at 16px. Replace each with the platform's official
 * brand SVG before launch (all of them publish brand kits).
 */
const SOCIAL_PATHS = {
  "instagram": "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 1.8A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10A2.2 2.2 0 0 0 19.2 17V7A2.2 2.2 0 0 0 17 4.8ZM12 7.6A4.4 4.4 0 1 1 7.6 12A4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12A2.6 2.6 0 0 0 12 9.4Zm5.1-2.6a1.1 1.1 0 1 1-1.1 1.1a1.1 1.1 0 0 1 1.1-1.1Z",
  "facebook": "M13.2 21.9V13.9h2.9l.5-3.4h-3.4V8.3c0-1 .3-1.6 1.7-1.6h1.8V3.7A24 24 0 0 0 14 3.5c-2.6 0-4.4 1.6-4.4 4.5v2.5H6.9v3.4h2.7v8Z",
  "reddit": "M22 11.6a2.2 2.2 0 0 0-3.7-1.6a10.9 10.9 0 0 0-5.4-1.7l1-3.1l2.7.6a1.6 1.6 0 1 0 .3-1.7l-3.6-.8a.7.7 0 0 0-.8.5l-1.3 4.2A11 11 0 0 0 5.7 10A2.2 2.2 0 0 0 2 11.6a2.2 2.2 0 0 0 1.1 1.9v.5c0 3.4 4 6.1 8.9 6.1s8.9-2.7 8.9-6.1v-.5A2.2 2.2 0 0 0 22 11.6ZM8.4 12.6a1.3 1.3 0 1 1 1.3 1.3a1.3 1.3 0 0 1-1.3-1.3Zm7.3 4.2a5.9 5.9 0 0 1-3.7 1a5.9 5.9 0 0 1-3.7-1a.6.6 0 0 1 .8-.9a4.8 4.8 0 0 0 2.9.7a4.8 4.8 0 0 0 2.9-.7a.6.6 0 0 1 .8.9Zm-1.4-2.9a1.3 1.3 0 1 1 1.3-1.3a1.3 1.3 0 0 1-1.3 1.3Z",
  "discord": "M19.5 6.6A15.4 15.4 0 0 0 15.7 5.3l-.3.7a11.6 11.6 0 0 1 3.3 1.5a12.2 12.2 0 0 0-12.6 0A11.6 11.6 0 0 1 9.4 6l-.3-.7A15.4 15.4 0 0 0 5.3 6.6C3 10.3 2.4 13.9 2.7 17.4A15 15 0 0 0 7.3 19.7l.9-1.4a9.3 9.3 0 0 1-1.6-.8l.4-.3a10.8 10.8 0 0 0 8.9 0l.4.3a9.3 9.3 0 0 1-1.6.8l.9 1.4a15 15 0 0 0 4.6-2.3c.4-4.1-.6-7.7-2.7-10.8ZM9.3 15.3a1.7 1.7 0 0 1 0-3.4a1.7 1.7 0 0 1 0 3.4Zm5.4 0a1.7 1.7 0 0 1 0-3.4a1.7 1.7 0 0 1 0 3.4Z",
  "youtube": "M21.6 7.4c-.2-.9-.9-1.6-1.8-1.8C18 5.2 12 5.2 12 5.2s-6 0-7.8.4c-.9.2-1.6.9-1.8 1.8A25 25 0 0 0 2 12a25 25 0 0 0 .4 4.6c.2.9.9 1.6 1.8 1.8c1.8.4 7.8.4 7.8.4s6 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8A25 25 0 0 0 22 12a25 25 0 0 0-.4-4.6ZM10.1 15.2V8.8L15.6 12Z",
  "tiktok": "M16.4 3h-3.1v11.6a2.4 2.4 0 1 1-2.4-2.4a2.5 2.5 0 0 1 .7.1V9.1a5.6 5.6 0 1 0 4.8 5.5V9.4A6.3 6.3 0 0 0 20 10.5V7.4A3.6 3.6 0 0 1 16.4 3Z",
  "bluesky": "M12 10.2C10.9 8 7.8 4.2 5 3.1C2.5 2.1 1.6 3.4 1.6 5.3c0 1.1.6 4.6 1 5.2c.5 1 1.9 1.4 3.1 1.2c-1.9.3-2.4 1.4-1.4 2.5c1.9 2.1 4.1 1.1 5.3-.6c.4-.6.6-1 1.4-2.4c.8 1.4 1 1.8 1.4 2.4c1.2 1.7 3.4 2.7 5.3.6c1-1.1.5-2.2-1.4-2.5c1.2.2 2.6-.2 3.1-1.2c.4-.6 1-4.1 1-5.2c0-1.9-.9-3.2-3.4-2.2c-2.8 1.1-5.9 4.9-7 7.1Z",
  "itch": "M4.2 4.3C3.2 4.9 2 6.6 2 7.2v1c0 1.3 1.2 2.4 2.3 2.4c1.3 0 2.4-1.1 2.4-2.4c0 1.3 1 2.4 2.3 2.4s2.3-1.1 2.3-2.4c0 1.3 1.1 2.4 2.4 2.4s2.3-1.1 2.3-2.4c0 1.3 1.1 2.4 2.4 2.4c1.1 0 2.3-1.1 2.3-2.4v-1c0-.6-1.2-2.3-2.2-2.9A97 97 0 0 0 12 4c-3.4 0-6.4.1-7.8.3Zm5.2 7.6l-.8 1.3a1.5 1.5 0 0 1-2.8-.5a1.6 1.6 0 0 1-2.4 1.3c0 1.2.1 3.2.3 4.3c.2 1 .4 1.7 1.4 1.8c1.1.1 3.3.2 6.1.2s5 0 6.1-.2c1-.1 1.2-.8 1.4-1.8c.2-1.1.3-3.1.3-4.3a1.6 1.6 0 0 1-2.4-1.3a1.5 1.5 0 0 1-2.8.5l-.8-1.3Zm2.6 1.6c.8 0 1.5.1 1.9.6c.5.5.6 1.4.6 2.1c0 .5-.1.9-.5.9c-.6 0-1.1-.6-1.6-1.2c-.2-.2-.3-.4-.4-.4s-.2.2-.4.4c-.5.6-1 1.2-1.6 1.2c-.4 0-.5-.4-.5-.9c0-.7.1-1.6.6-2.1c.4-.5 1.1-.6 1.9-.6Z",
  "drivethru": "M12 2.2 20.6 7v10L12 21.8L3.4 17V7Zm0 2.1L5.4 8.1v7.8L12 19.7l6.6-3.8V8.1Zm0 3.1 3.9 2.2v4.8L12 16.6l-3.9-2.2V9.6Z",
  "patreon": "M15.6 3.2a6.8 6.8 0 1 0 0 13.6a6.8 6.8 0 0 0 0-13.6ZM3.2 20.8h3.3V3.2H3.2Z",
  "kofi": "M4 5.5h12.2a4.6 4.6 0 0 1 0 9.2h-1.1A5.6 5.6 0 0 1 9.6 19H8A4 4 0 0 1 4 15Zm12.2 1.8v5.6a2.8 2.8 0 0 0 0-5.6ZM3.4 20.4h13.2v1.8H3.4Z"
};
Object.assign(__ds_scope, { SOCIAL_PATHS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/social-paths.js", error: String((e && e.message) || e) }); }

// components/commerce/CartButton.jsx
try { (() => {
/** Nav cart affordance. Gold count bubble appears only when the cart has items. */
function CartButton({
  count = 0,
  onClick,
  href,
  label = "Cart",
  style
}) {
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    "aria-label": count ? label + ", " + count + " items" : label + ", empty",
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      gap: ".5rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-sm)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      padding: ".45rem 1rem",
      borderRadius: "var(--sf-radius-pill)",
      border: "1px solid var(--sf-line-strong)",
      background: "var(--action-ghost-bg)",
      color: "var(--sf-ink-100)",
      textDecoration: "none",
      cursor: "pointer",
      transition: "border-color var(--sf-dur-hover) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    "aria-hidden": "true",
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h3l2.2 9.4A2 2 0 0 0 11.1 17h6.6a2 2 0 0 0 1.95-1.55L21 9H8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "20",
    r: "1.3",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "20",
    r: "1.3",
    fill: "currentColor"
  })), label, count > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      minWidth: "1.35rem",
      height: "1.35rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--sf-radius-pill)",
      background: "var(--sf-gold-400)",
      color: "var(--action-primary-ink)",
      fontSize: "var(--sf-text-2xs)",
      letterSpacing: 0
    }
  }, count));
}
Object.assign(__ds_scope, { CartButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartButton.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
/** Collapsible rows for FAQs, long tables and spoiler sections. */
function Accordion({
  items = [],
  openIndex,
  onToggle,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1px",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      background: "rgba(162,156,196,.14)",
      ...style
    }
  }, items.map((it, i) => {
    const open = i === openIndex;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-expanded": open,
      onClick: () => onToggle && onToggle(open ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.1rem 1.3rem",
        border: 0,
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--sf-font-heading)",
        fontSize: "1rem",
        letterSpacing: "var(--sf-track-nav)",
        textTransform: "uppercase",
        color: open ? "var(--text-accent)" : "var(--text-heading)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, it.title), /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "14",
      height: "14",
      "aria-hidden": "true",
      style: {
        flex: "none",
        color: "var(--text-meta)",
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform var(--sf-dur-hover) var(--sf-ease)"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 9l7 7 7-7",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5"
    }))), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 1.3rem 1.3rem",
        fontSize: ".98rem",
        lineHeight: 1.65,
        color: "var(--text-body)"
      }
    }, it.body));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/Callout.jsx
try { (() => {
const tones = {
  lore: {
    border: "var(--sf-line-gold)",
    tint: "var(--tint-gold)",
    label: "var(--sf-gold-400)"
  },
  gm: {
    border: "rgba(107,43,43,.55)",
    tint: "rgba(107,43,43,.18)",
    label: "#D89A9A"
  },
  rule: {
    border: "var(--sf-line-sea)",
    tint: "var(--tint-teal)",
    label: "var(--sf-teal-300)"
  },
  note: {
    border: "var(--sf-line)",
    tint: "var(--tint-violet)",
    label: "var(--text-label)"
  }
};

/** Aside inside long-form: in-world lore, GM-only advice, a rules clarification, or a note. */
function Callout({
  tone = "note",
  label,
  children,
  style
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".6rem",
      padding: "1.15rem 1.25rem",
      borderLeft: "2px solid " + t.border,
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0",
      background: t.tint,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: t.label
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".98rem",
      lineHeight: 1.65,
      color: "var(--text-over-image)"
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Callout.jsx", error: String((e && e.message) || e) }); }

// components/content/DataTable.jsx
try { (() => {
/** Rules and price tables. Hairline rows, small-caps head, no vertical rules. */
function DataTable({
  caption,
  columns = [],
  rows = [],
  align = [],
  style
}) {
  const cellPad = ".7rem .9rem";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      background: "var(--surface-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: ".95rem"
    }
  }, caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: "top",
      textAlign: "left",
      padding: cellPad,
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-accent)",
      borderBottom: "1px solid var(--border-card)"
    }
  }, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    scope: "col",
    style: {
      padding: cellPad,
      textAlign: align[i] || "left",
      fontFamily: "var(--sf-font-heading)",
      fontWeight: "var(--sf-weight-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      borderBottom: "1px solid var(--sf-line-gold)",
      whiteSpace: "nowrap"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: i % 2 ? "rgba(58,46,92,.16)" : "transparent"
    }
  }, r.map((cell, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      padding: cellPad,
      textAlign: align[j] || "left",
      lineHeight: 1.5,
      color: j === 0 ? "var(--text-heading)" : "var(--text-body)",
      borderBottom: i === rows.length - 1 ? "0" : "1px solid var(--border-section)"
    }
  }, cell)))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/content/EmptyState.jsx
try { (() => {
/** Nothing-here state for search, filtered grids and an empty cart. */
function EmptyState({
  title,
  body,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: ".9rem",
      padding: "3.5rem 1.5rem",
      textAlign: "center",
      border: "1px dashed var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-card)",
      background: "var(--tint-violet)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    "aria-hidden": "true",
    style: {
      color: "var(--sf-lilac-400)",
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: "44ch",
      fontSize: ".98rem",
      lineHeight: 1.6,
      color: "var(--text-body-card)"
    }
  }, body), action);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/content/FaqAccordion.jsx
try { (() => {
/** FAQ list: Accordion chrome, but rows open independently and manage themselves. */
function FaqAccordion({
  items = [],
  allowMultiple = true,
  defaultOpen = [],
  style
}) {
  const [openSet, setOpenSet] = React.useState(() => new Set(defaultOpen));
  if (!allowMultiple) {
    const first = openSet.size ? Math.min(...openSet) : -1;
    return /*#__PURE__*/React.createElement(__ds_scope.Accordion, {
      items: items,
      openIndex: first,
      style: style,
      onToggle: i => setOpenSet(i === -1 ? new Set() : new Set([i]))
    });
  }
  const toggle = i => setOpenSet(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1px",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      background: "rgba(162,156,196,.14)",
      ...style
    }
  }, items.map((it, i) => {
    const open = openSet.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-expanded": open,
      onClick: () => toggle(i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.1rem 1.3rem",
        border: 0,
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--sf-font-heading)",
        fontSize: "1rem",
        letterSpacing: "var(--sf-track-nav)",
        textTransform: "uppercase",
        color: open ? "var(--text-accent)" : "var(--text-heading)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, it.title), /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "14",
      height: "14",
      "aria-hidden": "true",
      style: {
        flex: "none",
        color: "var(--text-meta)",
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform var(--sf-dur-hover) var(--sf-ease)"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 9l7 7 7-7",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5"
    }))), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 1.3rem 1.3rem",
        fontSize: ".98rem",
        lineHeight: 1.65,
        color: "var(--text-body)"
      }
    }, it.body));
  }));
}
Object.assign(__ds_scope, { FaqAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FaqAccordion.jsx", error: String((e && e.message) || e) }); }

// components/content/InfoBox.jsx
try { (() => {
/** Wiki summary box: art, then label/value rows. The right rail of an article. */
function InfoBox({
  title,
  image,
  rows = [],
  footer,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      background: "var(--surface-card)",
      ...style
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 3",
      background: "var(--surface-well)"
    }
  }, image), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem",
      padding: "1.15rem 1.25rem 1.35rem"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: ".55rem"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: ".75rem",
      justifyContent: "space-between",
      alignItems: "baseline",
      paddingBottom: ".55rem",
      borderBottom: i === rows.length - 1 ? "0" : "1px solid var(--border-section)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      flex: "none",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, r.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      minWidth: 0,
      textAlign: "right",
      fontSize: ".95rem",
      lineHeight: 1.45,
      color: "var(--text-body)"
    }
  }, r.value)))), footer));
}
Object.assign(__ds_scope, { InfoBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/InfoBox.jsx", error: String((e && e.message) || e) }); }

// components/content/SpoilerBlock.jsx
try { (() => {
/** GM-only reveal. Closed by default; oxblood chrome borrowed from Callout tone="gm". */
function SpoilerBlock({
  title = "GM only",
  note,
  children,
  open: openProp,
  onToggle,
  defaultOpen = false,
  style
}) {
  const [selfOpen, setSelfOpen] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : selfOpen;
  const toggle = () => {
    if (!controlled) setSelfOpen(!open);
    if (onToggle) onToggle(!open);
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderLeft: "2px solid rgba(107,43,43,.55)",
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0",
      background: "rgba(107,43,43,.18)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open,
    onClick: toggle,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: ".85rem",
      padding: "1.15rem 1.25rem",
      border: 0,
      background: "transparent",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "13",
    height: "13",
    "aria-hidden": "true",
    style: {
      flex: "none",
      color: "#D89A9A",
      transform: open ? "rotate(90deg)" : "none",
      transition: "transform var(--sf-dur-hover) var(--sf-ease)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 5l7 7-7 7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "#D89A9A"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, open ? "Hide" : "Reveal")), !open && note && /*#__PURE__*/React.createElement("p", {
    style: {
      padding: "0 1.25rem 1.25rem 3.1rem",
      fontStyle: "italic",
      fontSize: ".92rem",
      lineHeight: 1.6,
      color: "var(--text-meta)"
    }
  }, note), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 1.25rem 1.35rem 3.1rem",
      fontSize: ".98rem",
      lineHeight: 1.65,
      color: "var(--text-over-image)"
    }
  }, children));
}
Object.assign(__ds_scope, { SpoilerBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SpoilerBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
/** 5e-style stat block for NPCs, creatures and ships. Reads as a printed sidebar. */
function StatBlock({
  name,
  kind,
  abilities = [],
  rows = [],
  traits = [],
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem",
      padding: "1.4rem 1.5rem",
      borderTop: "2px solid var(--sf-gold-400)",
      borderRadius: "0 0 var(--sf-radius-card) var(--sf-radius-card)",
      background: "var(--surface-raised)",
      boxShadow: "var(--sf-shadow-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".2rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-xl)",
      lineHeight: 1.15,
      color: "var(--text-accent)"
    }
  }, name), kind && /*#__PURE__*/React.createElement("p", {
    style: {
      fontStyle: "italic",
      fontSize: ".95rem",
      color: "var(--text-body-card)"
    }
  }, kind)), abilities.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 1fr))",
      gap: ".6rem",
      padding: ".85rem 0",
      borderTop: "1px solid var(--sf-line-gold)",
      borderBottom: "1px solid var(--sf-line-gold)"
    }
  }, abilities.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: ".15rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, a.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-md)",
      color: "var(--text-heading)"
    }
  }, a.value)))), rows.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".35rem"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: ".95rem",
      lineHeight: 1.55,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontWeight: "var(--sf-weight-heading)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      fontSize: ".85rem",
      color: "var(--text-heading)"
    }
  }, r.label, " "), r.value))), traits.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".6rem",
      paddingTop: ".3rem",
      borderTop: "1px solid var(--border-section)"
    }
  }, traits.map((t, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: ".95rem",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontStyle: "italic",
      fontSize: "1.05rem",
      color: "var(--text-heading)"
    }
  }, t.name, ". "), t.text))));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Free / Premium marker pinned to the corner of a product cover. */
function Badge({
  tone = "premium",
  children,
  style,
  ...rest
}) {
  const tones = {
    premium: {
      color: "var(--action-primary-ink)",
      background: "rgba(235,203,110,.92)",
      borderColor: "var(--sf-gold-400)"
    },
    free: {
      color: "var(--sf-status-free)",
      background: "rgba(13,12,27,.7)",
      borderColor: "rgba(155,211,168,.6)"
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-2xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      padding: ".25rem .6rem",
      borderRadius: "var(--sf-radius-pill)",
      border: "1px solid " + t.borderColor,
      color: t.color,
      background: t.background,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: ".5rem",
  fontFamily: "var(--sf-font-heading)",
  fontSize: "var(--sf-text-base)",
  letterSpacing: "var(--sf-track-nav)",
  textTransform: "uppercase",
  borderRadius: "var(--sf-radius-pill)",
  cursor: "pointer",
  textDecoration: "none",
  transition: "box-shadow var(--sf-dur-lift) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease), transform var(--sf-dur-press) var(--sf-ease)"
};
const sizes = {
  sm: {
    padding: ".45rem 1.1rem",
    fontSize: "var(--sf-text-sm)"
  },
  md: {
    padding: ".7rem 1.6rem"
  },
  lg: {
    padding: ".9rem 2.3rem"
  }
};
const variants = {
  primary: {
    color: "var(--action-primary-ink)",
    background: "var(--action-primary-bg)",
    border: "0",
    boxShadow: "var(--sf-glow-button)"
  },
  ghost: {
    color: "var(--sf-ink-100)",
    background: "var(--action-ghost-bg)",
    border: "1px solid var(--action-ghost-border)",
    backdropFilter: "blur(6px)"
  },
  quiet: {
    color: "var(--text-link)",
    background: "transparent",
    border: "0",
    padding: "0",
    letterSpacing: "var(--sf-track-nav)",
    fontSize: "var(--sf-text-sm)"
  }
};

/** Primary gold pill, ghost outline, or a quiet inline link-button. */
function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  style,
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const s = {
    ...base,
    ...(variant === "quiet" ? {} : sizes[size]),
    ...variants[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: s
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartDrawer.jsx
try { (() => {
/** Right-hand cart panel: line items, totals, checkout. */
function CartDrawer({
  open = false,
  items = [],
  subtotal,
  note,
  onClose,
  children,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Cart",
    "aria-modal": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(10,9,23,.72)",
      backdropFilter: "blur(4px)"
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "relative",
      width: "min(26rem, 100%)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      borderLeft: "1px solid var(--sf-line)",
      boxShadow: "var(--sf-shadow-float)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      padding: "1.35rem 1.5rem",
      borderBottom: "1px solid var(--border-card)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      color: "var(--text-heading)"
    }
  }, "Your cart"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close cart",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.1rem",
      height: "2.1rem",
      border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-pill)",
      background: "transparent",
      color: "var(--sf-ink-300)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "13",
    height: "13",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "1px",
      background: "rgba(162,156,196,.14)"
    }
  }, children), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem",
      padding: "1.35rem 1.5rem",
      borderTop: "1px solid var(--border-card)",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      color: "var(--text-accent)"
    }
  }, subtotal)), note && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--sf-text-xs)",
      lineHeight: 1.5,
      color: "var(--text-meta)"
    }
  }, note), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "md",
    style: {
      width: "100%"
    }
  }, "Checkout"))));
}

/** One row inside the drawer. */
function CartLineItem({
  cover,
  title,
  meta,
  price,
  qty,
  onRemove,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1rem",
      padding: "1.1rem 1.5rem",
      background: "var(--surface-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none",
      width: "3.25rem",
      height: "4.4rem",
      borderRadius: "var(--sf-radius-chip)",
      overflow: "hidden",
      background: "var(--surface-well)",
      border: "1px solid rgba(235,203,110,.25)"
    }
  }, cover), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: ".25rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "1.2rem",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, meta), onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    style: {
      alignSelf: "flex-start",
      padding: 0,
      border: 0,
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, "Remove")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: ".25rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-sm)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, price), qty != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--sf-text-xs)",
      color: "var(--text-meta)"
    }
  }, "\xD7", qty)));
}
Object.assign(__ds_scope, { CartDrawer, CartLineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// components/core/ImageFrame.jsx
try { (() => {
/**
 * The only correct way to place art on a Starfall page: a 1px gradient border wrapping a
 * dark well, with an optional scrim so text can sit on top.
 */
function ImageFrame({
  ratio = "16 / 9",
  scrim = "none",
  radius = "var(--sf-radius-frame)",
  float = false,
  children,
  style
}) {
  const scrims = {
    none: null,
    card: "var(--sf-scrim-card)",
    caption: "var(--sf-scrim-caption)",
    full: "linear-gradient(180deg, rgba(13,12,27,.2), rgba(13,12,27,.75))"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1px",
      borderRadius: "calc(" + radius + " + 1px)",
      background: "var(--sf-border-gradient)",
      boxShadow: float ? "var(--sf-shadow-float)" : "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--surface-well)",
      aspectRatio: ratio
    }
  }, children, scrims[scrim] && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: scrims[scrim]
    }
  })));
}
Object.assign(__ds_scope, { ImageFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ImageFrame.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small-caps chip: nav-adjacent tags, race names, feature chips, and eyebrow badges. */
function Pill({
  href,
  tone = "neutral",
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      color: "var(--sf-ink-300)",
      border: "1px solid var(--sf-line-strong)",
      background: "var(--tint-violet)"
    },
    outline: {
      color: "var(--text-label)",
      border: "1px solid var(--sf-line-strong)",
      background: "rgba(13,12,27,.55)"
    },
    gold: {
      color: "var(--action-primary-ink)",
      border: "1px solid var(--sf-gold-400)",
      background: "var(--sf-gold-400)"
    }
  };
  const Tag = href ? "a" : "span";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: ".5rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      padding: ".35rem .9rem",
      borderRadius: "var(--sf-radius-pill)",
      textDecoration: "none",
      transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/QuoteBlock.jsx
try { (() => {
/** Playtester quote: gold left rule, Cormorant italic, violet wash. */
function QuoteBlock({
  quote,
  attribution,
  style
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--sf-space-4)",
      padding: "1.75rem",
      borderLeft: "2px solid rgba(235,203,110,.5)",
      background: "linear-gradient(120deg, rgba(58,46,92,.34), rgba(20,19,40,.1))",
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0",
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "1.4rem",
      lineHeight: 1.45,
      fontStyle: "italic",
      color: "var(--text-heading)"
    }
  }, quote), /*#__PURE__*/React.createElement("footer", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-body-card)"
    }
  }, attribution));
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/ReadingPanel.jsx
try { (() => {
/**
 * Long-form on a dark ground. Replaces the parchment reading theme, which is now reserved
 * for print and PDF. Lifted surface, 72ch measure, 1.75 line-height.
 */
function ReadingPanel({
  meta,
  title,
  children,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: "var(--sf-measure-reading)",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      padding: "var(--sf-panel-pad)",
      border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-panel)",
      background: "var(--surface-raised)",
      boxShadow: "var(--sf-shadow-panel)",
      ...style
    }
  }, meta && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, meta), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-xl)",
      lineHeight: "var(--sf-leading-heading)",
      color: "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontSize: "1.05rem",
      lineHeight: "var(--sf-leading-reading)",
      color: "var(--text-over-image)"
    }
  }, children), action);
}
Object.assign(__ds_scope, { ReadingPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ReadingPanel.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
/** Eyebrow label + display heading, optionally with a trailing "see all" link. */
function SectionHeading({
  eyebrow,
  title,
  body,
  action,
  align = "left",
  tone = "ink",
  style
}) {
  const titleColor = tone === "gold" ? "var(--text-accent)" : "var(--text-heading)";
  const eyebrowColor = tone === "sea" ? "var(--sf-teal-300)" : "var(--text-accent)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: align === "center" ? "center" : "flex-end",
      justifyContent: action ? "space-between" : "flex-start",
      gap: "var(--sf-space-8)",
      flexWrap: "wrap",
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".55rem",
      alignItems: align === "center" ? "center" : "flex-start"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: eyebrowColor
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-2xl)",
      lineHeight: "var(--sf-leading-heading)",
      color: titleColor,
      maxWidth: "30ch"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: "var(--sf-measure-body)",
      color: "var(--text-body)",
      lineHeight: "var(--sf-leading-body)"
    }
  }, body)), action);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StatRow.jsx
try { (() => {
/** Cormorant numerals over small-caps labels. Four items reads best; never more than five. */
function StatRow({
  items = [],
  align = "left",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2.25rem",
      justifyContent: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".2rem",
      alignItems: align === "center" ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-xl)",
      lineHeight: 1,
      color: "var(--text-accent)"
    }
  }, s.n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-body-card)"
    }
  }, s.label))));
}
Object.assign(__ds_scope, { StatRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** Wiki trail. Middot separators, small caps, current page in heading ink. */
function Breadcrumbs({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: ".5rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: "var(--text-heading)"
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href,
      style: {
        color: "var(--text-label)",
        textDecoration: "none"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--text-meta)"
      }
    }, "\xB7"));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Numbered pager for wiki indexes and the shop. Pills, gold for the current page. */
function Pagination({
  page = 1,
  pages = 1,
  onChange,
  hrefFor,
  style
}) {
  const nums = [];
  const from = Math.max(1, Math.min(page - 2, pages - 4));
  for (let i = from; i < from + 5 && i <= pages; i++) nums.push(i);
  const cell = active => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.35rem",
    height: "2.35rem",
    padding: "0 .6rem",
    fontFamily: "var(--sf-font-heading)",
    fontSize: "var(--sf-text-sm)",
    letterSpacing: "var(--sf-track-nav)",
    textTransform: "uppercase",
    borderRadius: "var(--sf-radius-pill)",
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid " + (active ? "var(--sf-gold-400)" : "var(--sf-line)"),
    color: active ? "var(--action-primary-ink)" : "var(--sf-ink-300)",
    background: active ? "var(--sf-gold-400)" : "var(--tint-violet)",
    transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
  });
  const Item = ({
    n,
    children,
    disabled,
    label
  }) => {
    const props = {
      "aria-label": label,
      "aria-current": n === page ? "page" : undefined,
      style: {
        ...cell(n === page),
        ...(disabled ? {
          opacity: .4,
          pointerEvents: "none"
        } : null)
      }
    };
    return hrefFor ? /*#__PURE__*/React.createElement("a", _extends({
      href: hrefFor(n)
    }, props), children ?? n) : /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      onClick: () => onChange && onChange(n)
    }, props), children ?? n);
  };
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Pagination",
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: ".5rem",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Item, {
    n: page - 1,
    disabled: page <= 1,
    label: "Previous page"
  }, "\u2190"), from > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-meta)",
      padding: "0 .25rem"
    }
  }, "\u2026"), nums.map(n => /*#__PURE__*/React.createElement(Item, {
    key: n,
    n: n,
    label: "Page " + n
  })), from + 5 <= pages && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-meta)",
      padding: "0 .25rem"
    }
  }, "\u2026"), /*#__PURE__*/React.createElement(Item, {
    n: page + 1,
    disabled: page >= pages,
    label: "Next page"
  }, "\u2192"));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchField.jsx
try { (() => {
/** Wiki search. Pill input with a leading glyph and an optional scope label. */
function SearchField({
  value,
  onChange,
  onSubmit,
  placeholder = "Search the wiki",
  scope,
  size = "md",
  style
}) {
  const pad = size === "lg" ? ".9rem 1.2rem" : ".7rem 1rem";
  return /*#__PURE__*/React.createElement("form", {
    role: "search",
    onSubmit: onSubmit,
    style: {
      display: "flex",
      alignItems: "center",
      gap: ".7rem",
      padding: pad,
      border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-pill)",
      background: "rgba(239,236,246,.06)",
      transition: "border-color var(--sf-dur-hover) var(--sf-ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    "aria-hidden": "true",
    style: {
      flex: "none",
      color: "var(--text-meta)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10.5",
    cy: "10.5",
    r: "6.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.5 15.5 L21 21",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  })), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    "aria-label": placeholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: "none",
      background: "transparent",
      color: "var(--text-heading)",
      fontFamily: "var(--sf-font-body)",
      fontSize: size === "lg" ? "1.05rem" : "var(--sf-text-base)"
    }
  }), scope && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, scope));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TableOfContents.jsx
try { (() => {
/** Sticky in-article TOC. Gold left rule marks the active heading. */
function TableOfContents({
  items = [],
  activeId,
  title = "On this page",
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": title,
    style: {
      position: "sticky",
      top: "5.5rem",
      display: "flex",
      flexDirection: "column",
      gap: ".7rem",
      paddingLeft: "1rem",
      borderLeft: "1px solid var(--sf-line)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, title), items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("a", {
      key: it.id,
      href: "#" + it.id,
      style: {
        marginLeft: it.depth === 2 ? ".85rem" : 0,
        paddingLeft: ".6rem",
        borderLeft: "2px solid " + (active ? "var(--sf-gold-400)" : "transparent"),
        fontSize: it.depth === 2 ? ".88rem" : ".95rem",
        lineHeight: 1.4,
        textDecoration: "none",
        color: active ? "var(--text-heading)" : "var(--text-body-card)",
        transition: "color var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { TableOfContents });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TableOfContents.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Pill tab row for switching a panel's content (Free / Premium, article sections). */
function Tabs({
  items = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: ".5rem",
      ...style
    }
  }, items.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(t.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: ".5rem",
        fontFamily: "var(--sf-font-heading)",
        fontSize: "var(--sf-text-sm)",
        letterSpacing: "var(--sf-track-nav)",
        textTransform: "uppercase",
        padding: ".5rem 1.1rem",
        borderRadius: "var(--sf-radius-pill)",
        cursor: "pointer",
        border: "1px solid " + (active ? "var(--sf-line-gold)" : "var(--sf-line)"),
        color: active ? "var(--text-accent)" : "var(--sf-ink-300)",
        background: active ? "var(--tint-gold)" : "var(--tint-violet)",
        transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-meta)",
        fontSize: "var(--sf-text-xs)"
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/WikiSidebar.jsx
try { (() => {
/** Left-rail wiki navigation: grouped sections with counts and a current entry. */
function WikiSidebar({
  groups = [],
  currentHref,
  footer,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Wiki sections",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "1.5rem 1.25rem",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      background: "var(--surface-card)",
      ...style
    }
  }, groups.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".55rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, g.title), g.links.map((l, j) => {
    const active = l.href === currentHref;
    return /*#__PURE__*/React.createElement("a", {
      key: j,
      href: l.href,
      "aria-current": active ? "page" : undefined,
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: ".75rem",
        padding: ".3rem .5rem",
        marginLeft: "-.5rem",
        borderRadius: "var(--sf-radius-thumb)",
        textDecoration: "none",
        fontSize: ".95rem",
        lineHeight: 1.4,
        color: active ? "var(--text-heading)" : "var(--text-body-card)",
        background: active ? "var(--tint-violet-strong)" : "transparent",
        transition: "background var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, l.label), l.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        whiteSpace: "nowrap",
        fontFamily: "var(--sf-font-heading)",
        fontSize: "var(--sf-text-xs)",
        letterSpacing: "var(--sf-track-nav)",
        textTransform: "uppercase",
        color: "var(--text-meta)"
      }
    }, l.count));
  }))), footer);
}
Object.assign(__ds_scope, { WikiSidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/WikiSidebar.jsx", error: String((e && e.message) || e) }); }

// components/site/ContentCard.jsx
try { (() => {
/**
 * The workhorse card: art well, small-caps title, body, optional meta/tag.
 * Covers lore teasers, wiki categories, houses and factions.
 */
function ContentCard({
  image,
  title,
  body,
  tag,
  count,
  href,
  gradientBorder = false,
  style
}) {
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 9",
      background: "var(--surface-well)"
    }
  }, image, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "var(--sf-scrim-card)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".6rem",
      padding: "1.15rem 1.25rem 1.35rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--sf-space-4)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontWeight: "var(--sf-weight-heading)",
      fontSize: "1.05rem",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-heading)",
      minWidth: 0
    }
  }, title), count && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      whiteSpace: "nowrap",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, count)), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".93rem",
      lineHeight: 1.55,
      color: "var(--text-body-card)"
    }
  }, body), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, tag)));
  const shell = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "var(--sf-radius-card)",
    background: "var(--surface-card)",
    border: gradientBorder ? "0" : "1px solid var(--border-card)",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color var(--sf-dur-hover) var(--sf-ease), transform var(--sf-dur-lift) var(--sf-ease), box-shadow var(--sf-dur-lift) var(--sf-ease)",
    ...style
  };
  const Tag = href ? "a" : "article";
  if (!gradientBorder) return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    style: shell
  }, inner);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1px",
      borderRadius: "var(--sf-radius-panel)",
      background: "var(--sf-border-gradient-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    href: href,
    style: {
      ...shell,
      height: "100%",
      borderRadius: "var(--sf-radius-card)"
    }
  }, inner));
}
Object.assign(__ds_scope, { ContentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ContentCard.jsx", error: String((e && e.message) || e) }); }

// components/site/ListRow.jsx
try { (() => {
/**
 * Hairline-divided list row: adventures, pantheon entries, product ledgers.
 * Compose several inside a ListGroup.
 */
function ListRow({
  thumb,
  swatch,
  title,
  body,
  meta,
  trailing,
  href = "#",
  display = true,
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "1.25rem",
      padding: "1.2rem 1.4rem",
      background: "var(--surface-card)",
      textDecoration: "none",
      color: "inherit",
      transition: "background var(--sf-dur-hover) var(--sf-ease)",
      ...style
    }
  }, thumb && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none",
      width: "4.75rem",
      height: "6.35rem",
      borderRadius: "var(--sf-radius-chip)",
      overflow: "hidden",
      background: "var(--surface-well)",
      border: "1px solid rgba(235,203,110,.25)"
    }
  }, thumb), swatch && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "var(--sf-radius-pill)",
      background: swatch,
      border: "1px solid rgba(239,236,246,.16)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".25rem",
      flex: "1 1 14rem",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: display ? {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    } : {
      fontFamily: "var(--sf-font-heading)",
      fontSize: ".95rem",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-heading)"
    }
  }, title), body && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: ".92rem",
      lineHeight: 1.5,
      color: "var(--text-body-card)"
    }
  }, body)), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, meta), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, trailing));
}

/** Wraps ListRows so the 1px gaps become hairline dividers. */
function ListGroup({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1px",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      background: "rgba(162,156,196,.14)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ListRow, ListGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/site/NewsletterForm.jsx
try { (() => {
/** Email capture. Same copy on both sites: "Join for a free map + new releases". */
function NewsletterForm({
  onSubmit,
  note = "",
  align = "center",
  style
}) {
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".625rem",
      alignItems: align === "center" ? "center" : "stretch",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: ".625rem",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: "27rem"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    placeholder: "you@example.com",
    "aria-label": "Email address",
    style: {
      flex: "1 1 12rem",
      minWidth: 0,
      padding: ".85rem 1.1rem",
      border: "1px solid rgba(162,156,196,.4)",
      borderRadius: "var(--sf-radius-pill)",
      background: "rgba(239,236,246,.06)",
      color: "var(--text-heading)",
      fontFamily: "var(--sf-font-body)",
      fontSize: "var(--sf-text-base)"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    size: "md",
    style: {
      flex: "none"
    }
  }, "Join")), /*#__PURE__*/React.createElement("p", {
    style: {
      minHeight: "1.2rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, note));
}
Object.assign(__ds_scope, { NewsletterForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/NewsletterForm.jsx", error: String((e && e.message) || e) }); }

// components/site/ProductCard.jsx
try { (() => {
/** 2:3 cover in a gradient frame, Cormorant title, small-caps price line. */
function ProductCard({
  cover,
  title,
  meta,
  tone = "premium",
  badge,
  href = "#",
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sf-space-4)",
      textDecoration: "none",
      color: "inherit",
      transition: "transform var(--sf-dur-lift) var(--sf-ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1px",
      borderRadius: "var(--sf-radius-cover)",
      background: "linear-gradient(160deg, rgba(235,203,110,.5), rgba(162,156,196,.14))",
      boxShadow: "var(--sf-shadow-cover)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "2 / 3",
      borderRadius: "9px",
      overflow: "hidden",
      background: "var(--sf-navy-550)"
    }
  }, cover, badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: ".65rem",
      left: ".65rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: tone
  }, badge)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".35rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "var(--sf-text-lg)",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, meta)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteNav.jsx
try { (() => {
/**
 * Fixed nav, transparent over the hero, solidifying on scroll past 40px.
 * Wire `scrolled` from a passive scroll listener.
 */
function SiteNav({
  scrolled = false,
  brand,
  links = [],
  cta,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sf-space-8)",
      padding: ".8rem 1.75rem",
      background: scrolled ? "rgba(13,12,27,.9)" : "rgba(13,12,27,0)",
      borderBottom: "1px solid " + (scrolled ? "var(--sf-line)" : "rgba(162,156,196,0)"),
      backdropFilter: "blur(16px) saturate(140%)",
      transition: "background var(--sf-dur-chrome) var(--sf-ease), border-color var(--sf-dur-chrome) var(--sf-ease)",
      ...style
    }
  }, brand, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1.35rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-sm)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase"
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    style: {
      color: "var(--sf-ink-300)",
      textDecoration: "none"
    }
  }, l.label)), cta));
}
Object.assign(__ds_scope, { SiteNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteNav.jsx", error: String((e && e.message) || e) }); }

// components/site/SocialLinks.jsx
try { (() => {
/**
 * Round icon buttons. Glyphs in assets/social-paths.js are SIMPLIFIED STAND-INS —
 * replace with each platform's official brand asset before launch.
 */
function SocialLinks({
  links = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: ".6rem",
      ...style
    }
  }, links.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.key,
    href: s.href,
    "aria-label": s.label,
    title: s.label,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.35rem",
      height: "2.35rem",
      border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-pill)",
      color: "var(--sf-ink-300)",
      background: "var(--tint-violet)",
      transition: "color var(--sf-dur-hover) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: __ds_scope.SOCIAL_PATHS[s.key],
    fill: "currentColor",
    fillRule: "evenodd"
  })))));
}
Object.assign(__ds_scope, { SocialLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SocialLinks.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
/** Four-column sitemap, social row, legal row, copyright with the 5e disclaimer. */
function SiteFooter({
  brand,
  columns = [],
  socials = [],
  legal = [],
  copyright,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "4rem var(--sf-section-pad-x) 2rem",
      background: "var(--surface-footer)",
      borderTop: "1px solid var(--sf-line)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--sf-container)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sf-space-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
      gap: "var(--sf-space-8)"
    }
  }, brand, columns.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".7rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-heading)"
    }
  }, col.title), col.links.map((l, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: l.href,
    style: {
      fontFamily: "var(--sf-font-body)",
      fontSize: ".92rem",
      color: "var(--text-label)",
      textDecoration: "none"
    }
  }, l.label))))), /*#__PURE__*/React.createElement(__ds_scope.SocialLinks, {
    links: socials,
    style: {
      paddingTop: ".5rem",
      borderTop: "1px solid var(--border-section)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem 1.5rem",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "1.25rem",
      borderTop: "1px solid var(--border-section)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--sf-text-xs)",
      lineHeight: 1.6,
      color: "var(--text-legal)",
      maxWidth: "60ch"
    }
  }, copyright), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1.25rem",
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-nav)",
      textTransform: "uppercase"
    }
  }, legal.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    style: {
      color: "var(--text-label)"
    }
  }, l.label))))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/site/StartHereStrip.jsx
try { (() => {
/**
 * Four-cell entry strip that overlaps the hero by -3.25rem. Sets the site's two audiences.
 * MUST be wrapped in a section with `position: relative; z-index: 1` — otherwise the hero's
 * absolutely-positioned scrim layers paint over the overlapping 52px and clip the cards' tops.
 */
function StartHereStrip({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--sf-container)",
      margin: "-3.25rem auto 0",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))",
      gap: "1px",
      background: "var(--sf-line)",
      border: "1px solid var(--sf-line)",
      borderRadius: "var(--sf-radius-card)",
      overflow: "hidden",
      boxShadow: "var(--sf-shadow-strip)",
      ...style
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: s.href,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".4rem",
      padding: "1.35rem 1.4rem",
      background: "var(--surface-card)",
      textDecoration: "none",
      color: "inherit",
      transition: "background var(--sf-dur-hover) var(--sf-ease)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-heading)",
      fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-label)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, s.kicker), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sf-font-display)",
      fontSize: "1.35rem",
      lineHeight: 1.2,
      color: "var(--text-heading)"
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--sf-text-sm)",
      lineHeight: 1.5,
      color: "var(--text-body-card)"
    }
  }, s.body))));
}
Object.assign(__ds_scope, { StartHereStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/StartHereStrip.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FALLING_STAR = __ds_scope.FALLING_STAR;

__ds_ns.STAR_TRAIL_PATH = __ds_scope.STAR_TRAIL_PATH;

__ds_ns.PYRE_FLAME = __ds_scope.PYRE_FLAME;

__ds_ns.PYRE_ALTAR = __ds_scope.PYRE_ALTAR;

__ds_ns.SCROLL_CUE = __ds_scope.SCROLL_CUE;

__ds_ns.SOCIAL_PATHS = __ds_scope.SOCIAL_PATHS;

__ds_ns.CartButton = __ds_scope.CartButton;

__ds_ns.CartDrawer = __ds_scope.CartDrawer;

__ds_ns.CartLineItem = __ds_scope.CartLineItem;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.FaqAccordion = __ds_scope.FaqAccordion;

__ds_ns.InfoBox = __ds_scope.InfoBox;

__ds_ns.SpoilerBlock = __ds_scope.SpoilerBlock;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ImageFrame = __ds_scope.ImageFrame;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.ReadingPanel = __ds_scope.ReadingPanel;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatRow = __ds_scope.StatRow;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.TableOfContents = __ds_scope.TableOfContents;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.WikiSidebar = __ds_scope.WikiSidebar;

__ds_ns.ContentCard = __ds_scope.ContentCard;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.ListGroup = __ds_scope.ListGroup;

__ds_ns.NewsletterForm = __ds_scope.NewsletterForm;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteNav = __ds_scope.SiteNav;

__ds_ns.SocialLinks = __ds_scope.SocialLinks;

__ds_ns.StartHereStrip = __ds_scope.StartHereStrip;

})();
