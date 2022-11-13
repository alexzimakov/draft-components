import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { RadioButton } from './radio-button';

it('renders without errors', () => {
  const title = 'Private access';
  render(<RadioButton title={title} />);

  screen.getByTitle(title);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    'data-testid': 'radio-button',
    name: 'accessMode',
    value: 'private',
  } as const;
  render(<RadioButton {...attrs} />);
  const inputEl = screen.getByTestId(attrs['data-testid']);

  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with label and description', () => {
  const label = 'Private access';
  const description = 'The repository would be available to anyone';
  render(<RadioButton label={label} description={description} />);

  screen.getByText(label);
  screen.getByText(description);
});

it('should check when click on label', async () => {
  const user = userEvent.setup();
  const label = 'Enable Location Services';
  const onChange = jest.fn();
  render(<RadioButton label={label} onChange={onChange} />);

  await user.click(screen.getByText(label));

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onCheck` callback', async () => {
  const user = userEvent.setup();
  const label = 'Enable Location Services';
  const onCheck = jest.fn();
  render(<RadioButton label={label} onCheck={onCheck} />);

  await user.click(screen.getByText(label));

  expect(onCheck).toHaveBeenCalledTimes(1);
  expect(onCheck).toHaveBeenNthCalledWith(1, true);
});
