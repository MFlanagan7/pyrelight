/**
 * Immediately below the hero. Routes readers (wiki) and GMs (downloads, adventures) apart.
 *
 * @startingPoint section="Site" subtitle="Four-cell entry strip under the hero" viewport="700x180"
 */
export interface StartHereItem { kicker: string; title: string; body: string; href: string }
export interface StartHereStripProps { items: StartHereItem[]; style?: React.CSSProperties }
export function StartHereStrip(props: StartHereStripProps): JSX.Element;
