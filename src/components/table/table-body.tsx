import * as React from 'react';
import { classNames } from '../../lib';

export interface TableBodyProps
  extends React.ComponentPropsWithoutRef<'tbody'> {}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody {...props} className={classNames(className, 'dc-table-body')}>
      {children}
    </tbody>
  );
}
