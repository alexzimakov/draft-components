import { type ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableHeadHTMLProps = ComponentProps<'thead'>;

type TableHeadBaseProps = {
  isTinted?: boolean;
};

export type TableHeadProps =
  & TableHeadBaseProps
  & Omit<TableHeadHTMLProps, keyof TableHeadBaseProps>;

export const TableHead = forwardRef<
  HTMLTableSectionElement,
  TableHeadProps
>(function TableHead({ className, isTinted = false, ...props }, ref) {
  return (
    <thead
      {...props}
      ref={ref}
      className={classNames(className, {
        'dc-table-head': true,
        'dc-table-head_tinted': isTinted,
      })}
    />
  );
});
