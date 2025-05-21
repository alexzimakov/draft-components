import { type ComponentProps, type JSX, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Spinner } from '../spinner/index.js';

export type ButtonStyle = 'filled' | 'tinted' | 'plain';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonTint =
  | 'light'
  | 'dark'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'rose'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'lime'
  | 'green';

export type ButtonRenderer = (props: {
  className: string;
  children: JSX.Element;
}) => JSX.Element;

type ButtonHTMLProps = ComponentProps<'button'>;

type ButtonBaseProps = {
  fullWidth?: boolean;
  loading?: boolean;
  buttonStyle?: ButtonStyle;
  size?: ButtonSize;
  tint?: ButtonTint;
  caption?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  renderAs?: ButtonRenderer;
};

export type ButtonProps =
  & ButtonBaseProps
  & Omit<ButtonHTMLProps, keyof ButtonBaseProps>;

export function Button({
  fullWidth,
  disabled,
  loading,
  buttonStyle = 'filled',
  size = 'sm',
  tint = 'light',
  iconLeft,
  iconRight,
  caption,
  className,
  children,
  type = 'button',
  renderAs,
  ...props
}: ButtonProps) {
  if (loading) {
    iconLeft = <Spinner data-testid="button-spinner" size="1.15em" />;
  }

  if (caption) {
    children = (
      <div className="dc-button__label">
        {children}
        <small className="dc-button__caption">{caption}</small>
      </div>
    );
  }

  children = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  className = classNames(className, {
    'dc-button': true,
    'dc-button_full-width': fullWidth,
    'dc-button_loading': loading,
    'dc-button_has_icon-left': iconLeft,
    'dc-button_has_icon-right': iconRight,
    [`dc-button_${size}`]: size,
    [`dc-button_tint_${tint}`]: tint,
    [`dc-button_style_${buttonStyle}`]: buttonStyle,
  });

  if (typeof renderAs === 'function') {
    return renderAs({ className, children });
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
