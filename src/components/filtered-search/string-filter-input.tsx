import { type ComponentProps, useId } from 'react';
import { classNames } from '../../lib/index.js';
import { TextInput } from '../text-input/index.js';
import { Caption } from '../caption/index.js';
import { ExclamationTriangleIcon } from '../hero-icons/24/solid/exclamation-triangle-icon.js';

export type StringFilterInputProps = {
  className?: string;
  accessibleName?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChangeValue: (value: string) => void;
};

export function StringFilterInput({
  className,
  accessibleName,
  placeholder,
  error,
  value,
  onChangeValue,
}: StringFilterInputProps) {
  const id = useId();
  const alertId = `${id}alert`;
  const invalid = Boolean(error);
  return (
    <div className={classNames('dc-string-filter-input', className)}>
      <ArrowReturnRightIcon />

      <TextInput
        data-testid="string-filter-input"
        size="sm"
        fullWidth={true}
        aria-label={accessibleName}
        aria-describedby={invalid ? alertId : ''}
        placeholder={placeholder}
        type="text"
        required={true}
        value={value}
        invalid={invalid}
        onChangeValue={onChangeValue}
      />
      {invalid && (
        <Caption
          id={alertId}
          className="dc-string-filter-input__error"
          role="alert"
          color="red"
          icon={<ExclamationTriangleIcon width={20} height={20} />}
        >
          {error}
        </Caption>
      )}
    </div>
  );
}

function ArrowReturnRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
      />
    </svg>
  );
}
