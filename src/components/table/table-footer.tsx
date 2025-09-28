import { type ComponentProps } from 'react';

type TableFooterHTMLProps = ComponentProps<'tfoot'>;

export type TableFootProps = TableFooterHTMLProps;

export function TableFooter(props: TableFootProps) {
  return <tfoot {...props} />;
}
