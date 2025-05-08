import { beforeAll, expect, it, vi } from 'vitest';
import { Popover } from './popover.js';
import { render, screen, userEvent } from '../../test/test-utils.js';
import { mockMatchMedia } from '../../test/mock-match-media.js';

beforeAll(() => {
  mockMatchMedia();
});

const anchorLabel = 'Show Popover';
const popoverContent = 'Popover Content';

it('renders without errors', () => {
  render(
    <Popover
      isOpen={true}
      renderAnchor={({ ref }) => <button ref={ref}>{anchorLabel}</button>}
    >
      {popoverContent}
    </Popover>,
  );

  screen.getByRole('button');
  expect(screen.getByRole('dialog')).toHaveTextContent(popoverContent);
});

it('should invoke `onClose` callback when click outside of popover', async () => {
  const user = userEvent.setup();
  const outsideButtonTestId = 'close-popover';
  const closeMock = vi.fn();
  render(
    <div>
      <button data-testid={outsideButtonTestId}>Close popover</button>
      <Popover
        isOpen={true}
        onClose={closeMock}
        renderAnchor={({ ref }) => <button ref={ref}>{anchorLabel}</button>}
      >
        {popoverContent}
      </Popover>
    </div>,
  );

  screen.getByRole('dialog');

  await user.click(screen.getByTestId(outsideButtonTestId));
  expect(closeMock).toHaveBeenCalledTimes(1);
},
);

it('should invoke `onClose` callback when press Esc button', async () => {
  const user = userEvent.setup();
  const closeMock = vi.fn();
  render(
    <Popover
      isOpen={true}
      onClose={closeMock}
      renderAnchor={({ ref }) => <button ref={ref}>{anchorLabel}</button>}
    >
      {popoverContent}
    </Popover>,
  );

  screen.getByRole('dialog');

  await user.keyboard('{Escape}');
  expect(closeMock).toHaveBeenCalledTimes(1);
});

it('should trap focus within the popover', async () => {
  const user = userEvent.setup();
  const inputTestId = 'input';
  const buttonTestId = 'button';
  const closeMock = vi.fn();
  render(
    <Popover
      isOpen={true}
      onClose={closeMock}
      renderAnchor={({ ref }) => <button ref={ref}>{anchorLabel}</button>}
    >
      <input data-testid={inputTestId} />
      <button data-testid={buttonTestId}>Add</button>
    </Popover>,
  );

  const input = screen.getByTestId(inputTestId);
  const button = screen.getByTestId(buttonTestId);

  await user.tab();
  expect(input).toHaveFocus();
  await user.tab();
  expect(button).toHaveFocus();

  await user.tab({ shift: true });
  expect(input).toHaveFocus();
  await user.tab({ shift: true });
  expect(button).toHaveFocus();
});
