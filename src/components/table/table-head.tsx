import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableHeadHTMLProps = ComponentProps<'thead'>;

type TableHeadBaseProps = {
  isTinted?: boolean;
};

export type TableHeadProps =
  & TableHeadBaseProps
  & Omit<TableHeadHTMLProps, keyof TableHeadBaseProps>;

export function TableHead({
  className,
  isTinted = false,
  ...props
}: TableHeadProps) {
  return (
    <thead
      {...props}
      className={classNames(className, {
        'dc-table-head': true,
        'dc-table-head_tinted': isTinted,
      })}
    />
  );
}
