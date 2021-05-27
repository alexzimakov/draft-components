import * as React from 'react';
import { Label } from '../label';
import { InlineMessage } from '../inline-message';
import { util, reactHelpers } from '../../lib';

export interface FieldRenderer {
  (props: { id: string; isRequired: boolean; isInvalid: boolean }): JSX.Element;
}

export interface FieldGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  label?: React.ReactNode;
  labelFor?: string;
  isRequired?: boolean;
  hint?: React.ReactNode;
  validationError?: React.ReactNode;
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
  const inputId = React.useRef(labelFor);
  if (!inputId.current) {
    inputId.current = util.uniqueId('field-group-input-');
  }

  return (
    <div
      {...props}
      className={reactHelpers.classNames(className, 'dc-field-group')}
    >
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
