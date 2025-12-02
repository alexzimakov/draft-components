import { StringFilter, type StringFilterOperator } from './model/string-filter.js';
import { type FormEventHandler, useState } from 'react';
import { useTranslations } from './use-translations.js';
import { Popover, type PopoverRenderAnchor } from '../popover/index.js';
import { FilterToken } from './filter-token.js';
import { FilterOperatorSelect } from './filter-operator-select.js';
import { StringFilterInput } from './string-filter-input.js';
import { Button } from '../button/index.js';

export type StringFilterItemProps = {
  filter: StringFilter;
  isEditing: boolean;
  onEditStart: (filter: StringFilter) => void;
  onEditCancel: (filter: StringFilter) => void;
  onRemove: (filter: StringFilter) => void;
  onChange: (filter: StringFilter) => void;
};

export function StringFilterItem({
  filter,
  isEditing,
  onEditStart,
  onEditCancel,
  onRemove,
  onChange,
}: StringFilterItemProps) {
  const translations = useTranslations();
  const [operator, setOperator] = useState(filter.operator);
  const [value, setValue] = useState(filter.value);
  const [error, setError] = useState('');
  const {
    label,
    operators,
    valueInputAccessibleName,
    valueInputPlaceholder,
    operatorSelectAccessibleName,
    valueValidator,
    operatorFormatter: formatOperator = defaultOperatorFormatter,
  } = filter.config;
  const isValueEmpty = !value;

  const cancelEdit = () => {
    onEditCancel(filter);
  };

  const startEdit = () => {
    if (isEditing) {
      cancelEdit();
    } else {
      setOperator(filter.operator);
      setValue(filter.value);
      onEditStart(filter);
    }
  };

  const onClickCloseButton = () => {
    onRemove(filter);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isValueEmpty) {
      return;
    }

    if (typeof valueValidator === 'function') {
      const result = valueValidator(value);
      if (!result.valid) {
        return setError(result.error);
      }
      setError('');
    }

    if (operator !== filter.operator) {
      filter = filter.setOperator(operator);
    }
    if (value !== filter.value) {
      filter = filter.setValue(value);
    }
    onChange(filter);
  };

  const renderAnchor: PopoverRenderAnchor = ({ ref }) => (
    <FilterToken
      ref={ref}
      isHighlighted={isEditing}
      onClickLabel={startEdit}
      onClickCloseButton={onClickCloseButton}
    >
      {label}
      {filter.value
        ? <> <span>{formatOperator(filter.operator)}</span> <b>{filter.value}</b></>
        : null}
    </FilterToken>
  );

  return (
    <Popover
      className="dc-filter-popover"
      anchorPadding={2}
      isOpen={isEditing}
      onClose={cancelEdit}
      renderAnchor={renderAnchor}
    >
      <form
        className="dc-filter-form"
        onSubmit={onSubmit}
      >
        <FilterOperatorSelect
          className="dc-filter-form__operator"
          accessibleName={operatorSelectAccessibleName}
          label={label}
          values={operators}
          value={operator}
          onChange={setOperator}
          formatValue={formatOperator}
        />
        <StringFilterInput
          placeholder={valueInputPlaceholder}
          accessibleName={valueInputAccessibleName}
          error={error}
          value={value}
          onChangeValue={setValue}
        />
        <div className="dc-filter-form__buttons">
          <Button onClick={cancelEdit}>
            {translations.cancelButton}
          </Button>
          <Button type="submit" tint="blue" disabled={isValueEmpty}>
            {translations.applyButton}
          </Button>
        </div>
      </form>
    </Popover>
  );
}
StringFilterItem.defaultOperatorFormatter = defaultOperatorFormatter;

function defaultOperatorFormatter(operator: StringFilterOperator) {
  const messages: Record<StringFilterOperator, string> = {
    [StringFilter.Operators.equal]: 'is',
    [StringFilter.Operators.notEqual]: 'is not',
    [StringFilter.Operators.contain]: 'contains',
    [StringFilter.Operators.notContain]: 'doesn\'t contain',
    [StringFilter.Operators.startsWith]: 'starts with',
  };
  return messages[operator];
}
