import { expect, it } from 'vitest';
import { Avatar } from './avatar.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without error', () => {
  const src = 'avatar-test.png';
  const alt = 'portrait photography of man';

  render(<Avatar src={src} altText={alt} />);

  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', src);
  expect(image).toHaveAttribute('alt', alt);
  expect(image).toHaveAttribute('width', expect.stringMatching(/^\d+$/));
  expect(image).toHaveAttribute('height', expect.stringMatching(/^\d+$/));
});

it('renders with initials', () => {
  const alt = 'John Doe';
  const initials = 'JD';

  render(<Avatar altText={alt} initials={initials} />);
  screen.getByText(initials);
  screen.getByLabelText(alt);
  expect(screen.getByText(initials)).toBe(screen.getByLabelText(alt));
  expect(screen.queryByRole('img')).toBeNull();
});
