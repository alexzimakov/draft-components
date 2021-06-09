import { render, screen } from '@testing-library/react';
import { SearchField } from '../search-field';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';
import { exclamationCircle } from '../../icons/exclamation-circle';
import { exclamationTriangle } from '../../icons/exclamation-triangle';
import { checkCircle } from '../../icons/check-circle';
import { infoCircle } from '../../icons/info-circle';
import { NonIdealStateView } from './non-ideal-state-view';

const heading = `No search results`;
const description = `Your search didn't match any files. Try searching for something else.`;
const content = `Return to the home or try another search term`;
const placeholder = `Search`;

it('renders without errors', () => {
  render(
    <NonIdealStateView
      icon={<SvgIcon aria-hidden={false} role="img" icon={search} size="5x" />}
      heading={heading}
      description={description}
      actions={<SearchField placeholder={placeholder} />}
    >
      {content}
    </NonIdealStateView>
  );

  screen.getByRole('img');
  screen.getByText(heading);
  screen.getByText(description);
  screen.getByText(content);
  screen.getByPlaceholderText(placeholder);
});

it('renders without errors when passed only heading', () => {
  render(<NonIdealStateView heading={heading} />);

  screen.getByText(heading);
});

it('renders with right icon', () => {
  const { rerender } = render(
    <NonIdealStateView icon="info" heading={heading} />
  );

  screen.getByTestId(`svg-icon-${infoCircle.name}`);

  rerender(<NonIdealStateView icon="success" heading={heading} />);
  screen.getByTestId(`svg-icon-${checkCircle.name}`);

  rerender(<NonIdealStateView icon="error" heading={heading} />);
  screen.getByTestId(`svg-icon-${exclamationCircle.name}`);

  rerender(<NonIdealStateView icon="warning" heading={heading} />);
  screen.getByTestId(`svg-icon-${exclamationTriangle.name}`);

  rerender(
    <NonIdealStateView icon={<SvgIcon icon={search} />} heading={heading} />
  );
  screen.getByTestId(`svg-icon-${search.name}`);
});
