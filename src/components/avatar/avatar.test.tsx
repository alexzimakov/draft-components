import { it } from 'vitest';
import { Avatar } from './avatar.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without error', () => {
  const src = 'avatar-test.png';
  const alt = 'portrait photography of man';

  render(<Avatar src={src} altText={alt} />);

  screen.getByRole('img');
  screen.getByLabelText(alt);
});

it('renders with initials', () => {
  const alt = 'John Doe';
  const initials = 'JD';

  render(<Avatar altText={alt} monogram={initials} />);
  screen.getByRole('img');
  screen.getByLabelText(alt);
  screen.getByText(initials);
});
