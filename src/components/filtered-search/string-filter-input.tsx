import { classNames } from '../../lib';
import { ArrowReturnRight } from './icons';
import { TextInput } from '../text-input';
import { Caption } from '../caption';
import { useId } from 'react';

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
      <ArrowReturnRight />
      <TextInput
        data-testid="string-filter-input"
        size="sm"
        fullWidth={true}
        aria-label={accessibleName}
        aria-describedby={invalid ? alertId : ''}
        placeholder={placeholder}
        type="text"
        required={true}
        autoFocus={true}
        value={value}
        invalid={invalid}
        onChangeValue={onChangeValue}
      />
      {invalid && (
        <Caption
          id={alertId}
          className="dc-string-filter-input__error"
          appearance="error"
          showIcon={true}
          role="alert"
        >
          {error}
        </Caption>
      )}
    </div>
  );
}
