import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { SliderTickMarks, type SliderTickMarksProps } from './slider-tick-marks';

type SliderHTMLProps = ComponentPropsWithRef<'input'>;
type SliderBaseProps = Omit<
  SliderHTMLProps,
  | 'type'
  | 'min'
  | 'max'
  | 'step'
  | 'value'
  | 'defaultValue'
>;
export type SliderThumbStyle = 'round' | 'rect';
export type SliderChangeValueHandler = (value: number) => void;
export type SliderProps = {
  thumbStyle?: SliderThumbStyle;
  step?: number;
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChangeValue?: SliderChangeValueHandler;
}
  & SliderBaseProps
  & Partial<SliderTickMarksProps>;

export const Slider = forwardRef<
  HTMLInputElement,
  SliderProps
>(function Slider({
  thumbStyle = 'round',
  tickMarksCount = 0,
  renderTickMarkLabel,
  step = 1,
  min = 0,
  max = 100,
  style,
  className,
  disabled,
  value,
  defaultValue,
  onChange,
  onChangeValue,
  ...props
}, ref) {
  defaultValue = value == null ? defaultValue || 0 : undefined;
  return (
    <div
      style={style}
      className={classNames(className, 'dc-slider', {
        [`dc-slider_thumb_${thumbStyle}`]: thumbStyle !== undefined,
        'dc-slider_disabled': disabled,
      })}
    >
      <input
        {...props}
        ref={ref}
        style={{
          background: getTrackBackground({
            min,
            max,
            value: value ?? defaultValue,
          }),
        }}
        className="dc-slider__input"
        type="range"
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => {
          const target = event.target;
          const value = Number(target.value);
          onChange?.(event);
          onChangeValue?.(value);
          target.style.background = getTrackBackground({ min, max, value });
        }}
      />
      <SliderTickMarks
        tickMarksCount={tickMarksCount}
        renderTickMarkLabel={renderTickMarkLabel}
      />
    </div>
  );
});

function getTrackBackground(params: {
  min?: number,
  max?: number,
  value?: number,
}): string {
  const value = params.value || 0;
  const min = params.min || 0;
  const max = params.max || 0;
  const valuePct = ((value - min) / (max - min) * 100).toFixed(2);
  return `linear-gradient(
    to right,
    var(--dc-slider-track-background-fill) 0%,
    var(--dc-slider-track-background-fill) ${valuePct}%,
    var(--dc-slider-track-background) ${valuePct}%,
    var(--dc-slider-track-background) ${valuePct}%
  )`;
}
