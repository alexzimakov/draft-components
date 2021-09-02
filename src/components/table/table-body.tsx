import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody {...props} className={classNames(className, 'dc-table-body')}>
      {children}
    </tbody>
  );
}
