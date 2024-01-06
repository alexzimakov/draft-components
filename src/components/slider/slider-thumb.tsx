import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { getOffsetRelativeToThumb } from './get-offset-relative-to-thumb.js';
import { classNames } from '../../lib/index.js';

export type SliderThumbProps = {
  'aria-label'?: string;
  id?: string;
  name?: string;
  active?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  dataListId?: string;
  position: number;
  step: number;
  min: number;
  max: number;
  value: number;
  formatValue: (value: number) => ReactNode;
  onChange: (value: number) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function SliderThumb({
  'aria-label': ariaLabel,
  id,
  name,
  active,
  disabled,
  showLabel,
  dataListId,
  position,
  step,
  min,
  max,
  value,
  formatValue,
  onChange,
  onFocus,
  onBlur,
}: SliderThumbProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.valueAsNumber);
  };

  return (
    <>
      <input
        id={id}
        className={classNames({
          'dc-slider__input': true,
          'dc-slider__input_active': active,
        })}
        type="range"
        name={name}
        aria-label={ariaLabel}
        list={dataListId}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showLabel && (
        <output
          style={{ left: getOffsetRelativeToThumb(position) }}
          className={classNames({
            'dc-slider__label': true,
            'dc-slider__label_active': active,
          })}
          htmlFor={id}
        >
          <span className="dc-slider__label-text">
            {formatValue(value)}
          </span>
        </output>
      )}
    </>
  );
}
