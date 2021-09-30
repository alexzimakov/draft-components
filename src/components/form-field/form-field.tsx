import { ComponentPropsWithoutRef, ReactNode, useRef } from 'react';
import { uniqueId } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';
import { Label } from '../label';
import { InlineMessage } from '../inline-message';

export interface InputRenderFn {
  (props: { id: string; required: boolean; invalid: boolean }): JSX.Element;
}

export interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  label?: ReactNode;
  labelFor?: string;
  required?: boolean;
  hint?: ReactNode;
  validationError?: ReactNode;
  children: JSX.Element | InputRenderFn;
}

export function FormField({
  label,
  labelFor,
  required,
  hint,
  validationError,
  className,
  children,
  ...props
}: FormFieldProps) {
  const inputId = useRef(labelFor);
  if (!inputId.current) {
    inputId.current = uniqueId('form-field-input-');
  }

  return (
    <div {...props} className={classNames(className, 'dc-form-field')}>
      {label ? (
        <Label
          className="dc-form-field__label"
          isRequired={required}
          htmlFor={inputId.current}
        >
          {label}
        </Label>
      ) : null}
      <div className="dc-form-field__input">
        {typeof children === 'function'
          ? children({
              id: inputId.current,
              required: Boolean(required),
              invalid: Boolean(validationError),
            })
          : children}
      </div>
      {(function () {
        if (validationError) {
          return (
            <InlineMessage
              className="dc-form-field__error"
              shouldShowIcon={true}
              appearance="error"
            >
              {validationError}
            </InlineMessage>
          );
        }
        if (hint) {
          return (
            <InlineMessage className="dc-form-field__hint">
              {hint}
            </InlineMessage>
          );
        }
        return null;
      })()}
    </div>
  );
}
