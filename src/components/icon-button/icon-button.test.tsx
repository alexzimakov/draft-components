import * as React from 'react';
import { render, within, screen } from '@testing-library/react';
import { SvgIcon } from '../svg-icon';
import { IconButton } from './icon-button';

it('renders with close icon', () => {
  render(<IconButton icon="delete" />);

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId('icon-button-delete');
});

it('renders with minus icon', () => {
  render(<IconButton icon="minus" />);

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId('icon-button-minus');
});

it('renders with custom icon', () => {
  const iconTestId = 'custom-icon';
  render(
    <IconButton icon={<SvgIcon icon="info" data-testid={iconTestId} />} />
  );

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId(iconTestId);
});
