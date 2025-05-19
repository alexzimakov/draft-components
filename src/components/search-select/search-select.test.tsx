import { it, vi } from 'vitest';
import { render, screen } from '../../test/test-utils.js';
import { SearchSelect } from './search-select.js';

it('renders without errors', () => {
  type Fruit = {
    id: number;
    name: string;
    calories: number;
  };
  const fruits: Fruit[] = [
    { id: 0, name: 'Apple', calories: 52 },
    { id: 1, name: 'Banana', calories: 89 },
    { id: 2, name: 'Blueberry', calories: 57 },
    { id: 3, name: 'Cherry', calories: 50 },
    { id: 4, name: 'Cranberry', calories: 46 },
    { id: 5, name: 'Durian', calories: 147 },
    { id: 6, name: 'Dragon fruit', calories: 60 },
    { id: 7, name: 'Fig', calories: 37 },
    { id: 8, name: 'Grape', calories: 67 },
    { id: 9, name: 'Guava', calories: 68 },
  ];
  render(
    <SearchSelect
      displayedValue={fruits[0].name}
      value={fruits[0]}
      onChange={vi.fn()}
    >
      {() => fruits.map((fruit) => (
        <SearchSelect.Option key={fruit.id} value={fruit}>
          {fruit.name}
        </SearchSelect.Option>
      ))}
    </SearchSelect>,
  );

  screen.getByText(fruits[0].name);
});
