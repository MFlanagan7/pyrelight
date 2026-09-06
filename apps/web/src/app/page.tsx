import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>Pyrelight Press</p>
      <h1 className={styles.title}>Starfall</h1>
      <p className={styles.lede}>
        Divinity comes down as light and lands as currency. Whoever gathers it
        decides what the next age worships.
      </p>
      <p className={styles.note}>
        Scaffold placeholder, drawing on the real design tokens. Components have
        not been ported yet — see the design system review before building pages.
      </p>
    </main>
  );
}
