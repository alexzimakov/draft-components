import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from './button';

it('renders without errors', () => {
  const label = 'Button text';
  const { getByText } = render(<Button>{label}</Button>);

  getByText(label);
});

it('should show loader indicator', () => {
  const { getByTestId } = render(<Button isLoading={true}>Button text</Button>);

  getByTestId('dc-button-loader-indicator');
});

it('renders with the leading icon', () => {
  const [iconTestId, icon] = getIcon('leading-icon');
  const { getByTestId } = render(
    <Button leadingIcon={icon}>Button text</Button>
  );

  getByTestId(iconTestId);
});

it('renders with the trailing icon', () => {
  const [iconTestId, icon] = getIcon('trailing-icon');
  const { getByTestId } = render(
    <Button trailingIcon={icon}>Button text</Button>
  );

  getByTestId(iconTestId);
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
