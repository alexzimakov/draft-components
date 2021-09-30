import { render, screen } from '@testing-library/react';
import { SearchInput } from './search-input';

it('renders without errors', () => {
  const placeholder = 'Search';
  render(<SearchInput placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});
