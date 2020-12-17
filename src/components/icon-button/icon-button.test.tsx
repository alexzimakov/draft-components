import * as React from 'react';
import { render } from '@testing-library/react';
import { IconButton } from './icon-button';

it('renders with close icon', () => {
  const { getByTestId } = render(<IconButton icon="close" />);
  getByTestId('dc-close-icon');
});

it('renders with minus icon', () => {
  const { getByTestId } = render(<IconButton icon="minus" />);
  getByTestId('dc-minus-icon');
});

it('renders with custom icon', () => {
  const testId = 'custom-icon';
  const { getByTestId } = render(
    <IconButton
      icon={
        <svg
          data-testid={testId}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="1em"
          height="1em"
        >
          <circle cx={12} cy={12} r={20} />
        </svg>
      }
    />
  );
  getByTestId(testId);
});
