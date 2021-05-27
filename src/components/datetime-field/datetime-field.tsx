import * as React from 'react';
import { guards, reactHelpers, keyboardHelpers } from '../../lib';
import { DateComponentInput } from './date-component-input';
import { DateComponents, DateComponent } from './date-components';
import { TextFieldProps } from '../text-field';

export interface DatetimeFieldProps
  extends React.ComponentPropsWithRef<'fieldset'> {
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

export const DatetimeField = React.forwardRef<
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
  const fieldSetRef = React.useRef<HTMLFieldSetElement | null>(null);
  const inputsRef = React.useRef<HTMLInputElement[]>([]);

  const cancelBlur = React.useRef<Function>();
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
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

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    (event.target as HTMLInputElement).select();

    if (guards.isFunction(cancelBlur.current)) {
      cancelBlur.current();
    } else {
      setFocused(true);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement;
    const dateComponent = input.name as DateComponent;
    const dateComponentOptions = DateComponents.options[dateComponent];
    const dateComponentValue = dateComponents[dateComponent];
    if (
      keyboardHelpers.isArrowLeftPressed(event) ||
      keyboardHelpers.isArrowRightPressed(event)
    ) {
      event.preventDefault();
      const siblings = getInputSiblings(input);
      const nextFocus = keyboardHelpers.isArrowLeftPressed(event)
        ? siblings.prev
        : siblings.next;
      nextFocus.focus();
    } else if (
      !readOnly &&
      (keyboardHelpers.isArrowUpPressed(event) ||
        keyboardHelpers.isArrowDownPressed(event))
    ) {
      event.preventDefault();
      let dateComponentNewValue: number;
      if (!dateComponentValue) {
        dateComponentNewValue = getDefaultValue(dateComponent);
      } else {
        dateComponentNewValue = Number(input.value);
        if (keyboardHelpers.isArrowUpPressed(event)) {
          dateComponentNewValue += 1;
        } else {
          dateComponentNewValue -= 1;
        }

        if (dateComponentNewValue > dateComponentOptions.max) {
          dateComponentNewValue = dateComponentOptions.min;
        } else if (dateComponentNewValue < dateComponentOptions.min) {
          dateComponentNewValue = dateComponentOptions.max;
        }
      }

      updateDateComponents(dateComponentNewValue, dateComponent);
      defer(() => input.select());
    } else if (
      !readOnly &&
      (keyboardHelpers.isBackspacePressed(event) ||
        keyboardHelpers.isDeletePressed(event))
    ) {
      event.preventDefault();
      updateDateComponents('', dateComponent);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
    separator: React.ReactNode
  ): JSX.Element {
    const children: React.ReactNodeArray = [];
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
      className={reactHelpers.classNames(className, 'dc-datetime-field')}
      ref={reactHelpers.mergeRefs(ref, fieldSetRef)}
      disabled={disabled}
      role="group"
      {...props}
    >
      <div
        data-testid="inputs-container"
        className={reactHelpers.classNames(
          'dc-field',
          'dc-datetime-field__body',
          {
            'dc-field_focused': focused,
            'dc-field_disabled': disabled,
            'dc-field_invalid': invalid,
            [`dc-field_size_${size}`]: size,
          }
        )}
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
