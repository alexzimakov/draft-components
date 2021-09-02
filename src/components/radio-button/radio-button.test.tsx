import { fireEvent, render } from '@testing-library/react';
import { RadioButton } from './radio-button';

it('renders without errors', () => {
  const title = 'Private access';
  const { getByTitle } = render(<RadioButton title={title} />);

  getByTitle(title);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    'data-testid': 'radio-button',
    name: 'accessMode',
    value: 'private',
  } as const;
  const { getByTestId } = render(<RadioButton {...attrs} />);
  const inputEl = getByTestId(attrs['data-testid']);

  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with label and description', () => {
  const label = 'Private access';
  const description = 'The repository would be available to anyone';
  const { getByText } = render(
    <RadioButton label={label} description={description} />
  );

  getByText(label);
  getByText(description);
});

it('should check when click on label', () => {
  const label = 'Enable Location Services';
  const onChange = jest.fn();
  const { getByText } = render(
    <RadioButton label={label} onChange={onChange} />
  );

  fireEvent.click(getByText(label));

  expect(onChange).toHaveBeenCalledTimes(1);
});
