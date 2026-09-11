/**
 * Registry of interactive generators.
 *
 * A Resource with delivery "tool" names one of these keys, and its page renders
 * the matching component instead of a download button. Everything else about
 * the entry — title, summary, tags, SEO — is authored in the admin like any
 * other resource, so a generator is searchable, taggable and sitemapped rather
 * than being a page hiding outside the content model.
 *
 * Keys live here, apart from the components, because the Payload config imports
 * this file to validate the field. Pulling React components into the CMS config
 * would drag the whole component tree in with them.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ TO ADD A TOOL                                                           │
 * │                                                                         │
 * │ 1. Add its key below.                                                   │
 * │ 2. Add the component to components/tools/registry.tsx under that key.   │
 * │ 3. Create a Resource, section "tools", delivery "tool", and enter it.   │
 * │                                                                         │
 * │ Both steps are needed. A key with no component renders an explanatory   │
 * │ message rather than a blank page, so a half-finished tool is visible     │
 * │ rather than silently broken.                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export const TOOL_KEYS: string[] = [
  // None built yet. The tools section renders an empty state until there are.
];

export const isToolKey = (value: unknown): value is string =>
  typeof value === "string" && TOOL_KEYS.includes(value);
