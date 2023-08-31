import { Textarea, TextareaCharacterCountRenderer } from './textarea';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const placeholder = 'Add your comment...';
  render(<Textarea placeholder={placeholder} />);
  screen.getByPlaceholderText(placeholder);
});

it('should forward extra props underlying <textarea />', () => {
  const attrs = {
    placeholder: 'Add your comment...',
    name: 'comment',
    spellCheck: false,
  };
  render(<Textarea {...attrs} />);

  const textareaEl = screen.getByPlaceholderText(attrs.placeholder);
  expect(textareaEl).toHaveAttribute('name', attrs.name);
  expect(textareaEl).toHaveAttribute('spellcheck', 'false');
});

it('should render character count', () => {
  render(<Textarea
    showCharacterCount={true}
    maxLength={100}
    value="Test message"
  />);

  screen.getByRole('textbox');
  screen.getByTestId('textarea-character-count');
});

it('should render character count using a custom render function', () => {
  const value = 'Test message';
  const maxLength = 100;
  const getCharacterCountMessage: TextareaCharacterCountRenderer = ({
    maxCharacters,
    characterCount,
  }) => `Characters ${characterCount}/${maxCharacters}`;
  render(<Textarea
    showCharacterCount={true}
    maxLength={maxLength}
    value={value}
    renderCharacterCount={getCharacterCountMessage}
  />);

  screen.getByRole('textbox');
  screen.getByText(getCharacterCountMessage({
    maxCharacters: maxLength,
    characterCount: value.length,
  }) as string);
});

it('should not render character count when `maxLength` is less than 1', () => {
  render(<Textarea
    showCharacterCount={true}
    maxLength={0}
    value="Test message"
  />);

  screen.getByRole('textbox');
  expect(screen.queryByTestId('textarea-character-count')).toBeNull();
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const message = 'Test message';
  const onChangeMock = vi.fn();
  render(<Textarea onChange={onChangeMock} />);

  await user.type(screen.getByRole('textbox'), message);

  expect(onChangeMock).toHaveBeenCalledTimes(message.length);
});

it('invokes `onChangeValue` with changed value', async () => {
  const user = userEvent.setup();
  const message = 'Test message';
  const onChangeValue = vi.fn();
  render(<Textarea onChangeValue={onChangeValue} />);

  await user.type(screen.getByRole('textbox'), message);

  expect(onChangeValue).toHaveBeenCalledTimes(message.length);
  for (let n = 1; n <= message.length; n += 1) {
    const value = message.slice(0, n);
    expect(onChangeValue).toHaveBeenNthCalledWith(n, value);
  }
});
