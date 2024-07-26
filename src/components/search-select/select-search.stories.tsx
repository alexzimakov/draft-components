import { Meta, StoryFn } from '@storybook/react';
import { SearchSelect } from './search-select.js';
import { ReactNode, useState } from 'react';

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

const meta: Meta<typeof SearchSelect<Fruit>> = {
  title: 'Forms/SearchSelect',
  component: SearchSelect,
  args: {
    value: fruits[0],
    size: 'md',
    fullWidth: false,
    invalid: false,
    loading: false,
    disabled: false,
    displayedValue: getFruitName,
    textboxPlaceholder: 'Search...',
  },
};
export default meta;

export const Basic: StoryFn<typeof SearchSelect<Fruit>> = (args) => {
  const [value, setValue] = useState(args.value);
  const handleChange = (value: Fruit) => {
    setValue(value);
    args.onChange?.(value);
  };

  return (
    <SearchSelect
      {...args}
      value={value}
      onChange={handleChange}
    >
      {({ searchQuery }) => fruits
        .filter(filterByName(searchQuery))
        .map((fruit) => (
          <SearchSelect.Option key={fruit.id} value={fruit}>
            {getFruitName(fruit)}
          </SearchSelect.Option>
        ))}
    </SearchSelect>
  );
};
Basic.args = {};

export const Loading = Basic.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = Basic.bind({});
Invalid.args = {
  invalid: true,
};

export const FullWidth = Basic.bind({});
FullWidth.storyName = 'Full width';
FullWidth.args = {
  fullWidth: true,
};

export const WithSeparator: StoryFn<typeof SearchSelect<Fruit>> = (args) => {
  const [value, setValue] = useState(args.value);
  const handleChange = (value: Fruit) => {
    setValue(value);
    args.onChange?.(value);
  };

  const berries = [
    fruits[2],
    fruits[4],
    fruits[8],
  ];

  return (
    <SearchSelect
      {...args}
      value={value}
      onChange={handleChange}
    >
      {({ searchQuery }) => {
        const otherOptions: ReactNode[] = [];
        const berryOptions: ReactNode[] = [];
        fruits
          .filter(filterByName(searchQuery))
          .forEach((fruit) => {
            const option = (
              <SearchSelect.Option key={fruit.id} value={fruit}>
                {getFruitName(fruit)}
              </SearchSelect.Option>
            );
            if (berries.includes(fruit)) {
              berryOptions.push(option);
            } else {
              otherOptions.push(option);
            }
          });
        return (
          <>
            {otherOptions}
            <SearchSelect.Separator>Berries</SearchSelect.Separator>
            {berryOptions}
          </>
        );
      }}
    </SearchSelect>
  );
};
WithSeparator.storyName = 'With separator';
WithSeparator.args = {};

function getFruitName(fruit: Fruit) {
  return fruit.name;
}

function filterByName(searchQuery: string) {
  searchQuery = searchQuery.toLowerCase();
  return (fruit: Fruit) => fruit.name.toLowerCase().includes(searchQuery);
}
