import { type ComponentProps, type ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Label } from '../label/index.js';
import { Caption } from '../caption/index.js';
import { ExclamationTriangleIcon } from '../hero-icons/24/solid/exclamation-triangle-icon.js';

export type FormFieldRender = (props: {
  id: string;
  invalid: boolean;
  required: boolean;
  describedBy: string[];
}) => ReactNode;

type FormFieldHTMLProps = ComponentProps<'div'>;

type FormFieldBaseProps = {
  required?: boolean;
  labelFor?: string;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  children: ReactNode | FormFieldRender;
};

export type FormFieldProps =
  & FormFieldBaseProps
  & Omit<FormFieldHTMLProps, keyof FormFieldBaseProps>;

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
        role="alert"
        color="red"
        icon={<ExclamationTriangleIcon width={20} height={20} />}
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
      {label
        ? (
            <Label
              className="dc-form-field__label"
              required={required}
              htmlFor={inputId}
            >
              {label}
            </Label>
          )
        : null}
      <div className="dc-form-field__input">
        {inputElement}
      </div>
      {errorElement}
      {hintElement}
    </div>
  );
}
