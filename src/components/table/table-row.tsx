import { type ComponentProps } from 'react';

type TableRowHTMLProps = ComponentProps<'tr'>;

type TableRowBaseProps = {
  isSelected?: boolean;
  shouldNotHighlightOnHover?: boolean;
};

export type TableRowProps =
  & TableRowBaseProps
  & Omit<TableRowHTMLProps, keyof TableRowBaseProps>;

export function TableRow({
  isSelected,
  shouldNotHighlightOnHover,
  ...props
}: TableRowProps) {
  return (
    <tr
      {...props}
      data-selected={isSelected}
      data-not-highlight-on-hover={shouldNotHighlightOnHover}
    />
  );
}
