import type { Meta, StoryFn } from '@storybook/react';
import { MultiSelect } from './multi-select.js';
import { useState } from 'react';

const meta: Meta<typeof MultiSelect> = {
  title: 'Other/MultiSelect',
  component: MultiSelect,
};
export default meta;

type City = {
  id: number;
  name: string;
  country: string;
};

const cities: City[] = [
  { id: 1, name: 'Washington, D.C.', country: 'United States' },
  { id: 2, name: 'Ottawa', country: 'Canada' },
  { id: 3, name: 'London', country: 'United Kingdom' },
  { id: 4, name: 'Paris', country: 'France' },
  { id: 5, name: 'Berlin', country: 'Germany' },
  { id: 6, name: 'Madrid', country: 'Spain' },
  { id: 7, name: 'Rome', country: 'Italy' },
  { id: 8, name: 'Tokyo', country: 'Japan' },
  { id: 9, name: 'Beijing', country: 'China' },
  { id: 10, name: 'Canberra', country: 'Australia' },
  { id: 11, name: 'Brasília', country: 'Brazil' },
  { id: 12, name: 'Buenos Aires', country: 'Argentina' },
  { id: 13, name: 'Cairo', country: 'Egypt' },
  { id: 14, name: 'New Delhi', country: 'India' },
  { id: 15, name: 'Seoul', country: 'South Korea' },
];

const getCityId = (city: City) => city.id;

const getCityName = (city: City) => city.name;

const getCityCountry = (city: City) => city.country;

const filterCityByName = (searchQuery: string, city: City) => {
  const search = searchQuery.toLowerCase();
  const name = city.name.toLowerCase();
  return name.includes(search);
};

export const Basic: StoryFn<typeof MultiSelect<City['id'], City>> = (args) => {
  const [selectedIds, setSelectedIds] = useState(args.selectedItemIds || []);
  const style = args.style || { maxWidth: 320 };
  return (
    <MultiSelect
      {...args}
      style={style}
      selectedItemIds={selectedIds}
      onChangeSelectedItemIds={setSelectedIds}
    />
  );
};
Basic.args = {
  items: cities,
  placeholder: 'Start typing or select city',
  getItemId: getCityId,
  getItemLabel: getCityName,
  filterItem: filterCityByName,
};

export const Captions = Basic.bind({});
Captions.args = {
  ...Basic.args,
  getItemCaption: getCityCountry,
};

export const ItemsError = Basic.bind({});
ItemsError.args = {
  ...Basic.args,
  itemsError: 'Failed to load cities',
};

export const ItemsLoading = Basic.bind({});
ItemsLoading.args = {
  ...Basic.args,
  itemsLoading: true,
};
