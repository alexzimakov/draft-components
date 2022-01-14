import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { isFunction } from '../../lib/guards';
import { Spinner } from '../spinner';

export type ButtonHtmlAttrs = ComponentPropsWithRef<'button'>;

export interface ButtonProps extends ButtonHtmlAttrs {
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  renderAs?: (props: {
    className: string;
    children: JSX.Element;
  }) => JSX.Element;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = 'md',
      appearance = 'default',
      type = 'button',
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
        {leadingIcon && <span className="dc-btn__icon">{leadingIcon}</span>}
        {children && <span className="dc-btn__text">{children}</span>}
        {trailingIcon && <span className="dc-btn__icon">{trailingIcon}</span>}

        {isLoading && (
          <span className="dc-btn__spinner">
            <Spinner data-testid="dc-btn-loader-indicator" size="1.25em" />
          </span>
        )}
      </>
    );

    if (isFunction(renderAs)) {
      return renderAs({ className, children: content });
    }

    return (
      <button {...props} ref={ref} className={className} type={type}>
        {content}
      </button>
    );
  }
);
