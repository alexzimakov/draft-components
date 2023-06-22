import { type ComponentPropsWithoutRef, type JSX, type ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Label } from '../label';
import { Caption } from '../caption';

export type FormFieldRenderFn = (props: {
  id: string;
  required: boolean;
  hasError: boolean;
}) => ReactNode;
type FormFieldHTMLProps = ComponentPropsWithoutRef<'div'>;
type FormFieldBaseProps = Omit<FormFieldHTMLProps, 'children'>;
export type FormFieldProps = {
  required?: boolean;
  labelFor?: string;
  label?: ReactNode;
  caption?: ReactNode;
  error?: ReactNode;
  children: ReactNode | FormFieldRenderFn;
} & FormFieldBaseProps;

export function FormField({
  required = false,
  labelFor = '',
  label,
  caption,
  error,
  className = '',
  children,
  ...props
}: FormFieldProps) {
  const defaultId = useId();
  const id = labelFor || defaultId;
  const hasError = Boolean(error);
  const shouldRenderLabel = Boolean(label);

  let captionEl: JSX.Element | null = null;
  if (hasError) {
    captionEl = (
      <Caption
        className="dc-form-field__error"
        appearance="error"
        showIcon={true}
      >
        {error}
      </Caption>
    );
  } else if (caption) {
    captionEl = <Caption className="dc-form-field__caption">{caption}</Caption>;
  }

  return (
    <div {...props} className={classNames('dc-form-field', className)}>
      {shouldRenderLabel && (
        <Label
          className="dc-form-field__label"
          htmlFor={id}
          required={required}
        >
          {label}
        </Label>
      )}
      <div className="dc-form-field__input">
        {typeof children === 'function'
          ? children({ id, required, hasError })
          : children}
      </div>
      {captionEl}
    </div>
  );
}
