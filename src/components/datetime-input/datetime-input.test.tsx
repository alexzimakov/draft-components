import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { DateComponent, DateComponents } from './date-components';
import { DatetimeInput } from './datetime-input';

beforeEach(() => {
  jest.useFakeTimers();
});

it('renders without errors', () => {
  render(
    <DatetimeInput value={new DateComponents()} onChangeValue={jest.fn()} />,
  );

  screen.getByLabelText('year');
  screen.getByLabelText('month');
  screen.getByLabelText('day');
  screen.getByLabelText('hour');
  screen.getByLabelText('minute');
});

it('renders with required inputs when type is `date`', () => {
  render(
    <DatetimeInput
      type="date"
      value={new DateComponents()}
      onChangeValue={jest.fn()}
    />,
  );

  screen.getByLabelText('year');
  screen.getByLabelText('month');
  screen.getByLabelText('day');
  expect(screen.queryByLabelText('hour')).toBeNull();
  expect(screen.queryByLabelText('minute')).toBeNull();
});

it('renders with required inputs when type is `time`', () => {
  render(
    <DatetimeInput
      type="time"
      value={new DateComponents()}
      onChangeValue={jest.fn()}
    />,
  );

  expect(screen.queryByLabelText('year')).toBeNull();
  expect(screen.queryByLabelText('month')).toBeNull();
  expect(screen.queryByLabelText('day')).toBeNull();
  screen.getByLabelText('hour');
  screen.getByLabelText('minute');
});

it('should invoke `onChangeValue` callback when edit value', () => {
  const onChangeValue = jest.fn();
  render(
    <DatetimeInput
      value={new DateComponents()}
      onChangeValue={onChangeValue}
    />,
  );

  const monthInput = screen.getByLabelText('month');
  userEvent.type(monthInput, 'may');
  jest.runAllTimers();
  userEvent.type(monthInput, '5');
  jest.runAllTimers();

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ month: 5 }),
  );
});

it('should clear value of date component when backspace pressed', () => {
  const onChangeValue = jest.fn();
  render(
    <DatetimeInput
      value={new DateComponents({ month: 5 })}
      onChangeValue={onChangeValue}
    />,
  );

  const monthInput = screen.getByLabelText('month');
  userEvent.type(monthInput, '{backspace}');

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ month: undefined }),
  );
});

it('can move focus between input using keyboard left and right arrows', () => {
  render(
    <DatetimeInput
      type="time"
      value={new DateComponents()}
      onChangeValue={jest.fn()}
    />,
  );

  const hourInput = screen.getByLabelText('hour');
  const minuteInput = screen.getByLabelText('minute');

  userEvent.tab();
  expect(hourInput).toHaveFocus();
  jest.runAllTimers();

  userEvent.type(hourInput, '{arrowrleft}', { skipClick: true });
  expect(hourInput).toHaveFocus();
  jest.runAllTimers();

  userEvent.type(hourInput, '{arrowright}', { skipClick: true });
  expect(minuteInput).toHaveFocus();
  jest.runAllTimers();

  userEvent.type(minuteInput, '{arrowright}', { skipClick: true });
  expect(minuteInput).toHaveFocus();
  jest.runAllTimers();

  userEvent.type(minuteInput, '{arrowleft}', { skipClick: true });
  expect(hourInput).toHaveFocus();
  jest.runAllTimers();
});

it('should auto focus the next date component input when in the current has been entered max value', () => {
  render(
    <DatetimeInput value={new DateComponents()} onChangeValue={jest.fn()} />,
  );

  userEvent.type(screen.getByLabelText('month'), '7');
  jest.runAllTimers();

  expect(screen.getByLabelText('year')).toHaveFocus();

  jest.useRealTimers();
});

it('should correct value in date component input when it loses focus', () => {
  const onChangeValue = jest.fn();
  const TestExample = () => {
    const [value, setValue] = useState(new DateComponents());
    return (
      <DatetimeInput
        type="date"
        value={value}
        onChangeValue={(value) => {
          onChangeValue(value);
          setValue(value);
        }}
      />
    );
  };
  render(<TestExample />);

  userEvent.type(screen.getByLabelText('day'), '0');
  userEvent.tab();
  jest.runAllTimers();

  userEvent.type(screen.getByLabelText('month'), '13', { skipClick: true });
  userEvent.tab();
  jest.runAllTimers();

  expect(onChangeValue).toHaveBeenCalledTimes(5);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ day: 0 }),
  );
  expect(onChangeValue).toHaveBeenNthCalledWith(
    2,
    new DateComponents({ day: 1 }),
  );
  expect(onChangeValue).toHaveBeenNthCalledWith(
    3,
    new DateComponents({ day: 1, month: 1 }),
  );
  expect(onChangeValue).toHaveBeenNthCalledWith(
    4,
    new DateComponents({ day: 1, month: 13 }),
  );
  expect(onChangeValue).toHaveBeenNthCalledWith(
    5,
    new DateComponents({ day: 1, month: 12 }),
  );
});

it('can edit date component using keyboard up and down arrows', () => {
  const mockCurrentDate = new Date(Date.UTC(2021, 4, 20, 5, 30));
  const resetDateMock = mockDate(mockCurrentDate);

  let dateComponents = new DateComponents();
  const onChangeValue = jest.fn();
  const dateComponentsInitialValues = {
    year: mockCurrentDate.getFullYear(),
    month: mockCurrentDate.getMonth() + 1,
    day: mockCurrentDate.getDate(),
    hour: mockCurrentDate.getHours(),
    minute: mockCurrentDate.getMinutes(),
  };
  const TestExample = () => {
    const [value, setValue] = useState(dateComponents);
    return (
      <DatetimeInput
        value={value}
        onChangeValue={(value) => {
          dateComponents = value;
          onChangeValue(value);
          setValue(value);
        }}
      />
    );
  };

  render(<TestExample />);

  const testOfDateComponentValueChange = (
    dateComponent: DateComponent,
    numberOfKeyDowns: number,
    arrow: '{arrowup}' | '{arrowdown}',
  ) => {
    onChangeValue.mockClear();

    const inputEl = screen.getByLabelText(dateComponent);

    let dateComponentNewValue = dateComponentsInitialValues[dateComponent];
    if (arrow === '{arrowup}') {
      dateComponentNewValue += numberOfKeyDowns - 1;
    } else if (arrow === '{arrowdown}') {
      dateComponentNewValue -= numberOfKeyDowns - 1;
    }

    const newDateComponents = dateComponents.updatingValue(
      dateComponentNewValue,
      dateComponent,
    );

    userEvent.tab();
    expect(inputEl).toHaveFocus();

    for (let i = 0; i < numberOfKeyDowns; i += 1) {
      userEvent.type(inputEl, arrow, { skipClick: true });
      jest.runAllTimers();
    }
    expect(onChangeValue).toHaveBeenCalledTimes(numberOfKeyDowns);
    expect(onChangeValue).toHaveBeenLastCalledWith(newDateComponents);
  };

  testOfDateComponentValueChange('day', 2, '{arrowup}');
  testOfDateComponentValueChange('month', 3, '{arrowdown}');
  testOfDateComponentValueChange('year', 1, '{arrowup}');
  testOfDateComponentValueChange('hour', 2, '{arrowup}');
  testOfDateComponentValueChange('minute', 2, '{arrowdown}');

  resetDateMock();
});

it('should not out range of date component values when edit using keyboard arrows', () => {
  const onChangeValue = jest.fn();
  render(
    <DatetimeInput
      value={new DateComponents({ day: 1, month: 12 })}
      onChangeValue={onChangeValue}
    />,
  );

  userEvent.type(screen.getByLabelText('day'), '{arrowdown}');
  jest.runAllTimers();
  userEvent.type(screen.getByLabelText('month'), '{arrowup}');
  jest.runAllTimers();

  expect(onChangeValue).toHaveBeenCalledTimes(2);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ day: 31, month: 12 }),
  );
  expect(onChangeValue).toHaveBeenNthCalledWith(
    2,
    new DateComponents({ day: 1, month: 1 }),
  );
});

function mockDate(date: Date): () => void {
  const OriginalDate = Date;

  Object.defineProperty(global, 'Date', {
    value: function Date() {
      return date;
    },
    configurable: true,
  });

  return () => {
    Object.defineProperty(global, 'Date', {
      value: OriginalDate,
      configurable: true,
    });
  };
}
