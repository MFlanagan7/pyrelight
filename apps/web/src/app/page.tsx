import {
  Badge,
  Button,
  Pill,
  QuoteBlock,
  SectionHeading,
  StatRow,
} from "@/components/core";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Pyrelight Press"
        title="Starfall"
        body="Divinity comes down as light and lands as currency. Whoever gathers it decides what the next age worships."
        action={<Button variant="quiet">Read the world →</Button>}
      />

      <div className={styles.row}>
        <Button>Start playing</Button>
        <Button variant="ghost">What is Starfall</Button>
      </div>

      <div className={styles.row}>
        <Pill>Peoples of Starfall</Pill>
        <Pill tone="outline">The pantheon</Pill>
        <Badge tone="free">Free</Badge>
        <Badge>Premium</Badge>
      </div>

      <StatRow
        items={[
          { n: "4", label: "Regions" },
          { n: "12", label: "Noble houses" },
          { n: "60+", label: "Keyed locations" },
          { n: "3", label: "Stranded gods" },
        ]}
      />

      <QuoteBlock
        quote="They stopped asking which god was right and started asking who reached the light first."
        attribution="Playtest GM · six sessions in"
      />

      <p className={styles.note}>
        Scaffold placeholder exercising the ported core components. Content
        management is not wired up — see docs/legal-and-licensing.md and the CMS
        decision before building real pages.
      </p>
    </main>
  );
}
