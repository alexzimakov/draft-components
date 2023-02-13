import { render, screen } from '@testing-library/react';
import { SelectionControl } from './selection-control';

it('renders without errors', () => {
  const id = 'test';
  const label = 'Enable location services';
  const caption = 'Allow selected apps to determine your location';
  render(
    <SelectionControl labelFor={id} label={label} caption={caption}>
      <input id={id} type="checkbox" />
    </SelectionControl>,
  );

  screen.getByRole('checkbox');
  screen.getByText(label);
  screen.getByText(caption);
  expect(screen.getByRole('checkbox')).toBe(screen.getByLabelText(label));
});

it('renders without errors when children property is a function', () => {
  const label = 'Enable location services';
  const caption = 'Allow selected apps to determine your location';
  render(
    <SelectionControl label={label} caption={caption}>
      {({ id }) => <input id={id} type="checkbox" />}
    </SelectionControl>,
  );

  screen.getByText(label);
  screen.getByText(caption);
  expect(screen.getByRole('checkbox')).toBe(screen.getByLabelText(label));
});
