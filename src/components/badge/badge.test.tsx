import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Badge } from './badge';

it('renders without errors', () => {
  const badgeText = 'Badge';
  const { getByText } = render(<Badge>{badgeText}</Badge>);
  getByText(badgeText);
});

it('should invoke `onRemove` callback when clicking on the remove button', () => {
  const onRemove = jest.fn();
  const { getByTestId } = render(
    <Badge isRemovable={true} onRemove={onRemove}>
      Badge
    </Badge>
  );

  fireEvent.click(getByTestId('badge-remove-btn'));

  expect(onRemove).toHaveBeenCalled();
});
