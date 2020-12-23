import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Button } from './button';

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
  const [iconTestId, icon] = getIcon('leading-icon');
  render(<Button leadingIcon={icon}>Button text</Button>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

it('renders with the trailing icon', () => {
  const [iconTestId, icon] = getIcon('trailing-icon');
  render(<Button trailingIcon={icon}>Button text</Button>);

  within(screen.getByRole('button')).getByTestId(iconTestId);
});

function getIcon(testId: string): [typeof testId, React.ReactElement] {
  return [
    testId,
    <svg
      data-testid={testId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
    >
      <circle cx={12} cy={12} r={20} />
    </svg>,
  ];
}
