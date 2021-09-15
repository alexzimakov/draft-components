import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';

it('renders without errors', () => {
  const placeholder = 'Write a few sentences about yourself';
  const { getByPlaceholderText } = render(
    <Textarea placeholder={placeholder} />
  );

  getByPlaceholderText(placeholder);
});

it('should forward extra props underlying <textarea />', () => {
  const attrs = {
    placeholder: 'Write a few sentences about yourself',
    name: 'bio',
    spellCheck: false,
  };
  const { getByPlaceholderText } = render(<Textarea {...attrs} />);
  const textareaEl = getByPlaceholderText(attrs.placeholder);

  expect(textareaEl).toHaveAttribute('name', attrs.name);
  expect(textareaEl).toHaveAttribute('spellcheck', 'false');
});

it('invokes `onChange` event handler', () => {
  const onChange = jest.fn();
  render(<Textarea onChange={onChange} />);

  userEvent.paste(screen.getByRole('textbox'), 'lorem');

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onChangeValue` with changed value', () => {
  const onChangeValue = jest.fn();
  const expectedValue = 'lorem';
  render(<Textarea onChangeValue={onChangeValue} />);

  userEvent.paste(screen.getByRole('textbox'), expectedValue);

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, expectedValue);
});
