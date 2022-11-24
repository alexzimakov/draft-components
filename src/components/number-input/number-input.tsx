import { forwardRef, KeyboardEvent, FocusEvent, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { Button } from '../button';
import { TextInput, TextInputProps } from '../text-input';
import { isFunction } from '../../lib/guards';

export type NumberInputProps = {
  showIncrementButtons?: boolean;
  incrementButtonLabel?: ReactNode;
  decrementButtonLabel?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value: string;
  onChangeValue(value: string): void;
} & TextInputProps;

const NUMBER_REGEXP = /^[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)([eE][-+]?[0-9]+)?$/;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      style,
      className,
      showIncrementButtons = true,
      incrementButtonLabel = '↑',
      decrementButtonLabel = '↓',
      min,
      max,
      step = 1,
      disabled,
      readOnly,
      fullWidth,
      size,
      value,
      onBlur,
      onKeyDown,
      onChangeValue,
      ...props
    },
    ref
  ) {
    const numericValue = Number(value) || 0;

    function inRange(value: number): boolean {
      if (min != null && max != null) {
        return value >= min && value <= max;
      } else if (min != null) {
        return value >= min;
      } else if (max != null) {
        return value <= max;
      } else {
        return true;
      }
    }

    function increment(step: number) {
      const fractionDigits = Math.max(
        getFractionDigits(numericValue),
        getFractionDigits(step)
      );
      const sum = numericValue + step;
      if (inRange(sum)) {
        onChangeValue(formatFloat(sum, fractionDigits));
      }
    }

    function decrement(step: number) {
      const fractionDigits = Math.max(
        getFractionDigits(numericValue),
        getFractionDigits(step)
      );
      const diff = numericValue - step;
      if (inRange(diff)) {
        onChangeValue(formatFloat(diff, fractionDigits));
      }
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>): void {
      if (value.endsWith('.')) {
        onChangeValue(value.replace(/\.$/, ''));
      }
      isFunction(onBlur) && onBlur(event);
    }

    function handleChangeValue(value: string) {
      if (value === '') {
        onChangeValue(value);
      } else if (value.match(NUMBER_REGEXP) && inRange(Number(value))) {
        onChangeValue(value);
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      const code = event.code;
      if (
        !readOnly &&
        (code === KeyCode.arrowDown || code === KeyCode.arrowUp)
      ) {
        let step: number;
        if (event.shiftKey && event.altKey) {
          step = 100;
        } else if (event.shiftKey) {
          step = 10;
        } else if (event.altKey) {
          step = 0.1;
        } else {
          step = 1;
        }

        if (code === KeyCode.arrowDown) {
          decrement(step);
        } else {
          increment(step);
        }

        event.preventDefault();
      }

      isFunction(onKeyDown) && onKeyDown(event);
    }

    return (
      <div
        style={style}
        className={classNames(className, 'dc-number-input', {
          'dc-number-input_full-width': fullWidth,
        })}
      >
        {showIncrementButtons && (
          <Button
            appearance="secondary"
            size={size}
            noPadding={true}
            disabled={disabled}
            onClick={() => !readOnly && decrement(step)}
          >
            {decrementButtonLabel}
          </Button>
        )}
        <TextInput
          {...props}
          ref={ref}
          className="dc-number-input__text-input"
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          fullWidth={fullWidth}
          type="text"
          value={value}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChangeValue={handleChangeValue}
        />
        {showIncrementButtons && (
          <Button
            appearance="secondary"
            size={size}
            noPadding={true}
            disabled={disabled}
            onClick={() => !readOnly && increment(step)}
          >
            {incrementButtonLabel}
          </Button>
        )}
      </div>
    );
  }
);

function getFractionDigits(n: number): number {
  const fraction = String(n).split(/[.,]/)[1] ?? '';
  return fraction.length;
}

function formatFloat(n: number, fractionDigits: number): string {
  return n.toFixed(fractionDigits).replace(/\.0*$/, '');
}
