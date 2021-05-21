import * as React from 'react';
import { classNames } from '../../lib';

export interface TableHeadProps
  extends React.ComponentPropsWithoutRef<'thead'> {}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <thead {...props} className={classNames(className, 'dc-table-head')} />
  );
}
