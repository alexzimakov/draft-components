import { ComponentPropsWithRef, JSX, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Spinner } from '../spinner';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonAppearance = 'default' | 'primary' | 'danger' | 'success';
export type ButtonVariant = 'filled' | 'tinted' | 'plain';
export type ButtonRenderFn = (props: {
  className: string;
  children: JSX.Element;
}) => JSX.Element;
export type ButtonProps = {
  isBlock?: boolean;
  loading?: boolean;
  size?: ButtonSize,
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  caption?: ReactNode;
  renderAs?: ButtonRenderFn;
} & ComponentPropsWithRef<'button'>;

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button({
  isBlock = false,
  disabled = false,
  loading = false,
  type = 'button',
  size = 'sm',
  variant = 'filled',
  appearance = 'default',
  leftIcon = null,
  rightIcon = null,
  caption = null,
  renderAs,
  className,
  children,
  ...props
}, ref) {
  children = (
    <>
      {loading
        ? <Spinner data-testid="button-spinner" size="1.15em" />
        : leftIcon}
      {caption ? (
        <div className="dc-button__label">
          {children}
          <small className="dc-button__caption">{caption}</small>
        </div>
      ) : children}
      {rightIcon}
    </>
  );

  className = classNames(className, {
    'dc-button': true,
    'dc-button_block': isBlock,
    'dc-button_loading': loading,
    'dc-button_with_left-icon': leftIcon,
    'dc-button_with_right-icon': rightIcon,
    [`dc-button_${size}`]: size,
    [`dc-button_appearance_${appearance}`]: appearance,
    [`dc-button_variant_${variant}`]: variant,
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
