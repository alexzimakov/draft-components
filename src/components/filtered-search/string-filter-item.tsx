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
  const [filterOperator, setFilterOperator] = useState(filter.operator);
  const [filterValue, setFilterValue] = useState(filter.value);
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

  const cancelEdit = () => {
    onEditCancel(filter);
  };

  const startEdit = () => {
    if (isEditing) {
      cancelEdit();
    } else {
      setFilterOperator(filter.operator);
      setFilterValue(filter.value);
      onEditStart(filter);
    }
  };

  const onClickCloseButton = () => {
    onRemove(filter);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!filterValue) {
      return;
    }

    if (typeof valueValidator === 'function') {
      const result = valueValidator(filterValue);
      if (!result.valid) {
        return setError(result.error);
      }
      setError('');
    }

    if (filterOperator !== filter.operator) {
      filter = filter.setOperator(filterOperator);
    }
    if (filterValue !== filter.value) {
      filter = filter.setValue(filterValue);
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
          value={filterOperator}
          onChange={setFilterOperator}
          formatValue={formatOperator}
        />
        <StringFilterInput
          placeholder={valueInputPlaceholder}
          accessibleName={valueInputAccessibleName}
          error={error}
          value={filterValue}
          onChangeValue={setFilterValue}
        />
        <div className="dc-filter-form__buttons">
          <Button onClick={cancelEdit}>
            {translations.cancelButton}
          </Button>
          <Button type="submit" tint="blue">
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
  };
  return messages[operator];
}
