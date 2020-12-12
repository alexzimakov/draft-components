import * as React from 'react';
import { Spinner } from '../spinner';
import { classNames } from '../../lib/class-names';

export type ButtonHtmlAttrs = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: 'xs' | 'sm' | 'lg';
  appearance?: 'primary' | 'danger' | 'success' | 'minimal';
  hasFullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
} & ButtonHtmlAttrs;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      size,
      appearance,
      isLoading,
      hasFullWidth,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(className, 'dc-button', {
          'dc-button_size_xs': size === 'xs',
          'dc-button_size_sm': size === 'sm',
          'dc-button_size_lg': size === 'lg',
          'dc-button_primary': appearance === 'primary',
          'dc-button_danger': appearance === 'danger',
          'dc-button_success': appearance === 'success',
          'dc-button_minimal': appearance === 'minimal',
          'dc-button_is-loading': isLoading,
          'dc-button_has-full-width': hasFullWidth,
        })}
      >
        {isLoading ? (
          <span className="dc-button__spinner">
            <Spinner data-testid="dc-button-loader-indicator" size="1.25em" />
          </span>
        ) : null}
        {leadingIcon ? (
          <span className="dc-button__leading-icon">{leadingIcon}</span>
        ) : null}
        <span className="dc-button__text">{children}</span>
        {trailingIcon ? (
          <span className="dc-button__trailing-icon">{trailingIcon}</span>
        ) : null}
      </button>
    );
  }
);
