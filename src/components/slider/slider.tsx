import { ChangeEvent, ComponentPropsWithoutRef, useCallback } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface SliderProps extends ComponentPropsWithoutRef<'input'> {
  min?: number;
  max?: number;
  step?: number;
  thumbStyle?: 'round' | 'rect';
  tickMarksCount?: number;
  value: number;
  onChangeValue(value: number): void;
}

export function Slider({
  style,
  className,
  disabled,
  readOnly,
  min = 0,
  max = 100,
  step = 1,
  thumbStyle = 'round',
  tickMarksCount,
  value,
  onChangeValue,
  ...props
}: SliderProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeValue(Number(event.target.value));
    },
    [onChangeValue]
  );

  return (
    <div
      style={style}
      className={classNames(className, 'dc-slider', {
        'dc-slider_readOnly': readOnly,
        'dc-slider_disabled': disabled,
      })}
    >
      {tickMarksCount && tickMarksCount > 2 ? (
        <div className="dc-slider__tick_marks">
          {Array.from({ length: tickMarksCount }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      ) : (
        <div
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          className="dc-slider__fill-track"
        />
      )}
      <input
        {...props}
        className={classNames(
          'dc-slider__input',
          thumbStyle && `dc-slider__input_thumb_style_${thumbStyle}`
        )}
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled || readOnly}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
