import { forwardRef, useState, useRef, useEffect } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { DateComponents } from './date-components';
import { DateComponentInput } from './date-component-input';
import type {
  ComponentPropsWithRef,
  ReactNode,
  ReactNodeArray,
  FocusEvent,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import type { TextFieldProps } from '../text-field';
import type { DateComponent } from './date-components';

export interface DatetimeFieldProps extends ComponentPropsWithRef<'fieldset'> {
  size?: TextFieldProps['size'];
  type?: 'date' | 'time' | 'datetime';
  invalid?: boolean;
  readOnly?: boolean;
  placeholders?: { [component in DateComponent]?: string };
  ariaLabels?: { [component in DateComponent]?: string };
  value: DateComponents;
  onChangeValue(value: DateComponents): void;
}

const defaultAriaLabels = {
  year: 'year',
  month: 'month',
  day: 'day',
  hour: 'hour',
  minute: 'minute',
};

const defaultPlaceholders = {
  year: 'Year',
  month: 'Month',
  day: 'Day',
  hour: '--',
  minute: '--',
};

export const DatetimeField = forwardRef<
  HTMLFieldSetElement,
  DatetimeFieldProps
>(function DatetimeField(
  {
    size = 'md',
    type = 'datetime',
    invalid,
    disabled,
    readOnly,
    ariaLabels = defaultAriaLabels,
    placeholders = defaultPlaceholders,
    value: dateComponents,
    onChangeValue: onChangeDateComponents,
    className,
    ...props
  },
  ref
) {
  const fieldSetRef = useRef<HTMLFieldSetElement | null>(null);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const cancelBlur = useRef<Function>();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (fieldSetRef.current) {
      inputsRef.current = Array.from(
        fieldSetRef.current.getElementsByTagName('input')
      );
    }
  }, [type]);

  function updateDateComponents(
    value: string | number,
    component: DateComponent
  ) {
    onChangeDateComponents(dateComponents.updatingValue(value, component));
  }

  function getInputSiblings(
    input: HTMLInputElement
  ): { next: HTMLInputElement; prev: HTMLInputElement } {
    const inputs = inputsRef.current;
    const index = inputs.findIndex((el) => el === input);
    if (index < 0) {
      return { next: input, prev: input };
    }

    const lastIndex = inputs.length - 1;
    return {
      prev: inputs[index > 0 ? index - 1 : 0],
      next: inputs[index < lastIndex ? index + 1 : lastIndex],
    };
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    (event.target as HTMLInputElement).select();

    if (isFunction(cancelBlur.current)) {
      cancelBlur.current();
    } else {
      setFocused(true);
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const dateComponent = event.target.name as DateComponent;
    const dateComponentOptions = DateComponents.options[dateComponent];
    let dateComponentValue = dateComponents[dateComponent];
    if (dateComponentValue != null) {
      if (dateComponentValue < dateComponentOptions.min) {
        updateDateComponents(dateComponentOptions.min, dateComponent);
      } else if (dateComponentValue > dateComponentOptions.max) {
        updateDateComponents(dateComponentOptions.max, dateComponent);
      }
    }

    cancelBlur.current = defer(() => {
      setFocused(false);
      cancelBlur.current = undefined;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const code = event.code;
    const input = event.target as HTMLInputElement;
    const dateComponent = input.name as DateComponent;
    const dateComponentOptions = DateComponents.options[dateComponent];
    const dateComponentValue = dateComponents[dateComponent];

    if (code === KeyCode.arrowLeft || code === KeyCode.arrowRight) {
      event.preventDefault();

      const siblings = getInputSiblings(input);
      // prettier-ignore
      const nextFocus = code === KeyCode.arrowLeft
        ? siblings.prev
        : siblings.next;
      nextFocus.focus();
    } else if (readOnly) {
      return;
    } else if (
      code === KeyCode.arrowUp ||
      code === KeyCode.arrowDown ||
      code === KeyCode.backspace ||
      code === KeyCode.delete
    ) {
      event.preventDefault();

      if (code === KeyCode.backspace || code === KeyCode.delete) {
        updateDateComponents('', dateComponent);
      } else {
        let dateComponentNewValue: number;
        if (dateComponentValue == null) {
          dateComponentNewValue = getDefaultValue(dateComponent);
        } else {
          const step = code === KeyCode.arrowUp ? 1 : -1;

          dateComponentNewValue = dateComponentValue + step;
          if (dateComponentNewValue > dateComponentOptions.max) {
            dateComponentNewValue = dateComponentOptions.min;
          } else if (dateComponentNewValue < dateComponentOptions.min) {
            dateComponentNewValue = dateComponentOptions.max;
          }
        }

        updateDateComponents(dateComponentNewValue, dateComponent);
        defer(() => input.select());
      }
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    if (!target.value.match(/^\d+$/)) {
      return;
    }

    const dateComponent = target.name as DateComponent;
    const dateComponentOptions = DateComponents.options[dateComponent];

    const dateComponentNewValue = Number(target.value);
    updateDateComponents(dateComponentNewValue, dateComponent);

    const dateComponentNextMinValue = dateComponentNewValue * 10;
    if (dateComponentNextMinValue > dateComponentOptions.max) {
      const siblings = getInputSiblings(target);
      defer(() => siblings.next.focus());
    }
  }

  function renderInputsGroup(
    components: DateComponent[],
    separator: ReactNode
  ): JSX.Element {
    const children: ReactNodeArray = [];
    components.forEach((dateComponent, index) => {
      if (index) {
        children.push(
          <span
            key={`separator-${index}`}
            className="dc-datetime-field__separator"
          >
            {separator}
          </span>
        );
      }

      children.push(
        <DateComponentInput
          key={dateComponent}
          label={ariaLabels?.[dateComponent] || dateComponent}
          placeholder={placeholders?.[dateComponent]}
          readOnly={readOnly}
          name={dateComponent}
          value={dateComponents.getDisplayedValue(dateComponent)}
          onChange={handleChange}
        />
      );
    });

    return <div className="dc-datetime-field__group">{children}</div>;
  }

  return (
    <fieldset
      className={classNames(className, 'dc-datetime-field')}
      ref={mergeRefs(ref, fieldSetRef)}
      disabled={disabled}
      role="group"
      {...props}
    >
      <div
        data-testid="inputs-container"
        className={classNames('dc-field', 'dc-datetime-field__body', {
          'dc-field_focused': focused,
          'dc-field_disabled': disabled,
          'dc-field_invalid': invalid,
          [`dc-field_size_${size}`]: size,
        })}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {(type === 'date' || type === 'datetime') &&
          renderInputsGroup(['day', 'month', 'year'], '/')}

        {(type === 'time' || type === 'datetime') &&
          renderInputsGroup(['hour', 'minute'], ':')}
      </div>
    </fieldset>
  );
});

function defer(callback: Function): () => void {
  const timeout = window.setTimeout(callback, 1);
  return () => {
    window.clearTimeout(timeout);
  };
}

function getDefaultValue(component: DateComponent): number {
  const now = new Date();
  switch (component) {
    case 'year':
      return now.getFullYear();
    case 'month':
      return now.getMonth() + 1;
    case 'day':
      return now.getDate();
    case 'hour':
      return now.getHours();
    case 'minute':
      return now.getMinutes();
  }
}
