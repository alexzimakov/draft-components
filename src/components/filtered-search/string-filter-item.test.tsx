import '../../tests/match-media.mock';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { TranslationsProvider } from './use-translations';
import { StringFilterItem } from './string-filter-item';
import { StringFilter } from './model/string-filter';

const applyButtonLabel = 'Apply';
const cancelButtonLabel = 'Cancel';
const removeFilterButtonAccessibleName = 'Remove filter';
const config = {
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
const filter = new StringFilter(config, {
  value: '123',
  operator: StringFilter.Operators.equal,
});

it('renders without errors', () => {
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={jest.fn()}
        onEditCancel={jest.fn()}
        onRemove={jest.fn()}
        onChange={jest.fn()}
      />
    </TranslationsProvider>,
  );
});

it('should open and close the editor when click on the filter', async () => {
  const user = userEvent.setup();
  const onEditStartMock = jest.fn();
  const onEditCancelMock = jest.fn();
  const ui = (isEditing: boolean) => (
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={isEditing}
        onEditStart={onEditStartMock}
        onEditCancel={onEditCancelMock}
        onRemove={jest.fn()}
        onChange={jest.fn()}
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
  const onRemoveMock = jest.fn();
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={false}
        onEditStart={jest.fn()}
        onEditCancel={jest.fn()}
        onRemove={onRemoveMock}
        onChange={jest.fn()}
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
  const onChangeMock = jest.fn();
  const changedFilter = filter.setOperator(StringFilter.Operators.notEqual);
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={jest.fn()}
        onEditCancel={jest.fn()}
        onRemove={jest.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const operatorSelect = screen.getByLabelText(
    config.operatorSelectAccessibleName,
  );
  const applyButton = screen.getByText(applyButtonLabel);

  await user.selectOptions(operatorSelect, [changedFilter.operator]);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, changedFilter);
});

it('edit filter value', async () => {
  const user = userEvent.setup();
  const onChangeMock = jest.fn();
  const changedFilter = filter.setValue('456');
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={jest.fn()}
        onEditCancel={jest.fn()}
        onRemove={jest.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const valueInput = screen.getByLabelText(config.valueInputAccessibleName);
  const applyButton = screen.getByText(applyButtonLabel);

  await user.clear(valueInput);
  await user.type(valueInput, changedFilter.value);
  await user.click(applyButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, changedFilter);
});

it('validate filter value', async () => {
  const user = userEvent.setup();
  const error = 'The value must be 123.';
  const filter = new StringFilter({
    ...config,
    valueValidator: (value) => {
      if (value === '123') {
        return { valid: true };
      }
      return { valid: false, error };
    },
  }, {
    value: '123',
    operator: config.operators[0],
  });
  const onChangeMock = jest.fn();
  render(
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <StringFilterItem
        filter={filter}
        isEditing={true}
        onEditStart={jest.fn()}
        onEditCancel={jest.fn()}
        onRemove={jest.fn()}
        onChange={onChangeMock}
      />
    </TranslationsProvider>,
  );

  const valueInput = screen.getByLabelText(
    config.valueInputAccessibleName,
  );
  const applyButton = screen.getByText(applyButtonLabel);

  await user.type(valueInput, '4');
  await user.click(applyButton);
  screen.getByText(error);

  await user.type(valueInput, '{Backspace}');
  await user.click(applyButton);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
