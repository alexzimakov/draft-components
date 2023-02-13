import { render, screen } from '@testing-library/react';
import { Avatar } from '../avatar';
import { AvatarGroup } from './avatar-group';

it('renders without errors', () => {
  const urls = [
    'avatar-1.png',
    'avatar-2.png',
    'avatar-3.png',
  ];
  render(
    <AvatarGroup>
      {urls.map((url) => <Avatar key={url} src={url} />)}
    </AvatarGroup>,
  );

  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(urls.length);
  expect(images[0]).toHaveAttribute('src', urls[0]);
  expect(images[1]).toHaveAttribute('src', urls[1]);
  expect(images[2]).toHaveAttribute('src', urls[2]);
});
