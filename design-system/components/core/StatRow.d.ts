/** Counts that prove the world has depth: regions, houses, locations, gods. */
export interface StatItem { n: string; label: string }
export interface StatRowProps {
  items: StatItem[];
  align?: "left" | "center";
  style?: React.CSSProperties;
}
export function StatRow(props: StatRowProps): JSX.Element;
