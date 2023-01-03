import { render, screen, within } from '@testing-library/react';
import { FilterButtons } from './filter-buttons';
import { FilterButton } from './filter-button';

it('renders without errors', () => {
  render(
    <FilterButtons>
      <FilterButton>All tags</FilterButton>
      <FilterButton isActive={true}>#health</FilterButton>
      <FilterButton>#travel</FilterButton>
      <FilterButton>#shopping</FilterButton>
    </FilterButtons>
  );

  const container = screen.getByRole('group');
  const buttons = within(container).getAllByRole('button');
  expect(buttons).toHaveLength(4);
  expect(buttons[0]).toHaveTextContent('All tags');
  expect(buttons[1]).toHaveTextContent('#health');
  expect(buttons[1]).toHaveAttribute('data-active', 'true');
  expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
  expect(buttons[2]).toHaveTextContent('#travel');
  expect(buttons[3]).toHaveTextContent('#shopping');
});
