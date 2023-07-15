import { ChangeEventHandler, ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Spinner } from '../spinner';

export type SelectSize = 'sm' | 'md' | 'lg';
type SelectHTMLProps = ComponentPropsWithRef<'select'>;
type SelectBaseProps = Omit<SelectHTMLProps,
  | 'size'
  | 'multiple'
  | 'value'
  | 'defaultValue'
> & {
  loading?: boolean;
  hasError?: boolean;
  isBlock?: boolean;
  size?: SelectSize;
  htmlSize?: SelectHTMLProps['size'];
};

export type SelectProps = SelectBaseProps & ({
  multiple?: false;
  value?: string | number;
  defaultValue?: string | number;
  onChangeValue?: (value: string) => void;
} | {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChangeValue?: (value: string[]) => void;
})

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({
    hasError,
    isBlock,
    size = 'md',
    style,
    className,
    loading,
    disabled,
    multiple,
    htmlSize,
    children,
    onChange,
    onChangeValue,
    ...props
  }, ref) {
    const onValueChanged: ChangeEventHandler<HTMLSelectElement> = (event) => {
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

    let addOn = (
      <svg
        className="dc-select__arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden={true}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    );
    if (loading) {
      addOn = (
        <Spinner
          className="dc-select__spinner"
          color="currentColor"
          size={16}
        />
      );
    }

    return (
      <div
        style={style}
        className={classNames(className, 'dc-select__container', {
          [`dc-select__container_${size}`]: size !== undefined,
          'dc-select__container_multiple': multiple,
          'dc-select__container_loading': loading,
          'dc-select__container_disabled': disabled,
          'dc-select__container_has_error': hasError,
          'dc-select__container_block': isBlock,
        })}
      >
        <select
          {...props}
          ref={ref}
          className="dc-select"
          size={htmlSize}
          multiple={multiple}
          disabled={disabled || loading}
          onChange={onValueChanged}
        >
          {children}
        </select>
        <span className="dc-select__add-on" aria-hidden={true}>
          {addOn}
        </span>
      </div>
    );
  },
);
