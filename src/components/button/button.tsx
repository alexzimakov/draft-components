import * as React from 'react';
import { Spinner } from '../spinner';
import { classNames } from '../../lib/class-names';

export type ButtonHtmlAttrs = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type ButtonAppearance =
  | 'default'
  | 'primary'
  | 'danger'
  | 'success'
  | 'minimal';

export type ButtonProps = {
  size?: ButtonSize;
  appearance?: ButtonAppearance;
  hasFullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
} & ButtonHtmlAttrs;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = 'md',
      appearance = 'default',
      isLoading,
      hasFullWidth,
      leadingIcon,
      trailingIcon,
      children,
      className,
      ...props
    },
    ref
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          className,
          'dc-button',
          `dc-button_size_${size}`,
          `dc-button_${appearance}`,
          {
            'dc-button_is-loading': isLoading,
            'dc-button_has-full-width': hasFullWidth,
          }
        )}
      >
        <div className="dc-button__body">
          {leadingIcon ? (
            <span className="dc-button__leading-icon">{leadingIcon}</span>
          ) : null}
          {children}
          {trailingIcon ? (
            <span className="dc-button__trailing-icon">{trailingIcon}</span>
          ) : null}
        </div>
        {isLoading ? (
          <span className="dc-button__spinner">
            <Spinner data-testid="dc-button-loader-indicator" size="1.25em" />
          </span>
        ) : null}
      </button>
    );
  }
);
