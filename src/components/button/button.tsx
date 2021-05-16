import * as React from 'react';
import { Spinner } from '../spinner';
import { classNames } from '../../lib';

export type ButtonHtmlAttrs = React.ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends ButtonHtmlAttrs {
  size?: 'sm' | 'md' | 'lg';
  appearance?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'minimal';
  fullWidth?: boolean;
  noPadding?: boolean;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  renderAs?: (props: {
    className: string;
    children: JSX.Element;
  }) => JSX.Element;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = 'md',
      appearance = 'default',
      isLoading,
      fullWidth,
      noPadding,
      leadingIcon,
      trailingIcon,
      renderAs,
      children,
      className,
      ...props
    },
    ref
  ) {
    className = classNames(className, 'dc-button', {
      'dc-button_loading': isLoading,
      'dc-button_full-width': fullWidth,
      'dc-button_no-padding': noPadding,
      [`dc-button_size_${size}`]: size,
      [`dc-button_${appearance}`]: appearance,
    });
    const content = (
      <>
        <span className="dc-button__body">
          {leadingIcon && (
            <span className="dc-button__icon">{leadingIcon}</span>
          )}

          {children && <span className="dc-button__text">{children}</span>}

          {trailingIcon && (
            <span className="dc-button__icon">{trailingIcon}</span>
          )}
        </span>

        {isLoading && (
          <span className="dc-button__spinner">
            <Spinner data-testid="dc-button-loader-indicator" size="1.25em" />
          </span>
        )}
      </>
    );

    if (typeof renderAs === 'function') {
      return renderAs({ className, children: content });
    }

    return (
      <button {...props} ref={ref} className={className}>
        {content}
      </button>
    );
  }
);
