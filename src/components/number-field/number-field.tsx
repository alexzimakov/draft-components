import { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { Button } from '../button';
import { TextField, TextFieldProps } from '../text-field';

export interface NumberFieldProps extends TextFieldProps {
  incrementButtonLabel?: ReactNode;
  decrementButtonLabel?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value: string;
  onChangeValue(value: string): void;
}

const NUMBER_REGEXP = /^[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)([eE][-+]?[0-9]+)?$/;

export function NumberField({
  style,
  className,
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
  onChange,
  onKeyDown,
  onChangeValue,
  ...props
}: NumberFieldProps) {
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value === '') {
      onChangeValue(value);
    } else if (value.match(NUMBER_REGEXP) && inRange(Number(value))) {
      onChangeValue(value);
    }

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const code = event.code;
    if (!readOnly && (code === KeyCode.arrowDown || code === KeyCode.arrowUp)) {
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

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  }

  return (
    <div
      style={style}
      className={classNames(className, 'dc-number-field', {
        'dc-number-field_full-width': fullWidth,
      })}
    >
      <Button
        appearance="secondary"
        size={size}
        type="button"
        noPadding={true}
        disabled={disabled}
        onClick={() => {
          if (!readOnly) {
            decrement(step);
          }
        }}
      >
        {decrementButtonLabel}
      </Button>
      <TextField
        {...props}
        className="dc-number-field__input"
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="secondary"
        size={size}
        type="button"
        noPadding={true}
        disabled={disabled}
        onClick={() => {
          if (!readOnly) {
            increment(step);
          }
        }}
      >
        {incrementButtonLabel}
      </Button>
    </div>
  );
}

function getFractionDigits(n: number): number {
  const fraction = String(n).split(/[.,]/)[1] ?? '';
  return fraction.length;
}

function formatFloat(n: number, fractionDigits: number): string {
  return n.toFixed(fractionDigits).replace(/\.0*$/, '');
}
