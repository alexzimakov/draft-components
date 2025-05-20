import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableRowHTMLProps = ComponentProps<'tr'>;

type TableRowBaseProps = {
  isSelected?: boolean;
};

export type TableRowProps =
  & TableRowBaseProps
  & Omit<TableRowHTMLProps, keyof TableRowBaseProps>;

export function TableRow({
  className,
  isSelected,
  ...props
}: TableRowProps) {
  return (
    <tr
      {...props}
      className={classNames(className, {
        'dc-table-row': true,
        'dc-table-row_selected': isSelected,
      })}
    />
  );
}
