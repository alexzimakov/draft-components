import { expect, it, vi } from 'vitest';
import { SegmentedControl } from './segmented-control.js';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'topRated', label: 'Top-Rated' },
  ];
  const selectedOption = options[0];
  render(<SegmentedControl
    options={options}
    value={selectedOption.value}
    onChangeValue={vi.fn()}
  />);

  const segmentedButtons = screen.getAllByRole('button');
  expect(segmentedButtons).toHaveLength(options.length);

  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];
    const segmentedButton = segmentedButtons[i];
    expect(segmentedButton).toHaveTextContent(option.label);
  }

  expect(screen.getByText(selectedOption.label)).toHaveAttribute('aria-current', 'true');
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

  const segmentedButtons = screen.getAllByRole('button');
  expect(segmentedButtons).toHaveLength(options.length);

  for (const segmentedButton of segmentedButtons) {
    within(segmentedButton).getByRole('img');
  }
});

it('can select a segment using the mouse', async () => {
  const user = userEvent.setup();
  const options = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'topRated', label: 'Top-Rated' },
  ];
  const selectedOption = options[0];
  const onChangeValueMock = vi.fn();
  render(<SegmentedControl
    options={options}
    value={selectedOption.value}
    onChangeValue={onChangeValueMock}
  />);

  await user.click(screen.getByText(selectedOption.label));
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
  const selectedOption = options[0];
  const onChangeValueMock = vi.fn();
  render(
    <SegmentedControl
      value={selectedOption.value}
      options={options}
      onChangeValue={onChangeValueMock}
    />,
  );

  await user.tab();
  await user.tab();
  await user.tab();
  await user.keyboard('{Enter}');

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, options[2].value);
});
