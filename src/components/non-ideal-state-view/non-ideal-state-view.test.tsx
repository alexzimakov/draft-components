import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SvgIcon } from '../svg-icon';
import { SearchField } from '../search-field';
import { NonIdealStateView } from './non-ideal-state-view';

it('renders without errors', () => {
  const title = 'No search results';
  const description =
    "Your search didn't match any files. Try searching for something else.";
  const content = 'Return to the home or try another search term';
  const placeholder = 'Search';
  render(
    <NonIdealStateView
      icon={<SvgIcon aria-hidden={false} role="img" icon="search" size="5x" />}
      title={title}
      description={description}
      actions={<SearchField placeholder={placeholder} />}
    >
      {content}
    </NonIdealStateView>
  );

  screen.getByRole('img');
  screen.getByText(title);
  screen.getByText(description);
  screen.getByText(content);
  screen.getByPlaceholderText(placeholder);
});
