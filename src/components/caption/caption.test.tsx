import { Caption } from './caption';
import { expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';

it('renders without errors', () => {
  const text = 'You can use letters, numbers & periods';
  render(<Caption>{text}</Caption>);
  screen.getByText(text);
});

it('should forward extra props', () => {
  const text = 'You can use letters, numbers & periods';
  const attrs = {
    'dir': 'ltr',
    'spellCheck': false,
    'data-name': 'caption',
  };
  render(<Caption {...attrs}>{text}</Caption>);

  const captionEl = screen.getByText(text);
  expect(captionEl).toHaveAttribute('dir', attrs.dir);
  expect(captionEl).toHaveAttribute('spellcheck', String(attrs.spellCheck));
  expect(captionEl).toHaveAttribute('data-name', attrs['data-name']);
});

it('renders with icon', () => {
  const text = 'You can use letters, numbers & periods';
  const icon = <svg role="img" />;
  render(<Caption icon={icon}>{text}</Caption>);
  screen.getByRole('img');
});
