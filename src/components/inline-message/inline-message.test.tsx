import { render, screen } from '@testing-library/react';
import { InlineMessage } from './inline-message';

it('<InlineMessage /> renders without errors', () => {
  const text = 'You can use letters, numbers & periods';
  render(<InlineMessage>{text}</InlineMessage>);
  screen.getByText(text);
});
