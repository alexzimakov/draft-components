import * as React from 'react';
import { Spinner } from '../spinner';
import { classNames } from '../../lib';

export type ButtonHtmlAttrs = React.ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends ButtonHtmlAttrs {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  appearance?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'minimal';
  hasFullWidth?: boolean;
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
      hasFullWidth,
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
      'dc-button_is-loading': isLoading,
      'dc-button_has-full-width': hasFullWidth,
      [`dc-button_size_${size}`]: size,
      [`dc-button_${appearance}`]: appearance,
    });
    const content = (
      <>
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
