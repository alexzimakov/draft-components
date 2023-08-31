import { StringFilter } from './model/string-filter';
import { StringSetFilter } from './model/string-set-filter';
import { FilteredSearch } from './filtered-search';
import { beforeAll, expect, it, vi } from 'vitest';
import { mockMatchMedia } from '../../test/mock-match-media';
import { fireEvent, render, screen, userEvent, within } from '../../test/test-utils';

beforeAll(() => {
  mockMatchMedia();
});

const idFilterConfig = {
  type: StringFilter.Type,
  field: 'id',
  label: 'Test ID',
  operatorSelectAccessibleName: 'Test ID filter operator',
  valueInputAccessibleName: 'Test ID filter value',
  operators: [
    StringFilter.Operators.equal,
    StringFilter.Operators.notEqual,
  ],
};

const nameFilterConfig = {
  type: StringFilter.Type,
  field: 'name',
  label: 'Test name',
  operators: [
    StringFilter.Operators.contain,
    StringFilter.Operators.notContain,
  ],
};

const statusFilterConfig = {
  type: StringSetFilter.Type,
  field: 'status',
  label: 'Status',
  values: [
    'passed',
    'failed',
    'ignored',
  ],
  operators: [
    StringSetFilter.Operators.in,
    StringSetFilter.Operators.notIn,
  ],
  operatorSelectAccessibleName: 'Status filter operator',
};

const filtersConfig = [
  idFilterConfig,
  nameFilterConfig,
  statusFilterConfig,
];

it('renders without errors', async () => {
  const placeholder = 'Search tests';
  render(
    <FilteredSearch
      placeholder={placeholder}
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={vi.fn}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  expect(comboBox).toHaveAttribute('placeholder', placeholder);

  fireEvent.focus(comboBox);
  const listBox = screen.getByRole('listbox');
  expect(listBox.id).toBe(comboBox.getAttribute('aria-controls'));

  const options = within(listBox).queryAllByRole('option');
  expect(options).toHaveLength(filtersConfig.length);

  for (let i = 0; i < filtersConfig.length; i += 1) {
    const config = filtersConfig[i];
    const optionElement = options[i];
    expect(optionElement).toHaveTextContent(config.label);
  }
});

it('close options list', async () => {
  const user = userEvent.setup();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={vi.fn}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  expect(comboBox).toHaveFocus();
  screen.getByRole('listbox');

  await user.type(comboBox, '{Escape}');
  expect(comboBox).not.toHaveFocus();
  expect(screen.queryByRole('listbox')).toBeNull();
});

it('focus textbox when click on container', async () => {
  const user = userEvent.setup();
  const onMouseDownMock = vi.fn();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={vi.fn}
      onMouseDown={onMouseDownMock}
    />,
  );


  const container = screen.getByTestId('combobox-container');
  await user.click(container);

  const comboBox = screen.getByRole('combobox');
  expect(comboBox).toHaveFocus();
  expect(onMouseDownMock).toHaveBeenCalledTimes(1);
});

it('select filter using keyboard', async () => {
  const user = userEvent.setup();
  render(
    <FilteredSearch
      filtersConfig={[idFilterConfig, nameFilterConfig]}
      filters={[]}
      onChangeFilters={vi.fn}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);

  const options = screen.queryAllByRole('option');
  const checkIfOptionSelected = (option: HTMLElement) => {
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(option.id).toBe(comboBox.getAttribute('aria-activedescendant'));
  };

  await user.type(comboBox, '{ArrowDown}');
  checkIfOptionSelected(options[0]);

  await user.type(comboBox, '{ArrowDown}');
  checkIfOptionSelected(options[1]);

  await user.type(comboBox, '{ArrowDown}');
  checkIfOptionSelected(options[0]);

  await user.type(comboBox, '{ArrowUp}');
  checkIfOptionSelected(options[1]);

  await user.type(comboBox, '{ArrowUp}');
  checkIfOptionSelected(options[0]);

  await user.type(comboBox, '{ArrowUp}');
  checkIfOptionSelected(options[1]);
});

it('filter options based on the search text', async () => {
  const user = userEvent.setup();
  render(
    <FilteredSearch
      filtersConfig={[idFilterConfig, nameFilterConfig]}
      filters={[]}
      onChangeFilters={vi.fn}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);

  const checkOptionsNumber = (expectedCount: number) => {
    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(expectedCount);
  };

  await user.type(comboBox, idFilterConfig.label);
  checkOptionsNumber(1);

  await user.clear(comboBox);
  await user.type(comboBox, 's');
  checkOptionsNumber(2);

  await user.clear(comboBox);
  await user.type(comboBox, 'foo bar');
  checkOptionsNumber(0);
});

it('choose option using keyboard', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  expect(screen.queryAllByTestId('filter-token')).toHaveLength(0);
  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{ArrowDown}');
  await user.type(comboBox, '{Enter}');
  expect(screen.queryAllByTestId('filter-token')).toHaveLength(1);

  expect(onChangeFiltersMock).not.toHaveBeenCalled();
});

it('choose option using mouse', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  expect(screen.queryAllByTestId('filter-token')).toHaveLength(0);
  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.click(screen.getByText(statusFilterConfig.label));
  expect(screen.queryAllByTestId('filter-token')).toHaveLength(1);

  expect(onChangeFiltersMock).not.toHaveBeenCalled();
});

it('remove filters using keyboard', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  const filters = [
    new StringFilter(idFilterConfig, {
      value: '123',
      operator: StringFilter.Operators.equal,
    }),
    new StringFilter(nameFilterConfig, {
      value: 'new',
      operator: StringFilter.Operators.notContain,
    }),
  ];
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={filters}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{Backspace}');
  expect(onChangeFiltersMock).toHaveBeenCalledTimes(1);
  expect(onChangeFiltersMock).toHaveBeenNthCalledWith(1, filters.slice(0, -1));
});

it('remove filters using mouse', async () => {
  const user = userEvent.setup();
  const removeFilterButtonAccessibleName = 'Remove filter';
  const onChangeFiltersMock = vi.fn();
  const filters = [
    new StringFilter(idFilterConfig, {
      value: '123',
      operator: StringFilter.Operators.equal,
    }),
    new StringFilter(nameFilterConfig, {
      value: 'new',
      operator: StringFilter.Operators.notContain,
    }),
  ];
  render(
    <FilteredSearch
      removeFilterButtonAccessibleName={removeFilterButtonAccessibleName}
      filtersConfig={filtersConfig}
      filters={filters}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const [idFilter, statusFilter] = screen.getAllByTestId('filter-token');

  await user.click(
    within(idFilter).getByLabelText(removeFilterButtonAccessibleName),
  );

  await user.click(
    within(statusFilter).getByLabelText(removeFilterButtonAccessibleName),
  );

  expect(onChangeFiltersMock).toHaveBeenCalledTimes(2);
  expect(onChangeFiltersMock).toHaveBeenNthCalledWith(1, [filters[1]]);
  expect(onChangeFiltersMock).toHaveBeenNthCalledWith(2, [filters[0]]);
});

it('should remove new filter if it is empty', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  expect(screen.queryAllByTestId('filter-token')).toHaveLength(0);
  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{ArrowDown}');
  await user.type(comboBox, '{Enter}');
  expect(screen.queryAllByTestId('filter-token')).toHaveLength(1);

  await user.click(comboBox);
  expect(screen.queryAllByTestId('filter-token')).toHaveLength(0);

  expect(onChangeFiltersMock).not.toHaveBeenCalled();
});

it('should remove empty filter', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  const filter = new StringFilter(idFilterConfig, {
    value: '',
    operator: StringFilter.Operators.equal,
  });
  const cancelButtonLabel = 'Cancel';
  render(
    <FilteredSearch
      cancelButtonLabel={cancelButtonLabel}
      filtersConfig={filtersConfig}
      filters={[filter]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const [filterToken] = screen.getAllByTestId('filter-token');
  await user.click(within(filterToken).getAllByRole('button')[0]);

  const cancelButton = screen.getByText(cancelButtonLabel);
  await user.click(cancelButton);

  expect(onChangeFiltersMock).toHaveBeenCalledTimes(1);
  expect(onChangeFiltersMock).toHaveBeenCalledWith([]);
});

it('apply new filter', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  const newFilter = new StringFilter(idFilterConfig, {
    value: '123',
    operator: StringFilter.Operators.equal,
  });
  const applyButtonLabel = 'Apply';
  render(
    <FilteredSearch
      applyButtonLabel={applyButtonLabel}
      filtersConfig={filtersConfig}
      filters={[]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{ArrowDown}');
  await user.type(comboBox, '{Enter}');

  const valueInput = screen.getByLabelText(idFilterConfig.valueInputAccessibleName);
  const applyButton = screen.getByText(applyButtonLabel);

  await user.type(valueInput, newFilter.value);
  await user.click(applyButton);
  expect(onChangeFiltersMock).toHaveBeenCalledTimes(1);
  expect(onChangeFiltersMock).toHaveBeenNthCalledWith(1, [newFilter]);
});

it('edit filters', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  const idFilter = new StringFilter(idFilterConfig, {
    value: '123',
    operator: StringFilter.Operators.equal,
  });
  const nameFilter = new StringFilter(nameFilterConfig, {
    value: 'test',
    operator: StringFilter.Operators.contain,
  });
  const editedIdFilter = idFilter.setValue('456');
  const applyButtonLabel = 'Apply';
  render(
    <FilteredSearch
      applyButtonLabel={applyButtonLabel}
      filtersConfig={filtersConfig}
      filters={[idFilter, nameFilter]}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const [filterToken] = screen.getAllByTestId('filter-token');
  await user.click(within(filterToken).getAllByRole('button')[0]);

  const valueInput = screen.getByLabelText(idFilterConfig.valueInputAccessibleName);
  const applyButton = screen.getByText(applyButtonLabel);

  await user.clear(valueInput);
  await user.type(valueInput, editedIdFilter.value);
  await user.click(applyButton);
  expect(onChangeFiltersMock).toHaveBeenCalledTimes(1);
  expect(onChangeFiltersMock).toHaveBeenNthCalledWith(1, [editedIdFilter, nameFilter]);
});

it('clear all filters', async () => {
  const user = userEvent.setup();
  const onChangeFiltersMock = vi.fn();
  const filters = [
    new StringFilter(idFilterConfig, {
      value: '123',
      operator: StringFilter.Operators.equal,
    }),
    new StringSetFilter(statusFilterConfig, {
      value: [statusFilterConfig.values[0]],
      operator: StringSetFilter.Operators.in,
    }),
  ];
  const clearButtonAccessibleName = 'Clear all filters';
  render(
    <FilteredSearch
      clearButtonAccessibleName={clearButtonAccessibleName}
      filtersConfig={filtersConfig}
      filters={filters}
      onChangeFilters={onChangeFiltersMock}
    />,
  );

  const clearButton = screen.getByLabelText(clearButtonAccessibleName);
  await user.click(clearButton);

  expect(onChangeFiltersMock).toHaveBeenCalledTimes(1);
  expect(onChangeFiltersMock).toHaveBeenCalledWith([]);
});
