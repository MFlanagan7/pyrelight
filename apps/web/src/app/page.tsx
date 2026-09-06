import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Starfall</h1>
      <p className={styles.lede}>
        A fantasy RPG setting for D&amp;D 5e. Built in public.
      </p>
      <p className={styles.note}>
        Scaffold placeholder. Styling is driven entirely by the tokens in{" "}
        <code>src/styles/tokens.css</code>, which the Starfall design system will
        replace.
      </p>
    </main>
  );
}
