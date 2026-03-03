import { it, vi } from 'vitest';
import { render, screen } from '../../test/test-utils.js';
import { SearchSelect } from './search-select.js';

it('renders without errors', () => {
  type Destination = {
    code: string;
    name: string;
    country: string;
  };

  const destinations = [
    { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
    { code: 'HKG', name: 'Hong Kong', country: 'China' },
    { code: 'LON', name: 'London', country: 'United Kingdom' },
    { code: 'MFM', name: 'Macau', country: 'China' },
    { code: 'IST', name: 'Istanbul', country: 'Turkey' },
    { code: 'DXB', name: 'Dubai', country: 'United Arab Emirates' },
    { code: 'MAK', name: 'Mecca', country: 'Saudi Arabia' },
    { code: 'AYT', name: 'Antalya', country: 'Turkey' },
    { code: 'PAR', name: 'Paris', country: 'France' },
    { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia' },
  ];

  const getDestinationCode = (dest: Destination) => dest.code;

  const getDestinationName = (dest: Destination) => dest.name;

  const getDestinationCountry = (dest: Destination) => dest.country;

  const filterDestinationByNameOrCountry = (searchQuery: string, dest: Destination) => {
    const search = searchQuery.toLowerCase();
    const name = dest.name.toLowerCase();
    const country = dest.country.toLowerCase();
    return name.includes(search) || country.includes(search);
  };

  render(
    <SearchSelect
      items={destinations}
      itemsLoadingMessage="Loading locations..."
      getItemId={getDestinationCode}
      getItemLabel={getDestinationName}
      getItemCaption={getDestinationCountry}
      filterItem={filterDestinationByNameOrCountry}
      buttonLabel={(item) => item ? item.name : 'Select a destination'}
      noDataMessage="No locations available"
      notFoundMessage="Nothing found"
      inputAriaLabel="Search locations"
      inputPlaceholder="Search locations"
      value={getDestinationCode(destinations[0])}
      onChange={vi.fn()}
    />,
  );

  screen.getByText(destinations[0].name);
});
