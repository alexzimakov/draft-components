import { type Meta, type StoryFn } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { SearchSelect } from './search-select.js';

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
    readOnly: false,
    displayedValue: renderSelectedFruit,
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

export const OptionsWithCaption: StoryFn<typeof SearchSelect<Fruit>> = (args) => {
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
          <SearchSelect.Option
            key={fruit.id}
            value={fruit}
            caption={`${fruit.calories} Calories`}
          >
            {getFruitName(fruit)}
          </SearchSelect.Option>
        ))}
    </SearchSelect>
  );
};
OptionsWithCaption.storyName = 'Options with caption';
OptionsWithCaption.args = {};

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

function renderSelectedFruit(fruit: Fruit) {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>

  );
  return (
    <SearchSelect.ButtonLabel icon={icon} value={getFruitName(fruit)}>
      Favorite fruit
    </SearchSelect.ButtonLabel>
  );
}
