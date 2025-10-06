import { type ComponentProps, type ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Label } from '../label/index.js';
import { Caption } from '../caption/index.js';

export type FormFieldRender = (props: {
  id: string;
  invalid: boolean;
  required: boolean;
  describedBy: string[];
}) => ReactNode;

type FormFieldHTMLProps = ComponentProps<'div'>;

type FormFieldBaseProps = {
  srOnlyLabel?: boolean;
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
  srOnlyLabel = false,
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
              className={classNames('dc-form-field__label', srOnlyLabel && 'dc-form-field__label_sr-only')}
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

function ExclamationTriangleIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  );
}
