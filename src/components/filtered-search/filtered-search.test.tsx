import '../../tests/match-media.mock';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { FilteredSearch } from './filtered-search';
import { FilterConfig } from './types';
import { StringFilter } from './model/string-filter';
import { StringSetFilter } from './model/string-set-filter';

const idFilterConfig: FilterConfig = {
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

const nameFilterConfig: FilterConfig = {
  type: StringFilter.Type,
  field: 'name',
  label: 'Test name',
  operators: [
    StringFilter.Operators.contain,
    StringFilter.Operators.notContain,
  ],
};

const statusFilterConfig: FilterConfig = {
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
      onChange={jest.fn}
    />,
  );

  const comboBox = screen.queryByRole('combobox');
  expect(comboBox).not.toBeNull();
  expect(comboBox).toHaveAttribute('placeholder', placeholder);

  fireEvent.focus(comboBox);
  const listBox = screen.queryByRole('listbox');
  expect(listBox).not.toBeNull();
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
      onChange={jest.fn}
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
  const onMouseDownMock = jest.fn();
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChange={jest.fn}
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
      onChange={jest.fn}
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
      onChange={jest.fn}
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

it('choose filter using keyboard', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
  const selectedFilter = new StringFilter(idFilterConfig, {
    value: '',
    operator: StringFilter.Operators.equal,
  });
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChange={onChangeMock}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{ArrowDown}');
  await user.type(comboBox, '{Enter}');
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, [selectedFilter]);
});

it('choose filter using mouse', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
  const selectedFilter = new StringSetFilter(statusFilterConfig, {
    value: [],
    operator: StringSetFilter.Operators.in,
  });
  render(
    <FilteredSearch
      filtersConfig={filtersConfig}
      filters={[]}
      onChange={onChangeMock}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.click(screen.getByText(statusFilterConfig.label));
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, [selectedFilter]);
});

it('remove filters using keyboard', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
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
      onChange={onChangeMock}
    />,
  );

  const comboBox = screen.getByRole('combobox');
  await user.click(comboBox);
  await user.type(comboBox, '{Backspace}');
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, filters.slice(0, -1));
});

it('remove filters using mouse', async () => {
  const user = userEvent.setup();
  const removeFilterButtonAccessibleName = 'Remove filter';
  const onChangeMock = jest.fn();
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
      onChange={onChangeMock}
    />,
  );

  const [idFilter, statusFilter] = screen.getAllByTestId('filter-token');

  await user.click(
    within(idFilter).getByLabelText(removeFilterButtonAccessibleName),
  );

  await user.click(
    within(statusFilter).getByLabelText(removeFilterButtonAccessibleName),
  );

  expect(onChangeMock).toHaveBeenCalledTimes(2);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, [filters[1]]);
  expect(onChangeMock).toHaveBeenNthCalledWith(2, [filters[0]]);
});

it('auto remove empty filters', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
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
      onChange={onChangeMock}
    />,
  );

  const [filterToken] = screen.getAllByTestId('filter-token');
  await user.click(within(filterToken).getAllByRole('button')[0]);

  const cancelButton = screen.getByText(cancelButtonLabel);
  await user.click(cancelButton);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith([]);
});

it('edit filters', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
  const filter = new StringFilter(idFilterConfig, {
    value: '123',
    operator: StringFilter.Operators.equal,
  });
  const changedFilter = filter.setValue('456');
  const applyButtonLabel = 'Apply';
  render(
    <FilteredSearch
      applyButtonLabel={applyButtonLabel}
      filtersConfig={filtersConfig}
      filters={[filter]}
      onChange={onChangeMock}
    />,
  );

  const [filterToken] = screen.getAllByTestId('filter-token');
  await user.click(within(filterToken).getAllByRole('button')[0]);

  const valueInput = screen.getByLabelText(
    idFilterConfig.valueInputAccessibleName,
  );
  const applyButton = screen.getByText(applyButtonLabel);

  await user.clear(valueInput);
  await user.type(valueInput, changedFilter.value);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, [changedFilter]);
});

it('clear all filters', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
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
      onChange={onChangeMock}
    />,
  );

  const clearButton = screen.getByLabelText(clearButtonAccessibleName);
  await user.click(clearButton);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith([]);
});
