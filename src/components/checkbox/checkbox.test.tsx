import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './checkbox';

it('renders without errors', () => {
  const title = 'Enable Location Services';
  render(<Checkbox title={title} />);

  screen.getByTitle(title);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    'data-testid': 'checkbox',
    name: 'locationServices',
    value: 'enabled',
  } as const;
  render(<Checkbox {...attrs} />);
  const inputEl = screen.getByTestId(attrs['data-testid']);

  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with label and description', () => {
  const label = 'Enable Location Services';
  const description = 'Allow selected apps to determine your location.';
  render(<Checkbox label={label} description={description} />);

  screen.getByText(label);
  screen.getByText(description);
});

it('should check when click on label', async () => {
  const user = userEvent.setup();
  const label = 'Enable Location Services';
  const onChange = jest.fn();
  render(<Checkbox label={label} onChange={onChange} />);

  await user.click(screen.getByText(label));

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onCheck` callback', async () => {
  const user = userEvent.setup();
  const label = 'Enable Location Services';
  const onCheck = jest.fn();
  render(<Checkbox label={label} onCheck={onCheck} />);

  await user.click(screen.getByText(label));

  expect(onCheck).toHaveBeenCalledTimes(1);
  expect(onCheck).toHaveBeenNthCalledWith(1, true);
});
