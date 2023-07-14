import { Meta, StoryFn } from '@storybook/react';
import { FilterConfig } from './types';
import { StringFilter } from './model/string-filter';
import { StringSetFilter } from './model/string-set-filter';
import { FilteredSearch } from './filtered-search';
import { useCallback, useState } from 'react';

const meta: Meta = {
  title: 'Other/FilteredSearch',
  component: FilteredSearch,
  argTypes: {
    onChange: { action: 'filters changed' },
  },
};
export default meta;

const idFilter: FilterConfig = {
  type: StringFilter.Type,
  field: 'id',
  label: 'Object ID',
  operators: ['EQUAL', 'NOT_EQUAL'],
  valueValidator: (value) => {
    if (value.match(/^\d+$/)) {
      return { valid: true };
    }
    return { valid: false, error: 'The value must be positive integer.' };
  },
};
const nameFilter: FilterConfig = {
  type: StringFilter.Type,
  field: 'name',
  label: 'Object name',
  operators: ['CONTAIN', 'NOT_CONTAIN'],
};
const statusFilter: FilterConfig = {
  type: StringSetFilter.Type,
  field: 'status',
  label: 'Object status',
  values: ['active', 'deleted', 'errors', 'inactive'],
  operators: ['IN', 'NOT_IN'],
};
const defaultFiltersConfig = [
  idFilter,
  nameFilter,
  statusFilter,
];

export const Basic: StoryFn<typeof FilteredSearch> = (args) => {
  const { filters: defaultFilterMap, onChange } = args;
  const [filterMap, setFilterMap] = useState(defaultFilterMap);
  const onFilterMapChanged = useCallback((filterMap) => {
    onChange(filterMap);
    setFilterMap(filterMap);
  }, [onChange]);
  return (
    <FilteredSearch
      {...args}
      filters={filterMap}
      onChange={onFilterMapChanged}
    />
  );
};
Basic.args = {
  filtersConfig: defaultFiltersConfig,
  filters: [],
};
