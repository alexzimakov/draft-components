import { type ComponentProps } from 'react';

type TableHeadHTMLProps = ComponentProps<'thead'>;

export type TableHeadProps = TableHeadHTMLProps;

export function TableHead(props: TableHeadProps) {
  return <thead {...props} />;
}
