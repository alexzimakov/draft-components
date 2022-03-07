import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type TableHeadProps = ComponentPropsWithRef<'thead'>;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ className, ...props }, ref) {
    return (
      <thead
        {...props}
        ref={ref}
        className={classNames(className, 'dc-table-head')}
      />
    );
  }
);
