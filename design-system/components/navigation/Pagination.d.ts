/**
 * Pager for wiki indexes, the gallery and the shop. Windowed to five numbers.
 *
 * @startingPoint section="Navigation" subtitle="Gold-current numbered pager" viewport="700x100"
 */
export interface PaginationProps {
  page?: number;
  pages?: number;
  /** click handler when rendering buttons */
  onChange?: (page: number) => void;
  /** provide to render links instead of buttons, e.g. (n) => `/wiki?page=${n}` */
  hrefFor?: (page: number) => string;
  style?: React.CSSProperties;
}
export function Pagination(props: PaginationProps): JSX.Element;
