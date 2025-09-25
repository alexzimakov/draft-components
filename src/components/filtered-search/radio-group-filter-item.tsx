import { RadioGroupFilter, type RadioGroupFilterOperator } from './model/radio-group-filter.js';
import { type FormEventHandler, useState } from 'react';
import { useTranslations } from './use-translations.js';
import { Popover, type PopoverRenderAnchor } from '../popover/index.js';
import { FilterToken } from './filter-token.js';
import { FilterOperatorSelect } from './filter-operator-select.js';
import { RadioGroup } from './radio-group.js';
import { Button } from '../button/index.js';

export type RadioGroupFilterItemProps = {
  filter: RadioGroupFilter;
  isEditing: boolean;
  onEditStart: (filter: RadioGroupFilter) => void;
  onEditCancel: (filter: RadioGroupFilter) => void;
  onRemove: (filter: RadioGroupFilter) => void;
  onChange: (filter: RadioGroupFilter) => void;
};

export function RadioGroupFilterItem({
  filter,
  isEditing,
  onEditStart,
  onEditCancel,
  onRemove,
  onChange,
}: RadioGroupFilterItemProps) {
  const translations = useTranslations();
  const [operator, setOperator] = useState(filter.operator);
  const [value, setValue] = useState(filter.value);
  const {
    label,
    options,
    operators,
    operatorSelectAccessibleName,
    valueFormatter: formatValue = defaultValueFormatter,
    operatorFormatter: formatOperator = defaultOperatorFormatter,
  } = filter.config;
  const isAnyOptionSelected = options.some((option) => {
    if (typeof option === 'string') {
      return option === value;
    } else {
      return option.value === value;
    }
  });

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

    if (!isAnyOptionSelected) {
      return;
    }

    let changedFilter = filter;
    if (operator !== filter.operator) {
      changedFilter = changedFilter.setOperator(operator);
    }
    if (value !== filter.value) {
      changedFilter = changedFilter.setValue(value);
    }
    onChange(changedFilter);
  };

  const renderAnchor: PopoverRenderAnchor = ({ ref }) => (
    <FilterToken
      ref={ref}
      isHighlighted={isEditing}
      onClickLabel={startEdit}
      onClickCloseButton={onClickCloseButton}
    >
      {label}
      {filter.value.length > 0
        ? <> <span>{formatOperator(filter.operator)}</span> <b>{formatValue(filter.value)}</b></>
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
      <form className="dc-filter-form" onSubmit={onSubmit}>
        <FilterOperatorSelect
          className="dc-filter-form__operator"
          accessibleName={operatorSelectAccessibleName}
          label={label}
          values={operators}
          value={operator}
          onChange={setOperator}
          formatValue={formatOperator}
        />
        <RadioGroup
          className="dc-filter-form__value-list"
          options={options}
          value={value}
          onChange={setValue}
          formatValue={formatValue}
        />
        <div className="dc-filter-form__buttons">
          <Button onClick={cancelEdit}>
            {translations.cancelButton}
          </Button>
          <Button type="submit" tint="blue" disabled={!isAnyOptionSelected}>
            {translations.applyButton}
          </Button>
        </div>
      </form>
    </Popover>
  );
}
RadioGroupFilterItem.defaultValueFormatter = defaultValueFormatter;
RadioGroupFilterItem.defaultOperatorFormatter = defaultOperatorFormatter;

function defaultValueFormatter(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

function defaultOperatorFormatter(operator: RadioGroupFilterOperator) {
  const messages: Record<RadioGroupFilterOperator, string> = {
    [RadioGroupFilter.Operators.equal]: 'is',
    [RadioGroupFilter.Operators.notEqual]: 'is not',
  };
  return messages[operator];
}
