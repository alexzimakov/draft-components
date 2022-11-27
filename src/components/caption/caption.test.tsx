import { render, screen } from '@testing-library/react';
import { Caption } from './caption';

it('renders without errors', () => {
  const text = 'You can use letters, numbers & periods';
  render(<Caption>{text}</Caption>);
  screen.getByText(text);
});

it('renders with icon', () => {
  const text = 'You can use letters, numbers & periods';
  render(<Caption showIcon={true}>{text}</Caption>);
  screen.getByText(text);
  screen.getByTestId('caption-icon');
});
