import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody {...props} className={classNames(className, 'dc-table-body')}>
      {children}
    </tbody>
  );
}
