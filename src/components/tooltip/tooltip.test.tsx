import { expect, it } from 'vitest';
import { Tooltip } from './tooltip.js';
import { fireEvent, render, screen, userEvent, waitFor } from '../../test/test-utils.js';

const anchorLabel = 'Show Tooltip';
const tooltipContent = 'Tooltip Content';

it('renders without errors', async () => {
  const user = userEvent.setup();

  render(
    <Tooltip title={tooltipContent}>
      {(props) => (
        <button {...props}>{anchorLabel}</button>
      )}
    </Tooltip>,
  );

  expect(screen.queryByRole('tooltip')).toBeNull();

  await user.hover(screen.getByRole('button'));
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  await user.unhover(screen.getByRole('button'));
  fireEvent.animationStart(screen.getByRole('tooltip'));
  fireEvent.animationEnd(screen.getByRole('tooltip'));
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());

  await user.tab();
  expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipContent);

  await user.tab();
  fireEvent.animationStart(screen.getByRole('tooltip'));
  fireEvent.animationEnd(screen.getByRole('tooltip'));
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
});
