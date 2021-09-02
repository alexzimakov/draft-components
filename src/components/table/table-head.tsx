import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface TableHeadProps extends ComponentPropsWithoutRef<'thead'> {}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <thead {...props} className={classNames(className, 'dc-table-head')} />
  );
}
