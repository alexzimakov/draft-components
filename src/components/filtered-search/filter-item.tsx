import { type Filter } from './types.js';
import { exhaustiveCheck } from '../../lib/helpers.js';
import { StringFilter } from './model/string-filter.js';
import { StringSetFilter } from './model/string-set-filter.js';
import { StringFilterItem } from './string-filter-item.js';
import { StringSetFilterItem } from './string-set-filter-item.js';
import { RadioGroupFilter } from './model/radio-group-filter.js';
import { RadioGroupFilterItem } from './radio-group-filter-item.js';

export type FilterItemProps = {
  filter: Filter;
  isEditing: boolean;
  onEditStart: (filter: Filter) => void;
  onEditCancel: (filter: Filter) => void;
  onRemove: (filter: Filter) => void;
  onChange: (filter: Filter) => void;
};

export function FilterItem({
  filter,
  isEditing,
  onEditStart,
  onEditCancel,
  onRemove,
  onChange,
}: FilterItemProps) {
  const filterType = filter.type;
  switch (filterType) {
    case StringFilter.Type:
      return (
        <StringFilterItem
          filter={filter}
          isEditing={isEditing}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          onRemove={onRemove}
          onChange={onChange}
        />
      );
    case StringSetFilter.Type:
      return (
        <StringSetFilterItem
          filter={filter}
          isEditing={isEditing}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          onRemove={onRemove}
          onChange={onChange}
        />
      );
    case RadioGroupFilter.Type:
      return (
        <RadioGroupFilterItem
          filter={filter}
          isEditing={isEditing}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          onRemove={onRemove}
          onChange={onChange}
        />
      );
    default:
      exhaustiveCheck(filterType, `Unable to render filter type ${filterType}.`);
  }
}
