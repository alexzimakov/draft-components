import { render, screen, within } from '@testing-library/react';
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { heart } from '../../icons/heart';

it('renders without errors', () => {
  const label = 'Button text';
  render(<Button>{label}</Button>);

  expect(screen.getByRole('button')).toHaveTextContent(label);
});

it('renders in custom wrapper', () => {
  const url = 'https://example.com';
  const label = 'Link Button';
  render(
    <Button
      renderAs={({ children, ...props }) => (
        <a {...props} href={url}>
          {children}
        </a>
      )}
    >
      {label}
    </Button>
  );

  const linkEl = screen.getByRole('link');
  expect(linkEl).toHaveTextContent(label);
  expect(linkEl).toHaveAttribute('href', url);
});

it('should show loader indicator and make button inactive', () => {
  render(<Button isLoading={true}>Button text</Button>);

  within(screen.getByRole('button')).getByTestId('dc-btn-loader-indicator');
});

it('renders with the leading icon', () => {
  const iconTestId = 'leading-icon';
  render(
    <Button leadingIcon={<SvgIcon icon={heart} data-testid={iconTestId} />}>
      Button text
    </Button>
  );

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with the trailing icon', () => {
  const iconTestId = 'trailing-icon';
  render(
    <Button trailingIcon={<SvgIcon icon={heart} data-testid={iconTestId} />}>
      Button text
    </Button>
  );

  within(screen.getByRole('button')).getByTestId(iconTestId);
});
