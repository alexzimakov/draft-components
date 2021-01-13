import * as React from 'react';
import { render, within, screen } from '@testing-library/react';
import { SvgIcon } from '../svg-icon';
import { infoIcon, deleteIcon, minusIcon } from '../svg-icon/icons';
import { IconButton } from './icon-button';

it('renders with close icon', () => {
  render(<IconButton icon="delete" />);

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId(`svg-icon-${deleteIcon.name}`);
});

it('renders with minus icon', () => {
  render(<IconButton icon="minus" />);

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId(`svg-icon-${minusIcon.name}`);
});

it('renders with custom icon', () => {
  const iconTestId = 'custom-icon';
  render(
    <IconButton icon={<SvgIcon icon={infoIcon} data-testid={iconTestId} />} />
  );

  const buttonEl = screen.getByRole('button');

  within(buttonEl).getByTestId(iconTestId);
});
