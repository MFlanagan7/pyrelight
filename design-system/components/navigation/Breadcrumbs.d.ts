/**
 * Trail above every wiki article and product page. Three or four levels; never deeper.
 *
 * @startingPoint section="Navigation" subtitle="Wiki trail with middot separators" viewport="700x90"
 */
export interface Crumb { label: string; href?: string }
export interface BreadcrumbsProps { items: Crumb[]; style?: React.CSSProperties }
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
