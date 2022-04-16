import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { Tooltip } from './tooltip';

const anchorLabel = 'Show Tooltip';
const tooltipContent = 'Tooltip Content';

it('<Tooltip /> renders without errors', () => {
  jest.useFakeTimers();

  render(
    <Tooltip label={tooltipContent}>
      <button>{anchorLabel}</button>
    </Tooltip>
  );

  expect(screen.queryByRole('tooltip')).toBeNull();

  userEvent.hover(screen.getByRole('button'));
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  userEvent.unhover(screen.getByRole('button'));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByRole('tooltip')).toBeNull();
});

it('<Tooltip /> renders without errors when children prop is function', () => {
  jest.useFakeTimers();

  const anchorTestId = 'anchor';
  render(
    <Tooltip label={tooltipContent}>
      {({ setRef, tooltipId, showTooltip, hideTooltip }) => (
        <span
          ref={setRef}
          data-testid={anchorTestId}
          aria-labelledby={tooltipId}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {anchorLabel}
        </span>
      )}
    </Tooltip>
  );

  expect(screen.queryByRole('tooltip')).toBeNull();

  userEvent.hover(screen.getByTestId(anchorTestId));
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  userEvent.unhover(screen.getByTestId(anchorTestId));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByRole('tooltip')).toBeNull();
});
