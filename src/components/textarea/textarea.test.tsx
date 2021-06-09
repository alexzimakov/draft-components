import { render } from '@testing-library/react';
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
