import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { DatePresetPickerPopover } from './date-preset-picker-popover';

function mockMatchMedia(matches = false): void {
  // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

beforeEach(() => {
  mockMatchMedia();
});

const cancelButtonLabel = 'Cancel';
const confirmButtonLabel = 'Update';
const anchorButtonLabel = 'Select date preset';
const options = [
  {
    label: 'Today',
    datePreset: 'today',
    dateRange: { start: '2021-11-09', end: '2021-11-09' },
  },
  {
    label: 'Yesterday',
    datePreset: 'yesterday',
    dateRange: { start: '2021-11-08', end: '2021-11-08' },
  },
  {
    label: 'Last 7 days',
    datePreset: 'last_7_day',
    dateRange: { start: '2021-11-02', end: '2021-11-08' },
  },
];

it('renders without errors', () => {
  render(<DatePresetPickerPopover
    locale="en"
    defaultIsOpen={true}
    cancelButtonLabel={cancelButtonLabel}
    confirmButtonLabel={confirmButtonLabel}
    options={options}
    value={options[0]}
    onChangeValue={jest.fn()}
  >
    {() => <button>{anchorButtonLabel}</button>}
  </DatePresetPickerPopover>);

  screen.getByText(anchorButtonLabel);
  screen.getByRole('grid');
  screen.getByText(cancelButtonLabel);
  screen.getByText(confirmButtonLabel);
  options.forEach(option => screen.getByText(option.label));
});

it('renders `Select` element instead of `RadioGroup` on phones', () => {
  mockMatchMedia(true);
  render(<DatePresetPickerPopover
    locale="en"
    defaultIsOpen={true}
    cancelButtonLabel={cancelButtonLabel}
    confirmButtonLabel={confirmButtonLabel}
    options={options}
    value={options[0]}
    onChangeValue={jest.fn()}
  >
    {() => <button>{anchorButtonLabel}</button>}
  </DatePresetPickerPopover>);

  screen.getByText(anchorButtonLabel);
  screen.getByRole('grid');
  screen.getByText(cancelButtonLabel);
  screen.getByText(confirmButtonLabel);
  screen.getByRole('combobox');
});

it('can toggle popover visibility', () => {
  render(
    <DatePresetPickerPopover
      options={[]}
      value={null}
      onChangeValue={jest.fn()}
    >
      {(props) => (
        <button onClick={props.togglePopover}>
          {anchorButtonLabel}
        </button>
      )}
    </DatePresetPickerPopover>,
  );

  const button = screen.getByText(anchorButtonLabel);

  userEvent.click(button);
  expect(screen.queryByRole('grid')).not.toBeNull();

  userEvent.click(button);
  expect(screen.queryByRole('grid')).toBeNull();
});

it('can select date range using calendar', () => {
  const onChangeValueMock = jest.fn();
  render(
    <DatePresetPickerPopover
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={options[0]}
      onChangeValue={onChangeValueMock}
    >
      {(props) => (
        <button onClick={props.togglePopover}>
          {anchorButtonLabel}
        </button>
      )}
    </DatePresetPickerPopover>,
  );

  userEvent.click(screen.getByText(anchorButtonLabel));
  userEvent.click(screen.getByText('8'));
  userEvent.click(screen.getByText('25'));
  userEvent.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    datePreset: '',
    dateRange: { start: '2021-11-08', end: '2021-11-25' },
  });
});

it('can select date range using date preset select', () => {
  const onChangeValueMock = jest.fn();
  render(
    <DatePresetPickerPopover
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={options[0]}
      onChangeValue={onChangeValueMock}
    >
      {(props) => (
        <button onClick={props.togglePopover}>
          {anchorButtonLabel}
        </button>
      )}
    </DatePresetPickerPopover>,
  );

  userEvent.click(screen.getByText(anchorButtonLabel));
  userEvent.click(screen.getByText(options[1].label));
  userEvent.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    datePreset: options[1].datePreset,
    dateRange: options[1].dateRange,
  });
});

it('can select date range with date preset using calendar', () => {
  const onChangeValueMock = jest.fn();
  render(
    <DatePresetPickerPopover
      cancelButtonLabel={cancelButtonLabel}
      confirmButtonLabel={confirmButtonLabel}
      options={options}
      value={null}
      onChangeValue={onChangeValueMock}
    >
      {(props) => (
        <button onClick={props.togglePopover}>
          {anchorButtonLabel}
        </button>
      )}
    </DatePresetPickerPopover>,
  );

  userEvent.click(screen.getByText(anchorButtonLabel));
  userEvent.click(screen.getByText('8'));
  userEvent.click(screen.getByText(confirmButtonLabel));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith({
    datePreset: options[1].datePreset,
    dateRange: options[1].dateRange,
  });
});
