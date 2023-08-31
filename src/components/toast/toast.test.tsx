import { Toast } from './toast';
import { ToastButton } from './toast-button';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

const title = 'Focus is on';
const message = 'All notifications and alerts will be silent.';
const cancelButtonLabel = 'Cancel';
const confirmButtonLabel = 'Confirm';

it('renders without error', () => {
  render(
    <Toast
      message={message}
      actions={<>
        <ToastButton>{cancelButtonLabel}</ToastButton>
        <ToastButton>{confirmButtonLabel}</ToastButton>
      </>}
    >
      {title}
    </Toast>,
  );

  screen.getByText(title);
  screen.getByText(message);
  const buttons = screen.getAllByRole('button');
  expect(buttons[1]).toHaveTextContent(cancelButtonLabel);
  expect(buttons[2]).toHaveTextContent(confirmButtonLabel);
});

it('renders with custom icon', () => {
  const icon = <svg role="img" />;

  render(<Toast icon={icon}>{title}</Toast>);

  screen.getByText(title);
  screen.getByRole('img');
});

it('invokes `onClickCloseButton` callback', async () => {
  const user = userEvent.setup();
  const closeButtonLabel = 'hide toast';
  const onClickCloseButtonMock = vi.fn();
  render(
    <Toast
      closeButtonAriaLabel={closeButtonLabel}
      onClickCloseButton={onClickCloseButtonMock}
    >
      {title}
    </Toast>,
  );

  await user.click(screen.getByLabelText(closeButtonLabel));

  expect(onClickCloseButtonMock).toHaveBeenCalledTimes(1);
});
