import { fireEvent, render } from '@testing-library/react';
import { Checkbox } from './checkbox';

it('renders without errors', () => {
  const title = 'Enable Location Services';
  const { getByTitle } = render(<Checkbox title={title} />);

  getByTitle(title);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    'data-testid': 'checkbox',
    name: 'locationServices',
    value: 'enabled',
  } as const;
  const { getByTestId } = render(<Checkbox {...attrs} />);
  const inputEl = getByTestId(attrs['data-testid']);

  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with label and description', () => {
  const label = 'Enable Location Services';
  const description = 'Allow selected apps to determine your location.';
  const { getByText } = render(
    <Checkbox label={label} description={description} />
  );

  getByText(label);
  getByText(description);
});

it('should check when click on label', () => {
  const label = 'Enable Location Services';
  const onChange = jest.fn();
  const { getByText } = render(<Checkbox label={label} onChange={onChange} />);

  fireEvent.click(getByText(label));

  expect(onChange).toHaveBeenCalledTimes(1);
});
