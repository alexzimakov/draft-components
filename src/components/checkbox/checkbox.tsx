// noinspection ES6PreferShortImport

import * as React from 'react';
import { classNames } from '../../lib';
import {
  SelectionControl,
  SelectionControlBaseProps,
} from '../selection-control';
import { SvgIcon } from '../svg-icon';
import { dash } from '../../icons/dash';
import { check } from '../../icons/check';

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
          className="dc-checkbox__input"
          ref={ref}
          type="checkbox"
          disabled={disabled}
        />
        <span className="dc-checkbox__check" aria-hidden={true}>
          <SvgIcon
            className="dc-checkbox__check-icon"
            icon={isMixed ? dash : check}
            size="lg"
          />
        </span>
      </SelectionControl>
    );
  }
);
