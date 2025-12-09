import { expect, it, vi } from 'vitest';
import { TokenInput } from './token-input.js';
import { render, screen, userEvent } from '../../test/test-utils.js';

it('renders without errors', () => {
  const placeholder = 'Enter tags...';
  const tokens = ['test', 'example'];
  const onChange = vi.fn();
  render(
    <TokenInput
      placeholder={placeholder}
      tokens={tokens}
      onChange={onChange}
    />,
  );

  screen.getByPlaceholderText(placeholder);
  screen.getByText(tokens[0]);
  screen.getByText(tokens[1]);
});

it('invokes onChange callback with new token', async () => {
  const placeholder = 'Enter tags...';
  const tokens = ['test', 'example'];
  const newToken = 'new';
  const onChange = vi.fn();
  render(
    <TokenInput
      placeholder={placeholder}
      tokens={tokens}
      onChange={onChange}
    />,
  );

  const input = screen.getByPlaceholderText(placeholder);
  await userEvent.type(input, newToken);
  await userEvent.type(input, '{Enter}');
  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith([...tokens, newToken]);
});

it('invokes onChange callback without deleted token', async () => {
  const placeholder = 'Enter tags...';
  const tokens = ['test', 'example'];
  const onChange = vi.fn();
  const getRemoveButtonAriaLabel = (token: string) => `Remove ${token}`;
  render(
    <TokenInput
      placeholder={placeholder}
      tokens={tokens}
      onChange={onChange}
      getRemoveButtonAriaLabel={getRemoveButtonAriaLabel}
    />,
  );

  await userEvent.click(screen.getByLabelText(getRemoveButtonAriaLabel(tokens[0])));
  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith(tokens.slice(1));
});
