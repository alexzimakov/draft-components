import { beforeAll, describe, expect, it, vi } from 'vitest';
import { StringSetFilter } from './model/string-set-filter.js';
import { TranslationsProvider } from './use-translations.js';
import { StringSetFilterItem } from './string-set-filter-item.js';
import { mockMatchMedia } from '../../test/mock-match-media.js';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

beforeAll(() => {
  mockMatchMedia();
});

const applyButtonLabel = 'Apply';
const cancelButtonLabel = 'Cancel';
const removeFilterButtonAccessibleName = 'Remove filter';
const config = {
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
const filter = new StringSetFilter(config, {
  value: ['passed'],
  operator: StringSetFilter.Operators.in,
});

it('renders without errors', () => {
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringSetFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={vi.fn()}
        onEditCancel={vi.fn()}
        onRemove={vi.fn()}
        onChange={vi.fn()}
      />
    </TranslationsProvider>,
  );
});

it('should open and close the editor when click on the filter', async () => {
  const user = userEvent.setup();
  const onEditStartMock = vi.fn();
  const onEditCancelMock = vi.fn();
  const ui = (isEditing: boolean) => (
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringSetFilterItem
        filter={filter}
        isEditing={isEditing}
        onEditStart={onEditStartMock}
        onEditCancel={onEditCancelMock}
        onRemove={vi.fn()}
        onChange={vi.fn()}
      />
    </TranslationsProvider>
  );
  const { rerender } = render(ui(false));

  const filterToken = screen.getByTestId('filter-token');
  const filterTokenButtons = within(filterToken).getAllByRole('button');

  await user.click(filterTokenButtons[0]);
  expect(onEditStartMock).toHaveBeenCalledTimes(1);

  rerender(ui(true));

  await user.click(filterTokenButtons[0]);
  expect(onEditCancelMock).toHaveBeenCalledTimes(1);
});

it('should remove filter after click on the close button', async () => {
  const user = userEvent.setup();
  const onRemoveMock = vi.fn();
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringSetFilterItem
        filter={filter}
        isEditing={false}
        onEditStart={vi.fn()}
        onEditCancel={vi.fn()}
        onRemove={onRemoveMock}
        onChange={vi.fn()}
      />
    </TranslationsProvider>,
  );

  const filterToken = screen.getByTestId('filter-token');
  const filterTokenButtons = within(filterToken).getAllByRole('button');
  await user.click(filterTokenButtons[1]);

  expect(onRemoveMock).toHaveBeenCalledTimes(1);
});

it('edit filter operator', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  const changedFilter = filter.setOperator(StringSetFilter.Operators.notIn);
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringSetFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={vi.fn()}
        onEditCancel={vi.fn()}
        onRemove={vi.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const applyButton = screen.getByText(applyButtonLabel);
  const operatorSelect = screen.getByLabelText(
    config.operatorSelectAccessibleName,
  );

  await user.selectOptions(operatorSelect, [changedFilter.operator]);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(changedFilter);
});

it('edit filter value', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  const [passed, failed, ignored] = config.values;
  const changedFilter = filter.setValue([failed, ignored]);
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringSetFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={vi.fn()}
        onEditCancel={vi.fn()}
        onRemove={vi.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const toggleCheckbox = (value: string) => {
    const label = StringSetFilterItem.defaultValueFormatter(value);
    return user.click(screen.getByLabelText(label));
  };
  const applyButton = screen.getByText(applyButtonLabel);

  await toggleCheckbox(passed);
  await toggleCheckbox(failed);
  await toggleCheckbox(ignored);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(changedFilter);
});

describe('defaultValuesFormatter()', () => {
  const defaultValueFormatter = StringSetFilterItem.defaultValueFormatter;
  const defaultValuesFormatter = StringSetFilterItem.defaultValuesFormatter;

  it('empty array', () => {
    const values: string[] = [];
    const expected = '';
    expect(defaultValuesFormatter(values)).toBe(expected);
  });

  it('1 item', () => {
    const values = ['active'];
    const expected = defaultValueFormatter(values[0]);
    expect(defaultValuesFormatter(values)).toBe(expected);
  });

  it('2 items', () => {
    const values = ['active', 'deleted'];
    const expected = (
      defaultValueFormatter(values[0])
      + ' or '
      + defaultValueFormatter(values[1])
    );
    expect(defaultValuesFormatter(values)).toBe(expected);
  });

  it('3 items', () => {
    const values = ['active', 'deleted', 'paused'];
    const expected = (
      defaultValueFormatter(values[0])
      + ', '
      + defaultValueFormatter(values[1])
      + ', or '
      + defaultValueFormatter(values[2])
    );
    expect(defaultValuesFormatter(values)).toBe(expected);
  });

  it('4 or more items', () => {
    const values = ['active', 'deleted', 'paused', 'errors'];
    const expected = (
      defaultValueFormatter(values[0])
      + ', '
      + defaultValueFormatter(values[1])
      + ', and 2 more'
    );
    expect(defaultValuesFormatter(values)).toBe(expected);
  });
});
