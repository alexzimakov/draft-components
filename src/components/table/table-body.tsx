import { ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableBodyHTMLProps = ComponentProps<'tbody'>;

export type TableBodyProps = TableBodyHTMLProps;

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(function TableBody({ className, children, ...props }, ref) {
  return (
    <tbody
      {...props}
      ref={ref}
      className={classNames(className, 'dc-table-body')}
    >
      {children}
    </tbody>
  );
});
