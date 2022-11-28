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

it('should forward extra props', () => {
  const text = 'You can use letters, numbers & periods';
  const attrs = {
    dir: 'ltr',
    spellCheck: false,
    'data-name': 'caption',
  };
  render(<Caption {...attrs}>{text}</Caption>);

  const captionEl = screen.getByText(text);
  expect(captionEl).toHaveAttribute('dir', attrs.dir);
  expect(captionEl).toHaveAttribute('spellcheck', String(attrs.spellCheck));
  expect(captionEl).toHaveAttribute('data-name', attrs['data-name']);
});
