import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { mockMatchMedia } from '../../lib/test-utils';
import { Tooltip } from './tooltip';

const anchorLabel = 'Show Tooltip';
const tooltipContent = 'Tooltip Content';

beforeEach(() => {
  mockMatchMedia();
});

it('renders without errors', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip content={tooltipContent}>
      <button>{anchorLabel}</button>
    </Tooltip>
  );

  expect(screen.queryByRole('tooltip')).toBeNull();

  await user.hover(screen.getByRole('button'));
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  await user.unhover(screen.getByRole('button'));
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());

  await user.tab();
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  await user.tab();
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
});

it('renders without errors when children is a function', async () => {
  const user = userEvent.setup();
  const anchorTestId = 'anchor';
  render(
    <Tooltip content={tooltipContent}>
      {({ setRef, tooltipId, showTooltip, hideTooltip }) => (
        <span
          ref={setRef}
          data-testid={anchorTestId}
          aria-describedby={tooltipId}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {anchorLabel}
        </span>
      )}
    </Tooltip>
  );

  expect(screen.queryByRole('tooltip')).toBeNull();

  await user.hover(screen.getByTestId(anchorTestId));
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  await user.unhover(screen.getByTestId(anchorTestId));
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
});
