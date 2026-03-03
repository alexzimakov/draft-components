import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';
import { SearchSelect } from './search-select.js';

type Destination = {
  code: string;
  name: string;
  country: string;
};

const destinations = [
  { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { code: 'HKG', name: 'Hong Kong', country: 'China' },
  { code: 'LON', name: 'London', country: 'United Kingdom' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'DXB', name: 'Dubai', country: 'United Arab Emirates' },
  { code: 'MAK', name: 'Mecca', country: 'Saudi Arabia' },
  { code: 'PAR', name: 'Paris', country: 'France' },
  { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'DEL', name: 'Delhi', country: 'India' },
  { code: 'ROM', name: 'Rome', country: 'Italy' },
  { code: 'TYO', name: 'Tokyo', country: 'Japan' },
  { code: 'TPE', name: 'Taipei', country: 'Taiwan' },
  { code: 'PRG', name: 'Prague', country: 'Czech Republic' },
  { code: 'SEL', name: 'Seoul', country: 'South Korea' },
  { code: 'AMS', name: 'Amsterdam', country: 'Netherlands' },
  { code: 'MIA', name: 'Miami', country: 'United States' },
  { code: 'SGN', name: 'Ho Chi Minh City', country: 'Vietnam' },
  { code: 'DPS', name: 'Denpasar', country: 'Indonesia' },
  { code: 'BCN', name: 'Barcelona', country: 'Spain' },
  { code: 'SIN', name: 'Singapore', country: 'Singapore' },
  { code: 'VIE', name: 'Vienna', country: 'Austria' },
  { code: 'BER', name: 'Berlin', country: 'Germany' },
  { code: 'MEX', name: 'Mexico City', country: 'Mexico' },
  { code: 'LIS', name: 'Lisbon', country: 'Portugal' },
  { code: 'YUL', name: 'Montreal', country: 'Canada' },
  { code: 'SYD', name: 'Sydney', country: 'Australia' },
  { code: 'CPH', name: 'Copenhagen', country: 'Denmark' },
  { code: 'ATH', name: 'Athens', country: 'Greece' },
  { code: 'BUD', name: 'Budapest', country: 'Hungary' },
  { code: 'DUB', name: 'Dublin', country: 'Ireland' },
];

const getDestinationCode = (dest: Destination) => dest.code;

const getDestinationName = (dest: Destination) => <>{dest.name} <span style={{ fontWeight: 400, opacity: 0.75 }}>{dest.code}</span></>;

const getDestinationCountry = (dest: Destination) => dest.country;

const filterDestinationByNameOrCountry = (searchQuery: string, dest: Destination) => {
  const search = searchQuery.toLowerCase();
  const name = dest.name.toLowerCase();
  const country = dest.country.toLowerCase();
  return name.includes(search) || country.includes(search);
};

const meta: Meta<typeof SearchSelect<Destination['code'], Destination>> = {
  title: 'Forms/SearchSelect',
  component: SearchSelect,
  args: {
    items: destinations,
    itemsLoadingMessage: 'Loading locations...',
    getItemId: getDestinationCode,
    getItemLabel: getDestinationName,
    getItemCaption: getDestinationCountry,
    filterItem: filterDestinationByNameOrCountry,
    buttonLabel: (item) => item ? item.name : 'Select a destination',
    noDataMessage: 'No locations available',
    notFoundMessage: 'Nothing found',
    inputAriaLabel: 'Search locations',
    inputPlaceholder: 'Search locations',
    size: 'md',
    fullWidth: false,
    invalid: false,
    loading: false,
    disabled: false,
    readOnly: false,
    value: null,
  },
};
export default meta;

export const Basic: StoryFn<typeof SearchSelect<Destination['code'], Destination>> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <SearchSelect
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

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
FullWidth.args = {
  fullWidth: true,
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  icon: (
    <svg viewBox="0 0 32 32" width={20} height={20} fill="currentcolor">
      <path d="M21.455 11.207l-5 11a.5.5 0 0 1-.953-.162l-.463-5.085-5.084-.462a.5.5 0 0 1-.162-.953l11-5a.5.5 0 0 1 .662.662M16 4C9.383 4 4 9.383 4 16s5.383 12 12 12 12-5.383 12-12S22.617 4 16 4" />
    </svg>
  ),
};
