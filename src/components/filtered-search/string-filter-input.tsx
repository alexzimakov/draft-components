import { useId } from 'react';
import { classNames } from '../../lib';
import { TextInput } from '../text-input';
import { Caption } from '../caption';
import { ArrowReturnRight } from './icons';
import { ExclamationTriangleIcon } from '../icons/solid/exclamation-triangle-icon';

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
