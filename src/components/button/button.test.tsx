import { type ComponentProps } from 'react';
import { expect, it, vi } from 'vitest';
import { Button, type ButtonRenderer } from './button.js';
import { IconButton } from './icon-button.js';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  const label = 'Button text';
  render(<Button>{label}</Button>);

  expect(screen.getByRole('button')).toHaveTextContent(label);
});

it('renders with left icon', () => {
  const iconTestId = 'leading-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<Button iconLeft={icon}>With icon</Button>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with right icon', () => {
  const iconTestId = 'leading-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<Button iconRight={icon}>With icon</Button>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with caption', () => {
  const label = 'Buy';
  const caption = '10 items';
  render(<Button caption={caption}>{label}</Button>);

  const button = screen.getByRole('button');
  within(button).getByText(label);
  within(button).getByText(caption);
});

it('renders using custom render function', () => {
  const url = 'https://example.com';
  const label = 'Render as link';
  const renderAs: ButtonRenderer = ({ className, children }) => (
    <a className={className} href={url}>{children}</a>
  );
  render(<Button renderAs={renderAs}>{label}</Button>);

  const linkEl = screen.getByRole('link');
  expect(linkEl).toHaveTextContent(label);
  expect(linkEl).toHaveAttribute('href', url);
});

it('should show loader indicator and make button inactive', async () => {
  const user = userEvent.setup();
  const onClickMock = vi.fn();

  render(<Button loading={true} onClick={onClickMock}>Loading...</Button>);
  const button = screen.getByRole('button');

  within(button).getByTestId('button-spinner');
  await user.click(button);
  expect(onClickMock).not.toBeCalled();
});

it('<IconButton /> renders without errors', () => {
  const iconTestId = 'x-mark-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<IconButton>{icon}</IconButton>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

function MoonIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="currentColor"
      {...props}
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      />
    </svg>
  );
}
