import { type ComponentProps } from 'react';

type TableBodyHTMLProps = ComponentProps<'tbody'>;

export type TableBodyProps = TableBodyHTMLProps;

export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}
