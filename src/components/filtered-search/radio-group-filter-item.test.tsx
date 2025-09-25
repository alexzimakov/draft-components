import { expect, it, vi } from 'vitest';
import { TranslationsProvider } from './use-translations.js';
import { RadioGroupFilter } from './model/radio-group-filter.js';
import { RadioGroupFilterItem } from './radio-group-filter-item.js';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

const applyButtonLabel = 'Apply';
const cancelButtonLabel = 'Cancel';
const removeFilterButtonAccessibleName = 'Remove filter';
const config = {
  type: RadioGroupFilter.Type,
  field: 'status',
  label: 'Status',
  options: ['todo', 'in progress', 'done', 'archived'],
  operators: [
    RadioGroupFilter.Operators.equal,
    RadioGroupFilter.Operators.notEqual,
  ],
  operatorSelectAccessibleName: 'Status filter operator',
};
const filter = new RadioGroupFilter(config, {
  value: 'todo',
  operator: RadioGroupFilter.Operators.equal,
});

it('renders without errors', () => {
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <RadioGroupFilterItem
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
      <RadioGroupFilterItem
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
      <RadioGroupFilterItem
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
  const expectedFilter = filter.setOperator(RadioGroupFilter.Operators.notEqual);
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <RadioGroupFilterItem
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

  await user.selectOptions(operatorSelect, [expectedFilter.operator]);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(expectedFilter);
});

it('edit filter value', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  const [todo, inProgress, done] = config.options;
  const expectedFilter = filter.setValue(done);
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <RadioGroupFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={vi.fn()}
        onEditCancel={vi.fn()}
        onRemove={vi.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const selectOption = (value: string) => {
    const label = RadioGroupFilterItem.defaultValueFormatter(value);
    return user.click(screen.getByLabelText(label));
  };
  const applyButton = screen.getByText(applyButtonLabel);

  await selectOption(todo);
  await selectOption(inProgress);
  await selectOption(done);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(expectedFilter);
});
