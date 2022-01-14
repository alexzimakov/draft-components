import { ComponentPropsWithRef, forwardRef } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import {
  SelectionControl,
  SelectionControlBaseProps,
} from '../selection-control';
import { SvgIcon } from '../svg-icon';
import { dash } from '../../bootstrap-icons/dash';
import { check } from '../../bootstrap-icons/check';

export type CheckboxHtmlAttrs = Omit<
  ComponentPropsWithRef<'input'>,
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
  onCheck?(checked: boolean): void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      style,
      className,
      disabled,
      isMixed,
      onChange,
      onCheck,
      ...props
    },
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
          onChange={(event) => {
            isFunction(onChange) && onChange(event);
            isFunction(onCheck) && onCheck(event.target.checked);
          }}
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
