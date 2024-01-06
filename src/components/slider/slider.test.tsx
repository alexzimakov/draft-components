import { expect, it, vi } from 'vitest';
import { Slider } from './slider.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  render(<Slider value={50} onChange={vi.fn()} />);
  screen.getByRole('slider');
});

it('renders without errors with tick marks', () => {
  const tickMarks = [
    { value: 0 },
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];
  render(
    <Slider
      tickMarks={tickMarks}
      value={50}
      onChange={vi.fn()}
    />,
  );

  screen.getByRole('slider');
  expect(screen.getAllByTestId('slider-data-list-option')).toHaveLength(tickMarks.length);
  expect(screen.getAllByRole('listitem')).toHaveLength(tickMarks.length);
});
