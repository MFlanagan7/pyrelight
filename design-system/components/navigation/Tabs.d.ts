/**
 * Tab row. Gold-outlined current tab — never gold-filled (that is the pager's current page).
 *
 * @startingPoint section="Navigation" subtitle="Pill tabs with counts" viewport="700x90"
 */
export interface TabItem { value: string; label: string; count?: number }
export interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;
