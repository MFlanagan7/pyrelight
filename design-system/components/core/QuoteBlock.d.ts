/** Single testimonial. Attribution names a role, never a full name or a photo. */
export interface QuoteBlockProps {
  quote: string;
  attribution: string;
  style?: React.CSSProperties;
}
export function QuoteBlock(props: QuoteBlockProps): JSX.Element;
