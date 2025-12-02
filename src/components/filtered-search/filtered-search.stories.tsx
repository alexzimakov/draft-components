import { type Meta, type StoryFn } from '@storybook/react';
import { type Filter, type FilterConfig } from './types.js';
import { StringFilter } from './model/string-filter.js';
import { StringSetFilter } from './model/string-set-filter.js';
import { RadioGroupFilter } from './model/radio-group-filter.js';
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
  label: 'Task ID',
  operators: ['EQUAL', 'NOT_EQUAL'],
  valueValidator: (value) => {
    if (value.match(/^\d+$/)) {
      return { valid: true };
    }
    return { valid: false, error: 'The value must be an integer.' };
  },
};
const titleFilter: FilterConfig = {
  type: StringFilter.Type,
  field: 'title',
  label: 'Title',
  operators: ['CONTAIN', 'NOT_CONTAIN', 'STARTS_WITH'],
};
const descriptionFilter: FilterConfig = {
  type: StringFilter.Type,
  field: 'description',
  label: 'Description',
  operators: ['CONTAIN', 'NOT_CONTAIN'],
};
const statusFilter: FilterConfig = {
  type: StringSetFilter.Type,
  field: 'status',
  label: 'Status',
  options: ['todo', 'in progress', 'done', 'archived'],
  operators: ['IN', 'NOT_IN'],
};
const disableReasonFilter: FilterConfig = {
  type: RadioGroupFilter.Type,
  field: 'priority',
  label: 'Priority',
  options: ['low', 'medium', 'high'],
  operators: ['EQUAL'],
};
const reporterFilter: FilterConfig = {
  type: RadioGroupFilter.Type,
  field: 'reporter',
  label: 'Reporter',
  options: [
    { value: '9146337942086245', label: 'Daniel Roberts', caption: 'QA Engineer' },
    { value: '9146337942086246', label: 'Emily Clark', caption: 'QA Engineer' },
    { value: '9146337942086247', label: 'Sophie Turner', caption: 'Automation Tester' },
  ],
  operators: ['EQUAL', 'NOT_EQUAL'],
  valueFormatter: (value) => {
    const idsToNameMapping: Record<string, string> = {
      '9146337942086245': 'Daniel Roberts',
      '9146337942086246': 'Emily Clark',
      '9146337942086247': 'Sophie Turner',
    };
    return idsToNameMapping[value] || '';
  },
};
const defaultFiltersConfig = [
  idFilter,
  titleFilter,
  descriptionFilter,
  statusFilter,
  disableReasonFilter,
  reporterFilter,
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
  placeholder: 'Search tasks',
  filtersConfig: defaultFiltersConfig,
  filters: [],
};
