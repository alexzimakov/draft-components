import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type SelectHTMLProps = ComponentPropsWithRef<'select'>;
type SelectBaseProps = Omit<SelectHTMLProps,
  | 'size'
  | 'multiple'
  | 'value'
  | 'defaultValue'
> & {
  hasError?: boolean;
  isBlock?: boolean;
  size?: SelectSize;
  htmlSize?: SelectHTMLProps['size'];
};
export type SelectSize = 'sm' | 'md' | 'lg';
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
    disabled,
    multiple,
    htmlSize,
    children,
    onChange,
    onChangeValue,
    ...props
  }, ref) {
    return (
      <div
        style={style}
        className={classNames(className, 'dc-select__container', {
          [`dc-select__container_${size}`]: size !== undefined,
          'dc-select__container_multiple': multiple,
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
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            if (multiple) {
              onChangeValue?.(
                Array.from(event.target.options)
                  .filter((option) => option.selected)
                  .map((option) => option.value)
              );
            } else {
              onChangeValue?.(event.target.value);
            }
          }}
        >
          {children}
        </select>
        <svg
          className="dc-select__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden={true}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </div>
    );
  }
);
