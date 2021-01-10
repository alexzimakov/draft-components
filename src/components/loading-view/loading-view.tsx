import * as React from 'react';
import { Spinner } from '../spinner';
import { classNames } from '../../lib';

export type LoadingViewHtmlAttrs = React.ComponentPropsWithoutRef<'div'>;

export interface LoadingViewProps extends LoadingViewHtmlAttrs {}

export function LoadingView({
  className,
  children,
  ...props
}: LoadingViewProps) {
  return (
    <div {...props} className={classNames(className, 'dc-loading-view')}>
      <Spinner className="dc-loading-view__spinner" size="1.75em" />
      <div className="dc-loading-view__content">{children}</div>
    </div>
  );
}
