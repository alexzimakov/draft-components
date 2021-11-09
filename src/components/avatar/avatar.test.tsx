import { render, screen, within } from '@testing-library/react';
import { Avatar } from './avatar';

describe('<Avatar />', () => {
  const src = 'http://images.test/1.png';
  const alt = 'Avatar test';
  const initials = 'AT';

  it('renders without errors', () => {
    render(<Avatar src={src} initials={initials} alt={alt} />);
    render(<Avatar src={src} initials={initials} alt={alt} />);
    render(<Avatar src={src} />);
    render(<Avatar initials={initials} />);
    render(<Avatar square={true} />);
    render(<Avatar size="sm" />);
    render(<Avatar size={40} />);
  });

  it('renders with necessary aria attributes', () => {
    render(<Avatar src={src} alt={alt} />);

    expect(screen.getByRole('img')).toHaveAttribute('aria-label', alt);
  });

  it('renders with icon', () => {
    const iconTestId = 'circle-icon';
    const iconElement = (
      <svg
        data-testid={iconTestId}
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="10" />
      </svg>
    );

    render(
      <Avatar src={src} alt={alt} initials={initials} icon={iconElement} />,
    );

    screen.getByTestId(iconTestId);
  });
});

describe('<Avatar.Group />', () => {
  const src1 = 'http://images.test/1.png';
  const src2 = 'http://images.test/2.png';
  const alt = 'Avatar Group test';
  const items = [
    { src: src1, initials: 'I1' },
    { src: src2 },
    { initials: 'I3' },
    { src: undefined },
  ];

  it('renders without errors', () => {
    render(<Avatar.Group items={items} />);

    const avatarGroup = screen.getByRole('img');
    const groupItems = within(avatarGroup).getAllByTestId('avatar-group-item');

    expect(groupItems).toHaveLength(items.length);
  });

  it('renders with necessary aria attributes', () => {
    render(<Avatar.Group items={items} alt={alt} />);

    expect(screen.getByRole('img')).toHaveAttribute('aria-label', alt);
  });
});

describe('#makeInitials()', () => {
  it('should return an empty string when passed an empty string', () => {
    expect(Avatar.makeInitials('')).toBe('');
  });

  it('should return an empty string when passed a string that contains only whitespace characters', () => {
    expect(Avatar.makeInitials(' \n \t')).toBe('');
  });

  it('should return a first capitalized letter when passing one word', () => {
    expect(Avatar.makeInitials('john')).toBe('J');
  });

  it('should return the first capitalized letter of 2 start words when passed a string with 2 or more words', () => {
    expect(Avatar.makeInitials('john doe')).toBe('JD');
    expect(Avatar.makeInitials('john walker doe')).toBe('JW');
  });

  it('should ignore multiple spaces', () => {
    expect(Avatar.makeInitials('John   Doe')).toBe('JD');
  });

  it('should ignore the start and end spaces', () => {
    expect(Avatar.makeInitials('  John Doe ')).toBe('JD');
  });
});
