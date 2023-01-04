import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';
import { Spinner } from '../spinner';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonAppearance = 'default' | 'primary' | 'danger' | 'success';
export type ButtonVariant = 'filled' | 'tinted' | 'plain';
export type ButtonRenderFn = (props: {
  className: string;
  children: JSX.Element;
}) => JSX.Element;
export type ButtonProps = ComponentPropsWithRef<'button'> & {
  isBlock?: boolean;
  loading?: boolean;
  size?: ButtonSize,
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  icon?: ReactNode;
  caption?: ReactNode;
  renderAs?: ButtonRenderFn;
};

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
  icon = null,
  caption = null,
  renderAs,
  className,
  children,
  ...props
}, ref) {
  const shouldRenderIcon = Boolean(icon);
  const shouldRenderLabel = Boolean(children);
  const shouldRenderCaption = Boolean(caption);

  let leadingAddOn: ReactNode = null;
  if (loading) {
    leadingAddOn = (
      <span data-testid="button-spinner" className="dc-button__spinner">
        <Spinner size="1.15em" />
      </span>
    );
  } else if (shouldRenderIcon) {
    leadingAddOn = (
      <span data-testid="button-icon" className="dc-button__icon">
        {icon}
      </span>
    );
  }

  const content = (
    <>
      {leadingAddOn}
      {shouldRenderLabel && (
        <span className="dc-button__body">
          <span className="dc-button__label">{children}</span>
          {shouldRenderCaption && (
            <small className="dc-button__caption">{caption}</small>
          )}
        </span>
      )}
    </>
  );

  className = classNames(className, {
    'dc-button': true,
    'dc-button_block': isBlock,
    'dc-button_loading': loading,
    'dc-button_has_icon': shouldRenderIcon,
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
