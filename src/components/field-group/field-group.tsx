import * as React from 'react';
import { Label } from '../label';
import { Caption } from '../caption';
import { ErrorMessage } from '../error-message';
import { classNames, uniqueId } from '../../lib';

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
            <ErrorMessage className="dc-field-group__error">
              {validationError}
            </ErrorMessage>
          );
        }
        if (hint) {
          return <Caption className="dc-field-group__hint">{hint}</Caption>;
        }
        return null;
      })()}
    </div>
  );
}
