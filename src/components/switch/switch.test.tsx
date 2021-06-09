import { render, fireEvent } from '@testing-library/react';
import { Switch } from './switch';

it('renders without errors', () => {
  const title = 'Enable Location Services';
  const { getByTitle } = render(<Switch title={title} />);

  getByTitle(title);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    'data-testid': 'switch',
    name: 'locationServices',
    value: 'enabled',
  } as const;
  const { getByTestId } = render(<Switch {...attrs} />);
  const inputEl = getByTestId(attrs['data-testid']);

  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with label and description', () => {
  const label = 'Enable Location Services';
  const description = 'Allow selected apps to determine your location.';
  const { getByText } = render(
    <Switch label={label} description={description} />
  );

  getByText(label);
  getByText(description);
});

it('should check when click on label', () => {
  const label = 'Enable Location Services';
  const onChange = jest.fn();
  const { getByText } = render(<Switch label={label} onChange={onChange} />);

  fireEvent.click(getByText(label));

  expect(onChange).toHaveBeenCalledTimes(1);
});
