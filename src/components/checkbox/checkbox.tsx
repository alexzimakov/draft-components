import * as React from 'react';
import {
  SelectionControl,
  SelectionControlBaseProps,
} from '../selection-control';
import { classNames } from '../../lib';
import { SvgIcon } from '../svg-icon';
import { minusIcon } from '../svg-icon/icons/minus';

export type CheckboxHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'dirname'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

export interface CheckboxProps
  extends SelectionControlBaseProps,
    CheckboxHtmlAttrs {
  isMixed?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, description, style, className, disabled, isMixed, ...props },
    ref
  ) {
    return (
      <SelectionControl
        className={classNames(className, 'dc-checkbox')}
        style={style}
        label={label}
        description={description}
        isDisabled={disabled}
      >
        <input
          {...props}
          ref={ref}
          className="dc-checkbox__input"
          type="checkbox"
          disabled={disabled}
        />
        <span className="dc-checkbox__check" aria-hidden={true}>
          {isMixed ? (
            <SvgIcon
              className="dc-checkbox__check-icon"
              icon={minusIcon}
              size={24}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="dc-checkbox__check-icon"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </SelectionControl>
    );
  }
);
