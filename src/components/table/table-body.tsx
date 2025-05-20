import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableBodyHTMLProps = ComponentProps<'tbody'>;

export type TableBodyProps = TableBodyHTMLProps;

export function TableBody({
  className,
  children,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={classNames(className, 'dc-table-body')}
    >
      {children}
    </tbody>
  );
}
