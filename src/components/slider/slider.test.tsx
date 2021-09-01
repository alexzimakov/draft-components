import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from './slider';

it('renders without errors', () => {
  render(<Slider value={50} onChangeValue={jest.fn()} />);
  screen.getByRole('slider');
});

it('renders without errors with tick marks', () => {
  render(<Slider value={50} onChangeValue={jest.fn()} tickMarksCount={5} />);
  screen.getByRole('slider');
});

it('invokes `onChangeValue` when value changes', () => {
  const onChangeValue = jest.fn();
  render(<Slider value={50} onChangeValue={onChangeValue} />);

  fireEvent.change(screen.getByRole('slider'), { target: { value: '51' } });

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, 51);
});
