import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableHeadProps extends ComponentPropsWithoutRef<'thead'> {}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <thead {...props} className={classNames(className, 'dc-table-head')} />
  );
}
