import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import * as icons from '../svg-icon/icons';

it('renders without errors', () => {
  const label = 'Button text';
  render(<Button>{label}</Button>);

  expect(screen.getByRole('button')).toHaveTextContent(label);
});

it('renders in custom wrapper', () => {
  const url = 'https://example.com';
  const label = 'Link Button';
  render(
    <Button renderAs={(props) => <a {...props} href={url} />}>{label}</Button>
  );

  const linkEl = screen.getByRole('link');
  expect(linkEl).toHaveTextContent(label);
  expect(linkEl).toHaveAttribute('href', url);
});

it('should show loader indicator and make button inactive', () => {
  render(<Button isLoading={true}>Button text</Button>);

  within(screen.getByRole('button')).getByTestId('dc-button-loader-indicator');
});

it('renders with the leading icon', () => {
  const iconTestId = 'leading-icon';
  render(
    <Button
      leadingIcon={<SvgIcon icon={icons.like} data-testid={iconTestId} />}
    >
      Button text
    </Button>
  );

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with the trailing icon', () => {
  const iconTestId = 'trailing-icon';
  render(
    <Button
      trailingIcon={<SvgIcon icon={icons.like} data-testid={iconTestId} />}
    >
      Button text
    </Button>
  );

  within(screen.getByRole('button')).getByTestId(iconTestId);
});
