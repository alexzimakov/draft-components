import {
  ChangeEvent,
  Children,
  ComponentPropsWithoutRef,
  isValidElement,
  ReactNodeArray,
} from 'react';
import { classNames } from '../../lib/react-helpers';
import { RadioGroupItem } from './radio-group-item';
import { uniqueId } from '../../lib/util';

export interface RadioGroupProps extends ComponentPropsWithoutRef<'ul'> {
  disabled?: boolean;
  readOnly?: boolean;
  children: ReactNodeArray;
  name?: string;
  value: string;
  onChangeValue(value: string): void;
}

export function RadioGroup({
  className,
  children,
  disabled,
  readOnly,
  name = uniqueId('radio-group-'),
  value: checkedValue,
  onChangeValue,
  ...props
}: RadioGroupProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeValue(event.target.value);
  }

  return (
    <ul {...props} className={classNames(className, 'dc-radio-group')}>
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== RadioGroupItem) {
          throw new Error(
            'RadioGroup children must be an array of `RadioGroup.Item` elements'
          );
        }

        const { value } = child.props;
        return (
          <li key={`radio-group-item[value="${value}]"`}>
            <label>
              <input
                className="dc-radio-group-input"
                type="radio"
                name={name}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                checked={value === checkedValue}
                onChange={handleChange}
              />
              {child}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

RadioGroup.Item = RadioGroupItem;
