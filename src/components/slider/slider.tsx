import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { uniqueId } from '../../lib/util';

export interface SliderProps extends ComponentPropsWithoutRef<'input'> {
  thumb?: 'round' | 'rect';
  numberOfTickMarks?: number;
  step?: number;
  min?: number;
  max?: number;
  value: number;

  renderTickMarkLabel?(at: number): ReactNode;
  onChangeValue(value: number): void;
}

export function Slider({
  style,
  className,
  disabled,
  readOnly,
  thumb = 'round',
  numberOfTickMarks = 0,
  step = 1,
  min = 0,
  max = 100,
  value = 0,
  renderTickMarkLabel,
  onChangeValue,
  ...props
}: SliderProps) {
  const id = useRef(props.id);
  if (!id.current) {
    id.current = uniqueId('slider_');
  }

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => onChangeValue(Number(event.target.value)),
    [onChangeValue]
  );

  const valuePercent = `${((value - min) / (max - min)) * 100}%`;
  const background = `linear-gradient(
    to right,
    var(--dc-slider-fill-track-bg) 0%,
    var(--dc-slider-fill-track-bg) ${valuePercent},
    var(--dc-slider-track-bg) ${valuePercent},
    var(--dc-slider-track-bg) ${valuePercent}
  )`;
  return (
    <div
      style={style}
      className={classNames(
        'dc-slider',
        thumb && `dc-slider_thumb_${thumb}`,
        disabled && 'dc-slider_disabled',
        className
      )}
    >
      <input
        {...props}
        id={id.current ?? uniqueId('slider_')}
        style={{ background }}
        className="dc-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
      />
      <SliderTickMarks
        numberOfTickMarks={numberOfTickMarks}
        renderTickMarkLabel={renderTickMarkLabel}
      />
    </div>
  );
}

function SliderTickMarks(props: {
  numberOfTickMarks: number;
  renderTickMarkLabel: ((at: number) => ReactNode) | undefined;
}) {
  const { numberOfTickMarks, renderTickMarkLabel } = props;
  const withLabel = isFunction(renderTickMarkLabel);
  return (
    <div className="dc-slider__tick-marks">
      {Array.from({ length: numberOfTickMarks }).map((_, index) => {
        const label = withLabel && renderTickMarkLabel(index);
        return (
          <div key={index} className="dc-slider-tick-mark">
            {label && (
              <span className="dc-slider-tick-mark__label">{label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
