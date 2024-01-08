import { ChangeEventHandler, PointerEventHandler, ReactNode } from 'react';
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
  format: (value: number) => ReactNode;
  onChange: (value: number) => void;
  onPointerDown?: PointerEventHandler<HTMLInputElement>;
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
  format,
  onChange,
  onPointerDown,
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
        onPointerDown={onPointerDown}
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
            {format(value)}
          </span>
        </output>
      )}
    </>
  );
}
