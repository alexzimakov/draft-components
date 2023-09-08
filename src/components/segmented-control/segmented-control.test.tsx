import { expect, it, vi } from 'vitest';
import { SegmentedControl } from './segmented-control.js';
import { useState } from 'react';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'topRated', label: 'Top-Rated' },
  ];
  const checkedOption = options[0];
  render(<SegmentedControl
    options={options}
    value={checkedOption.value}
    onChangeValue={vi.fn()}
  />);

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons).toHaveLength(options.length);

  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];
    const radioButton = radioButtons[i];
    expect(radioButton).toHaveTextContent(option.label);
  }

  expect(screen.getByText(checkedOption.label)).toBeChecked();
});

it('renders with icons', () => {
  const options = [
    {
      value: 'popular',
      label: 'Popular',
      icon: <svg role="img" />,
    },
    {
      value: 'newest',
      label: 'Newest',
      icon: <svg role="img" />,
    },
  ];
  render(<SegmentedControl
    options={options}
    value={options[0].value}
    onChangeValue={vi.fn()}
  />);

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons).toHaveLength(options.length);

  for (const radioButton of radioButtons) {
    within(radioButton).getByRole('img');
  }
});

it('can select a segment using the mouse', async () => {
  const user = userEvent.setup();
  const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'topRated', label: 'Top-Rated' },
  ];
  const checkedOption = options[0];
  const onChangeValueMock = vi.fn();
  render(<SegmentedControl
    options={options}
    value={checkedOption.value}
    onChangeValue={onChangeValueMock}
  />);

  await user.click(screen.getByText(checkedOption.label));
  await user.click(screen.getByText(options[1].label));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith(options[1].value);
});

it('can select a segment using the keyboard', async () => {
  const user = userEvent.setup();
  const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'topRated', label: 'Top-Rated' },
  ];
  const checkedOption = options[1];
  const onChangeValueMock = vi.fn();
  const SegmentedControlTest = () => {
    const [value, setValue] = useState(checkedOption.value);
    return (
      <SegmentedControl
        value={value}
        options={options}
        onChangeValue={(value) => {
          setValue(value);
          onChangeValueMock(value);
        }}
      />
    );
  };
  render(<SegmentedControlTest />);

  await user.tab();
  await user.keyboard('{ArrowRight}');
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowLeft}');
  await user.keyboard('{ArrowUp}');
  await user.keyboard('<');
  await user.keyboard('>');

  expect(onChangeValueMock).toHaveBeenCalledTimes(4);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, options[2].value);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(2, options[0].value);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(3, options[2].value);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(4, options[1].value);
});
