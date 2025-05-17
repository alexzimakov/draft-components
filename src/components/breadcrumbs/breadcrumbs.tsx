import { type ComponentProps, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { BreadcrumbsContextProvider } from './breadcrumbs-context.js';

type BreadcrumbsHTMLProps = ComponentProps<'nav'>;

type BreadcrumbsBaseProps = {
  separator?: ReactNode;
};

export type BreadcrumbsProps =
  & BreadcrumbsBaseProps
  & Omit<BreadcrumbsHTMLProps, keyof BreadcrumbsBaseProps>;

const defaultSeparator = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 18"
    width={6}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth={1}
  >
    <line x1={1} y1={16} x2={4} y2={1} />
  </svg>
);

export function Breadcrumbs({
  separator = defaultSeparator,
  className,
  children,
  ...props
}: BreadcrumbsProps) {
  return (
    <BreadcrumbsContextProvider separator={separator}>
      <nav {...props} className={classNames('dc-breadcrumbs', className)}>
        <ol className="dc-breadcrumbs__items">
          {children}
        </ol>
      </nav>
    </BreadcrumbsContextProvider>
  );
}
