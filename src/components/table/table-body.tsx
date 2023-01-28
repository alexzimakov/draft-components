import { type ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type TableBodyProps = ComponentPropsWithRef<'tbody'>;

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
