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
  isRounded?: boolean;
  isCircle?: boolean;
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
      fullWidth,
      noPadding,
      isRounded,
      isCircle,
      isLoading,
      leadingIcon,
      trailingIcon,
      renderAs,
      children,
      className,
      ...props
    },
    ref
  ) {
    className = classNames(className, 'dc-btn', {
      'dc-btn_full-width': fullWidth,
      'dc-btn_no-padding': noPadding,
      'dc-btn_rounded': isRounded,
      'dc-btn_circle': isCircle,
      'dc-btn_loading': isLoading,
      [`dc-btn_size_${size}`]: size,
      [`dc-btn_${appearance}`]: appearance,
    });
    const content = (
      <>
        <span className="dc-btn__body">
          {leadingIcon && <span className="dc-btn__icon">{leadingIcon}</span>}

          {children && <span className="dc-btn__text">{children}</span>}

          {trailingIcon && <span className="dc-btn__icon">{trailingIcon}</span>}
        </span>

        {isLoading && (
          <span className="dc-btn__spinner">
            <Spinner data-testid="dc-btn-loader-indicator" size="1.25em" />
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
