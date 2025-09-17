import { type ComponentProps, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { TextInput } from '../text-input/index.js';
import { Caption } from '../caption/index.js';

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

function ExclamationTriangleIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  );
}
