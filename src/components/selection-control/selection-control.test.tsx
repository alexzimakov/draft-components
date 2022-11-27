import { render, screen } from '@testing-library/react';
import { SelectionControl } from './selection-control';

it('renders without errors', () => {
  const id = 'test';
  const label = 'Enable location services';
  const caption = 'Allow selected apps to determine your location';
  render(
    <SelectionControl htmlFor={id} label={label} caption={caption}>
      <input id={id} type="checkbox" />
    </SelectionControl>
  );

  screen.getByRole('checkbox');
  expect(screen.getByText(label)).toHaveAttribute('for', id);
  screen.getByText(caption);
});
