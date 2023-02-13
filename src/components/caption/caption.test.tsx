import { render, screen } from '@testing-library/react';
import { Caption, type CaptionAppearance } from './caption';

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

describe('renders with different icons', () => {
  const appearances: CaptionAppearance[] = [
    'default',
    'info',
    'success',
    'error',
    'warning',
  ];
  appearances.forEach((appearance) => {
    it(`'${appearance}' appearance`, () => {
      const text = 'You can use letters, numbers & periods';
      render(
        <Caption showIcon={true} appearance={appearance}>
          {text}
        </Caption>,
      );
      screen.getByText(text);
      screen.getByTestId('caption-icon');
    });
  });
});
