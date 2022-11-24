import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Spinner } from '../spinner';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonAppearance = 'default' | 'primary' | 'danger' | 'success';
export type ButtonVariant = 'filled' | 'tinted' | 'plain';
export type ButtonRenderFn = (props: {
  className: string;
  children: JSX.Element;
}) => JSX.Element;
export type ButtonProps = ComponentPropsWithRef<'button'> & {
  loading?: boolean;
  size?: ButtonSize,
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  icon?: ReactNode;
  caption?: ReactNode;
  renderAs?: ButtonRenderFn;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    disabled = false,
    loading = false,
    type = 'button',
    size = 'sm',
    variant = 'filled',
    appearance = 'default',
    className = '',
    icon = null,
    caption = null,
    children = null,
    renderAs,
    ...props
  }, ref) {
    const shouldRenderIcon = Boolean(icon);
    const shouldRenderLabel = Boolean(children);
    const shouldRenderCaption = Boolean(caption);
    const CSSClass = classNames('dc-button', className, {
      'dc-button_xs': size === 'xs',
      'dc-button_sm': size === 'sm',
      'dc-button_md': size === 'md',
      'dc-button_lg': size === 'lg',
      'dc-button_xl': size === 'xl',
      'dc-button_loading': loading,
      'dc-button_has_icon': shouldRenderIcon,
      'dc-button_has_caption': shouldRenderCaption,
      'dc-button_appearance_default': appearance === 'default',
      'dc-button_appearance_primary': appearance === 'primary',
      'dc-button_appearance_danger': appearance === 'danger',
      'dc-button_appearance_success': appearance === 'success',
      'dc-button_variant_filled': variant === 'filled',
      'dc-button_variant_tinted': variant === 'tinted',
      'dc-button_variant_plain': variant === 'plain',
    });

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

    if (typeof renderAs === 'function') {
      return renderAs({
        className: CSSClass,
        children: content,
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={CSSClass}
        {...props}
      >
        {content}
      </button>
    );
  }
);
