import { type ComponentProps } from 'react';

type TableCellHTMLProps = ComponentProps<'td'>;

export type TableCellProps = TableCellHTMLProps;

export function TableCell(props: TableCellProps) {
  return <td {...props} />;
}
