import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

it('should renders correctly', () => {
  const { getByTestId } = render(
    <Button data-testid="button">Button Text</Button>
  );
  const buttonEl = getByTestId('button');

  expect(buttonEl).toHaveTextContent('Button Text');
});

it('should call `onClick` event handler', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(
    <Button data-testid="button" onClick={onClick}>
      Button Text
    </Button>
  );
  const buttonEl = getByTestId('button');

  userEvent.click(buttonEl);

  expect(onClick).toHaveBeenCalledTimes(1);
});
