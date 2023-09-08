import { beforeEach, expect, it, vi } from 'vitest';
import { DateRangePickerPopoverOption } from './types.js';
import { DateRangePickerPopover } from './date-range-picker-popover.js';
import { render, screen, userEvent, waitFor } from '../../test/test-utils.js';
import { mockMatchMedia } from '../../test/mock-match-media.js';

beforeEach(() => {
  mockMatchMedia();
});

const anchorButtonLabel = 'Select date preset';
const cancelButtonLabel = 'Cancel';
const confirmButtonLabel = 'Update';
const options: DateRangePickerPopoverOption[] = [
  {
    label: 'Today',
    preset: 'today',
    range: { start: '2022-12-31', end: '2022-12-31' },
  },
  {
    label: 'Yesterday',
    preset: 'yesterday',
    range: { start: '2022-12-30', end: '2022-12-30' },
  },
  {
    label: 'Last 7 days',
    preset: 'last_7_day',
    range: { start: '2022-12-25', end: '2022-12-31' },
  },
];

it('renders without errors', () => {
  const selectedOption = options[0];
  const value = {
    preset: selectedOption.preset,
    range: selectedOption.range,
  };
  render(
    <DateRangePickerPopover
      locale="en"
      defaultIsOpen={true}
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={value}
      onChangeValue={vi.fn()}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  screen.getByText(anchorButtonLabel);
  screen.getByRole('grid');
  screen.getByText(cancelButtonLabel);
  screen.getByText(confirmButtonLabel);
  options.forEach((option) => screen.getByText(option.label));
});

it('renders with footer', () => {
  const footer = 'America/New York';
  render(
    <DateRangePickerPopover
      defaultIsOpen={true}
      options={options}
      value={null}
      onChangeValue={vi.fn()}
      footer={() => footer}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  screen.getByText(footer);
});

it('renders `Select` element instead of `RadioGroup` on phones', () => {
  mockMatchMedia({ matches: true });
  const selectedOption = options[0];
  const value = {
    preset: selectedOption.preset,
    range: selectedOption.range,
  };
  render(
    <DateRangePickerPopover
      locale="en"
      defaultIsOpen={true}
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={value}
      onChangeValue={vi.fn()}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  screen.getByText(anchorButtonLabel);
  screen.getByRole('grid');
  screen.getByText(cancelButtonLabel);
  screen.getByText(confirmButtonLabel);
  // 1 select for month and 1 select for date preset
  expect(screen.getAllByRole('combobox')).toHaveLength(2);
});

it('can toggle popover visibility', async () => {
  const user = userEvent.setup();
  render(
    <DateRangePickerPopover
      options={[]}
      value={null}
      onChangeValue={vi.fn()}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  const anchorButton = screen.getByText(anchorButtonLabel);

  await user.click(anchorButton);
  screen.getByRole('grid');

  await user.click(anchorButton);
  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
});

it('should close popover when click on the confirm button', async () => {
  const user = userEvent.setup();
  render(
    <DateRangePickerPopover
      defaultIsOpen={true}
      confirmButtonLabel={confirmButtonLabel}
      options={[]}
      value={null}
      onChangeValue={vi.fn()}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  screen.getByRole('grid');
  await user.click(screen.getByText(confirmButtonLabel));
  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
});

it('should close popover when click on the cancel button', async () => {
  const user = userEvent.setup();
  render(
    <DateRangePickerPopover
      defaultIsOpen={true}
      cancelButtonLabel={cancelButtonLabel}
      options={[]}
      value={null}
      onChangeValue={vi.fn()}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  screen.getByRole('grid');
  await user.click(screen.getByText(cancelButtonLabel));
  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
});

it('can select date range using calendar', async () => {
  const user = userEvent.setup();
  const customPreset = 'custom';
  const selectedOption = options[0];
  const value = {
    preset: selectedOption.preset,
    range: selectedOption.range,
  };
  const onChangeValueMock = vi.fn();
  render(
    <DateRangePickerPopover
      customPreset={customPreset}
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={value}
      onChangeValue={onChangeValueMock}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  await user.click(screen.getByText(anchorButtonLabel));
  await user.click(screen.getByText('1'));
  await user.click(screen.getByText('4'));
  await user.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    preset: customPreset,
    range: { start: '2022-12-01', end: '2022-12-04' },
  });
});

it('can select date range using date preset select', async () => {
  const user = userEvent.setup();
  const selectedOption = options[0];
  const newOption = options[1];
  const value = {
    preset: selectedOption.preset,
    range: selectedOption.range,
  };
  const onChangeValueMock = vi.fn();
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={value}
      onChangeValue={onChangeValueMock}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  await user.click(screen.getByText(anchorButtonLabel));
  await user.click(screen.getByText(newOption.label));
  await user.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    preset: newOption.preset,
    range: newOption.range,
  });
});

it('can select date range with date preset using calendar', async () => {
  const user = userEvent.setup();
  const selectedOption = options[0];
  const value = {
    preset: selectedOption.preset,
    range: selectedOption.range,
  };
  const onChangeValueMock = vi.fn();
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={value}
      onChangeValue={onChangeValueMock}
    >
      <button>{anchorButtonLabel}</button>
    </DateRangePickerPopover>,
  );

  await user.click(screen.getByText(anchorButtonLabel));
  await user.click(screen.getByText('31'));
  await user.click(screen.getByText('25'));
  await user.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    preset: options[2].preset,
    range: options[2].range,
  });
});
