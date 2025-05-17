import { type Meta, type StoryFn } from '@storybook/react';
import { type Filter, type FilterConfig } from './types.js';
import { StringFilter } from './model/string-filter.js';
import { StringSetFilter } from './model/string-set-filter.js';
import { FilteredSearch } from './filtered-search.js';
import { useCallback, useState } from 'react';

const meta: Meta = {
  title: 'Other/FilteredSearch',
  component: FilteredSearch,
  argTypes: {
    onChangeFilters: { action: 'filters changed' },
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
  const [filters, setFilters] = useState(args.filters);
  const onChangeFilters = args.onChangeFilters;
  const onFiltersChanged = useCallback((filters: Filter[]) => {
    setFilters(filters);
    onChangeFilters(filters);
  }, [onChangeFilters]);
  return (
    <FilteredSearch
      {...args}
      filters={filters}
      onChangeFilters={onFiltersChanged}
    />
  );
};
Basic.args = {
  filtersConfig: defaultFiltersConfig,
  filters: [],
};
