import * as React from "react";

/**
 * 5e stat block. Gold top rule and gold ability rules echo a printed page.
 *
 * @startingPoint section="Content" subtitle="5e stat block for NPCs and ships" viewport="700x460"
 */
export interface Ability { label: string; value: string }
export interface StatRowEntry { label: string; value: React.ReactNode }
export interface Trait { name: string; text: React.ReactNode }
export interface StatBlockProps {
  name: string;
  /** "Medium humanoid (tidemarked), neutral" */
  kind?: string;
  /** STR DEX CON INT WIS CHA — six entries */
  abilities?: Ability[];
  /** Armour Class, Hit Points, Speed, Senses, Languages, Challenge */
  rows?: StatRowEntry[];
  /** named traits and actions */
  traits?: Trait[];
  style?: React.CSSProperties;
}
export function StatBlock(props: StatBlockProps): JSX.Element;
