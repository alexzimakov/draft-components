import { type ComponentProps } from 'react';

type TableRowHTMLProps = ComponentProps<'tr'>;

type TableRowBaseProps = {
  isSelected?: boolean;
};

export type TableRowProps =
  & TableRowBaseProps
  & Omit<TableRowHTMLProps, keyof TableRowBaseProps>;

export function TableRow({
  isSelected,
  ...props
}: TableRowProps) {
  return (
    <tr
      {...props}
      data-selected={isSelected}
    />
  );
}
