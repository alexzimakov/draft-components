import { render, screen } from '@testing-library/react';
import { SearchField } from './search-field';

it('renders without errors', () => {
  const placeholder = 'Search';
  render(<SearchField placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});
