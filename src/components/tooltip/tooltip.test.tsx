import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './tooltip';

const tooltipContent = 'View notifications and manage settings';

it('<Tooltip /> renders without errors', () => {
  render(
    <Tooltip content={tooltipContent}>
      <button>Notifications</button>
    </Tooltip>,
  );
  const buttonEl = screen.getByRole('button');

  expect(screen.queryByRole('tooltip')).toBeNull();

  userEvent.hover(buttonEl);
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  userEvent.unhover(buttonEl);
  expect(screen.queryByRole('tooltip')).toBeNull();
});

it('<Tooltip /> renders without errors when children prop is function', () => {
  render(
    <Tooltip content={tooltipContent}>
      {({ ref, tooltipId, showTooltip, hideTooltip }) => (
        <button
          ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
          aria-labelledby={tooltipId}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          Notifications
        </button>
      )}
    </Tooltip>,
  );
  const buttonEl = screen.getByRole('button');

  expect(screen.queryByRole('tooltip')).toBeNull();

  userEvent.hover(buttonEl);
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  userEvent.unhover(buttonEl);
  expect(screen.queryByRole('tooltip')).toBeNull();
});
