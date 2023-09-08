import { ComponentPropsWithRef, JSX, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Spinner } from '../spinner/index.js';

type ButtonHTMLProps = ComponentPropsWithRef<'button'>;
export type ButtonStyle = 'filled' | 'tinted' | 'plain';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonTint = 'gray' | 'blue' | 'red' | 'green';
export type ButtonRenderer = (props: { className: string; children: JSX.Element }) => JSX.Element;
export type ButtonProps = {
  fullWidth?: boolean;
  loading?: boolean;
  buttonStyle?: ButtonStyle;
  size?: ButtonSize,
  tint?: ButtonTint;
  caption?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  renderAs?: ButtonRenderer;
} & ButtonHTMLProps;

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button({
  fullWidth,
  disabled,
  loading,
  buttonStyle = 'filled',
  size = 'sm',
  tint = 'default',
  iconLeft,
  iconRight,
  caption,
  className,
  children,
  type = 'button',
  renderAs,
  ...props
}, ref) {
  children = (
    <>
      {loading
        ? <Spinner data-testid="button-spinner" size="1.15em" />
        : iconLeft}
      {caption ? (
        <div className="dc-button__label">
          {children}
          <small className="dc-button__caption">{caption}</small>
        </div>
      ) : children}
      {iconRight}
    </>
  );

  className = classNames(className, 'dc-button', {
    [`dc-button_style_${buttonStyle}`]: buttonStyle,
    [`dc-button_tint_${tint}`]: tint,
    [`dc-button_${size}`]: size,
    'dc-button_full-width': fullWidth,
    'dc-button_loading': loading,
    'dc-button_has_icon-left': iconLeft,
    'dc-button_has_icon-right': iconRight,
  });

  if (typeof renderAs === 'function') {
    return renderAs({ className, children });
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});
