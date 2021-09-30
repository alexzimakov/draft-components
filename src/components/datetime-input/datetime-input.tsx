import {
  ChangeEvent,
  ComponentPropsWithRef,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  ReactNodeArray,
  useEffect,
  useRef,
  useState,
} from 'react';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { TextInputProps } from '../text-input';
import { DateComponent, DateComponents } from './date-components';
import { DateComponentInput } from './date-component-input';

export interface DatetimeInputProps extends ComponentPropsWithRef<'div'> {
  size?: TextInputProps['size'];
  type?: 'date' | 'time' | 'datetime';
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  ids?: { [component in DateComponent]?: string };
  ariaLabels?: { [component in DateComponent]?: string };
  placeholders?: { [component in DateComponent]?: string };
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

export const DatetimeInput = forwardRef<HTMLDivElement, DatetimeInputProps>(
  function DatetimeInput(
    {
      size = 'md',
      type = 'datetime',
      invalid,
      disabled,
      readOnly,
      ids,
      ariaLabels = defaultAriaLabels,
      placeholders = defaultPlaceholders,
      value: dateComponents,
      onChangeValue: onChangeDateComponents,
      className,
      ...props
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const cancelBlur = useRef<Function>();
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      if (containerRef.current) {
        inputsRef.current = Array.from(
          containerRef.current.getElementsByTagName('input')
        );
      }
    }, [type]);

    function updateDateComponents(
      value: string | number,
      component: DateComponent
    ) {
      onChangeDateComponents(dateComponents.updatingValue(value, component));
    }

    function getInputSiblings(input: HTMLInputElement): {
      next: HTMLInputElement;
      prev: HTMLInputElement;
    } {
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
        const nextFocus =
          code === KeyCode.arrowLeft ? siblings.prev : siblings.next;
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
              className="dc-datetime-input__separator"
            >
              {separator}
            </span>
          );
        }

        children.push(
          <DateComponentInput
            key={dateComponent}
            id={ids?.[dateComponent]}
            label={ariaLabels?.[dateComponent] || dateComponent}
            placeholder={placeholders?.[dateComponent]}
            disabled={disabled}
            readOnly={readOnly}
            name={dateComponent}
            value={dateComponents.getDisplayedValue(dateComponent)}
            onChange={handleChange}
          />
        );
      });

      return <div className="dc-datetime-input__group">{children}</div>;
    }

    return (
      <div
        className={classNames(className, 'dc-datetime-input')}
        ref={mergeRefs(ref, containerRef)}
        role="group"
        {...props}
      >
        <div
          data-testid="inputs-container"
          className={classNames('dc-input', 'dc-datetime-input__body', {
            'dc-input_focused': focused,
            'dc-input_disabled': disabled,
            'dc-input_invalid': invalid,
            [`dc-input_size_${size}`]: size,
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
      </div>
    );
  }
);

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
