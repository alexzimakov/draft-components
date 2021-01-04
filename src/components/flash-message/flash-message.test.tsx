import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FlashMessage } from './flash-message';

it('renders without error', () => {
  const message =
    'Your app is out of date. Please update to get the latest version.';
  render(<FlashMessage>{message}</FlashMessage>);

  screen.getByText(
    'Your app is out of date. Please update to get the latest version.'
  );
});

it('should invoke `onActionButtonClick` when clicking on an action button', () => {
  const message =
    'Your app is out of date. Please update to get the latest version.';
  const actionButtonLabel = 'Update';
  const onActionButtonClick = jest.fn();
  render(
    <FlashMessage
      actionButtonLabel={actionButtonLabel}
      onActionButtonClick={onActionButtonClick}
    >
      {message}
    </FlashMessage>
  );

  const actionButtonEl = screen.getByRole('button');
  fireEvent.click(actionButtonEl);

  expect(actionButtonEl).toHaveTextContent(actionButtonLabel);
  expect(onActionButtonClick).toHaveBeenCalledTimes(1);
});
