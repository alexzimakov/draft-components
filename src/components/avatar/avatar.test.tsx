import * as React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from './avatar';

it('renders without errors', () => {
  const title = 'John Doe profile image';
  const { getByTitle } = render(
    <Avatar title={title} src="http://test.local/avatar.png" />
  );

  getByTitle(title);
});

it('should render the image when `src` prop is provided', () => {
  const altText = 'John Doe profile image';
  const { getByAltText } = render(
    <Avatar
      src="http://test.local/avatar.png"
      altText={altText}
      initials="JD"
    />
  );

  getByAltText(altText);
});

it("should render the initials when `src` prop isn't provided", () => {
  const initials = 'JD';
  const { getByText } = render(<Avatar initials="JD" />);

  getByText(initials);
});

it("should render the placeholder when `src` prop isn't provided", () => {
  const altText = 'John Doe profile image';
  const { getByTestId } = render(<Avatar altText={altText} />);

  getByTestId('avatar-placeholder');
});
