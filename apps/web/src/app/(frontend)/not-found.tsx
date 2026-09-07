import type { Metadata } from "next";
import { Button } from "@/components/core";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

/**
 * In-world where it costs nothing, per the voice guide — but the practical
 * information comes first. A 404 that is only a joke wastes the reader's time.
 */
export default function NotFound() {
  return (
    <main className={styles.main}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page is not on any map</h1>
      <p className={styles.body}>
        The address may have changed, or the page may never have existed. Neither
        is your fault.
      </p>
      <div className={styles.actions}>
        <Button href="/">Back to the start</Button>
        <Button href="/dispatches" variant="ghost">
          Read the dispatches
        </Button>
      </div>
    </main>
  );
}
