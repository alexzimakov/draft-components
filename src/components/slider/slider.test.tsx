import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from './slider';

it('renders without errors', () => {
  render(<Slider value={50} onChangeValue={jest.fn()} />);
  screen.getByRole('slider');
});

it('renders without errors with tick marks', () => {
  render(<Slider value={50} onChangeValue={jest.fn()} numberOfTickMarks={5} />);
  screen.getByRole('slider');
});

it('renders tick mark lables', () => {
  const tickLabel1 = 'Small';
  const tickLabel2 = 'Large';
  render(
    <Slider
      value={50}
      onChangeValue={jest.fn()}
      numberOfTickMarks={2}
      renderTickMarkLabel={(index) => {
        if (index === 0) {
          return tickLabel1;
        } else if (index === 1) {
          return tickLabel2;
        }
      }}
    />
  );
  screen.getByRole('slider');
  screen.getByText(tickLabel1);
  screen.getByText(tickLabel2);
});

it('invokes `onChangeValue` when value changes', () => {
  const onChangeValue = jest.fn();
  render(<Slider value={50} onChangeValue={onChangeValue} />);

  fireEvent.change(screen.getByRole('slider'), { target: { value: '51' } });

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, 51);
});
