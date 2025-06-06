import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type TableContainerBorder = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
};

type TableContainerHTMLProps = ComponentProps<'div'>;

type TableContainerBaseProps = {
  border?: 'none' | 'all' | TableContainerBorder;
};

export type TableContainerProps =
  & TableContainerBaseProps
  & Omit<TableContainerHTMLProps, keyof TableContainerBaseProps>;

export function TableContainer({
  border,
  className,
  children,
  ...props
}: TableContainerProps) {
  let modifier = '';
  if (typeof border === 'object' && border != null) {
    modifier = classNames({
      'dc-table-container_border_top': border.top,
      'dc-table-container_border_right': border.right,
      'dc-table-container_border_bottom': border.bottom,
      'dc-table-container_border_left': border.left,
    });
  } else if (border === 'all') {
    modifier = 'dc-table-container_border_all';
  }

  return (
    <div
      {...props}
      className={classNames(className, modifier, 'dc-table-container')}
    >
      {children}
    </div>
  );
}
