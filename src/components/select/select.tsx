import { type ChangeEventHandler, type ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Spinner } from '../spinner/index.js';

export type SelectSize = 'sm' | 'md' | 'lg';

type SelectHTMLProps = ComponentProps<'select'>;

type SelectCommonProps = {
  fullWidth?: boolean;
  invalid?: boolean;
  loading?: boolean;
  size?: SelectSize;
  displayedOptionsCount?: number;
};

type SelectBaseProps = SelectCommonProps & ({
  multiple?: false;
  value?: string | number;
  defaultValue?: string | number;
  onChangeValue?: (value: string) => void;
} | {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChangeValue?: (value: string[]) => void;
});

export type SelectProps =
  & SelectBaseProps
  & Omit<SelectHTMLProps, keyof SelectBaseProps>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({
    fullWidth,
    invalid,
    loading,
    size = 'md',
    style,
    className,
    disabled,
    multiple,
    displayedOptionsCount,
    children,
    onChange,
    onChangeValue,
    ...props
  }, ref) {
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      if (typeof onChange === 'function') {
        onChange(event);
      }
      if (typeof onChangeValue === 'function') {
        if (multiple === true) {
          const values = Array.from(event.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);
          onChangeValue(values);
        } else {
          onChangeValue(event.target.value);
        }
      }
    };

    let slotElement = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="55%"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    );
    if (loading) {
      slotElement = (
        <Spinner
          color="currentColor"
          height="45%"
        />
      );
    }

    return (
      <div
        style={style}
        className={classNames(className, 'dc-select', {
          [`dc-select_${size}`]: size,
          'dc-select_full-width': fullWidth,
          'dc-select_loading': loading,
          'dc-select_invalid': invalid,
          'dc-select_disabled': disabled,
          'dc-select_multiple': multiple,
        })}
      >
        <select
          {...props}
          ref={ref}
          className="dc-select__native"
          size={displayedOptionsCount}
          multiple={multiple}
          disabled={disabled || loading}
          aria-invalid={props['aria-invalid'] ?? invalid}
          onChange={handleChange}
        >
          {children}
        </select>
        <span className="dc-select__slot-left" aria-hidden={true}>
          {slotElement}
        </span>
      </div>
    );
  },
);
