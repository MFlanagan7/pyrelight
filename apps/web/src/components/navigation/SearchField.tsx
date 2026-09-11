import styles from "./SearchField.module.css";

/**
 * Search box. A plain GET form, so it works without JavaScript and the result
 * page is a real URL that can be shared, bookmarked and linked.
 *
 * role="search" is what lets assistive tech offer it as a landmark, which the
 * bare form element does not.
 */
export function SearchField({
  action = "/search",
  defaultValue,
  placeholder = "Search Starfall",
  scope,
  size = "md",
  autoFocus,
}: {
  action?: string;
  defaultValue?: string;
  placeholder?: string;
  scope?: string;
  size?: "md" | "lg";
  autoFocus?: boolean;
}) {
  return (
    <form
      role="search"
      action={action}
      method="get"
      className={[styles.form, size === "lg" ? styles.lg : null].filter(Boolean).join(" ")}
    >
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className={styles.glyph}>
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 15.5 L21 21" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.input}
        autoFocus={autoFocus}
      />
      {scope && <span className={styles.scope}>{scope}</span>}
    </form>
  );
}
