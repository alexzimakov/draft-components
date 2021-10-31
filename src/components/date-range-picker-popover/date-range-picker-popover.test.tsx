import { render, screen, fireEvent } from '@testing-library/react';
import { DateRangePickerPopover } from './date-range-picker-popover';

it('renders without errors', () => {
  const buttonTestId = 'popover-anchor';
  const cancelButtonLabel = 'Cancel';
  const applyButtonLabel = 'Update';
  const options = [
    {
      label: 'Today',
      dateRange: {
        startDate: '2021-10-31',
        endDate: '2021-10-31',
        datePreset: 'today',
      },
    },
    {
      label: 'Yesterday',
      dateRange: {
        startDate: '2021-10-30',
        endDate: '2021-10-30',
        datePreset: 'yesterday',
      },
    },
  ];
  render(
    <DateRangePickerPopover
      defaultIsOpen={true}
      cancelButtonLabel={cancelButtonLabel}
      applyButtonLabel={applyButtonLabel}
      options={options}
      dateRange={null}
      onChangeDateRange={jest.fn()}
    >
      {(props) => (
        <button
          data-testid={buttonTestId}
          onClick={props.togglePopoverVisibility}
        >
          {props.formattedDateRange || 'Select period'}
        </button>
      )}
    </DateRangePickerPopover>,
  );

  screen.getByTestId(buttonTestId);
  screen.getByRole('grid');
  screen.getByText(cancelButtonLabel);
  screen.getByText(applyButtonLabel);
  options.forEach(option => {
    screen.getByText(option.label);
  });
});

it('can toggle popover visibility', () => {
  const buttonTestId = 'popover-anchor';
  const cancelButtonLabel = 'Cancel';
  const applyButtonLabel = 'Update';
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      applyButtonLabel={applyButtonLabel}
      dateRange={null}
      onChangeDateRange={jest.fn()}
    >
      {(props) => (
        <button
          data-testid={buttonTestId}
          onClick={props.togglePopoverVisibility}
        >
          {props.formattedDateRange || 'Select period'}
        </button>
      )}
    </DateRangePickerPopover>,
  );

  const button = screen.getByTestId(buttonTestId);

  fireEvent.click(button);
  expect(screen.queryByRole('grid')).not.toBeNull();

  fireEvent.click(button);
  expect(screen.queryByRole('grid')).toBeNull();
});

it('can select date range using calendar', () => {
  const buttonTestId = 'popover-anchor';
  const cancelButtonLabel = 'Cancel';
  const applyButtonLabel = 'Apply';
  const dateRange = { startDate: '2021-10-12', endDate: '2021-10-20' };
  const onChangeDateRangeMock = jest.fn();
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      applyButtonLabel={applyButtonLabel}
      dateRange={dateRange}
      onChangeDateRange={onChangeDateRangeMock}
    >
      {(props) => (
        <button
          data-testid={buttonTestId}
          onClick={props.togglePopoverVisibility}
        >
          {props.formattedDateRange || 'Select period'}
        </button>
      )}
    </DateRangePickerPopover>,
  );

  fireEvent.click(screen.getByTestId(buttonTestId));
  fireEvent.click(screen.getByText('8'));
  fireEvent.click(screen.getByText('25'));
  fireEvent.click(screen.getByText(applyButtonLabel));

  expect(onChangeDateRangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeDateRangeMock).toHaveBeenCalledWith({
    startDate: '2021-10-08',
    endDate: '2021-10-25',
  });
});

it('can select date range using date presets', () => {
  const buttonTestId = 'popover-anchor';
  const cancelButtonLabel = 'Cancel';
  const applyButtonLabel = 'Apply';
  const dateRange = { startDate: '2021-10-12', endDate: '2021-10-20' };
  const onChangeDateRangeMock = jest.fn();
  const options = [
    {
      label: 'Today',
      dateRange: {
        startDate: '2021-10-31',
        endDate: '2021-10-31',
        datePreset: 'today',
      },
    },
    {
      label: 'Yesterday',
      dateRange: {
        startDate: '2021-10-30',
        endDate: '2021-10-30',
        datePreset: 'yesterday',
      },
    },
  ];
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      applyButtonLabel={applyButtonLabel}
      options={options}
      dateRange={dateRange}
      onChangeDateRange={onChangeDateRangeMock}
    >
      {(props) => (
        <button
          data-testid={buttonTestId}
          onClick={props.togglePopoverVisibility}
        >
          {props.formattedDateRange || 'Select period'}
        </button>
      )}
    </DateRangePickerPopover>,
  );

  fireEvent.click(screen.getByTestId(buttonTestId));
  fireEvent.click(screen.getByText(options[1].label));
  fireEvent.click(screen.getByText(applyButtonLabel));

  expect(onChangeDateRangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeDateRangeMock).toHaveBeenCalledWith(options[1].dateRange);
});

it('can select date range wit date preset using calendar', () => {
  const buttonTestId = 'popover-anchor';
  const cancelButtonLabel = 'Cancel';
  const applyButtonLabel = 'Apply';
  const dateRange = { startDate: '2021-10-12', endDate: '2021-10-20' };
  const onChangeDateRangeMock = jest.fn();
  const options = [
    {
      label: 'Today',
      dateRange: {
        startDate: '2021-10-31',
        endDate: '2021-10-31',
        datePreset: 'today',
      },
    },
    {
      label: 'Yesterday',
      dateRange: {
        startDate: '2021-10-30',
        endDate: '2021-10-30',
        datePreset: 'yesterday',
      },
    },
  ];
  render(
    <DateRangePickerPopover
      cancelButtonLabel={cancelButtonLabel}
      applyButtonLabel={applyButtonLabel}
      options={options}
      dateRange={dateRange}
      onChangeDateRange={onChangeDateRangeMock}
    >
      {(props) => (
        <button
          data-testid={buttonTestId}
          onClick={props.togglePopoverVisibility}
        >
          {props.formattedDateRange || 'Select period'}
        </button>
      )}
    </DateRangePickerPopover>,
  );

  fireEvent.click(screen.getByTestId(buttonTestId));
  fireEvent.click(screen.getByText('30'));
  fireEvent.click(screen.getByText('30'));
  fireEvent.click(screen.getByText(applyButtonLabel));

  expect(onChangeDateRangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeDateRangeMock).toHaveBeenCalledWith(options[1].dateRange);
});
