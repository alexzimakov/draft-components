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
  let addOnLeft: ReactNode = null;
  if (loading) {
    addOnLeft = (
      <span data-testid="button-spinner" className="dc-button__spinner">
        <Spinner size="1.15em" />
      </span>
    );
  } else if (leftIcon) {
    addOnLeft = (
      <span data-testid="button-icon" className="dc-button__icon">
        {leftIcon}
      </span>
    );
  }

  let addOnRight = null;
  if (rightIcon) {
    addOnRight = (
      <span data-testid="button-icon" className="dc-button__icon">
        {rightIcon}
      </span>
    );
  }

  const shouldRenderLabel = Boolean(children);
  const shouldRenderCaption = Boolean(caption);
  const content = (
    <>
      {addOnLeft}
      {shouldRenderLabel && (
        <span className="dc-button__body">
          <span className="dc-button__label">{children}</span>
          {shouldRenderCaption && (
            <small className="dc-button__caption">{caption}</small>
          )}
        </span>
      )}
      {addOnRight}
    </>
  );

  className = classNames(className, {
    'dc-button': true,
    'dc-button_block': isBlock,
    'dc-button_loading': loading,
    'dc-button_has_caption': shouldRenderCaption,
    [`dc-button_${size}`]: size,
    [`dc-button_appearance_${appearance}`]: appearance,
    [`dc-button_variant_${variant}`]: variant,
  });

  if (typeof renderAs === 'function') {
    return renderAs({
      className,
      children: content,
    });
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {content}
    </button>
  );
});
