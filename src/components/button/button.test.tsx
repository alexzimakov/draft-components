import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('<Button /> component', () => {
  const label = 'Button text';
  const createIcon = (testId: string) => (
    <svg
      data-testid={testId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
    >
      <circle cx={12} cy={12} r={20} />
    </svg>
  );

  it('renders correctly', () => {
    const testId = 'button';
    const { getByTestId } = render(
      <Button data-testid={testId}>{label}</Button>
    );

    expect(getByTestId(testId)).toHaveTextContent(label);
  });

  it('should show loader indicator', () => {
    const spinnerTestId = 'dc-spinner';
    const { queryByTestId, rerender } = render(<Button>{label}</Button>);

    expect(queryByTestId(spinnerTestId)).toBeNull();

    rerender(<Button isLoading={true}>{label}</Button>);

    expect(queryByTestId(spinnerTestId)).not.toBeNull();
  });

  it('renders with the leading icon', () => {
    const iconTestId = 'leading-icon';
    const { queryByTestId } = render(
      <Button leadingIcon={createIcon(iconTestId)}>{label}</Button>
    );

    expect(queryByTestId(iconTestId)).not.toBeNull();
  });

  it('renders with the trailing icon', () => {
    const iconTestId = 'trailing-icon';
    const { queryByTestId } = render(
      <Button trailingIcon={createIcon(iconTestId)}>{label}</Button>
    );

    expect(queryByTestId(iconTestId)).not.toBeNull();
  });
});
