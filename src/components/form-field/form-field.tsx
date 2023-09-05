import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Label } from '../label';
import { Caption } from '../caption';

export type FormFieldRenderFn = (props: {
  id: string;
  invalid: boolean;
  required: boolean;
  /**
   * The list of IDs that describe the input element.
   */
  describedBy: string[];
}) => ReactNode;
type FormFieldHTMLProps = ComponentPropsWithoutRef<'div'>;
type FormFieldBaseProps = Omit<FormFieldHTMLProps, 'children'>;
export type FormFieldProps = {
  required?: boolean;
  labelFor?: string;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  children: ReactNode | FormFieldRenderFn;
} & FormFieldBaseProps;

export function FormField({
  required = false,
  labelFor = '',
  label,
  error,
  hint,
  className = '',
  children,
  ...props
}: FormFieldProps) {
  const id = useId();
  const invalid = Boolean(error);
  const inputId = labelFor || `${id}-input`;
  const inputDescribedBy: string[] = [];

  let hintElement: ReactNode = null;
  if (hint) {
    const hintId = `${inputId}-hint`;
    inputDescribedBy.push(hintId);
    hintElement = (
      <Caption id={hintId} className="dc-form-field__hint">
        {hint}
      </Caption>
    );
  }

  let errorElement: ReactNode = null;
  if (invalid) {
    const errorId = `${inputId}-error`;
    inputDescribedBy.push(errorId);
    errorElement = (
      <Caption
        id={errorId}
        className="dc-form-field__error"
        appearance="error"
        showIcon={true}
      >
        {error}
      </Caption>
    );
  }

  let inputElement: ReactNode;
  if (typeof children === 'function') {
    inputElement = children({
      invalid,
      required,
      id: inputId,
      describedBy: inputDescribedBy,
    });
  } else {
    inputElement = children;
  }

  return (
    <div {...props} className={classNames('dc-form-field', className)}>
      {label ? (
        <Label
          className="dc-form-field__label"
          required={required}
          htmlFor={inputId}
        >
          {label}
        </Label>
      ) : null}
      <div className="dc-form-field__input">
        {inputElement}
      </div>
      {errorElement}
      {hintElement}
    </div>
  );
}
