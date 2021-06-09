import { classNames } from '../../lib/react-helpers';
import { Spinner } from '../spinner';
import type { ComponentPropsWithoutRef } from 'react';

export type LoadingViewHtmlAttrs = ComponentPropsWithoutRef<'div'>;

export interface LoadingViewProps extends LoadingViewHtmlAttrs {
  padY?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function LoadingView({
  padY = '2xl',
  className,
  children,
  ...props
}: LoadingViewProps) {
  return (
    <div
      {...props}
      className={classNames(
        className,
        'dc-loading-view',
        `dc-loading-view_pad-y_${padY}`
      )}
    >
      <Spinner className="dc-loading-view__spinner" size="1.75em" />
      <div className="dc-loading-view__content">{children}</div>
    </div>
  );
}
