import { useRef } from 'react';
import { uniqueId } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';
import { Label } from '../label';
import { InlineMessage } from '../inline-message';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface FieldRenderer {
  (props: { id: string; isRequired: boolean; isInvalid: boolean }): JSX.Element;
}

export interface FieldGroupProps extends ComponentPropsWithoutRef<'div'> {
  label?: ReactNode;
  labelFor?: string;
  isRequired?: boolean;
  hint?: ReactNode;
  validationError?: ReactNode;
  children: JSX.Element | FieldRenderer;
}

export function FieldGroup({
  label,
  labelFor,
  isRequired = false,
  hint,
  validationError,
  className,
  children,
  ...props
}: FieldGroupProps) {
  const inputId = useRef(labelFor);
  if (!inputId.current) {
    inputId.current = uniqueId('field-group-input-');
  }

  return (
    <div {...props} className={classNames(className, 'dc-field-group')}>
      {label ? (
        <Label
          className="dc-field-group__label"
          isRequired={isRequired}
          htmlFor={inputId.current}
        >
          {label}
        </Label>
      ) : null}
      <div className="dc-field-group__field">
        {typeof children === 'function'
          ? children({
              id: inputId.current,
              isRequired,
              isInvalid: !!validationError,
            })
          : children}
      </div>
      {(function () {
        if (validationError) {
          return (
            <InlineMessage
              className="dc-field-group__error"
              shouldShowIcon={true}
              appearance="error"
            >
              {validationError}
            </InlineMessage>
          );
        }
        if (hint) {
          return (
            <InlineMessage className="dc-field-group__hint">
              {hint}
            </InlineMessage>
          );
        }
        return null;
      })()}
    </div>
  );
}
