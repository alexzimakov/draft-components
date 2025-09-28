import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableContainerHTMLProps = ComponentProps<'div'>;

export type TableContainerProps = TableContainerHTMLProps;

export function TableContainer({
  className,
  children,
  ...props
}: TableContainerProps) {
  return (
    <div
      {...props}
      className={classNames(className, 'dc-table-container')}
    >
      {children}
    </div>
  );
}
