import { ComponentPropsWithoutRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { Button, ButtonRenderFn } from './button';
import { IconButton } from './icon-button';
import userEvent from '@testing-library/user-event';

it('renders without errors', () => {
  const label = 'Button text';
  render(<Button>{label}</Button>);

  expect(screen.getByRole('button')).toHaveTextContent(label);
});

it('renders with left icon', () => {
  const iconTestId = 'leading-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<Button leftIcon={icon}>With icon</Button>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with right icon', () => {
  const iconTestId = 'leading-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<Button rightIcon={icon}>With icon</Button>);

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
  const renderAs: ButtonRenderFn = ({ className, children }) => (
    <a className={className} href={url}>{children}</a>
  );
  render(<Button renderAs={renderAs}>{label}</Button>);

  const linkEl = screen.getByRole('link');
  expect(linkEl).toHaveTextContent(label);
  expect(linkEl).toHaveAttribute('href', url);
});

it('should show loader indicator and make button inactive', () => {
  const user = userEvent.setup();
  const onClickMock = jest.fn();

  render(<Button loading={true} onClick={onClickMock}>Loading...</Button>);
  const button = screen.getByRole('button');

  within(button).getByTestId('button-spinner');
  user.click(button);
  expect(onClickMock).not.toBeCalled();
});

it('<IconButton /> renders without errors', () => {
  const iconTestId = 'x-mark-icon';
  const icon = <MoonIcon data-testid={iconTestId} />;
  render(<IconButton icon={icon} />);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

function MoonIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return <svg
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
  </svg>;
}
