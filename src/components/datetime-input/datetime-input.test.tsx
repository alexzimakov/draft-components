import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { DatetimeInput } from './datetime-input';
import { DateComponent, DateComponents } from './date-components';

it('renders without errors', () => {
  render(
    <DatetimeInput value={new DateComponents()} onChangeValue={jest.fn()} />
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
    />
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
    />
  );

  expect(screen.queryByLabelText('year')).toBeNull();
  expect(screen.queryByLabelText('month')).toBeNull();
  expect(screen.queryByLabelText('day')).toBeNull();
  screen.getByLabelText('hour');
  screen.getByLabelText('minute');
});

it('should invoke `onChangeValue` callback when edit value', async () => {
  const user = userEvent.setup();
  const onChangeValue = jest.fn();
  render(
    <DatetimeInput value={new DateComponents()} onChangeValue={onChangeValue} />
  );

  const monthInput = screen.getByLabelText('month');
  await user.type(monthInput, 'may');
  await user.type(monthInput, '5');

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ month: 5 })
  );
});

it('should clear value of date component when backspace pressed', async () => {
  const user = userEvent.setup();
  const onChangeValue = jest.fn();
  render(
    <DatetimeInput
      value={new DateComponents({ month: 5 })}
      onChangeValue={onChangeValue}
    />
  );

  const monthInput = screen.getByLabelText('month');
  await user.type(monthInput, '{backspace}');

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(
    1,
    new DateComponents({ month: undefined })
  );
});

it(
  'can move focus between input using keyboard left and right arrows',
  async () => {
    const user = userEvent.setup();
    render(
      <DatetimeInput
        type="time"
        value={new DateComponents()}
        onChangeValue={jest.fn()}
      />
    );

    const hourInput = screen.getByLabelText('hour');
    const minuteInput = screen.getByLabelText('minute');

    await user.tab();
    expect(hourInput).toHaveFocus();

    await user.type(hourInput, '{arrowrleft}', { skipClick: true });
    expect(hourInput).toHaveFocus();

    await user.type(hourInput, '{arrowright}', { skipClick: true });
    expect(minuteInput).toHaveFocus();

    await user.type(minuteInput, '{arrowright}', { skipClick: true });
    expect(minuteInput).toHaveFocus();

    await user.type(minuteInput, '{arrowleft}', { skipClick: true });
    expect(hourInput).toHaveFocus();
  }
);

it(
  'should auto focus the next date component input ' +
  'when in the current has been entered max value',
  async () => {
    const user = userEvent.setup();
    render(
      <DatetimeInput value={new DateComponents()} onChangeValue={jest.fn()} />
    );

    await user.type(screen.getByLabelText('month'), '7');
    expect(screen.getByLabelText('year')).toHaveFocus();
  }
);

it(
  'should correct value in date component input when it loses focus',
  async () => {
    const user = userEvent.setup();
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

    await user.type(screen.getByLabelText('day'), '0');
    await user.tab();

    await user.type(screen.getByLabelText('month'), '13', { skipClick: true });
    await user.tab();

    expect(onChangeValue).toHaveBeenCalledTimes(5);
    expect(onChangeValue).toHaveBeenNthCalledWith(
      1,
      new DateComponents({ day: 0 })
    );
    expect(onChangeValue).toHaveBeenNthCalledWith(
      2,
      new DateComponents({ day: 1 })
    );
    expect(onChangeValue).toHaveBeenNthCalledWith(
      3,
      new DateComponents({ day: 1, month: 1 })
    );
    expect(onChangeValue).toHaveBeenNthCalledWith(
      4,
      new DateComponents({ day: 1, month: 13 })
    );
    expect(onChangeValue).toHaveBeenNthCalledWith(
      5,
      new DateComponents({ day: 1, month: 12 })
    );
  }
);

it('can edit date component using keyboard up and down arrows', async () => {
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

  const user = userEvent.setup();
  const testOfDateComponentValueChange = async (
    dateComponent: DateComponent,
    numberOfKeyDowns: number,
    arrow: '{arrowup}' | '{arrowdown}'
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
      dateComponent
    );

    await user.tab();
    expect(inputEl).toHaveFocus();

    for (let i = 0; i < numberOfKeyDowns; i += 1) {
      await user.type(inputEl, arrow, { skipClick: true });
    }
    expect(onChangeValue).toHaveBeenCalledTimes(numberOfKeyDowns);
    expect(onChangeValue).toHaveBeenLastCalledWith(newDateComponents);
  };

  await testOfDateComponentValueChange('day', 2, '{arrowup}');
  await testOfDateComponentValueChange('month', 3, '{arrowdown}');
  await testOfDateComponentValueChange('year', 1, '{arrowup}');
  await testOfDateComponentValueChange('hour', 2, '{arrowup}');
  await testOfDateComponentValueChange('minute', 2, '{arrowdown}');

  resetDateMock();
});

it(
  'should not out range of date component values ' +
  'when edit using keyboard arrows',
  async () => {
    const user = userEvent.setup();
    const onChangeValue = jest.fn();
    render(
      <DatetimeInput
        value={new DateComponents({ day: 1, month: 12 })}
        onChangeValue={onChangeValue}
      />
    );

    await user.type(screen.getByLabelText('day'), '{arrowdown}');
    await user.type(screen.getByLabelText('month'), '{arrowup}');

    expect(onChangeValue).toHaveBeenCalledTimes(2);
    expect(onChangeValue).toHaveBeenNthCalledWith(
      1,
      new DateComponents({ day: 31, month: 12 })
    );
    expect(onChangeValue).toHaveBeenNthCalledWith(
      2,
      new DateComponents({ day: 1, month: 1 })
    );
  }
);

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
