import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Spinner, SpinnerProps } from '../spinner';

export type LoadingViewHtmlAttrs = ComponentPropsWithoutRef<'div'>;

export interface LoadingViewProps extends LoadingViewHtmlAttrs {
  padY?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  spinnerSize?: SpinnerProps['size'];
}

export function LoadingView({
  padY = '2xl',
  spinnerSize,
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
        `dc-loading-view_pad-y_${padY}`,
      )}
    >
      <Spinner className="dc-loading-view__spinner" size={spinnerSize} />
      <div className="dc-loading-view__content">{children}</div>
    </div>
  );
}
