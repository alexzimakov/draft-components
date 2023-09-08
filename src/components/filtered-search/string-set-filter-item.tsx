import { StringSetFilter, StringSetFilterOperator } from './model/string-set-filter.js';
import { FormEventHandler, useState } from 'react';
import { useTranslations } from './use-translations.js';
import { Popover } from '../popover/index.js';
import { FilterToken } from './filter-token.js';
import { FilterOperatorSelect } from './filter-operator-select.js';
import { FilterValueList } from './filter-value-list.js';
import { Button } from '../button/index.js';

export type StringSetFilterItemProps = {
  filter: StringSetFilter;
  isEditing: boolean;
  onEditStart: (filter: StringSetFilter) => void;
  onEditCancel: (filter: StringSetFilter) => void;
  onRemove: (filter: StringSetFilter) => void;
  onChange: (filter: StringSetFilter) => void;
};

export function StringSetFilterItem({
  filter,
  isEditing,
  onEditStart,
  onEditCancel,
  onRemove,
  onChange,
}: StringSetFilterItemProps) {
  const translations = useTranslations();
  const [filterOperator, setFilterOperator] = useState(filter.operator);
  const [filterValue, setFilterValue] = useState(filter.value);
  const {
    label,
    values,
    operators,
    operatorSelectAccessibleName,
    valueFormatter: formatValue = defaultValueFormatter,
    valuesFormatter: formatValues = defaultValuesFormatter,
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
    let changedFilter = filter;
    if (filterOperator !== filter.operator) {
      changedFilter = changedFilter.setOperator(filterOperator);
    }
    if (filterValue !== filter.value) {
      changedFilter = changedFilter.setValue(filterValue);
    }
    onChange(changedFilter);
  };

  const anchor = (
    <FilterToken
      isHighlighted={isEditing}
      onClickLabel={startEdit}
      onClickCloseButton={onClickCloseButton}
    >
      {label}
      {filter.value.length > 0 ? (
        <>
          &nbsp;<span>{formatOperator(filter.operator)}</span>
          &nbsp;<b>{formatValues(filter.value)}</b>
        </>
      ) : null}
    </FilterToken>
  );
  return (
    <Popover
      className="dc-filter-popover"
      anchor={anchor}
      anchorGap={2}
      transitionDurationMs={0}
      isOpen={isEditing}
      onClose={cancelEdit}
    >
      <form className="dc-filter-form" onSubmit={onSubmit}>
        <FilterOperatorSelect
          className="dc-filter-form__operator"
          accessibleName={operatorSelectAccessibleName}
          label={label}
          values={operators}
          value={filterOperator}
          onChange={setFilterOperator}
          formatValue={formatOperator}
        />
        <FilterValueList
          className="dc-filter-form__value-list"
          values={values}
          checkedValues={filterValue}
          onChangeCheckedValues={setFilterValue}
          formatValue={formatValue}
        />
        <div className="dc-filter-form__buttons">
          <Button
            type="button"
            buttonStyle="plain"
            onClick={cancelEdit}
          >
            {translations.cancelButton}
          </Button>
          <Button
            type="submit"
            tint="blue"
            disabled={filterValue.length < 1}
          >
            {translations.applyButton}
          </Button>
        </div>
      </form>
    </Popover>
  );
}
StringSetFilterItem.defaultValueFormatter = defaultValueFormatter;
StringSetFilterItem.defaultValuesFormatter = defaultValuesFormatter;
StringSetFilterItem.defaultOperatorFormatter = defaultOperatorFormatter;

function defaultValueFormatter(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

function defaultValuesFormatter(values: StringSetFilter['value']) {
  const list = values.map(defaultValueFormatter);
  if (list.length <= 1) {
    return list.toString();
  }
  if (list.length <= 2) {
    return list.join(' or ');
  }
  if (list.length <= 3) {
    return list.slice(0, -1).join(', ') + ', or ' + list.slice(-1);
  }
  return list.slice(0, 2).join(', ') + `, and ${list.length - 2} more`;
}

function defaultOperatorFormatter(operator: StringSetFilterOperator) {
  const messages: Record<StringSetFilterOperator, string> = {
    [StringSetFilter.Operators.in]: 'is',
    [StringSetFilter.Operators.notIn]: 'is not',
  };
  return messages[operator];
}
